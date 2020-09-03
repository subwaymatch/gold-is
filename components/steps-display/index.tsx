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
  { label: 'Select', href: '/select' },
  { label: 'Analyze', href: '/results' },
];

const StepItem = ({ number, label, active, clickable, href }) =>
  href && clickable ? (
    <Link href={href}>
      <motion.a
        className={cx('stepItem', {
          active,
          clickable,
        })}
        variants={clickable ? clickableVariants : {}}
        whileHover="hover"
        whileTap="tap"
        href={href}
      >
        <div className={styles.numberCircle}>
          <span className={styles.numberLabel}>{number}</span>
        </div>
        <span className={styles.label}>{label}</span>
      </motion.a>
    </Link>
  ) : (
    <div className={cx('stepItem')}>
      <div className={styles.numberCircle}>
        <span className={styles.numberLabel}>{number}</span>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
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
            <StepItem
              number={index + 1}
              label={step.label}
              active={index === currentIndex}
              clickable={index <= currentIndex}
              href={step.href}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
