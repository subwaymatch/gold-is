import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import pyodideManager from 'lib/pyodide/manager';
import styles from './load-source.module.scss';
import LoadingOverlay from 'components/loading-overlay';

declare let pyodide: any;

const cx = classNames.bind(styles);

export default function LoadSource() {
  const router = useRouter();

  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [csvUrl, setCsvUrl] = useState(
    'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
  );
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    pyodideManager.loadPyodide().then(async () => {
      setIsPyodideReady(true);
    });
  }, []);

  const loadCsvFromUrl = async () => {
    setIsWaiting(true);

    setTimeout(async () => {
      await pyodideManager.loadCsvFromUrl(csvUrl);

      const df = pyodide.pyimport('df');

      (window as any).df = df;

      console.log(df);

      router.push('/transform');
    }, 100);
  };

  return isWaiting ? (
    <LoadingOverlay />
  ) : (
    <>
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
            disabled={!isPyodideReady}
            onClick={loadCsvFromUrl}
          >
            Start Digging →
          </button>
        </Col>
      </Row>
    </>
  );
}
