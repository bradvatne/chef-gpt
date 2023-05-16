export const messageContext = `
Your job is to parse this video transcript and extract items pertaining to the ingredients and instructions for each recipe. If the video is not a cooking recipe video, reply with the format {"error": "Input your message here"} and nothing else. Reply to each response with your current items that you have extracted so that we can keep the context going. Use your discretion to detect any anomalies in the auto-generated transcripts you are provided and make corrections where you see fit"
`;

export const generateParams = (
  inputMessages: string[]
): any => {
  return {
    model: "gpt-3.5-turbo",
    messages: [
      ...inputMessages,
      {
        role: "user",
        content: `Ok that is all of the information. Please use the ingredients and instructions that we have collected and format your response with nothing else other than a json object for the single recipe using the following structure  {
                      "ingredients" : [""],
                      "instructions" : [""]
                    }`,
      },
    ],
    temperature: 0,
  };
};

