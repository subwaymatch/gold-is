import { Row, Col } from 'react-bootstrap';
import styles from './steps-display.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type StepsDisplayProps = {
  steps: string[];
  currentIndex: number;
};

export default function StepsDisplay({
  steps,
  currentIndex,
}: StepsDisplayProps) {
  return (
    <div className={styles.stepsDisplay}>
      <Row>
        {steps.map((step, index) => (
          <Col key={index}>
            <div
              className={cx(styles.stepItem, {
                active: index === currentIndex,
              })}
            >
              <div className={styles.numberCircle}>
                <span className={styles.numberLabel}>{index + 1}</span>
              </div>
              <span className={styles.label}>{step}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
