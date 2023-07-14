
import Image from 'next/image'

const getDogData = async () => {
    const data = await fetch('https://dog.ceo/api/breeds/image/random')
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

    return <div>

        <Image src={data.message} alt="dog" width={500} height={500} />
    </div>
}