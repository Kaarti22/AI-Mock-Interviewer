"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { chatSession } from "../../../utils/geminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";

import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState(0);

  const [loading, setLoading] = useState(false);

  const [jsonResponse, setJsonResponse] = useState([]);

  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (ev: { preventDefault: () => void; }) => {
    setLoading(true);
    ev.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Depending on the job position, job description and years of experience, give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with their answers in JSON format. Only provide me the json fields. At the end please do not provide any explanation.`;

    const result = await chatSession.sendMessage(InputPrompt);

    const MockJSONResponse = (result.response
      .text())
      .replace("```json", "")
      .replace("```", "");

    setJsonResponse(MockJSONResponse);

    if (MockJSONResponse) {
      const res = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJSONResponse,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID: ", res);

      if (res) {
        setOpenDialog(false);
        router.push('/dashboard/interview/' + res[0]?.mockId);
      }
    } else {
      console.log("Error");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border border-blue-800 rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center text-blue-800">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the Job you are interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add details about your job position/role</h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(ev) => setJobPosition(ev.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, Node.js, MySQL, etc."
                      required
                      onChange={(ev) => setJobDesc(ev.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      onChange={(ev) => setJobExperience(ev.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI{" "}
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
