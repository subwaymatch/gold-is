import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import generateSummaryCode from 'python/generate-summary.py';
import styles from './transform.module.scss';
import classNames from 'classnames/bind';
import DipslayItem from 'components/data-summary/display-item';

const cx = classNames.bind(styles);

const dfSelector = (state) => state.dataFrame;

export default function TransformPage() {
  const [dfHtml, setDfHtml] = useState('');
  const [summary, setSummary] = useState<any>(null);
  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const df = usePyodideStore(dfSelector);
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

    setDfHtml(df.head(10).to_html());
  }, []);

  return (
    <Layout fluid>
      <StepsDisplay currentIndex={1} />

      <div className={cx('fluidWrapper')}>
        <Container>
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
            <Col md={6}>
              {summary && (
                <>
                  <DipslayItem label="Number of Rows" value={summary.numRows} />
                  <DipslayItem
                    label="Number of Columns"
                    value={summary.numCols}
                  />
                  <DipslayItem
                    label="Missing Cells"
                    value={summary.numMissingCells}
                  />
                  <DipslayItem
                    label="Missing Cells (%)"
                    value={
                      (summary.missingCellsPercentage * 100).toFixed(2) + '%'
                    }
                  />
                  <DipslayItem
                    label="Duplicate Rows"
                    value={summary.numDuplicateRows}
                  />
                  <DipslayItem
                    label="Duplicate Rows (%)"
                    value={
                      (summary.duplicateRowsPercentage * 100).toFixed(2) + '%'
                    }
                  />
                  <DipslayItem
                    label="Memory Usage"
                    value={(summary.memoryUsage / 1000).toFixed(2) + ' KB'}
                  />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
