import { Row, Col } from 'react-bootstrap';
import Plot from 'react-plotly.js';

var x = [];
for (var i = 0; i < 500; i++) {
  x[i] = Math.random();
}

export default function ColumnPlots() {
  return (
    <Row>
      <Col md={6}>
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
            { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
        />
      </Col>

      <Col md={6}>
        <Plot
          data={[
            {
              x,
              type: 'histogram',
            },
          ]}
          layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
        />
      </Col>
    </Row>
  );
}
