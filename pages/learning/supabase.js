import Layout from "../../components/layout";
import Link from 'next/link';

export default function Supabase() {
    const links = {
        'Supabase Docs': 'https://www.youtube.com/watch?v=VjohMDwjty4&list=RDCMUCW5YeuERMmlnqo4oq8vwUpg&start_radio=1&rv=VjohMDwjty4&t=278',
        'Supabase Crash Course': 'https://www.youtube.com/watch?v=7uKQBl9uZ00',
        'Supabase Domains': 'https://supabase.com/docs/guides/platform/custom-domains',
    }

    return (
        <Layout>
            <h1>Supabase</h1>

            {Object.keys(links).map((name) => (
                <Link href={links[name]}>
                    <li key={`${name} supabase`}>{name}</li>
                </Link>
            ))}

        </Layout>
    );
}