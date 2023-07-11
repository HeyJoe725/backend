import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/layout'
// import Layout from '../../app/layout'


export default function FirstPost() {
    return <Layout>
        <h1>First Post</h1>
        <h2> <Link href="/">Back to home</Link> </h2>
        <Image src="/images/me.png" alt="Joe" width="200" height="200" />
    </Layout>
}
