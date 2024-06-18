import React from 'react';
import {Lightbulb, Volume2} from "lucide-react";

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {

  const textToSpeech = (text) => {
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech...");
    }
  }

  return mockInterviewQuestion && (
    <div className='p-5 border border-blue-900 rounded-lg mt-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
          <h2 key={index} className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className='my-5 text-md md:text-lg font-semibold'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
      <Volume2 className='cursor-pointer' onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
      <div className='border rounded-lg p-5 bg-blue-100 mt-10'>
        <h2 className='flex gap-2 items-center text-blue-700'>
            <Lightbulb/>
            <strong>Note: </strong>
        </h2>
        <h2 className='text-sm text-blue-700 my-2'>
            Click on Record answer when you want to answer the question. At the end of interview, we will give you the feedback along with the correct answer for each of the question and your answer to comapare with it.
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
