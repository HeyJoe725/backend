import Link from 'next/link';
import Layout from '../../components/layout';

export default function Next() {
    const links = {
        'Nextui': 'https://nextui.org/',
        'Next.js API Routes': 'https://nextjs.org/docs/pages/building-your-application/routing/api-routes',
        'Next.js API Routes Tutorial': 'https://nextjs.org/learn/basics/api-routes',
        'Next.js API Routes Deployment': 'https://nextjs.org/docs/deployment#api-routes',
        'AWS': 'https://vercel.com/templates/next.js/aws-s3-image-upload-nextjs',

    }

    return (
        <Layout>
            <h1>Next.js</h1>

            {Object.keys(links).map((name) => (
                <Link href={links[name]}>
                    <li key={`${name}nextjs`}>{name}</li>
                </Link>
            ))}

        </Layout>
    );
}