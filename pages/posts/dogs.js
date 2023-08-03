
import Image from 'next/image'
import Layout from '../../components/layout'

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

export default function Posts({ data }) {
    return (
        <Layout>
            <div>
                <Image className='w-1/2 h-1/2' src={data.message} alt="dog" width={500} height={500} />
            </div>
        </Layout>
    );
}