import Link from 'next/link';
import LogoImage from 'images/gold-logo-02@2x.png';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './header.module.scss';

const cx = classNames.bind(styles);

export default function Header() {
  return (
    <header className={cx('headerWrapper')}>
      <div className={cx('logoWrapper')}>
        <Link href="/">
          <a>
            <motion.img
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotate: [0, 360],
                  transition: {
                    delay: 0.5,
                    duration: 1,
                    rotate: {
                      delay: 1,
                      loop: Infinity,
                      duration: 4,
                      ease: 'linear',
                    },
                  },
                },
              }}
              src={LogoImage}
              className={cx('logoImage')}
            />

            <span className={cx('siteTitle')}>Gold</span>
          </a>
        </Link>
      </div>

      <Row>
        <Col md={{ span: 8, offset: 4 }}>
          <div className={cx('headerMenu')}>
            <Link href="/load">
              <a className={cx('menuItem')}>Start Digging →</a>
            </Link>

            <Link href="/">
              <a className={cx('menuItem')}>About</a>
            </Link>

            <Link href="/monaco-example">
              <a className={cx('menuItem')}>Monaco Example</a>
            </Link>

            <a
              href="https://github.com/subwaymatch/gold-is"
              className={cx('menuItem')}
            >
              GitHub
            </a>
          </div>
        </Col>
      </Row>
    </header>
  );
}
