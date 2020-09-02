import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import styles from './column-data-sample.module.scss';

export default function ColumnDataSample({ columnData }) {
  const [sampleSize, setSampleSize] = useState(20);
  const [sample, setSample] = useState([]);

  const reSample = () => setSample(_.sampleSize(columnData, sampleSize));

  return (
    <div className={styles.columnDataSample}>
      <Row>
        <Col md={6}>
          <h3>Sample Values</h3>
        </Col>

        <Col md={6}>
          <div className={styles.numSampleWrapper}>
            <label>
              <span className={styles.numSampleLabel}>Number of Sample</span>
              <input
                className={styles.numSampleInput}
                id="numSampleInput"
                type="text"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number.parseInt(e.target.value))}
              />
            </label>
            <button onClick={reSample}>Resample</button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>{String(sample)}</Col>
      </Row>

      <Row>
        <Col>{}</Col>
      </Row>
    </div>
  );
}
