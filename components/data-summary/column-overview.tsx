import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import styles from './column-overview.module.scss';
import classNames from 'classnames/bind';
import { TColumnSummary } from 'typings/pyodide';
import ColumnSummary from './column-summary';
import qs from 'qs';

const cx = classNames.bind(styles);

type ColumnOverviewProps = {
  columnName: string;
  summary: TColumnSummary;
};

export default function ColumnOverview({
  columnName,
  summary,
}: ColumnOverviewProps) {
  const detailLinkQueryString = qs.stringify({
    name: columnName,
  });

  return (
    <div className={cx('columnBox')}>
      <Row>
        <Col md={6}>
          <h3>{columnName}</h3>
        </Col>

        <Col md={6}>
          <Link href={`/results/column?${detailLinkQueryString}`}>
            <a>View Details</a>
          </Link>
        </Col>
      </Row>

      <ColumnSummary summary={summary} />
    </div>
  );
}
