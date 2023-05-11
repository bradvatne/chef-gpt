'use server'
import openai from "@/lib/openai";
import { ChatCompletionResponseMessage } from "openai";
import { PromptParamType } from "./types";

type FetchResponseType = {
  error: undefined | string;
  data: undefined | ChatCompletionResponseMessage;
};

export async function fetchChat(
  params: PromptParamType
): Promise<FetchResponseType> {
  'use server'
  try {
    console.log(params, 'params')
    const completion = await openai.createChatCompletion(params);
    return {
      error: undefined,
      data: completion.data.choices[0].message
    };
  } catch (e) {
    return {
      error: `${e}`,
      data: undefined,
    };
  }
}
