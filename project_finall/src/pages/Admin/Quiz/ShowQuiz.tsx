import { useState } from "react";
import { lightBlue } from "@mui/material/colors";

import QuestionCard from "./QuestionCard";
import Result from "./Result";
import { Box, Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useGetAllQuiz } from "./Hook/useGetAllQuiz";
import { useGetDetailQuiz } from "./Hook/useDetailQuiz";
import { Navbar } from "../../../components/Navbar";

function ShowQuiz() {
    const { id, id_quiz } = useParams<{ id: string, id_quiz: string }>();
    const { stateQuiz } = useGetDetailQuiz(id)
    const newdata = stateQuiz.quiz?.params ?? ''

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<never[]>([]);
    const finishedQuiz = currentQuestionIndex === newdata.length;
    const currentQuestion = newdata[currentQuestionIndex];


    const goToNext = () => {
        setCurrentQuestionIndex((prevState) => prevState + 1);
    }

    const submitAnswer = (value: never) => {
        console.log("🚀 ~ file: ShowQuiz.tsx:30 ~ submitAnswer ~ value", value)
        setAnswers((prevState) => [...prevState, value]);
        goToNext();
    }

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
    }

    return (
        <div>
            <Navbar />
            <Box sx={{
                backgroundColor: "#dcdbdb",
                height: "100vh", display: "flex", alignItems: "center"
            }}>
                <Container maxWidth="lg" >
                    {finishedQuiz ? <Result restartQuiz={restartQuiz} answers={answers} /> : <QuestionCard newdata={currentQuestion} questionNumber={currentQuestionIndex + 1}
                        submitAnswer={submitAnswer} />}

                </Container>
            </Box>
        </div>
    );
}

export default ShowQuiz;