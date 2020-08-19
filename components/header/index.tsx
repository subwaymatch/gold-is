import Link from 'next/link';
import LogoImage from 'images/gold-logo-001@2x.png';
import classNames from 'classnames/bind';

import styles from './header.module.scss';

const cx = classNames.bind(styles);

export default function Header() {
  return (
    <header className={cx('headerWrapper')}>
      <div className={cx('logoImageWrapper')}>
        <Link href="/">
          <img src={LogoImage} className={cx('logoImage')} />
        </Link>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-2">
            <Link href="/">
              <a>Datasets</a>
            </Link>
          </div>

          <div className="col-2">
            <Link href="/">
              <a>Process Data</a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
