import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import generateOverviewCode from 'python/generate-overview.py';
import styles from './select-page.module.scss';
import classNames from 'classnames/bind';
import { TDataOverview } from 'typings/pyodide';
import SectionTitle from 'components/common/section-title';
import FullButton from 'components/common/full-button';

const cx = classNames.bind(styles);

export default function SelectPage() {
  const [dfHtml, setDfHtml] = useState('');
  const [overview, setOverview] = useState<TDataOverview>(null);
  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const dropColumns = usePyodideStore((state) => state.dropColumns);
  const addDropColumn = usePyodideStore((state) => state.addDropColumn);
  const removeDropColumn = usePyodideStore((state) => state.removeDropColumn);
  const resetDropColumns = usePyodideStore((state) => state.resetDropColumns);
  const df = usePyodideStore((state) => state.dataFrame);
  const setDataFrame = usePyodideStore((state) => state.setDataFrame);
  const router = useRouter();

  if (df) {
    console.log(df.columns);
  }

  useEffect(() => {
    if (!df) {
      router.push('/load');
      return;
    } else {
      (async () => {
        const overviewCodeResult = await pyodideManager.runCode(
          generateOverviewCode
        );

        setOverview(overviewCodeResult.output);

        console.log(overviewCodeResult.output);
      })();

      setDfHtml(df.head(10).to_html());
    }

    resetDropColumns();
  }, []);

  const dropSelectedColumns = () => {
    setDataFrame(df.drop(dropColumns, 1));
  };

  const proceedToNextPage = () => {
    dropSelectedColumns();
    router.push('/results');
  };

  const proceedButtonMessage =
    !dropColumns || dropColumns.length === 0
      ? `Proceed without Changes ⟶`
      : `Drop ${dropColumns.length} Columns and Proceed ⟶`;
  return df ? (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={1} />
      </Container>

      <div className={cx('fluidWrapper')}>
        <Container>
          <Row>
            <Col>
              <div className={cx('fluidButtonWrapper')}>
                <FullButton
                  onClick={proceedToNextPage}
                  label={proceedButtonMessage}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <SectionTitle desc="Dataset" title="Top 10 Rows" />
              <div
                className={cx('dataTableWrapper')}
                dangerouslySetInnerHTML={{ __html: dfHtml }}
              />
            </Col>
          </Row>

          <div className={cx('dropColumnsSection')}>
            <Row>
              <Col>
                <SectionTitle desc="Dataset" title="Drop Columns" />
                <p className={cx('explanation')}>
                  Columns you select here will be dropped in the analysis
                  results.
                </p>

                {df.columns.map((columnName) => (
                  <div
                    className={cx('dropButton', {
                      selected: dropColumns.includes(columnName),
                    })}
                    onClick={() => {
                      console.log(`drop ${columnName}`);
                      if (dropColumns.includes(columnName)) {
                        removeDropColumn(columnName);
                      } else {
                        addDropColumn(columnName);
                      }
                    }}
                    key={columnName}
                  >
                    <span className={cx('columnName')}>{columnName}</span>
                    <span className={cx('indicator')}></span>
                  </div>
                ))}

                <div className={cx('bottomProceedButtonWrapper')}>
                  <FullButton
                    onClick={proceedToNextPage}
                    label={proceedButtonMessage}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </Layout>
  ) : null;
}
