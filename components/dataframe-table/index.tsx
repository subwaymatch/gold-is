import styles from './dataframe-table.module.scss';

export default function DataFrameTable({ dfHtml }: { dfHtml: string }) {
  return (
    <>
      <div
        className={styles.dataTableWrapper}
        dangerouslySetInnerHTML={{ __html: dfHtml }}
      />
    </>
  );
}
