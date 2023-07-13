import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Card from '../components/card.component';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sjdfbnxfumfzrtnlovns.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqZGZibnhmdW1menJ0bmxvdm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4NTM1NDEsImV4cCI6MjAwNDQyOTU0MX0.ID_R00L0lGWWcmW0zxtp0u3Ww46364W9MeJXVNoNIhE'
const supabase = createClient(supabaseUrl, supabaseKey)

async function getPeople() {
  let { data: Runner, error } = await supabase
    .from('User')
    .select('*')
  return Runner
}



export async function getStaticProps() {
  const data = await getPeople()
  const allPostsData = data
  return {
    props: {
      allPostsData,
    },
  };
}




function Header({ title }) {
  return <>
    {/* <Script
      src="https://connect.facebook.net/en_US/sdk.js"
      strategy="lazyOnload"
      onLoad={() => {
        console.log('FB SDK loaded');
      }
      }
    /> */}
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>I am Joe and I am trying to learn Next.js ;)</p>
    </section>
    <h1>{title ? title : 'Default title'}</h1>
  </>;
}

export default function HomePage({ allPostsData }) {

  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }
  return (
    <Layout home>
      <Head><title>First Thingy</title></Head>
      <Header title="My way to sky🚀" />
      <Card people={allPostsData} />
      <button type='button' className="rounded-full px-6 py-3 bg-gradient-to-r from-gray-400 to-blue-500 hover:from-black-500 hover:to-gray-500" onClick={handleClick}>Like ({likes})</button>

      <dic>{console.log(allPostsData)}</dic>
    </Layout>
  );
}
