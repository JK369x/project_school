import * as React from 'react';
import Slider from "react-slick";

export default function testgrid() {
  const [questions] = React.useState([
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Rome", "Madrid"],
      answer: "Paris"
    },
    {
      question: "What is the capital of Germany?",
      choices: ["Berlin", "Paris", "Rome", "Madrid"],
      answer: "Berlin"
    },
    {
      question: "What is the capital of Italy?",
      choices: ["Rome", "Paris", "Berlin", "Madrid"],
      answer: "Rome"
    }
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);

  const handleSubmit = (answer: any) => {
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
  return (
    <div>
      {currentQuestionIndex < questions.length ?
        <div>
          <h1>{questions[currentQuestionIndex].question}</h1>
          {questions[currentQuestionIndex].choices.map((choice: any, index: any) => (
            <button key={index} onClick={() => handleSubmit(choice)}>{choice}</button>
          ))}
        </div>
        :
        <div>
          <h1>Quiz Completed</h1>
          <p>Your score: {score}/{questions.length}</p>
        </div>
      }
    </div>
  );
}