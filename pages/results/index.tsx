import styles from './ResultsPage.module.scss';
import classNames from 'classnames/bind';
import Layout from 'components/Layout';

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
                <span className={cx('sourceName')}>
                  titanic_survival_dataset.csv
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>
    </Layout>
  );
}
