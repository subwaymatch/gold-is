import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import styles from './load-source.module.scss';
import { useStore } from 'store';

const cx = classNames.bind(styles);

export default function LoadSource() {
  const router = useRouter();
  const [csvUrl, setCsvUrl] = useState(
    'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
  );
  const setSourceUrl = useStore((state) => state.setSourceUrl);

  useEffect(() => {
    router.prefetch('/transform');
  });

  const moveToNext = () => {
    setSourceUrl(csvUrl);
    router.push('/transform');
  };

  return (
    <>
      <Row className={styles.loadSourceComponent}>
        <Col>
          <input
            type="text"
            className={cx('urlInput')}
            onChange={(e) => setCsvUrl(e.target.value)}
            value={csvUrl}
          />

          <div className={styles.dropBox}>Select or Drag your file here</div>

          <button className={cx('nextButton')} onClick={moveToNext}>
            Start Digging →
          </button>
        </Col>
      </Row>
    </>
  );
}
