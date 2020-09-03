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

const StepItem = ({ number, label, active, clickable }) => (
  <motion.div
    className={cx(styles.stepItem, {
      active,
      clickable,
    })}
    variants={clickable ? clickableVariants : {}}
    whileHover="hover"
    whileTap="tap"
  >
    <div className={styles.numberCircle}>
      <span className={styles.numberLabel}>{number}</span>
    </div>
    <span className={styles.label}>{label}</span>
  </motion.div>
);

type StepsDisplayProps = {
  currentIndex: number;
};

export default function StepsDisplay({ currentIndex }: StepsDisplayProps) {
  return (
    <div className={styles.stepsDisplay}>
      <Row>
        {steps.map((step, index) => (
          <Col md={4} key={index}>
            {index > currentIndex ? (
              <StepItem
                number={index + 1}
                label={step.label}
                active={index === currentIndex}
                clickable={index <= currentIndex}
              />
            ) : (
              <Link href={step.href}>
                <StepItem
                  number={index + 1}
                  label={step.label}
                  active={index === currentIndex}
                  clickable={index <= currentIndex}
                />
              </Link>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
}
