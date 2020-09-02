import { Row, Col } from 'react-bootstrap';
import Plot from 'react-plotly.js';

var x = [];
for (var i = 0; i < 500; i++) {
  x[i] = Math.random();
}

export default function ColumnPlots({ columnName, data, summary }) {
  console.log(summary);
  console.log(data);

  return (
    <>
      <Row>
        <Col md={12}>
          <div
            style={{
              backgroundColor: '#f5f5f5',
            }}
          >
            {summary.data_type == 'float64' && (
              <Plot
                data={[
                  {
                    x: data,
                    type: 'histogram',
                  },
                ]}
                layout={{
                  width: 1000,
                  height: 600,
                  title: `${columnName} Histogram`,
                }}
                useResizeHandler={true}
              />
            )}
          </div>
        </Col>
      </Row>

      <Row>
        <Col></Col>
      </Row>
    </>
  );
}
