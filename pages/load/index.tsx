import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { Row, Col, Container } from 'react-bootstrap';
import Layout from 'components/Layout';
import LoadingOverlay from 'components/loading-overlay';
import StepsDisplay from 'components/steps-display';
import PyodideManager from 'lib/pyodide/manager';
import styles from './load-page.module.scss';
import usePyodideStore from 'stores/pyodide';
import FullButton from 'components/common/full-button';
import { getCorsProxyUrl } from 'lib/utils';

declare let pyodide: any;

const cx = classNames.bind(styles);

export default function LoadPage() {
  const router = useRouter();

  const [csvUrl, setCsvUrl] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const setDataFrame = usePyodideStore((state) => state.setDataFrame);
  const sourceUrl = usePyodideStore((state) => state.sourceUrl);
  const setSourceUrl = usePyodideStore((state) => state.setSourceUrl);
  const setPyodideManager = usePyodideStore((state) => state.setPyodideManager);

  useEffect(() => {
    // Setting pyodide manager
    if (!pyodideManager) {
      let newManager = new PyodideManager();

      setPyodideManager(newManager);

      (window as any).pyodideManager = newManager;
    }

    setCsvUrl(
      router.query.hasOwnProperty('dataUrl')
        ? Array.isArray(router.query.dataUrl)
          ? router.query.dataUrl[0]
          : router.query.dataUrl
        : sourceUrl
    );
  }, []);

  const loadCsvFromUrlAsText = async (url) => {
    const corsProxyUrl = getCorsProxyUrl(url);

    fetch(corsProxyUrl)
      .then(async (response) => {
        const text = await response.text();

        console.log(`response.status=${response.status}`);

        if (response.status >= 400 && response.status < 600) {
          toast.error('Fetching the CSV file failed. ' + text);
        } else {
          (window as any).csv_string = text;
        }

        return text;
      })
      .catch((err) => {
        console.error(err);

        toast.error('Fetching the CSV file failed. ' + err.message);
      });
  };

  const loadCsvFromUrl = async () => {
    await pyodideManager.loadCsvFromUrl(csvUrl);

    setSourceUrl(csvUrl);

    let df;

    try {
      df = pyodide.pyimport('df');

      setDataFrame(df);

      // TODO: Remove code in production
      // For debugging purposes only
      (window as any).df = df;
    } catch (ex) {
      console.log('Errow while importing existing dataframe');
      console.error(ex);
    }

    (window as any).router = router;

    router.push('/select');
  };

  return isWaiting ? (
    <LoadingOverlay callback={loadCsvFromUrl} />
  ) : (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={0} />
      </Container>

      <div className={cx('fluidWrapper')}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Container>
          <Row className={styles.loadSourceComponent}>
            <Col>
              <label>URL to your CSV file</label>
              <input
                type="text"
                className={cx('urlInput')}
                onChange={(e) => setCsvUrl(e.target.value)}
                value={csvUrl}
              />

              <div className={styles.dropBoxWrapper}>
                <div className={styles.orDisplay}>
                  <span>OR</span>
                </div>

                <div className={styles.dropBox}>
                  Select or Drag your file here
                </div>
              </div>

              <div className={styles.proceedButtonWrapper}>
                <FullButton
                  label="Start Digging →"
                  disabled={!pyodideManager || !csvUrl}
                  onClick={async () => {
                    // Normally, you would directly call a function to start loading the data
                    // However, the main UI will freeze and loading screen won't be displayed without using this wierd workaround where the loading component is first rendered, and then data starts to load

                    await loadCsvFromUrlAsText(csvUrl);

                    setIsWaiting(true);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
