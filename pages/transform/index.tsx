import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import DataFrameTable from 'components/dataframe-table';
import SectionTitle from 'components/common/section-title';
import ColumnTransformBox from 'components/column-transform-box';
import FullButton from 'components/common/full-button';
import generatePreTransformSummaryCode from 'python/pre-transform-summary.py';
import styles from './transform-page.module.scss';

const CodeEditor = dynamic(() => import('components/code-editor'), {
  loading: () => <p>Loading Code Editor...</p>,
  ssr: false,
});

const templateCode = `# Edit df DataFrame as you wish
# df = df.dropna()`;

export default function SelectPage() {
  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const df = usePyodideStore((state) => state.dataFrame);
  const setDataFrame = usePyodideStore((state) => state.setDataFrame);
  const [preTransformSummary, setPreTransformSummary] = useState(null);
  const [editorCode, setEditorCode] = useState(templateCode);
  const [dfHtml, setDfHtml] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!df) {
      router.push('/load');
      return;
    } else {
      updatePreTransformSummary();
      setDfHtml(df.head(10).to_html());
    }
  }, []);

  const proceedToNextPage = () => {
    router.push('/results').then(() => window.scrollTo(0, 0));
  };

  const updatePreTransformSummary = async () => {
    const preTransformSummaryCodeResult = await pyodideManager.runCode(
      generatePreTransformSummaryCode
    );

    setPreTransformSummary(preTransformSummaryCodeResult.output);

    console.log(preTransformSummaryCodeResult);
  };

  const addRemoveOutlierOp = (columnName) => {
    const codeToAdd = `col_mean = df['${columnName}'].mean()
col_std_dev = df['${columnName}'].std()
num_std_devs = 2

df = df[(df['${columnName}'] > col_mean - col_std_dev * num_std_devs)
        & (df['${columnName}'] < col_mean + col_std_dev * num_std_devs)]`;

    setEditorCode(editorCode + '\n\n' + codeToAdd);

    toast.success(
      `Successfully added code to remove outliers from the ${columnName} column`
    );
  };

  const filterRangeOp = (columnName) => {
    const codeToAdd = `df = df[(df['${columnName}'] > ${preTransformSummary[columnName].min}) & (df['${columnName}'] < ${preTransformSummary[columnName].max})]`;

    setEditorCode(editorCode + '\n\n' + codeToAdd);

    toast.success(
      `Successfully added code to filter rows by range using the ${columnName} column`
    );
  };

  const onCodeEditorRun = async (userCode) => {
    console.log('onCodeEditorRun');
    console.log(userCode);

    const userCodeResult = await pyodideManager.runCode(userCode + '\n\ndf');
    setDataFrame(userCodeResult.output);
    setDfHtml(userCodeResult.output.head(10).to_html());
    updatePreTransformSummary();

    console.log(userCodeResult);
  };

  return df ? (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={2} />
      </Container>

      <div className={styles.fluidWrapper}>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Container>
          <div className={styles.transformSection}>
            <Row>
              <Col>
                <SectionTitle desc="Dataset" title="Transformations" />

                <p className={styles.explanation}>
                  Select transformations you would like to perform. This will
                  add working Python code to the code editor at the bottom of
                  this page.
                </p>
              </Col>
            </Row>

            {preTransformSummary &&
              df.columns.map((columnName) => {
                const columnSummary = preTransformSummary[columnName];

                console.log(columnSummary);

                return (
                  <Row className={styles.columnTransformRow} key={columnName}>
                    <Col xs={6}>
                      <span className={styles.columnName}>{columnName}</span>
                    </Col>

                    <Col xs={6}>
                      {columnSummary.missing_count > 0 && (
                        <ColumnTransformBox
                          title="Drop Rows with Missing Values"
                          description={`There are ${columnSummary.missing_count} rows where the values are missing (NaN). Select this option to drop rows with missing values.`}
                          onClick={() => {}}
                        />
                      )}

                      {columnSummary.missing_count > 0 && (
                        <ColumnTransformBox
                          title="Fill Rows with Missing Values"
                          description={`There are ${columnSummary.missing_count} rows where the values are missing (NaN). Select this option to fill NaN rows with zero or another value.`}
                          onClick={() => {}}
                        />
                      )}

                      {(columnSummary.data_type == 'int64' ||
                        columnSummary.data_type == 'float64') && (
                        <ColumnTransformBox
                          title="Remove Outliers"
                          description="Outliers can skew mean and make your box plots go wild. Select this option to remove outliers."
                          onClick={() => {
                            addRemoveOutlierOp(columnName);
                          }}
                        />
                      )}

                      {(columnSummary.data_type == 'int64' ||
                        columnSummary.data_type == 'float64') && (
                        <ColumnTransformBox
                          title="Filter Range"
                          description="What if you only want to select a specific range? Select this option to add a filter."
                          onClick={() => {
                            filterRangeOp(columnName);
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                );
              })}
          </div>

          <div className={styles.codeEditorSection}>
            <Row>
              <Col>
                <SectionTitle desc="Dataset" title="Custom Code" />
                <div className={styles.dataFrameSummary}>
                  <Row>
                    <Col xs={3}>{df.shape[0]} Rows</Col>

                    <Col xs={3}>{df.shape[1]} Columns</Col>

                    <Col xs={6}></Col>
                  </Row>
                </div>

                <CodeEditor
                  value={editorCode}
                  onChange={setEditorCode}
                  onRun={onCodeEditorRun}
                />
              </Col>
            </Row>
          </div>

          <div className={styles.dataTableSection}>
            <Row>
              <Col>
                <SectionTitle desc="Dataset" title="First 10 Rows" />

                <DataFrameTable dfHtml={dfHtml} />
              </Col>
            </Row>
          </div>

          <Row>
            <Col>
              <FullButton onClick={proceedToNextPage} label="View Result" />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  ) : null;
}
