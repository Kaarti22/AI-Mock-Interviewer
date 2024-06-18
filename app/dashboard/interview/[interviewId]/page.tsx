"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState({});

  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl text-blue-700">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border border-blue-900 gap-5">
            <h2>
              <strong>Job Role/Job Position: </strong>{" "}
              {interviewData.jobPosition}
            </h2>
            <h2>
              <strong>Job Description/Tech Stack: </strong>{" "}
              {interviewData.jobDesc}
            </h2>
            <h2>
              <strong>Years of Experience: </strong>{" "}
              {interviewData.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex items-center gap-2 text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Enable Video, Web cam and Microphone to start your AI generated
              mock interview. It has 10 questions which you can answer and at
              the last you will get the report on the basis of your answers.<br/>
              <b>NOTE: </b> We never revord your video. You can disable your web cam at
              any time. It is only kept to build your confidence in the
              interviews.
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <div className="flex flex-col">
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button variant={"ghost"} onClick={() => setWebCamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
