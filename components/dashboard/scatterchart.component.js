import React from 'react';
import { Scatter } from 'react-chartjs-2';
import annotation from 'chartjs-plugin-annotation';
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
    annotation,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
);

export default function ScatterGraph({ data, title, labels }) {

    const scatterDataPoints = data;




    // Define colors for each data point
    const colors = scatterDataPoints.map(point => {
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
            annotation: {
                annotations: [
                    {
                        type: 'box',
                        yScaleID: 'y',
                        yMin: 5,
                        yMax: 10,
                        backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    },
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 10,
                        borderColor: 'rgb(76, 255, 0)',
                        borderWidth: 2,
                        label: {
                            enabled: true,
                            content: 'y = 10',
                        }
                    },
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y',
                        value: 5,
                        borderColor: 'rgb(76, 255, 0)',
                        borderWidth: 2,
                        label: {
                            enabled: true,
                            content: 'y = 5',
                        }
                    }
                ]
            }
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: labels?.x,
                },
                grid: {
                    display: true,
                },
                ticks: {
                    maxTicksLimit: 10  // Show a maximum of 10 ticks on the x-axis
                }
            },
            y: {
                title: {
                    display: true,
                    text: labels?.y,
                },
                grid: {
                    display: false,
                },
                ticks: {
                    min: 0,
                    max: Math.max(...scatterDataPoints.map(point => point.y)) + 1,
                    stepSize: 5,
                    font: {
                        weight: 'normal'
                    },
                    callback: function (value, index, values) {
                        if (value === 5 || value === 10) {
                            return `y = ${value}`;
                        }
                        return value;
                    },
                    font: function (context) {
                        const value = context.tick ? context.tick.value : undefined;
                        if (value === 5 || value === 10) {
                            return {
                                weight: 'bold',
                                size: 16,
                            };
                        }
                        return {};
                    },
                }
            }
        },
    };

    return (
        <div className='w-full bg-gray-50 w-full md:col-span-2 relative m-auto rounded-lg p-4 h-[50vh] lg:h-[70vh]'>
            <Scatter data={chartData} options={chartOptions} />
        </div>
    );
}
