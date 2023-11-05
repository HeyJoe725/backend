import Head from 'next/head'
import Layout from '../../components/layout'
import Link from 'next/link'
import Image from 'next/image'


export default function React() {

    const links = {
        "React JS Full Course (20 HOUR All-in-One Tutorial for Beginners) - PART 1!": 'https://www.youtube.com/watch?v=x_x5LkW6IXs',
        "MUI Installation": "https://mui.com/material-ui/getting-started/installation/",
        'El futuro de la programacion': 'https://www.youtube.com/watch?v=ODv-VFRFGcY',
        'React Icons': 'https://react-icons.github.io/react-icons/search?q=task'
    }

    return (<Layout>
        <div>React</div>
        {Object.keys(links).map((name) => (
            <Link href={links[name]}>
                <li key={`${name} react`}>{name}</li>
            </Link>
        ))}
    </Layout>
    )
}
