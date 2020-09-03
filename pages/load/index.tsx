import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import { Row, Col, Container } from 'react-bootstrap';
import Layout from 'components/Layout';
import LoadingOverlay from 'components/loading-overlay';
import StepsDisplay from 'components/steps-display';
import PyodideManager from 'lib/pyodide/manager';
import styles from './load-page.module.scss';
import usePyodideStore from 'stores/pyodide';
import FullButton from 'components/common/full-button';

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

              <FullButton
                label="Start Digging →"
                disabled={!pyodideManager || !csvUrl}
                onClick={() => {
                  // Normally, you would directly call a function to start loading the data
                  // However, the main UI will freeze and loading screen won't be displayed without using this wierd workaround where the loading component is first rendered, and then data starts to load
                  setIsWaiting(true);
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
