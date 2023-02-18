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
import { Grid } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options: any = {
    // responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart Comment',

        },
    },
};


const ChartComment = (props: any) => {
    const datascore = props.score_props
    console.log("🚀 ~ file: ChartUserQuiz.tsx:27 ~ ChartUserQuiz ~ datascore", datascore)
    // const data_labels = datascore.map((item: any, index: number) => {
    //     return `Quiz ${index + 1}`
    // })

    const full_score = datascore.map((item: any, index: number) => {
        return item.ratting
    })
    const sum = full_score.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0);
    const average = sum / full_score.length;
    console.log("🚀 ~ file: ChartComment.tsx:51 ~ constfull_score=datascore.map ~ full_score", full_score)
    const dataChart = {
        labels: ["comment count"],
        datasets: [
            {
                label: 'จำนวน comment',
                data: datascore.map((item: any) => datascore.length),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'คะแนนเฉลี่ย',
                data: full_score.map((item: any) => average),
                backgroundColor: 'rgba(32, 205, 55, 0.5)',
            },
        ]
    }


    return <>
        <Grid container justifyContent={'center'} sx={{ height: 820 }}>
            <Bar options={options} data={dataChart} />;

        </Grid>
    </>
}
export default ChartComment