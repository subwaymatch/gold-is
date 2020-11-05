import Head from 'next/head';
import LogoImage from 'images/gold-logo-02@2x.png';

export default function UnsupportedBrowser() {
  return (
    <>
      <Head>
        <title>Gold.is - Unsupported Browser</title>
      </Head>

      <div
        style={{
          padding: '3rem',
          fontSize: '1.8rem',
          lineHeight: '1.6',
        }}
      >
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          <img src={LogoImage} width="600" alt="Gold.is Logo" />
          <br />
          <br />
          Gold.is is not supported on this browser.
        </p>
      </div>
    </>
  );
}
