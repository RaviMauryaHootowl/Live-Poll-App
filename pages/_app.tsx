import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
  <div>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap" rel="stylesheet"/>
      </Head>
      <Component {...pageProps} />
    </div>
  ); 
  
  
}

export default MyApp
