"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";

const Feedbackpage = ({ params }) => {

  const router = useRouter();

  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    getFeedback();
  }, []);

  useEffect(() => {
    console.log("Feedback list: ", feedbackList);
  }, [feedbackList]);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-blue-700 text-lg my-3">
        Your overall interview rating: <strong>7/10</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Find below interview question with correct answer
      </h2>
      {feedbackList?.length > 0 && feedbackList.map((item, index) => (
        <Collapsible key={index} className="mt-7">
          <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
            {item?.question} <ChevronsUpDown className="h-5 w-5"/>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col gap-2">
              <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating: </strong>{item?.rating}</h2>
              <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your Answer: </strong>{item?.userAns}</h2>
              <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>AI's Answer: </strong>{item?.correctAns}</h2>
              <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-700"><strong>Feedback: </strong>{item?.feedback}</h2>
            </div>
          </CollapsibleContent>
        </Collapsible>      
      ))}
      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
};

export default Feedbackpage;