import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import generateOverviewCode from 'python/generate-overview.py';
import generateColumnsSummaryCode from 'python/generate-columns-summary.py';
import styles from './results-page.module.scss';
import classNames from 'classnames/bind';
import ColumnOverview from 'components/data-summary/column-overview';
import DatasetStory from 'components/data-summary/dataset-story';
import SectionTitle from 'components/common/section-title';

const cx = classNames.bind(styles);

const dfSelector = (state) => state.dataFrame;

export default function ResultsPage() {
  const dataOverview = usePyodideStore((state) => state.dataOverview);
  const setDataOverview = usePyodideStore((state) => state.setDataOverview);
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
    } else if (!dataOverview || !columnSummaries) {
      (async () => {
        const overviewCodeResult = await pyodideManager.runCode(
          generateOverviewCode
        );

        setDataOverview(overviewCodeResult.output);

        const columnsSummaryCodeResult = await pyodideManager.runCode(
          generateColumnsSummaryCode
        );

        (window as any).columnsSummaryCodeResult = columnsSummaryCodeResult;

        setColumnSummaries(columnsSummaryCodeResult.output.to_dict());
      })();
    }
  }, []);

  return (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={3} />
      </Container>

      <Container>
        <Row>
          <Col>
            <div className={cx('storyDivider')} />
          </Col>
        </Row>
      </Container>

      <DatasetStory overview={dataOverview} />

      <div className={cx('fluidWrapper')}>
        <Container>
          <Row>
            <Col>
              <SectionTitle desc="Dataset" title="Columns" />
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
                    className={cx('columnOverview')}
                  />
                </div>
              );
            })}
        </Container>
      </div>
    </Layout>
  );
}
