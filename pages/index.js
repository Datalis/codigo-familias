import Head from 'next/head'
import Image from 'next/image';
import Infographics from '../components/Infographics';
import Header from '../components/Header';
import RelatedArticles from '../components/RelatedArticles';
import FrequentQuestions from '../components/FrequentQuestions';
import Media from '../components/Media';
import Footer from '../components/Footer';
import { fetchArticles, fetchRelatedPosts } from '../data/api';
import mainImage from '../public/images/main.png';
import { Fragment } from 'react';
import GuidedVisit from '../components/GuidedVisit';
import staticData from '../data/static.json';


export default function Index({ articles, keywords, relatedPosts, audios }) {
  return (
    <Fragment>
      <Head>

        {/* <!-- Primary Meta Tags --> */}
        <title>Nuevo código de Familias</title>
        <meta name="title" content="Nuevo código de Familias" />
        <meta name="description" content="Una plataforma para informar tu voto" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codigo-de-familias.netlify.app/" />
        <meta property="og:title" content="Nuevo código de Familias" />
        <meta property="og:description" content="Una plataforma para informar tu voto" />
        <meta property="og:image" content="/images/facebook.jpg" />

        {/*<!-- Twitter -->*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://codigo-de-familias.netlify.app/" />
        <meta property="twitter:title" content="Nuevo código de Familias" />
        <meta property="twitter:description" content="Una plataforma para informar tu voto" />
        <meta property="twitter:image" content="/images/twitter.jpg" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="msapplication-TileColor" content="#f8f4ef" />
        <meta name="theme-color" content="#f8f4ef" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f8f4ef" />

      </Head>
      <Header articles={articles} keywords={keywords} />
      <main className='main'>
        <div className='main__image'>
          <Image src={mainImage} alt=""></Image>
        </div>
        <div className='main__content'>
          <GuidedVisit articles={articles} />
          <Media audios={audios} />
          <Infographics />
          <RelatedArticles relatedPosts={relatedPosts} />
          <FrequentQuestions />
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const articles = await fetchArticles();
  //const articles = [];
  const relatedPosts = await fetchRelatedPosts();
  const { keywords, audios } = staticData;
  return {
    props: {
      articles,
      keywords,
      relatedPosts,
      audios
    }
  }
}