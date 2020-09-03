import styles from './column-details.module.scss';
import classNames from 'classnames/bind';
import { TColumnSummary } from 'typings/pyodide';
import dynamic from 'next/dynamic';
import ColumnStory from './column-story';
import ColumnSummary from './column-summary';
import ColumnDataSample from './column-data-sample';
import { Container } from 'react-bootstrap';

const ColumnPlots = dynamic(import('./column-plots'), {
  ssr: false,
});

const cx = classNames.bind(styles);

type ColumnDetailsProps = {
  columnName: string;
  columnData: any;
  summary: TColumnSummary;
};

var x = [];
for (var i = 0; i < 500; i++) {
  x[i] = Math.random();
}

export default function ColumnDetails({
  columnName,
  columnData,
  summary,
}: ColumnDetailsProps) {
  return (
    <div className={cx('columnBox')}>
      <ColumnStory columnName={columnName} summary={summary} />

      <Container>
        <ColumnSummary summary={summary} />

        <ColumnDataSample columnData={columnData} />

        <ColumnPlots
          columnName={columnName}
          data={columnData}
          summary={summary}
        />
      </Container>
    </div>
  );
}
