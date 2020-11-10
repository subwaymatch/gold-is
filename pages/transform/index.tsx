import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import DataFrameTable from 'components/dataframe-table';
import SectionTitle from 'components/common/section-title';
import FullButton from 'components/common/full-button';
import styles from './transform-page.module.scss';

const CodeEditor = dynamic(() => import('components/code-editor'), {
  loading: () => <p>Loading Code Editor...</p>,
  ssr: false,
});

const templateCode = `
# Edit df DataFrame as you wish
# Note that the operations must be in-place
df`;

export default function SelectPage() {
  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const df = usePyodideStore((state) => state.dataFrame);
  const setDf = usePyodideStore((state) => state.setDataFrame);
  const [dfHtml, setDfHtml] = useState('');
  const router = useRouter();

  useEffect(() => {
    setDfHtml(df.head(10).to_html());
  }, []);

  const proceedToNextPage = () => {
    router.push('/results').then(() => window.scrollTo(0, 0));
  };

  const onCodeEditorRun = async (userCode) => {
    console.log('onCodeEditorRun');
    console.log(userCode);

    const userCodeResult = await pyodideManager.runCode(userCode + '\n\ndf');
    setDfHtml(userCodeResult.output.head(10).to_html());
    setDf(userCodeResult.output);

    console.log(userCodeResult);
  };

  return df ? (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={2} />
      </Container>

      <div className={styles.fluidWrapper}>
        <Container>
          <div className={styles.transformSection}>
            <Row>
              <Col>
                <SectionTitle desc="Dataset" title="Transformations" />
              </Col>
            </Row>
          </div>

          <div className={styles.codeEditorSection}>
            <Row>
              <Col>
                <SectionTitle desc="Dataset" title="Custom Code" />

                <CodeEditor
                  templateCode={templateCode}
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
