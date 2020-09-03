import { TDataOverview } from 'typings/pyodide';
import styles from './dataset-story.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { formatNumber, toPercentage } from 'lib/utils';
import SectionTitle from 'components/common/section-title';

type DatasetStoryProps = {
  overview: TDataOverview;
};

const DatasetStory = ({ overview }: DatasetStoryProps) => {
  if (!overview) {
    return null;
  }

  const missingValueStory =
    overview.numMissingCells > 0 ? (
      <>
        There are{' '}
        <span className={styles.figure}>{overview.numMissingCells}</span>{' '}
        missing values.
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
            <p>Dataset Story here</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DatasetStory;
