import { TColumnSummary } from 'typings/pyodide';
import styles from './column-story.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { formatNumber, toPercentage } from 'lib/utils';

type ColumnStoryProps = {
  columnName: string;
  summary: TColumnSummary;
};

const ColumnStory = ({ columnName, summary }: ColumnStoryProps) => {
  const isNumeric =
    summary.data_type == 'int64' || summary.data_type == 'float64';

  const missingValueStory =
    summary.missing_count > 0 ? (
      <>
        There are <span className={styles.figure}>{summary.missing_count}</span>{' '}
        missing values.
      </>
    ) : (
      'There is no missing value.'
    );

  const statsStory = isNumeric ? (
    <p>
      Some stats of non-missing values. Mean is{' '}
      <span className={styles.figure}>{formatNumber(summary.mean)}</span>. The
      minimum is{' '}
      <span className={styles.figure}>{formatNumber(summary.min)}</span>, while
      the maximum is{' '}
      <span className={styles.figure}>{formatNumber(summary.max)}</span>.
    </p>
  ) : null;

  return (
    <div className={styles.columnStory}>
      <Container>
        <Row>
          <Col>
            <p>
              Column <span className={styles.figure}>{columnName}</span> is of{' '}
              <span className={styles.figure}>{summary.data_type}</span> type.
              There are{' '}
              <span className={styles.figure}>{summary.distinct_count}</span>{' '}
              unique values, which is about{' '}
              <span className={styles.figure}>
                {toPercentage(summary.unique_percentage)}
              </span>{' '}
              of the total number of rows. {missingValueStory}
            </p>

            {statsStory}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ColumnStory;
