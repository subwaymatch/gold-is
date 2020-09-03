import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import generateColumnDetails from 'python/generate-column-details.py';
import styles from './column-plots.module.scss';
import classNames from 'classnames/bind';
import { VictoryChart, VictoryHistogram } from 'victory';
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
  useEffect(() => {
    (window as any).selected_column = columnName;
    (window as any).columnData = data;

    (async () => {
      const columnDetailsCodeResult = await pyodideManager.runCode(
        generateColumnDetails
      );

      (window as any).columnDetailsCodeResult = columnDetailsCodeResult;

      console.log(columnDetailsCodeResult);
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
            <VictoryChart domainPadding={10}>
              <VictoryHistogram
                data={data.filter((v) => v).map((v) => ({ x: v }))}
              />
            </VictoryChart>
          )}

          {!isNumericColumn && (
            <>
              <h3>Bar Chart</h3>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
