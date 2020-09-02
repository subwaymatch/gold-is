import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import generateOverviewCode from 'python/generate-overview.py';
import generateColumnsSummary from 'python/generate-columns-summary.py';
import styles from './results-page.module.scss';
import classNames from 'classnames/bind';
import ColumnOverview from 'components/data-summary/column-overview';

const cx = classNames.bind(styles);

const dfSelector = (state) => state.dataFrame;

export default function SelectPage() {
  const [dfHtml, setDfHtml] = useState('');
  const [overview, setOverview] = useState<any>(null);
  const columnSummaries = usePyodideStore((state) => state.columnSummaries);
  const setColumnSummaries = usePyodideStore(
    (state) => state.setColumnSummaries
  );
  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const df = usePyodideStore(dfSelector);
  const router = useRouter();

  useEffect(() => {
    if (!df) {
      router.push('/load');
      return;
    } else {
      (async () => {
        const overviewCodeResult = await pyodideManager.runCode(
          generateOverviewCode
        );

        console.log(overviewCodeResult);

        setOverview(overviewCodeResult.output);

        const columnsSummaryCodeResult = await pyodideManager.runCode(
          generateColumnsSummary
        );

        setColumnSummaries(columnsSummaryCodeResult.output.to_dict());
      })();

      setDfHtml(df.head(10).to_html());
    }
  }, []);

  return (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={2} />
      </Container>

      <div className={cx('fluidWrapper')}>
        <Container>
          <Row>
            <Col>
              <h2>Columns Information</h2>
            </Col>
          </Row>

          {columnSummaries &&
            Object.keys(columnSummaries).map((columnName) => {
              const columnSummary = columnSummaries[columnName];

              return (
                <div key={columnName}>
                  <ColumnOverview
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
