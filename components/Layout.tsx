import React from 'react';
import Head from 'next/head';
import Header from 'components/header';
import { Container } from 'react-bootstrap';
import { isMobile, isIE, isEdge, isLegacyEdge } from 'react-device-detect';
import UnsupportedDevice from 'components/landing-unsupported/UnsupportedDevice';
import UnsupportedBrowser from 'components/landing-unsupported/UnsupportedBrowser';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
};

export default function Layout({ children, className, fluid }: LayoutProps) {
  if (isMobile) {
    return <UnsupportedDevice />;
  } else if (isIE || isEdge || isLegacyEdge) {
    return <UnsupportedBrowser />;
  } else {
    return (
      <>
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
          <meta name="viewport" content="width=1600" />

          {/* Only load Pyodide if in browser and haven't been loaded yet */}
          {typeof window !== 'undefined' &&
            !(window as any).pythonLanguagePluginLoaded && (
              <script src="/scripts/pyodide.full.0.15.0.js" />
            )}
        </Head>

        <Header />

        {fluid ? (
          <main className={className}>{children}</main>
        ) : (
          <main className={className}>
            <Container>{children}</Container>
          </main>
        )}
      </>
    );
  }
}
