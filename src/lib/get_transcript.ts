"use server";
import { YoutubeTranscript } from "youtube-transcript";
import { divideTranscript, youtubeParser } from "./parses";

type ProcessedTranscript = {
  error: undefined | string;
  transcript: undefined | string[];
};

export default async function getTranscript(
  rawURL: string
): Promise<ProcessedTranscript> {
  'use server'
  const youtubeId = youtubeParser(rawURL);
  const arrayTranscript = await YoutubeTranscript.fetchTranscript(
    `${youtubeId}`
  );
  let longStringTranscript = "";
  arrayTranscript.forEach((item) => (longStringTranscript += ` ${item.text} `));

  const processedTranscript = divideTranscript(longStringTranscript);
  return { error: undefined, transcript: processedTranscript };
}
