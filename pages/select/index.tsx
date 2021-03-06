import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RiShuffleLine } from 'react-icons/ri';
import usePyodideStore from 'stores/pyodide';
import styles from './select-page.module.scss';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import DataFrameTable from 'components/dataframe-table';
import classNames from 'classnames/bind';
import SectionTitle from 'components/common/section-title';
import FullButton from 'components/common/full-button';

const cx = classNames.bind(styles);

export default function SelectPage() {
  const [dfHtml, setDfHtml] = useState('');
  const [isDfHtmlRandom, setIsDfHtmlRandom] = useState(false);
  const dropColumns = usePyodideStore((state) => state.dropColumns);
  const addDropColumn = usePyodideStore((state) => state.addDropColumn);
  const removeDropColumn = usePyodideStore((state) => state.removeDropColumn);
  const resetDropColumns = usePyodideStore((state) => state.resetDropColumns);
  const setColumnSummaries = usePyodideStore(
    (state) => state.setColumnSummaries
  );
  const df = usePyodideStore((state) => state.dataFrame);
  const setDataFrame = usePyodideStore((state) => state.setDataFrame);
  const router = useRouter();

  useEffect(() => {
    if (!df) {
      router.push('/load');
      return;
    } else {
      setDfHtml(df.head(10).to_html());
    }

    resetDropColumns();
  }, []);

  const dropSelectedColumns = () => {
    setDataFrame(df.drop(dropColumns, 1));
  };

  const proceedToNextPage = () => {
    dropSelectedColumns();
    setColumnSummaries(null);
    router.push('/transform').then(() => window.scrollTo(0, 0));
  };

  const randomizeDfHtml = (numSamples: number = 10) => {
    setDfHtml(df.sample(numSamples).to_html());
    setIsDfHtmlRandom(true);
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
            <Col xs={9}>
              <SectionTitle
                desc="Dataset"
                title={isDfHtmlRandom ? '10 Random Rows' : 'First 10 Rows'}
              />
            </Col>

            <Col xs={3}>
              <div
                className={styles.randomizeBtn}
                onClick={() => randomizeDfHtml(10)}
              >
                <RiShuffleLine className={styles.reactIcon} /> Randomize
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className={styles.dataFrameSummary}>
                The DataFrame currently has{' '}
                <span className={styles.count}>{df.shape[0]}</span> Rows and{' '}
                <span className={styles.count}>{df.shape[1]}</span> Columns.
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <DataFrameTable dfHtml={dfHtml} />
            </Col>
          </Row>

          <div className={cx('dropColumnsSection')}>
            <Row>
              <Col>
                <SectionTitle desc="Dataset" title="Drop Columns" />
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                {df.columns.map((columnName) => (
                  <div
                    className={cx('dropButton', {
                      selected: dropColumns.includes(columnName),
                    })}
                    onClick={() => {
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
              </Col>

              <Col xs={6}>
                <p className={cx('explanation')}>
                  Columns you select here will be excluded from the analysis
                  results.
                </p>

                <FullButton
                  onClick={proceedToNextPage}
                  label={proceedButtonMessage}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </Layout>
  ) : null;
}
