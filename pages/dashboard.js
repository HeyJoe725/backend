import Head from 'next/head'
import Layout from '../components/layout'
import Sidebar from '../components/dashboard/sidebar.component'
import TopCard from '../components/dashboard/topbar.component'
import BarChart from '../components/dashboard/barchart.component'
import RecentData from '../components/dashboard/recentdata.component'

export default function Dashboard() {
    return (
        <Sidebar >
            {/* <Layout> */}
            <Head>
                <title>Dashboard</title>
            </Head>
            <main className=''>
                <TopCard />

                <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
                    <BarChart />
                    <BarChart />
                    <RecentData />

                </div>

                {/* <Sidebar /> */}

            </main>
            {/* </Layout> */}
        </Sidebar>
    )
}

