"use server";
import { divideTranscript, youtubeParser } from "@/lib/parses";
import { YoutubeTranscript } from "youtube-transcript";

type ProcessedTranscript = {
  error: undefined | string;
  transcript: undefined | string[];
};

export default async function getTranscript(
  rawURL: string
): Promise<ProcessedTranscript> {
  try {
    const youtubeId = youtubeParser(rawURL);
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
    return { error: undefined, transcript: processedTranscript };
  } catch (e) {
    return { error: `${e}`, transcript: undefined };
  }
}
