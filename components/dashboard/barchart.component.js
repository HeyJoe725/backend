import { Bar, Line } from 'react-chartjs-2';

import {

    Chart,
    CategoryScale,
    LinearScale,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
);

export default function BarChart({ cadenceArray, title, labels, colors }) {

    const chartData = {
        labels: [],
        datasets: [
            {
                label: title,
                data: cadenceArray,
                backgroundColor: colors,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 0,
            },

            // {
            //     type: 'line',
            //     label: 'Line Dataset',
            //     data: cadenceArray, // same as bar data for top border
            //     fill: false,
            //     borderColor: 'rgb(75, 192, 192)',
            //     tension: 0.1, // this makes the line smooth
            //     borderWidth: 2 // thicker line width for emphasis
            // }
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
                    display: false,
                },
            },
            y: {
                title: {
                    display: true,
                    text: labels?.y,
                },
                grid: {
                    display: true,
                },
            },
        },
    };


    return (
        <div className='w-full bg-gray-50 w-full md:col-span-2 relative m-auto rounded-lg p-4 h-[50vh] lg:h-[70vh]'>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

