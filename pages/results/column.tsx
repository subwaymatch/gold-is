import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ColumnDetails from 'components/data-summary/column-details';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import { Container } from 'react-bootstrap';

export default function ColumnDetailsPage() {
  const router = useRouter();
  const dataFrame = usePyodideStore((state) => state.dataFrame);
  const columnSummaries = usePyodideStore((state) => state.columnSummaries);

  let columnName = Array.isArray(router.query.name)
    ? router.query.name[0]
    : router.query.name;
  let columnData = dataFrame ? dataFrame[columnName] : null;
  let columnSummary = columnSummaries ? columnSummaries[columnName] : null;

  useEffect(() => {
    if (!columnName || !dataFrame) {
      router.push('/results');
    }
  }, []);

  return (
    <Layout fluid>
      <Container>
        <h2>Column Details for {columnName}</h2>

        {columnData && columnSummary ? (
          <ColumnDetails
            columnName={columnName}
            columnData={columnData}
            summary={columnSummary}
          />
        ) : null}
      </Container>
    </Layout>
  );
}
