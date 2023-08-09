import Head from 'next/head'
import Layout from '../components/layout'
import Sidebar from '../components/dashboard/sidebar.component'
import TopCard from '../components/dashboard/topbar.component'
import BarChart from '../components/dashboard/barchart.component'
import RecentData from '../components/dashboard/recentdata.component'
import { useState, useEffect } from 'react';
// import LineGraph from '../components/dashboard/linegraph.component';
import ScatterGraph from '../components/dashboard/scatterchart.component'


export default function Dashboard() {
    const [runners, setRunners] = useState([]);
    const [cadenceArray, setCadenceArray] = useState([]);
    const [verticalArray, setVerticalArray] = useState([]);

    console.clear()

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
                    console.log("newRunners", cadences);
                } else {
                    console.error("Fetched data is not an array:", newRunners);
                }


            } catch (error) {
                console.error("Error fetching runners:", error);
            }
        }

        fetchRunners();
    }, []);

    const graphData = {
        labels: Array.from({ length: verticalArray.length }, (_, i) => i + 1),
        values: verticalArray
    };
    let ini = 0;
    let current_key = 0;
    const c = {}
    const CADENCE_BOUNDARY = 153;
    const minutes = cadenceArray.map((innerArray) => {
        if (ini === 0) {
            ini = 1;
        } else {
            for (let k in innerArray) {
                if ((parseInt(k) % 60) === 0) {
                    current_key += 1
                    let c_key = String(current_key)
                    c[c_key] = (innerArray[k] * 2)
                } else {
                    c[String(current_key)] += (innerArray[k] * 2)
                }

            }
        }
    });
    let colors = []
    for (let k in c) {
        if (c[k] > CADENCE_BOUNDARY) {
            colors.push('rgba(0, 255, 8, 0.8)')
        } else {
            colors.push('rgba(255, 0, 0, 0.7)')
        }
    }

    console.log('c', c)
    console.log('vertical', verticalArray)
    console.log('cadence', cadenceArray[1])
    return (
        <Sidebar >
            {/* <Layout> */}
            <Head>
                <title>Dashboard</title>
            </Head>
            <main className=''>
                <TopCard />
                <RecentData />

                <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
                    <BarChart colors={colors} cadenceArray={c} title='Cadence' labels={{ 'x': 'time (min)', 'y': 'Steps' }} />
                    {/* <LineGraph data={graphData} title="Monthly Sales" labels={{ x: "Month", y: "Vertical Displacement" }} /> */}
                    <ScatterGraph data={graphData} title="Vertical Displacement" labels={{ x: "time", y: "Vertical Displacement (cm)" }} />
                </div>

                {/* <Sidebar /> */}

            </main>
            {/* </Layout> */}
        </Sidebar>
    )
}

