import { Row, Col } from 'react-bootstrap';
import DisplayItem from './display-item';
import styles from './column-summary.module.scss';
import classNames from 'classnames/bind';
import { TColumnSummary } from 'typings/pyodide';
import { toPercentage, toKiloBytes, formatNumber } from 'lib/utils';

const cx = classNames.bind(styles);

type ColumnSummaryProps = {
  columnName: string;
  summary: TColumnSummary;
};

export default function ColumnSummary({
  columnName,
  summary,
}: ColumnSummaryProps) {
  return (
    <div className={cx('columnBox')}>
      <Row>
        <Col md={6}>
          <h3>{columnName}</h3>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <DisplayItem label="Data Type" value={summary.data_type} />

          <DisplayItem label="Distinct Count" value={summary.distinct_count} />

          <DisplayItem
            label="Unique %"
            value={toPercentage(summary.unique_percentage)}
          />
          <DisplayItem
            label="Missing Values Count"
            value={summary.missing_count}
          />
          <DisplayItem
            label="Missing Values %"
            value={toPercentage(summary.missing_percentage)}
          />
          <DisplayItem
            label="Infinite Values Count"
            value={summary.infinite_count}
          />

          <DisplayItem
            label="Infinite Values %"
            value={toPercentage(summary.infinite_percentage)}
          />
        </Col>

        <Col md={6}>
          {typeof summary.mean === 'number' && (
            <DisplayItem label="Mean" value={formatNumber(summary.mean)} />
          )}

          {typeof summary.min === 'number' && (
            <DisplayItem label="Min" value={formatNumber(summary.min)} />
          )}

          {typeof summary.max === 'number' && (
            <DisplayItem label="Max" value={formatNumber(summary.max)} />
          )}

          <DisplayItem label="Zeros" value={summary.zero_count} />

          <DisplayItem
            label="Zeros %"
            value={toPercentage(summary.zero_percentage)}
          />

          <DisplayItem
            label="Column Memory Usage"
            value={toKiloBytes(summary.memory_usage)}
          />
        </Col>
      </Row>
    </div>
  );
}
