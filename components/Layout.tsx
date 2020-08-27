import Head from 'next/head';
import Header from 'components/header';

type LayoutProps = { children: React.ReactNode; fluid?: boolean };

export default function Layout({ children, fluid }: LayoutProps) {
  return (
    <div className="wrapper">
      <Head>
        <title>Gold.is</title>
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#eeeeee" />
        <meta name="theme-color" content="#ffffff" />

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
