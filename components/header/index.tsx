import Link from 'next/link';
import LogoImage from 'images/gold-logo-001@2x.png';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';

import styles from './header.module.scss';

const cx = classNames.bind(styles);

export default function Header() {
  return (
    <header className={cx('headerWrapper')}>
      <div className={cx('logoImageWrapper')}>
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
          </a>
        </Link>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-2">
            <Link href="/">
              <a className={cx('menuItem')}>Datasets</a>
            </Link>
          </div>

          <div className="col-2">
            <Link href="/">
              <a className={cx('menuItem')}>Process Data</a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
