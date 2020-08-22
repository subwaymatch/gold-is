import Head from 'next/head';
import Header from 'components/header';

type LayoutProps = { children: React.ReactNode; fluid?: boolean };

export default function Layout({ children, fluid }: LayoutProps) {
  return (
    <div className="wrapper">
      <Head>
        <title>Gold.is</title>
        <link rel="icon" href="/favicon.ico" />

        <script src="https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js"></script>
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
