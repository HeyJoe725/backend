import Head from 'next/head'
import Layout from '../components/layout'

export default function Dashboard() {
    return (
        <Layout>
            <Head>
                <title>Dashboard</title>
            </Head>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Replace with your content */}
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </Layout>
    )
}

