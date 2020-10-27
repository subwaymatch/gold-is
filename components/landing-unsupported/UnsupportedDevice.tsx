import Head from 'next/head';
import LogoImage from 'images/gold-logo-02@2x.png';

export default function UnsupportedDevice() {
  return (
    <>
      <Head>
        <title>Gold.is - Unsupported Device</title>
      </Head>

      <div
        style={{
          padding: '3rem',
          fontSize: '1.8rem',
          lineHeight: '1.6',
        }}
      >
        <img src={LogoImage} alt="Gold.is Logo" />
        <p style={{ marginTop: '1rem' }}>
          Gold.is is not supported on a mobile device.
        </p>
      </div>
    </>
  );
}
