import Head from 'next/head'
import Sidebar from '../components/dashboard/sidebar.component'
import TopCard from '../components/dashboard/topbar.component'
import BarChart from '../components/dashboard/barchart.component'
import RecentData from '../components/dashboard/recentdata.component'
import { useState, useEffect } from 'react';
import ScatterGraph from '../components/dashboard/scatterchart.component'
import Runner from '../components/runner'
import styles from '../styles/dashboard.css'


export default function Dashboard() {
    console.clear();
    const second = 1;
    const frames = 30;
    const minute = 60;
    const [runners, setRunners] = useState([]);
    const [cadenceArray, setCadenceArray] = useState([]);
    const [verticalArray, setVerticalArray] = useState([]);
    const [showScatter, setShowScatter] = useState(false);
    const [framesPerSecond, setFramesPerSecond] = useState(300);
    const [xRange, setXRange] = useState(framesPerSecond);


    const toggleGraph = () => {
        setShowScatter(!showScatter);
    };
    useEffect(() => {
        async function fetchRunners() {
            try {
                const res = await fetch('/api/runners');
                const newRunners = await res.json();

                if (Array.isArray(newRunners)) {
                    setRunners(newRunners);
                    const cadences = newRunners.map(runner => runner.cadence).flat();
                    const verticals = newRunners.map(runner => runner.vo).flat();
                    setVerticalArray(verticals);
                    setCadenceArray(cadences);
                } else {
                    console.error("Fetched data is not an array:", newRunners);
                }
            } catch (error) {
                console.error("Error fetching runners:", error);
            }
        }
        fetchRunners();
    }, []);

    // function secondsToTimeFormat(seconds) {
    //     const minutes = Math.floor(seconds / 60);
    //     const secs = Math.floor(seconds) - (minutes * 60);
    //     const millis = Math.round((seconds - Math.floor(seconds)) * 1000);

    //     return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
    // }

    function secondsToTimeFormat(seconds, addSeconds = 0) {
        const minutes = Math.floor((seconds + addSeconds) / minute);
        const secs = Math.round((seconds + addSeconds) - (minutes * minute));

        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }



    function framesToSeconds(data) {
        let maps = [];
        data.forEach(point => {
            let x = point.x;
            let t = Math.floor(x / framesPerSecond);  // 30 frames per second (30 * 60 = 1800) so 1800 frames = 1 minute
            if (!(t in maps)) {
                maps.push({ x: t, y: [] });
            }
            maps[t].y.push(point.y);
        });

        maps = maps.map(point => {
            let sum = point.y.reduce((a, b) => a + b, 0);
            let avg = sum / point.y.length;
            return { x: point.x, y: avg };
        });
        return maps;
    }

    function createXYDictionary(data) {
        const x_y_dict = {};

        data.forEach(entry => {
            x_y_dict[entry.x] = entry.y;
        });

        return x_y_dict;
    }


    let scatterDataPoints = Object.entries(verticalArray[0] || {}).map(([x, y]) => ({ x: parseInt(x), y }));
    console.log('scatterDataPoints before', scatterDataPoints);
    let scatterDataPointsMin = framesToSeconds(scatterDataPoints);
    console.log('scatterDataPoints after', scatterDataPoints);
    console.log('ssssss', scatterDataPoints);


    for (let n in scatterDataPoints) {
        let seconds = (scatterDataPoints[n].x * second) / frames;
        scatterDataPoints[n].x = secondsToTimeFormat(seconds);
    }
    console.log('indices', scatterDataPoints);


    let current_key = 0;
    const c = {};
    const CADENCE_BOUNDARY = 153;
    cadenceArray.map((innerArray) => {
        for (let k in innerArray) {
            if ((parseInt(k) % minute) === 0) {
                current_key += 1;
                let c_key = String(current_key);
                c[c_key] = (innerArray[k] * 2);
            } else {
                c[String(current_key)] += (innerArray[k] * 2);
            }
        }
    });

    console.log('c', c);
    let colors = [];
    for (let k in c) {
        if (c[k] > CADENCE_BOUNDARY) {
            colors.push('rgba(0, 255, 8, 0.8)');
        } else {
            colors.push('rgba(255, 0, 0, 0.7)');
        }
    }


    const c1 = createXYDictionary(scatterDataPointsMin);
    let c1_colors = [];
    for (let k in c1) {
        if (c1[k] >= 5 && c1[k] <= 10) {
            c1_colors.push('rgba(0, 255, 8, 0.8)');
        } else {
            c1_colors.push('rgba(255, 0, 0, 0.7)');
        }
    }

    const validValues = [30, 150, 300, 600, 900, 1800];
    const displayValues = ['1', '5', '10', '20', '30', '1m'];


    const handleSliderChange = (e) => {
        const index = e.target.value - 1;
        const selectedValue = validValues[index];
        setFramesPerSecond(selectedValue);
        setXRange(selectedValue);
    };
    return (
        <Sidebar>
            <Head>
                <title>Dashboard</title>
            </Head>
            <main className=''>
                <RecentData />
                <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
                    <div className="w-full bg-gray-50 md:col-span-2 relative m-auto rounded-lg p-6 h-[50vh] lg:h-[70vh] overflow-hidden">
                        <BarChart colors={colors} cadenceArray={c} title='Cadence' labels={{ 'x': 'time (min)', 'y': 'Steps' }} />
                    </div>
                    <div className="w-full bg-gray-50 md:col-span-2 relative m-auto rounded-lg p-6 h-[50vh] lg:h-[70vh] overflow-hidden">
                        <button
                            onClick={toggleGraph}
                            className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1 border-2 border-red-500 rounded z-10 transition duration-200"
                        >
                            {showScatter ? "BarChart" : "Scatter"}
                        </button>
                        {!showScatter && (
                            <div className="absolute top-16 right-4 z-20">
                                <label htmlFor="framesPerSecond" className="block text-sm font-medium text-gray-700 mb-2">
                                    {framesPerSecond === 1800 ? "time(minutes: 1)" : `time(seconds: ${framesPerSecond / 30})`}
                                </label>

                                <div className="relative">
                                    <input
                                        type="range"
                                        id="framesPerSecond"
                                        name="framesPerSecond"
                                        min="1"
                                        max={validValues.length}
                                        value={validValues.indexOf(framesPerSecond) + 1}
                                        className={styles.slider}
                                        onChange={handleSliderChange}
                                    />
                                </div>
                            </div>
                        )}
                        {showScatter ? (
                            scatterDataPoints.length > 0 ?
                                <ScatterGraph data={scatterDataPoints} title="Vertical Displacement" labels={{ x: "time", y: "Vertical Displacement (cm)" }} />
                                :
                                <div className="flex justify-center items-center h-full text-lg font-semibold">Loading graph...</div>
                        ) : (
                            <BarChart
                                colors={c1_colors}
                                cadenceArray={c1}
                                title='Vertical Displacement'
                                labels={{ 'x': 'time', 'y': 'Steps' }} />
                        )}
                    </div>
                </div>
            </main>
        </Sidebar>
    );



}








