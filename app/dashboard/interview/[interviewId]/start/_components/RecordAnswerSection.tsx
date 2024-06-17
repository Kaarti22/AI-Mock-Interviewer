"use client";

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/geminiAIModal";

const RecordAnswerSection = ({mockInterviewQuestion, activeQuestionIndex}) => {
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
 
  useEffect(() => {
    results.map((result) => (setUserAnswer(result?.transcript)));
  }, [results]);

  const saveUserAnswer = async () => {
    if(isRecording){
      stopSpeechToText();
      if(userAnswer?.length < 10){
        toast("Error while saving your answer, please record again");
        return;
      }
      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depending on question and user answer for the given interview question, please give us a rating for answer and feedback as the area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.`

      const result = await chatSession.sendMessage(feedbackPrompt);

      const MockJSONResponse = (result.response
        .text())
        .replace("```json", "")
        .replace("```", "");

      console.log(MockJSONResponse);

      const JsonFeedbackResponse = JSON.parse(MockJSONResponse);
    } else {
      startSpeechToText();
    }
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center rounded-lg p-5 bg-black">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          alt="webcam"
          className="absolute"
          priority={true}
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button variant={"outline"} className="my-10" onClick={saveUserAnswer}>
        {isRecording ? (
          <h2 className="text-red-600 flex flex-row items-center justify-evenly">
            <Mic /> 'Recording...'
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show user answer</Button>
    </div>
  );
};

export default RecordAnswerSection;
