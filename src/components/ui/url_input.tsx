"use client";
import { useState } from "react";
import { fetchChat } from "@/lib/query";
import List from "./list";
import Confetti from "react-confetti";
import { MutatingDots } from "react-loader-spinner";
import getTranscript from "@/lib/get_transcript";
import { generateParams, messageContext } from "@/lib/prompt";
import { ChatCompletionRequestMessage } from "openai";
import { PromptParamType } from "@/lib/types";

type Finished = {
  ingredients: string[];
  instructions: string[];
};

export default function UrlInput() {
  const [text, setText] = useState("");
  const [res, setRes] = useState<Finished | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    try {
      const processedTranscript = await getTranscript(text);
      if (processedTranscript.error !== undefined) {
        throw new Error(processedTranscript.error);
      }
      if (processedTranscript.transcript === undefined) {
        throw new Error("Problem processing youtube transcript");
      }
      const inputMessages: ChatCompletionRequestMessage[] =
        processedTranscript?.transcript?.map((item) => ({
          role: "user",
          content: item.concat(messageContext),
        }));
      const params: PromptParamType[] = inputMessages.map((item) => ({
        model: "gpt-3.5-turbo",
        messages: [item],
        temperature: 0,
      }));

      const { data, error } = await fetchChat(params[0]);
      if (error) {
        throw new Error(`${error}`);
      }
      if (data) {
        const finished: Finished = JSON.parse(data.content);

        setRes(finished);
        setLoading(false);
      }
    } catch (error) {
      alert(error);
      setLoading(false);
      return;
    }
  };

  return (
    <div>
      {loading && (
        <div className="flex justify-center text-center">
          <MutatingDots
            height="100"
            width="100"
            color="#4F4FE5"
            secondaryColor="#4F4FE5"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}

      {!loading && (
        <form action={() => handleAction()} onSubmit={() => setLoading(true)}>
          <label
            htmlFor="search"
            className="hidden text-sm font-medium leading-6 text-gray-900"
          >
            Quick search
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              autoComplete="false"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Enter a valid YouTube URL"
              className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <input type="submit" className="invisible" />
              <kbd className="inline-flex hover:cursor-pointer items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                ENTER
              </kbd>
            </div>
          </div>
        </form>
      )}
      {res && (
        <div className="p-5 rounded-xl mt-12 shadow-xl">
          <Confetti />
          <h1 className="text-2xl font-bold drop-shadow-md my-4 pb-8">
            Your Recipe Is Ready! Selamat Makan!
          </h1>
          <div className="grid-cols-1 grid md:grid-cols-2 ">
            <List options="Ingredients" items={res?.ingredients} />
            <List options="Instructions" items={res?.instructions} />
          </div>
        </div>
      )}
    </div>
  );
}
