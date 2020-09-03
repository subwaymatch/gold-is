import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import generateOverviewCode from 'python/generate-overview.py';
import styles from './select-page.module.scss';
import classNames from 'classnames/bind';
import DipslayItem from 'components/data-summary/display-item';
import { toPercentage, toKiloBytes } from 'lib/utils';
import { TDataOverview } from 'typings/pyodide';

const cx = classNames.bind(styles);

const dfSelector = (state) => state.dataFrame;

export default function SelectPage() {
  const [dfHtml, setDfHtml] = useState('');
  const [overview, setOverview] = useState<TDataOverview>(null);
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

        setOverview(overviewCodeResult.output);

        console.log(overviewCodeResult.output);
      })();

      setDfHtml(df.head(10).to_html());
    }
  }, []);

  return (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={1} />
      </Container>

      <div className={cx('fluidWrapper')}>
        <Container>
          <Row>
            <Col>
              <h2>First 10 Rows</h2>
              <div
                className={cx('dataTableWrapper')}
                dangerouslySetInnerHTML={{ __html: dfHtml }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
