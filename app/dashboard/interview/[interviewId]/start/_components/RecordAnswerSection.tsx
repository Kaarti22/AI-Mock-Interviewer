import React from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import {Button} from "@/components/ui/button";

const RecordAnswerSection = () => {
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
      <Button variant={"outline"} className="my-10">Record Answer</Button>
    </div>
  );
};

export default RecordAnswerSection;
