import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import generateOverviewCode from 'python/generate-overview.py';
import generateColumnsSummary from 'python/generate-columns-summary.py';
import styles from './select-page.module.scss';
import classNames from 'classnames/bind';
import DipslayItem from 'components/data-summary/display-item';
import ColumnSummary from 'components/data-summary/column-summary';
import { toPercentage, toKiloBytes } from 'lib/utils';

const cx = classNames.bind(styles);

const dfSelector = (state) => state.dataFrame;

export default function SelectPage() {
  const [dfHtml, setDfHtml] = useState('');
  const [overview, setOverview] = useState<any>(null);
  const [columnsSummary, setColumnsSummary] = useState(null);
  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const df = usePyodideStore(dfSelector);
  const dropColumns = usePyodideStore((state) => state.dropColumns);
  const addDropColumn = usePyodideStore((state) => state.addDropColumn);
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
            <Col md={3}>Columns to drop</Col>

            <Col md={9}>{String(dropColumns)}</Col>
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
                    value={toPercentage(overview.missingCellsPercentage)}
                  />
                  <DipslayItem
                    label="Duplicate Rows"
                    value={overview.numDuplicateRows}
                  />
                  <DipslayItem
                    label="Duplicate Rows (%)"
                    value={toPercentage(overview.duplicateRowsPercentage)}
                  />
                  <DipslayItem
                    label="Memory Usage"
                    value={toKiloBytes(overview.memoryUsage)}
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
                <div key={columnName}>
                  <button
                    onClick={() => {
                      addDropColumn(columnName);
                    }}
                  >
                    Drop {columnName}
                  </button>
                  <ColumnSummary
                    columnName={columnName}
                    summary={columnSummary}
                  />
                </div>
              );
            })}
        </Container>
      </div>
    </Layout>
  );
}
