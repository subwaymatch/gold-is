import { Row, Col } from 'react-bootstrap';
import DisplayItem from './display-item';
import styles from './column-summary.module.scss';
import classNames from 'classnames/bind';
import { TColumnSummary } from 'typings/pyodide';
import { toPercentage, toKiloBytes } from 'lib/utils';

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
        <Col md={12}>
          <h3>{columnName}</h3>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <DisplayItem label="distinct_count" value={summary.distinct_count} />

          <DisplayItem
            label="unique_percentage"
            value={toPercentage(summary.unique_percentage)}
          />
          <DisplayItem label="missing_count" value={summary.missing_count} />
          <DisplayItem
            label="missing_percentage"
            value={toPercentage(summary.missing_percentage)}
          />
          <DisplayItem label="infinite_count" value={summary.infinite_count} />

          <DisplayItem
            label="infinite_percentage"
            value={toPercentage(summary.infinite_percentage)}
          />
        </Col>

        <Col md={6}>
          <DisplayItem label="mean" value={summary.mean} />

          <DisplayItem label="min" value={summary.min} />

          <DisplayItem label="max" value={summary.max} />

          <DisplayItem label="zero_count" value={summary.zero_count} />

          <DisplayItem
            label="zero_percentage"
            value={toPercentage(summary.zero_percentage)}
          />

          <DisplayItem
            label="memory_usage"
            value={toKiloBytes(summary.memory_usage)}
          />
        </Col>
      </Row>
    </div>
  );
}
