import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options: any = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};


const ChartUserQuiz = (props: any) => {
    const datascore = props.score_props
    console.log("🚀 ~ file: ChartUserQuiz.tsx:27 ~ ChartUserQuiz ~ datascore", datascore)
    const data_labels = datascore.map((item: any, index: number) => {
        return `Quiz ${index + 1}`
    })
    const score_quiz = datascore.map((item: any, index: number) => {
        return item.total_score
    })
    const full_score = datascore.map((item: any, index: number) => {
        return item.full_score
    })
    console.log("🚀 ~ file: ChartUserQuiz.tsx:61 ~ constscore_quiz=datascore.map ~ score_quiz", score_quiz)
    console.log("🚀 ~ file: ChartUserQuiz.tsx:56 ~ ChartUserQuiz ~ newdata", data_labels)
    const dataChart = {
        labels: data_labels,
        datasets: [
            {
                label: 'total score',
                data: score_quiz.map((item: any) => item),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'full score',
                data: full_score.map((item: any) => item),
                backgroundColor: 'rgba(32, 205, 55, 0.5)',
            },
        ]
    }


    return <Bar options={options} data={dataChart} />;
}
export default ChartUserQuiz