import Head from 'next/head'
import Layout from '../components/layout'
import Sidebar from '../components/dashboard/sidebar.component'
import TopCard from '../components/dashboard/topbar.component'
import BarChart from '../components/dashboard/barchart.component'
import RecentData from '../components/dashboard/recentdata.component'
import { useState, useEffect } from 'react';
import ScatterGraph from '../components/dashboard/scatterchart.component'
import Runner from '../components/runner'

export default function Dashboard() {
    const [runners, setRunners] = useState([]);
    const [cadenceArray, setCadenceArray] = useState([]);
    const [verticalArray, setVerticalArray] = useState([]);

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

    function secondsToTimeFormat(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.round(seconds - (minutes * 60));

        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    let scatterDataPoints = Object.entries(verticalArray[0] || {}).map(([x, y]) => ({ x: parseFloat(x), y }));

    let second = 1;
    let frames = 30;
    for (let n in scatterDataPoints) {
        // console.log(scatterDataPoints[n].x);
        let seconds = (scatterDataPoints[n].x * second) / frames;
        scatterDataPoints[n].x = secondsToTimeFormat(seconds);
    }

    console.log(scatterDataPoints);
    let current_key = 0;
    const c = {};
    const CADENCE_BOUNDARY = 153;
    const minutes = cadenceArray.map((innerArray) => {
        for (let k in innerArray) {
            if ((parseInt(k) % 30) === 0) {
                current_key += 1;
                let c_key = String(current_key);
                c[c_key] = (innerArray[k] * 2);
            } else {
                c[String(current_key)] += (innerArray[k] * 2);
            }
        }
    });

    let colors = [];
    for (let k in c) {
        if (c[k] > CADENCE_BOUNDARY) {
            colors.push('rgba(0, 255, 8, 0.8)');
        } else {
            colors.push('rgba(255, 0, 0, 0.7)');
        }
    }

    return (
        <Sidebar>
            <Head>
                <title>Dashboard</title>
            </Head>
            <main className=''>
                <RecentData />
                <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
                    <BarChart colors={colors} cadenceArray={c} title='Cadence' labels={{ 'x': 'time (min)', 'y': 'Steps' }} />
                    {
                        scatterDataPoints.length > 0 ?
                            <ScatterGraph data={scatterDataPoints} title="Vertical Displacement" labels={{ x: "time", y: "Vertical Displacement (cm)" }} />
                            :
                            <div>Loading graph...</div>
                    }
                </div>
            </main>
        </Sidebar>
    )
}
