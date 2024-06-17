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

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState(0);

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
  }

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
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
                    <Input placeholder="Ex. Full Stack Developer" required onChange={(ev) => setJobPosition(ev.target.value)}/>
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea placeholder="Ex. React, Angular, Node.js, MySQL, etc." required  onChange={(ev) => setJobDesc(ev.target.value)}/>
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input placeholder="Ex. 5" type="number" max="50" required  onChange={(ev) => setJobExperience(ev.target.value)}/>
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
                  <Button type="submit">Start Interview</Button>
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
