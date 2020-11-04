import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames/bind';
import styles from './load-components.module.scss';
import usePyodideStore from 'stores/pyodide';

declare let pyodide: any;

const cx = classNames.bind(styles);

export default function LoadFromDragAndDrop() {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      console.log(binaryStr);
    };
    reader.readAsText(file);
  }, []);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept: '.csv',
  });

  console.log({ ...getRootProps() });

  return (
    <div className={styles.dropBoxWrapper} {...getRootProps()}>
      <input {...getInputProps()} />

      <div className={styles.orDisplay}>
        <span>OR</span>
      </div>

      <div className={styles.dropBox}>Select or Drag your file here</div>
    </div>
  );
}
