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

        setColumnsSummary(columnsSummaryCodeResult.output.to_dict());

        console.log(columnsSummaryCodeResult);
      })();

      setDfHtml(df.head(10).to_html());
    }
  }, []);

  return (
    <Layout fluid>
      <StepsDisplay currentIndex={2} />

      <div className={cx('fluidWrapper')}>
        <Container>
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
