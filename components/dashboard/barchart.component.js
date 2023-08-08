import { Bar } from 'react-chartjs-2';

import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Title,
);

export default function BarChart({ cadenceArray, title, labels }) {

    const chartData = {
        labels: [],
        datasets: [
            {
                label: title,
                data: cadenceArray,
                backgroundColor: [

                    'rgba(255, 12, 25, 0.2)',
                    'rgba(245, 102, 25, 0.8)',

                    'rgba(245, 10, 25, 0.8)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2,
            },
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

