import { callChatGPT } from "./query";
export const messageContext = `
Your job is to parse this video transcript and extract items pertaining to the ingredients and instructions for each recipe. If the video is not a cooking recipe video, Reply to each response with your current items that you have extracted so that we can keep the context going. Use your discretion to detect any anomalies in the auto-generated transcripts you are provided and make corrections where you see fit"
`;

type PromptParamType = {
  model: string;
  prompt: string;
  temperature: number;
};

export const generateParams = (inputMessage: string): PromptParamType => {
  return {
    model: "text-davinci-003",
    prompt: inputMessage,
    temperature: 0,
  };
};

export const generateMessage = (
  currentStep: number,
  totalSteps: number,
  transcriptSegment: string,
  prevResponse?: string
) => {
  return `
  Your job is to identify and list ingredients and instructions from a video transcript and list them.
  This is part ${currentStep} of ${totalSteps} total transcript items.    
  So far your information has been:
  ${prevResponse ? prevResponse : "{'ingredients: [], 'instructions': []}"}
  The current transcript segment for you to anlyze is ${transcriptSegment}
  Reply to this message only with the json object provided updated.
  `;
};
