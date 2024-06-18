"use client";

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/geminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({mockInterviewQuestion, activeQuestionIndex, interviewData}) => {
  const [userAnswer, setUserAnswer] = useState("");
  
  const {user} = useUser();

  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
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

  useEffect(() => {
    if(!isRecording && userAnswer?.length > 10){
      updateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = () => {
    if(isRecording){
      setLoading(true);
      stopSpeechToText();
    } else {
      setLoading(false);
      startSpeechToText();
    }
  }

  const updateUserAnswer = async () => {
    setLoading(true);

    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depending on question and user answer for the given interview question, please give us a rating for answer and feedback as the area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.`

    const result = await chatSession.sendMessage(feedbackPrompt);

    const MockJSONResponse = (result.response
      .text())
      .replace("```json", "")
      .replace("```", "");

    const JsonFeedbackResponse = JSON.parse(MockJSONResponse);

    const response = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResponse?.feedback,
      rating: JsonFeedbackResponse?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-yyyy')
    });

    if(response){
      toast("User Answer recorded successfully...");
      setUserAnswer("");
      setResults([]);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-start flex-col">
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
      <Button disabled={loading} variant={"outline"} className="my-10" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle/> Stop Recording
          </h2>
        ) : (
          <h2 className="text-blue-700 flex gap-2 items-center">
            <Mic/> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
