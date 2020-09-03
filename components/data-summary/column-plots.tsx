import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

export default function ColumnPlots({ columnName, data, summary }) {
  useEffect(() => {}, []);

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
              <>
                <h2>Yaya</h2>
              </>
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
