import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
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
  const setDataOverview = usePyodideStore((state) => state.setDataOverview);
  const setColumnSummaries = usePyodideStore(
    (state) => state.setColumnSummaries
  );
  const [preTransformSummary, setPreTransformSummary] = useState(null);
  const [editorCode, setEditorCode] = useState(templateCode);
  const [dfHtml, setDfHtml] = useState('');
  const router = useRouter();
  const codeEditorRef = useRef(null);

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
  };

  const onTransformationOpSelected = (message) => {
    codeEditorRef.current.scrollIntoView();
    toast.success(message);
  };

  const dropColumnOp = (columnName) => {
    const codeToAdd = `df = df.drop(columns=['${columnName}'])`;

    setEditorCode(editorCode + '\n\n' + codeToAdd);

    onTransformationOpSelected(
      `Successfully added code to drop the ${columnName} column`
    );
  };

  const dropMissingOp = (columnName) => {
    const codeToAdd = `df = df.dropna(subset=['${columnName}'])`;

    setEditorCode(editorCode + '\n\n' + codeToAdd);

    onTransformationOpSelected(
      `Successfully added code to drop rows where the values for ${columnName} column are missing`
    );
  };

  const fillMissingOp = (columnName, isNumeric) => {
    const codeToAdd = `df['${columnName}'] = df['${columnName}'].fillna(${
      isNumeric ? 0 : `'Value to fill'`
    })`;

    setEditorCode(editorCode + '\n\n' + codeToAdd);

    onTransformationOpSelected(
      `Successfully added code to fill in missing values from the ${columnName} column`
    );
  };

  const addRemoveOutlierOp = (columnName) => {
    const codeToAdd = `col_mean = df['${columnName}'].mean()
col_std_dev = df['${columnName}'].std()
num_std_devs = 2

df = df[(df['${columnName}'] > col_mean - col_std_dev * num_std_devs)
        & (df['${columnName}'] < col_mean + col_std_dev * num_std_devs)]`;

    setEditorCode(editorCode + '\n\n' + codeToAdd);

    onTransformationOpSelected(
      `Successfully added code to remove outliers from the ${columnName} column`
    );
  };

  const filterRangeOp = (columnName) => {
    const codeToAdd = `df = df[(df['${columnName}'] > ${preTransformSummary[columnName].min}) & (df['${columnName}'] < ${preTransformSummary[columnName].max})]`;

    setEditorCode(editorCode + '\n\n' + codeToAdd);

    onTransformationOpSelected(
      `Successfully added code to filter rows by range using the ${columnName} column`
    );
  };

  const logTransformationOp = (columnName) => {
    const codeToAdd = `with np.errstate(divide='ignore'):
    df['${columnName}'] = np.log(df['${columnName}'])`;

    setEditorCode(editorCode + '\n\n' + codeToAdd);

    onTransformationOpSelected(
      `Successfully added code to apply a log transform to the ${columnName} column`
    );
  };

  const onCodeEditorRun = async (userCode) => {
    const userCodeResult = await pyodideManager.runCode(userCode + '\n\ndf');
    setDataFrame(userCodeResult.output);
    setDfHtml(userCodeResult.output.head(10).to_html());
    updatePreTransformSummary();

    setDataOverview(null);
    setColumnSummaries(null);

    toast.success(
      'Code run successfully. 👻 Note that running the same code multiple times may have unexpected side effects.'
    );
  };

  return df ? (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={2} />
      </Container>

      <div className={styles.fluidWrapper}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
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
                if (!preTransformSummary.hasOwnProperty(columnName)) {
                  return null;
                }

                const columnSummary = preTransformSummary[columnName];

                return (
                  <Row className={styles.columnTransformRow} key={columnName}>
                    <Col xs={6}>
                      <span className={styles.columnName}>{columnName}</span>
                    </Col>

                    <Col xs={6}>
                      <ColumnTransformBox
                        title="Drop Column"
                        description={`Select this option to drop the column ${columnName}.`}
                        onClick={() => {
                          dropColumnOp(columnName);
                        }}
                      />

                      {columnSummary.missing_count > 0 && (
                        <ColumnTransformBox
                          title="Drop Rows with Missing Values"
                          description={`There are ${columnSummary.missing_count} rows where the values are missing (NaN). Select this option to drop rows with missing values.`}
                          onClick={() => {
                            dropMissingOp(columnName);
                          }}
                        />
                      )}

                      {columnSummary.missing_count > 0 && (
                        <ColumnTransformBox
                          title="Fill Rows with Missing Values"
                          description={`There are ${columnSummary.missing_count} rows where the values are missing (NaN). Select this option to fill NaN rows with zero or another value.`}
                          onClick={() => {
                            fillMissingOp(
                              columnName,
                              columnSummary.data_type === 'int64' ||
                                columnSummary.data_type === 'float64'
                            );
                          }}
                        />
                      )}

                      {(columnSummary.data_type === 'int64' ||
                        columnSummary.data_type === 'float64') && (
                        <ColumnTransformBox
                          title="Remove Outliers"
                          description="Outliers can skew mean and make your box plots go wild. Select this option to remove outliers."
                          onClick={() => {
                            addRemoveOutlierOp(columnName);
                          }}
                        />
                      )}

                      {(columnSummary.data_type === 'int64' ||
                        columnSummary.data_type === 'float64') && (
                        <ColumnTransformBox
                          title="Filter Range"
                          description="What if you only want to select a specific range? Select this option to add a filter."
                          onClick={() => {
                            filterRangeOp(columnName);
                          }}
                        />
                      )}

                      {(columnSummary.data_type === 'int64' ||
                        columnSummary.data_type === 'float64') && (
                        <ColumnTransformBox
                          title="Log Transformation"
                          description="A skewed distribution (e.g., long tail) can hinder your model's performance. Logarithm naturally reduces the dynamic range of a variable. Select this option to apply a log transformation."
                          onClick={() => {
                            logTransformationOp(columnName);
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                );
              })}
          </div>

          <div ref={codeEditorRef} className={styles.codeEditorSection}>
            <Row>
              <Col>
                <SectionTitle desc="Dataset" title="Custom Code" />

                <div className={styles.dataFrameSummary}>
                  <Row>
                    <Col>
                      The DataFrame currently has{' '}
                      <span className={styles.count}>{df.shape[0]}</span> Rows
                      and <span className={styles.count}>{df.shape[1]}</span>{' '}
                      Columns.
                    </Col>
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
