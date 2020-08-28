import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import pyodideManager from 'lib/pyodide/manager';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';

const steps = ['Load File', 'Transform', 'Analyze'];

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

    const summary = {
      numColumns: 0,
      numRows: 0,
      numMissingCells: 0,
    };

    summary.numRows = df.shape[0];
    summary.numColumns = df.shape[1];

    console.log('summary');
    console.log(summary);
  };

  return (
    <Layout>
      <StepsDisplay steps={steps} currentIndex={0} />

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
