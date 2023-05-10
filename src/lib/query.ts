"use server";
import { divideTranscript, youtubeParser } from "@/lib/parses";
import { YoutubeTranscript } from "youtube-transcript";
import { generateParams, messageContext } from "@/lib/prompt";
import openai from "@/lib/openai";

export async function fetchChat(text: string) {
  try {
    const youtubeId = youtubeParser(text);

    if (!youtubeId)
      throw new Error(
        "Error parsing url. Please check the YouTube link you have provided."
      );

    const arrayTranscript = await YoutubeTranscript.fetchTranscript(youtubeId);
    let longStringTranscript = "";
    arrayTranscript.forEach(
      (item) => (longStringTranscript += ` ${item.text} `)
    );
    const processedTranscript = divideTranscript(longStringTranscript);
    const inputMessages: any = processedTranscript.map((item) => ({
      role: "user",
      content: item.concat(messageContext),
    }));
    const params = generateParams(inputMessages);
    const completion = await openai.createChatCompletion(params);
    return completion.data.choices[0].message?.content;
  } catch (error) {
    console.log(error);
    return;
  }
}
