import { Row, Col } from 'react-bootstrap';
import DisplayItem from './display-item';
import styles from './column-summary.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type ColumnSummaryProps = {
  summary: {
    distinct_count: number;
    unique_percentage: number;
    missing_count: number;
    missing_percentage: number;
    infinite_count: number;
    infinite_percentage: number;
    mean: number;
    min: number;
    max: number;
    zero_count: number;
    zero_percentage: number;
    memory_usage: number;
  };
};

export default function ColumnSummary({ summary }) {
  return (
    <Row>
      <Col md={6}>
        <DisplayItem
          label="Number of unique values"
          value={summary.distinct_count}
        />
      </Col>
    </Row>
  );
}
