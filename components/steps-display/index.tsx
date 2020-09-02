import Link from 'next/link';
import { motion } from 'framer-motion';
import { Row, Col } from 'react-bootstrap';
import { clickableVariants } from 'animations/variants';
import styles from './steps-display.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const steps = [
  {
    label: 'Load Data',
    href: '/load',
  },
  { label: 'Preview', href: '/select' },
  { label: 'Analyze', href: '/results' },
];

type StepsDisplayProps = {
  currentIndex: number;
};

export default function StepsDisplay({ currentIndex }: StepsDisplayProps) {
  return (
    <div className={styles.stepsDisplay}>
      <Row>
        {steps.map((step, index) => (
          <Col md={4} key={index}>
            <Link href={step.href}>
              <div
                className={cx(styles.stepItem, {
                  active: index === currentIndex,
                })}
              >
                <motion.a
                  variants={clickableVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className={styles.numberCircle}>
                    <span className={styles.numberLabel}>{index + 1}</span>
                  </div>
                  <span className={styles.label}>{step.label}</span>
                </motion.a>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
