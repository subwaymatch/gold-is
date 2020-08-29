import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import { Row, Col } from 'react-bootstrap';
import Layout from 'components/Layout';
import LoadingOverlay from 'components/loading-overlay';
import StepsDisplay from 'components/steps-display';
import pyodideManager from 'lib/pyodide/manager';
import styles from './load-page.module.scss';
import { useStore } from 'store';

declare let pyodide: any;

const cx = classNames.bind(styles);

export default function LoadPage() {
  const router = useRouter();
  const setDataFrame = useStore((state) => state.setDataFrame);
  const setSourceUrl = useStore((state) => state.setSourceUrl);

  const [csvUrl, setCsvUrl] = useState(
    'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
  );
  const [isWaiting, setIsWaiting] = useState(false);

  const loadCsvFromUrl = async () => {
    await pyodideManager.loadCsvFromUrl(csvUrl);

    setSourceUrl(csvUrl);

    const df = pyodide.pyimport('df');

    setDataFrame(df);

    // TODO: Remove code in production
    // For debugging purposes only
    (window as any).df = df;

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
