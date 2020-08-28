import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import pyodideManager from 'lib/pyodide/manager';
import qs from 'qs';

declare let pyodide: any;

export default function LoadPage() {
  const [csvString, setCsvString] = useState('');
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
  };

  return (
    <Layout>
      <Row>
        <Col>
          <input
            type="text"
            onChange={(e) => setCsvUrl(e.target.value)}
            value={csvUrl}
          />
          <button onClick={loadCsv} disabled={!isPyodideReady}>
            Load CSV
          </button>

          <div dangerouslySetInnerHTML={{ __html: dfHtml }} />
        </Col>
      </Row>
    </Layout>
  );
}
