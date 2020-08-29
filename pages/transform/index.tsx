import TransformOptions from 'components/transform-options';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import pyodideManager from 'lib/pyodide/manager';
import { useStore } from 'store';
import Layout from 'components/Layout';
import steps from 'constants/steps';
import StepsDisplay from 'components/steps-display';

declare let pyodide: any;

const dfSelector = (state) => state.dataFrame;

export default function TransformPage() {
  const [dfHtml, setDfHtml] = useState('');
  const [summary, setSummary] = useState<any>(null);
  const df = useStore(dfSelector);
  const router = useRouter();

  useEffect(() => {
    if (!df) {
      router.push('/load');
      return;
    }

    setDfHtml(df.head().to_html());

    const summary = {
      numColumns: 0,
      numRows: 0,
      numMissingCells: 0,
      missingCellsPercentage: 0,
    };

    summary.numRows = df.shape[0];
    summary.numColumns = df.shape[1];
    summary.numMissingCells = df
      .isna()
      .sum()
      .reduce((a, b) => a + b);
    summary.missingCellsPercentage =
      summary.numMissingCells / (summary.numColumns * summary.numRows);

    console.log(summary);
    setSummary(summary);

    (window as any).df = df;
  }, []);

  return (
    <Layout>
      <StepsDisplay steps={steps} currentIndex={1} />

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
