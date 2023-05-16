"use server";
import openai from "@/lib/openai";
import { CreateCompletionRequest } from "openai";
import { generateMessage, generateParams } from "./prompt";

export const callChatGPT = async (params: CreateCompletionRequest) => {
  try {
    const result = await openai.createCompletion(params);
    return result;
  } catch (error: any) {
    console.log(error.response.data);
  }
};

export const getData = async (
  transcriptItem: string,
  currentStep: number,
  length: number,
  prevInfo?: any
) => {
  const message = generateMessage(
    currentStep,
    length,
    transcriptItem,
    prevInfo && prevInfo
  );

  const params = generateParams(message);
  console.log(params);
  const completion = await callChatGPT(params);
  console.log(completion?.data.choices[0].text);
  return JSON.stringify(completion?.data.choices[0].text);
};
