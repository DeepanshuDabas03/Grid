import "@/styles/globals.css";
import "@/styles/stylesfooter.css";
import "@/styles/product_info.css";
import Head from 'next/head'
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico/" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
