import styles from './ResultsPage.module.scss';
import classNames from 'classnames/bind';
import Layout from 'components/Layout';
import { AiOutlineFileDone } from 'react-icons/ai';

const cx = classNames.bind(styles);

export default function ResultsPage() {
  return (
    <Layout fluid>
      <div className={cx('pageWrapper', 'fluid', 'resultsPage')}>
        <header className={cx('resultsHeader')}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Titanic Dataset</h1>
                <div className={cx('sourceName')}>
                  <AiOutlineFileDone className={cx('icon')} />
                  <span>titanic_survival_dataset.csv</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className={cx('resultsTabs')}>
                <a
                  className={cx('tabItem', 'active')}
                  onClick={(e) => e.preventDefault()}
                >
                  Summary
                </a>
                <a
                  className={cx('tabItem')}
                  onClick={(e) => e.preventDefault()}
                >
                  Columns
                </a>
                <a
                  className={cx('tabItem')}
                  onClick={(e) => e.preventDefault()}
                >
                  Preprocessing
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className={cx('resultsContentWrapper')}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>Overview</h2>
                <div className={cx('box')}>
                  <div className="row">
                    <div className="col-6">
                      <h3>Dataset Statistics</h3>

                      <div className={cx('item')}>
                        <span>Number of Columns</span>
                        <span>12</span>
                      </div>

                      <div className={cx('item')}>
                        <span>Number of Rows</span>
                        <span>891</span>
                      </div>
                    </div>

                    <div className="col-6">
                      <h3>Variable Types</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
