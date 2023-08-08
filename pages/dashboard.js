import Head from 'next/head'
import Layout from '../components/layout'
import Sidebar from '../components/dashboard/sidebar.component'
import TopCard from '../components/dashboard/topbar.component'
import BarChart from '../components/dashboard/barchart.component'
import RecentData from '../components/dashboard/recentdata.component'
import { useState, useEffect } from 'react';
import LineGraph from '../components/dashboard/linegraph.component';

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

    const graphData = {
        labels: Array.from({ length: verticalArray.length }, (_, i) => i + 1),
        values: verticalArray
    };

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
                    <BarChart cadenceArray={cadenceArray[0]} title='Cadence' labels={{ 'x': 'time (s)', 'y': 'Steps' }} />
                    {/* <BarChart cadenceArray={cadenceArray[0]} title='Cadence' labels={{ 'x': 'time (s)', 'y': 'Steps' }} /> */}
                    <LineGraph data={graphData} title="Monthly Sales" labels={{ x: "Month", y: "Vertical Displacement" }} />
                </div>

                {/* <Sidebar /> */}

            </main>
            {/* </Layout> */}
        </Sidebar>
    )
}

