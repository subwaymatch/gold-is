import type { AppProps } from 'next/app';
import { IconContext } from 'react-icons';

import 'styles/globals.scss';

// Toastify default & custom styles
import 'react-toastify/dist/ReactToastify.css';
import 'styles/toastify.custom.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IconContext.Provider
      value={{
        className: 'react-icon',
      }}
    >
      <Component {...pageProps} />
    </IconContext.Provider>
  );
}

export default MyApp;
