import { Row, Col } from 'react-bootstrap';
import DisplayItem from './display-item';
import styles from './column-summary.module.scss';
import classNames from 'classnames/bind';
import { TColumnSummary } from 'typings/pyodide';

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
    <>
      <Row>
        <Col md={4}>
          <h3>{columnName}</h3>
        </Col>

        <Col md={4}>
          <DisplayItem
            label="Number of unique values"
            value={summary.distinct_count}
          />

          <DisplayItem
            label="Number of unique values"
            value={summary.distinct_count}
          />
        </Col>

        <Col md={4}></Col>
      </Row>
    </>
  );
}
