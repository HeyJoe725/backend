import Link from 'next/link';
import Layout from '../../components/layout';

export default function Databases() {
    const links = {
        'Raiway Postgres': 'https://railway.app/project/a58ee4e6-9f2d-49bf-a75a-07c2df50d203/plugin/da84090b-36e9-4d11-85cc-05cf7b85a714/Connect',
        'Supabase': 'https://supabase.com/dashboard/project/sjdfbnxfumfzrtnlovns/api?resource=Runner',
        'Prisma': 'https://www.prisma.io/docs/getting-started/quickstart',
        'Vercel My Projects': 'https://vercel.com/heyjoe725/nextbackend/stores',
        'My Vercel API': 'https://nextbackend-taupe.vercel.app/api/hello',

    }

    return (
        <Layout>
            <h1>Databases</h1>

            {Object.keys(links).map((name) => (
                <Link href={links[name]}>
                    <li key={`${name}database`}>{name}</li>
                </Link>
            ))}

        </Layout>
    );
}

