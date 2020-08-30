import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import { Row, Col } from 'react-bootstrap';
import Layout from 'components/Layout';
import LoadingOverlay from 'components/loading-overlay';
import StepsDisplay from 'components/steps-display';
import PyodideManager from 'lib/pyodide/manager';
import styles from './load-page.module.scss';
import usePyodideStore from 'stores/pyodide';

declare let pyodide: any;

const cx = classNames.bind(styles);

export default function LoadPage() {
  const router = useRouter();
  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const setDataFrame = usePyodideStore((state) => state.setDataFrame);
  const setSourceUrl = usePyodideStore((state) => state.setSourceUrl);
  const setPyodideManager = usePyodideStore((state) => state.setPyodideManager);

  useEffect(() => {
    console.log(`LoadPage.useEffect() -> pyodideManager`);
    console.log(pyodideManager);

    // Setting pyodide manager
    if (!pyodideManager) {
      let newManager = new PyodideManager();

      console.log('Setting new pyodideManager');
      setPyodideManager(newManager);

      (window as any).pyodideManager = newManager;
    }
  }, []);

  const [csvUrl, setCsvUrl] = useState(
    'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
  );
  const [isWaiting, setIsWaiting] = useState(false);

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
      console.log('Errow while using pyimport');
      console.error(ex);
    }

    (window as any).router = router;

    router.push('/transform');
  };

  return isWaiting ? (
    <LoadingOverlay callback={loadCsvFromUrl} />
  ) : (
    <Layout>
      <StepsDisplay currentIndex={0} />

      <Row className={styles.loadSourceComponent}>
        <Col>
          <input
            type="text"
            className={cx('urlInput')}
            onChange={(e) => setCsvUrl(e.target.value)}
            value={csvUrl}
          />

          <div className={styles.dropBox}>Select or Drag your file here</div>

          <button
            className={cx('nextButton')}
            disabled={!pyodideManager}
            onClick={() => {
              setIsWaiting(true);
            }}
          >
            Start Digging →
          </button>
        </Col>
      </Row>
    </Layout>
  );
}
