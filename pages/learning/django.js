import Link from 'next/link';
import Layout from '../../components/layout';

export default function Django() {
    const links = {
        'Python Backend Web Development Course (with Django)': 'https://www.youtube.com/watch?v=jBzwzrDvZ18',
        'How To Build a To-Do application Using Django and React': 'https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react',
        'Python Backend Web Development Course (with Django)': 'https://www.youtube.com/watch?v=jBzwzrDvZ18',
        'Deploy a Django web app to a Render live server with PostgreSQL': 'https://www.youtube.com/watch?v=AgTr5mw4zdI',
        'Deploy a Django web app to Vercel [FREE]': 'https://www.youtube.com/watch?v=ZjVzHcXCeMU',
        'How to Host Your Django App for Free on Vercel': 'https://www.makeuseof.com/django-app-vercel-host-free/',

    }

    return (
        <Layout>
            <h1>Django</h1>

            {Object.keys(links).map((name) => (
                <Link href={links[name]}>
                    <li key={`${name} django`}>{name}</li>
                </Link>
            ))}
        </Layout>


    );
}
