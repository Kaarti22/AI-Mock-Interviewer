"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState({});
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
    const jsonMockResponse = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResponse);
  };

  return <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>
        <RecordAnswerSection/>
    </div>
  </div>;
};

export default StartInterview;
