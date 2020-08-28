import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import pyodideManager from 'lib/pyodide/manager';
import styles from './load-source.module.scss';

const cx = classNames.bind(styles);

declare let pyodide: any;

export default function LoadSource() {
  const [csvUrl, setCsvUrl] = useState(
    'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
  );
  const [dfHtml, setDfHtml] = useState('');

  const [isPyodideReady, setIsPyodideReady] = useState(false);

  useEffect(() => {
    pyodideManager.loadPyodide().then(() => {
      setIsPyodideReady(true);
    });
  }, []);

  const loadCsv = async () => {
    await pyodideManager.loadCsvFromUrl(csvUrl);

    const df = pyodide.pyimport('df');

    setDfHtml(df.head().to_html());

    const summary = {
      numColumns: 0,
      numRows: 0,
      numMissingCells: 0,
    };

    summary.numRows = df.shape[0];
    summary.numColumns = df.shape[1];
  };

  return (
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
            onClick={loadCsv}
            disabled={!isPyodideReady}
          >
            Start Digging →
          </button>

          <div dangerouslySetInnerHTML={{ __html: dfHtml }} />
        </Col>
      </Row>
    </>
  );
}
