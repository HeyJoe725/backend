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
    Filler // <-- Import the Filler plugin here
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
    Filler
);

export default function BarChart({ cadenceArray, title, labels, colors, line = false, bars = true }) {
    const generateColorArray = (data) => {
        const data_ob = Object.values(data);
        return data_ob.map(value => value < 7 ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)');
    };

    const chartData = {
        labels: [],
        datasets: [
            ...(bars ? [{
                label: title,
                data: cadenceArray,
                backgroundColor: colors,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 0,
            }] : []),
            ...(line ? [{
                type: 'line',
                label: 'Line Dataset',
                data: cadenceArray,
                fill: true,
                backgroundColor: generateColorArray(cadenceArray), // Set background color here
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                borderWidth: 2
            }] : [])
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

