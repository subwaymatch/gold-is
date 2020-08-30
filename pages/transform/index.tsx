import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import generateOverviewCode from 'python/generate-overview.py';
import generateColumnsSummary from 'python/generate-columns-summary.py';
import styles from './transform.module.scss';
import classNames from 'classnames/bind';
import DipslayItem from 'components/data-summary/display-item';
import ColumnSummary from 'components/data-summary/column-summary';

const cx = classNames.bind(styles);

const dfSelector = (state) => state.dataFrame;

export default function TransformPage() {
  const [dfHtml, setDfHtml] = useState('');
  const [overview, setOverview] = useState<any>(null);
  const [columnsSummary, setColumnsSummary] = useState(null);
  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const df = usePyodideStore(dfSelector);
  const router = useRouter();

  useEffect(() => {
    if (!df) {
      router.push('/load');
      return;
    }

    (async () => {
      const overviewCodeResult = await pyodideManager.runCode(
        generateOverviewCode
      );

      console.log(overviewCodeResult);

      setOverview(overviewCodeResult.output);

      const columnsSummaryCodeResult = await pyodideManager.runCode(
        generateColumnsSummary
      );

      setColumnsSummary(columnsSummaryCodeResult.output.to_dict());

      console.log(columnsSummaryCodeResult);
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
              {overview && (
                <>
                  <DipslayItem
                    label="Number of Rows"
                    value={overview.numRows}
                  />
                  <DipslayItem
                    label="Number of Columns"
                    value={overview.numCols}
                  />
                  <DipslayItem
                    label="Missing Cells"
                    value={overview.numMissingCells}
                  />
                  <DipslayItem
                    label="Missing Cells (%)"
                    value={
                      (overview.missingCellsPercentage * 100).toFixed(2) + '%'
                    }
                  />
                  <DipslayItem
                    label="Duplicate Rows"
                    value={overview.numDuplicateRows}
                  />
                  <DipslayItem
                    label="Duplicate Rows (%)"
                    value={
                      (overview.duplicateRowsPercentage * 100).toFixed(2) + '%'
                    }
                  />
                  <DipslayItem
                    label="Memory Usage"
                    value={(overview.memoryUsage / 1024).toFixed(2) + ' KB'}
                  />
                </>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              <h2>Columns Information</h2>
            </Col>
          </Row>

          {columnsSummary &&
            Object.keys(columnsSummary).map((columnName) => {
              const columnSummary = columnsSummary[columnName];

              return (
                <ColumnSummary
                  columnName={columnName}
                  key={columnName}
                  summary={columnSummary}
                />
              );
            })}
        </Container>
      </div>
    </Layout>
  );
}
