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
  className?: string;
};

export default function ColumnOverview({
  columnName,
  summary,
  className,
}: ColumnOverviewProps) {
  const detailLinkQueryString = qs.stringify({
    name: columnName,
  });

  return (
    <div
      className={cx('columnBox', {
        [className]: !!className,
      })}
    >
      <Row>
        <Col md={12}>
          <div className={cx('columnBoxHeader')}>
            <h3>{columnName}</h3>

            <div className={cx('viewDetailsWrapper')}>
              <Link href={`/results/column?${detailLinkQueryString}`}>
                <a className={cx('viewDetailsLink')}>View Details 🡒</a>
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      <ColumnSummary summary={summary} />
    </div>
  );
}
