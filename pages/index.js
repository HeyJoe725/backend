import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Card from '../components/card.component';

function Header({ title }) {
  return <>
    <Script
      src="https://connect.facebook.net/en_US/sdk.js"
      strategy="lazyOnload"
      onLoad={() => {
        console.log('FB SDK loaded');
      }
      }
    />
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>I amm Joe and I am trying to learn Next.js ;)</p>
    </section>
    <h1>{title ? title : 'Default title'}</h1>
  </>;
}

function HomePage() {

  const people = [
    {
      name: 'Write thesis',
      link: '',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Research papers',
      link: '/learning/research-papers',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Hobbies',
      link: '',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Learn Next.js',
      link: '/learning/nextjs',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Learn React',
      link: '/learning/react',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Learn Supabase',
      link: '/learning/supabase',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Learn ChatGPT API',
      link: '/learning/chatgpt',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Learn Django',
      link: '/learning/django',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Learn Supabase',
      link: '/learning/supabase',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'My DataBases',
      link: '/learning/databases',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
  ];

  const [likes, setLikes] = useState(0);



  function handleClick() {
    setLikes(likes + 1);
  }
  return (
    <Layout home>

      <Head><title>First Thingy</title></Head>
      <Header title="My way to sky🚀" />
      <Card people={people} />
      <button type='button' className="rounded-full px-6 py-3 bg-gradient-to-r from-gray-400 to-blue-500 hover:from-black-500 hover:to-gray-500" onClick={handleClick}>Like ({likes})</button>

    </Layout>
  );
}

export default HomePage;