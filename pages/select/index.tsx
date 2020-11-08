import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import styles from './select-page.module.scss';
import classNames from 'classnames/bind';
import SectionTitle from 'components/common/section-title';
import FullButton from 'components/common/full-button';

const CodeEditor = dynamic(() => import('components/code-editor'), {
  loading: () => <p>Loading Code Editor...</p>,
  ssr: false,
});

const cx = classNames.bind(styles);

export default function SelectPage() {
  const [dfHtml, setDfHtml] = useState('');
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
    router.push('/results').then(() => window.scrollTo(0, 0));
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
              <SectionTitle desc="Dataset" title="First 10 Rows" />
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
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <p className={cx('explanation')}>
                  Columns you select here will be excluded from the analysis
                  results 🡒
                </p>

                <FullButton
                  onClick={proceedToNextPage}
                  label={proceedButtonMessage}
                />
              </Col>
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
            </Row>

            <div className={cx('codeEditorSection')}>
              <Row>
                <Col>
                  <SectionTitle desc="Dataset" title="Use Your Own Code" />

                  <CodeEditor />
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  ) : null;
}
