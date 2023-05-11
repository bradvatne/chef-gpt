import { ChatCompletionRequestMessage } from "openai";

type PromptMessage = {
  role: string;
  content: string;
};

type PromptParamType = {
  model: string;
  messages: ChatCompletionRequestMessage[];
  temperature: number;
};

type FetchChatReturn = {};
