import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useStore } from 'store';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import generateSummaryCode from 'python/generate-summary.py';

declare let pyodide: any;

const dfSelector = (state) => state.dataFrame;

export default function TransformPage() {
  const [dfHtml, setDfHtml] = useState('');
  const [summary, setSummary] = useState<any>(null);
  const pyodideManager = useStore((state) => state.pyodideManager);
  const df = useStore(dfSelector);
  const router = useRouter();

  useEffect(() => {
    if (!df) {
      router.push('/load');
      return;
    }

    (async () => {
      const codeResult = await pyodideManager.runCode(generateSummaryCode);

      console.log(codeResult);

      setSummary(codeResult.output);
    })();

    setDfHtml(df.head().to_html());
  }, []);

  return (
    <Layout>
      <StepsDisplay currentIndex={1} />

      <Row>
        <Col>
          <p>
            If you see any columns you don't want on your result set, please
            drop them here.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>First 10 Rows</h2>
          <div dangerouslySetInnerHTML={{ __html: dfHtml }} />
        </Col>
      </Row>
      <Row>
        <Col>
          {summary && (
            <>
              <h2>Overview</h2># Columns: {summary.numColumns}
              <br /># Rows: {summary.numRows}
              <br /># Missing Cells: {summary.numMissingCells}
              <br /># Missing Cells Percentage: {summary.missingCellsPercentage}
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
}
