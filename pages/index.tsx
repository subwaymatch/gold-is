import Head from 'next/head';
import styles from './Home.module.scss';
import Link from 'next/link';
import Layout from 'components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Gold.is</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}></main>
      </div>
    </Layout>
  );
}
