import React from 'react';
import { Scatter } from 'react-chartjs-2';

import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
);

export default function ScatterGraph({ data, title, labels }) {

    const scatterDataPoints = data.labels.map((label, index) => ({
        x: label,
        y: data.values[index]
    }));

    // Define colors for each data point
    const colors = scatterDataPoints.map((point, index) => {
        if (point.y >= 5 && point.y <= 10) return '#00ff00';
        return 'red';


    });
    const chartData = {
        datasets: [
            {
                label: title,
                data: scatterDataPoints,
                backgroundColor: colors,
                borderColor: 'rgba(255, 99, 132, 0)',
                borderWidth: 2,
            }
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: labels?.x,
                },
                grid: {
                    display: true,
                },
            },
            y: {
                title: {
                    display: true,
                    text: labels?.y,
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className='w-full bg-gray-50 w-full md:col-span-2 relative m-auto rounded-lg p-4 h-[50vh] lg:h-[70vh]'>
            <Scatter data={chartData} options={chartOptions} />
        </div>
    );
}
