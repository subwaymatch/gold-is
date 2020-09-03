import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import styles from './column-data-sample.module.scss';
import SectionTitle from 'components/common/section-title';

export default function ColumnDataSample({ columnData }) {
  const [sampleSize, setSampleSize] = useState(20);
  const [sample, setSample] = useState([]);

  const reSample = () => setSample(_.sampleSize(columnData, sampleSize));

  useEffect(() => {
    reSample();
  }, []);

  return (
    <div className={styles.columnDataSample}>
      <Row>
        <Col md={12}>
          <SectionTitle desc="Column" title="Sample" />
        </Col>

        <Col md={6}>
          <div className={styles.numSampleWrapper}>
            <label>
              <span className={styles.numSampleLabel}>Number of Sample</span>
              <input
                className={styles.numSampleInput}
                id="numSampleInput"
                type="number"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number.parseInt(e.target.value))}
              />
            </label>
            <button onClick={reSample}>Resample</button>
          </div>
        </Col>
      </Row>

      <Row>
        <div className={styles.sampleValuesWrapper}>
          {sample.map((v, index) => (
            <div key={index} className={styles.sampleValue}>
              {String(v)}
            </div>
          ))}
        </div>
      </Row>
    </div>
  );
}
