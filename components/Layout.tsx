import Head from 'next/head';
import Header from 'components/header';

type LayoutProps = { children: React.ReactNode; fluid?: boolean };

export default function Layout({ children, fluid }: LayoutProps) {
  return (
    <div className="wrapper">
      <Head>
        <title>Gold.is</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {fluid ? (
        children
      ) : (
        <main>
          <div className="container">{children}</div>
        </main>
      )}
    </div>
  );
}
