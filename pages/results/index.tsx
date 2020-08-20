import styles from './ResultsPage.module.scss';
import classNames from 'classnames/bind';
import Layout from 'components/Layout';
import { AiOutlineFileDone, AiOutlineFieldNumber } from 'react-icons/ai';
// @ts-ignore
import { VscSymbolBoolean } from 'react-icons/vsc';
import { BsGridFill } from 'react-icons/bs';

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

                      <div className={cx('item')}>
                        <span>Missing Cells</span>
                        <span>866</span>
                      </div>

                      <div className={cx('item')}>
                        <span>Missing Cells (%)</span>
                        <span>8.1%</span>
                      </div>

                      <div className={cx('item')}>
                        <span>Duplicate Rows</span>
                        <span>0</span>
                      </div>

                      <div className={cx('item')}>
                        <span>Duplicate Rows (%)</span>
                        <span>0.0%</span>
                      </div>
                    </div>

                    <div className="col-6">
                      <h3>Variable Types</h3>

                      <div className={cx('item')}>
                        <span>
                          <BsGridFill className={cx('icon')} />
                          Categorical
                        </span>

                        <span>6</span>
                      </div>
                      <div className={cx('item')}>
                        <span>
                          <AiOutlineFieldNumber className={cx('icon')} />{' '}
                          Numeric
                        </span>

                        <span>5</span>
                      </div>
                      <div className={cx('item')}>
                        <span>
                          <VscSymbolBoolean className={cx('icon')} /> Boolean
                        </span>

                        <span>1</span>
                      </div>
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
