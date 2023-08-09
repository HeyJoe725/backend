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
            annotation: {
                annotations: [
                    {
                        type: 'box',
                        yScaleID: 'y',
                        yMin: 5,
                        yMax: 10,
                        backgroundColor: 'rgba(0, 255, 0, 0.1)', // Color to fill the area between y = 5 and y = 10
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

                ticks: {
                    min: 0,  // or whatever minimum value you want
                    max: Math.max(...data.values) + 1,  // you might adjust this depending on your data
                    stepSize: 1,  // adjust this if needed
                    font: {
                        weight: 'normal'  // default weight
                    },
                    callback: function (value, index, values) {
                        if (value === 5 || value === 10) {
                            // Return the custom label
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
        <div className='w-full bg-gray-50 w-full md:col-span-2 relative m-auto rounded-lg p-4 h-[50vh] lg:h-[70vh]' >
            <Scatter data={chartData} options={chartOptions} />
        </div >
    );
}
