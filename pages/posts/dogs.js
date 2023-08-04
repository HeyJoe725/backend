
import Image from 'next/image'
import Layout from '../../components/layout'
import useSWR from 'swr'


const fetcher = (...args) => fetch(...args).then(res => res.json())
const getDogData = async () => {
    const data = await fetch('https://dog.ceo/api/breeds/image/random',
        {
            next: {
                revalidate: 5,
            }
        })
    const json = await data.json()
    return json
}

export async function getStaticProps(params) {
    const data = await getDogData()
    return {
        props: {
            data
        }
    }

}

// export default function Posts({ data }) {
export default function Posts() {
    // const { data: dogData, error } = useSWR('https://dog.ceo/api/breeds/image/random', fetcher, { refreshInterval: 5000 })
    const { data: dogData, error } = useSWR('https://dog.ceo/api/breeds/image/random', fetcher)
    if (!dogData) return <div>loading...</div>

    return (
        <Layout>
            <div>
                <Image className='w-1/2 h-1/2' src={dogData.message} alt="dog" width={500} height={500} />
            </div>
        </Layout>
    );
}