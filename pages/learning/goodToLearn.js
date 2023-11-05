import Link from 'next/link';
import Layout from '../../components/layout';

export default function GoodToLearn() {
    const links = {
        'Animated Transitions': 'https://developer.chrome.com/docs/web-platform/view-transitions/',
    }

    return (
        <Layout>
            <h1>Good to Learn</h1>

            {Object.keys(links).map((name) => (
                <Link href={links[name]}>
                    <li key={`${name} learn`}>{name}</li>
                </Link>
            ))}
        </Layout>


    );
}
