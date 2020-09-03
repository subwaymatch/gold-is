import Link from 'next/link';
import styles from './example-dataset.module.scss';
import classNames from 'classnames/bind';
import { Row, Col } from 'react-bootstrap';
import qs from 'qs';

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
    dataUrl: dataUrl,
  });

  return (
    <div className={cx('exampleItem')}>
      <Row>
        <Col md={8}>
          <Link href={`/load?${dataUrlQueryString}`}>
            <a>
              <h3 className={cx('title')}>{title}</h3>

              <p className={cx('description')}>{description}</p>

              <span className={cx('selectMessage')}>Select and Continue 🡒</span>
            </a>
          </Link>
        </Col>

        <Col md={4}>
          <img src={imageSrc} alt={title} />
        </Col>
      </Row>
    </div>
  );
}
