import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import ColumnDetails from 'components/data-summary/column-details';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './column-page.module.scss';
import classNames from 'classnames/bind';
import SectionTitle from 'components/common/section-title';

const cx = classNames.bind(styles);

export default function ColumnDetailsPage() {
  const router = useRouter();
  const dataFrame = usePyodideStore((state) => state.dataFrame);
  const columnSummaries = usePyodideStore((state) => state.columnSummaries);

  let columnName = Array.isArray(router.query.name)
    ? router.query.name[0]
    : router.query.name;
  let columnData = dataFrame
    ? typeof dataFrame[columnName] === 'function'
      ? dataFrame[columnName].tolist()
      : dataFrame[columnName]
    : null;
  let columnSummary = columnSummaries ? columnSummaries[columnName] : null;

  useEffect(() => {
    if (!columnName || !dataFrame) {
      router.push('/results');
    }
  }, []);

  return (
    <Layout className={cx('columnDetailPage')} fluid>
      <div className={cx('columnDetailPageHeader')}>
        <Container>
          <Row>
            <Col>
              <div className={cx('columnDetailPageHeader')}>
                <Link href="/results">
                  <a className={cx('backLink')}>⟵ Back to Results</a>
                </Link>

                <SectionTitle desc="Column" title="Story" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {columnData && columnSummary ? (
        <ColumnDetails
          columnName={columnName}
          columnData={columnData}
          summary={columnSummary}
        />
      ) : null}
    </Layout>
  );
}
