import Head from 'next/head';
import Header from 'components/header';

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="wrapper">
      <Head>
        <title>Gold.is</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
