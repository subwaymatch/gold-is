import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import generateColumnDetails from 'python/generate-column-details.py';
import styles from './column-plots.module.scss';
import classNames from 'classnames/bind';
import {
  VictoryAxis,
  VictoryChart,
  VictoryBoxPlot,
  VictoryHistogram,
  VictoryBar,
} from 'victory';
import { TColumnSummary } from 'typings/pyodide';
import SectionTitle from 'components/common/section-title';

const cx = classNames.bind(styles);

type ColumnPlotsType = {
  columnName: string;
  data: any[];
  summary: TColumnSummary;
};

export default function ColumnPlots({
  columnName,
  data,
  summary,
}: ColumnPlotsType) {
  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const isNumericColumn =
    summary.data_type === 'int64' || summary.data_type === 'float64';
  const nonNullData = data.filter((v) => v);
  const [frequentPlotData, setFrequentPlotData] = useState([]);

  useEffect(() => {
    (window as any).selected_column = columnName;
    (window as any).columnData = data;

    (async () => {
      const columnDetailsCodeResult = await pyodideManager.runCode(
        generateColumnDetails
      );

      (window as any).columnDetailsCodeResult = columnDetailsCodeResult;

      let mf = columnDetailsCodeResult.output.most_frequent;

      let result;

      result = Object.entries(mf)
        .sort((a: any[], b: any[]) => a[1] - b[1])
        .map((pair: any[]) => ({ x: pair[0], y: pair[1] }));

      setFrequentPlotData(result);
    })();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <SectionTitle desc="Column" title="Visualizations" />
        </Col>
      </Row>
      <Row>
        <Col>
          {isNumericColumn && (
            <div className={cx('plotWrapper')}>
              <div className={cx('plotHeader')}>
                <Row>
                  <Col xs={4}>
                    <h3>Histogram</h3>
                  </Col>

                  <Col xs={8}>
                    <p>
                      A frequency distribution shows how often each different
                      value in a set of data occurs. A histogram is the most
                      commonly used graph to show frequency distributions. It
                      looks very much like a bar chart, but there are important
                      differences between them.
                    </p>
                  </Col>
                </Row>
              </div>
              <div className={cx('plotBoundary')}>
                <VictoryChart domainPadding={10}>
                  <VictoryHistogram data={nonNullData.map((v) => ({ x: v }))} />
                </VictoryChart>
              </div>
            </div>
          )}

          {isNumericColumn && (
            <div className={cx('plotWrapper')}>
              <div className={cx('plotHeader')}>
                <Row>
                  <Col xs={4}>
                    <h3>Box Plot</h3>
                  </Col>

                  <Col xs={8}>
                    <p>
                      A box plot (also known as box and whisker plot) is a type
                      of chart often used in explanatory data analysis to
                      visually show the distribution of numerical data and
                      skewness through displaying the data quartiles (or
                      percentiles) and averages.
                    </p>
                  </Col>
                </Row>
              </div>

              <div className={cx('plotBoundary')}>
                <VictoryChart horizontal domainPadding={30}>
                  <VictoryBoxPlot
                    horizontal
                    data={[{ x: columnName, y: nonNullData }]}
                  />

                  <VictoryAxis dependentAxis />
                </VictoryChart>
              </div>
            </div>
          )}

          {!isNumericColumn && (
            <div className={cx('plotWrapper')}>
              <div className={cx('plotHeader')}>
                <Row>
                  <Col xs={4}>
                    <h3>Most Frequent</h3>
                  </Col>

                  <Col xs={8}>
                    <p>
                      This plot lists the most frequent values encountered in
                      this column. X-axis represents the count.
                    </p>
                  </Col>
                </Row>
              </div>

              <div className={cx('plotBoundary')}>
                <VictoryChart horizontal domainPadding={40}>
                  <VictoryBar
                    horizontal
                    data={frequentPlotData}
                    style={{
                      labels: {
                        fontSize: 8,
                      },
                    }}
                    labels={({ datum }) => `${datum.x}`}
                  />

                  <VictoryAxis dependentAxis />
                </VictoryChart>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}
