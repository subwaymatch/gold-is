import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import styles from './transform-page.module.scss';
import classNames from 'classnames/bind';
import SectionTitle from 'components/common/section-title';
import FullButton from 'components/common/full-button';

const CodeEditor = dynamic(() => import('components/code-editor'), {
  loading: () => <p>Loading Code Editor...</p>,
  ssr: false,
});

const cx = classNames.bind(styles);

export default function SelectPage() {
  const df = usePyodideStore((state) => state.dataFrame);

  const router = useRouter();

  const proceedToNextPage = () => {
    router.push('/results').then(() => window.scrollTo(0, 0));
  };

  return df ? (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={2} />
      </Container>

      <div className={cx('fluidWrapper')}>
        <Container>
          <div className={cx('codeEditorSection')}>
            <Row>
              <Col>
                <SectionTitle desc="Dataset" title="Use Your Own Code" />

                <CodeEditor />
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
