import { TDataOverview } from 'typings/pyodide';
import styles from './dataset-story.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { toPercentage, toKiloBytes } from 'lib/utils';
import SectionTitle from 'components/common/section-title';

type DatasetStoryProps = {
  overview: TDataOverview;
};

const DatasetStory = ({ overview }: DatasetStoryProps) => {
  if (!overview) {
    return null;
  }

  console.log(overview);

  const missingValueStory =
    overview.numMissingCells > 0 ? (
      <>
        There are{' '}
        <span className={styles.figure}>{overview.numMissingCells}</span>{' '}
        missing values, which equates to{' '}
        <span className={styles.figure}>
          {toPercentage(overview.missingCellsPercentage)}
        </span>{' '}
        of the total number of cells.
      </>
    ) : (
      'There is no missing value.'
    );

  return (
    <div className={styles.datasetStory}>
      <Container>
        <Row>
          <Col>
            <SectionTitle desc="Dataset" title="Overview" />
            <p>
              Dataset contains{' '}
              <span className={styles.figure}>{overview.numRows}</span> rows and{' '}
              <span className={styles.figure}>{overview.numCols}</span> columns.{' '}
              {missingValueStory} The dataset is using{' '}
              <span className={styles.figure}>
                {toKiloBytes(overview.memoryUsage)}
              </span>{' '}
              of your precious data.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DatasetStory;
