import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ColumnDetails from 'components/data-summary/column-details';
import usePyodideStore from 'stores/pyodide';

export default function ColumnDetailsPage() {
  const router = useRouter();
  const dataFrame = usePyodideStore((state) => state.dataFrame);

  let columnName = Array.isArray(router.query.name)
    ? router.query.name[0]
    : router.query.name;
  let columnData;
  let overview;

  useEffect(() => {
    if (!columnName || !dataFrame) {
      router.push('/results');
    }

    columnData = dataFrame[columnName];

    console.log(columnData);
  }, []);

  return (
    <>
      <h2>Column Details for {columnName}</h2>

      {columnData && overview ? (
        <ColumnDetails
          columnName={columnName}
          columnData={null}
          overview={null}
        />
      ) : null}
    </>
  );
}
