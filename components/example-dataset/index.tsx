import Link from 'next/link';
import styles from './example-dataset.module.scss';
import classNames from 'classnames/bind';
import { Row, Col } from 'react-bootstrap';
import qs from 'qs';
import { motion } from 'framer-motion';
import { clickableVariants } from 'animations/variants';
import { MdChevronRight } from 'react-icons/md';

const cx = classNames.bind(styles);

type ExampleDatasetProps = {
  imageSrc: string;
  title: string;
  description?: string;
  dataUrl: string;
};

export default function ExampleDataset({
  imageSrc,
  title,
  description,
  dataUrl,
}: ExampleDatasetProps) {
  const dataUrlQueryString = qs.stringify({
    dataUrl,
  });

  return (
    <div className={cx('exampleItem')}>
      <Row>
        <Col xs={8}>
          <Link href={`/load?${dataUrlQueryString}`}>
            <motion.a
              className={cx('exampleItemLink')}
              variants={clickableVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <h3 className={cx('title')}>{title}</h3>

              <p className={cx('description')}>{description}</p>

              <div className={cx('selectButton')}>
                <span>Select and Continue</span>
                <MdChevronRight className={styles.reactIcon} />
              </div>
            </motion.a>
          </Link>
        </Col>

        <Col xs={4}>
          <img src={imageSrc} alt={title} />
        </Col>
      </Row>
    </div>
  );
}
