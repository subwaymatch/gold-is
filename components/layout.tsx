import Head from 'next/head';

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="wrapper">
      <Head>
        <title>Gold.is</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
