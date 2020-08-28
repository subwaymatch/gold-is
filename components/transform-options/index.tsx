import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import pyodideManager from 'lib/pyodide/manager';
import { useStore } from 'store';

declare let pyodide: any;

export default function TransformOptions() {
  const [dfHtml, setDfHtml] = useState('');
  const [summary, setSummary] = useState<any>({});

  useEffect(() => {
    const df = pyodide.pyimport('df');

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
    <>
      <Row>
        <Col>
          <div dangerouslySetInnerHTML={{ __html: dfHtml }} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Summary</h2># Columns: {summary.numColumns}
          <br /># Rows: {summary.numRows}
          <br /># Missing Cells: {summary.numMissingCells}
          <br /># Missing Cells Percentage: {summary.missingCellsPercentage}
        </Col>
      </Row>
    </>
  );
}
