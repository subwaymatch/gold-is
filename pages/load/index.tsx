import { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { Row, Col, Container } from 'react-bootstrap';
import createDataFrameCode from 'python/create-dataframe-from-csv-string.py';
import Layout from 'components/Layout';
import LoadingOverlay from 'components/loading-overlay';
import StepsDisplay from 'components/steps-display';
import PyodideManager from 'lib/pyodide/manager';
import styles from './load-page.module.scss';
import usePyodideStore from 'stores/pyodide';
import FullButton from 'components/common/full-button';
import { getCorsProxyUrl } from 'lib/utils';

declare let pyodide: any;

const cx = classNames.bind(styles);

export default function LoadPage() {
  const router = useRouter();

  const [csvUrl, setCsvUrl] = useState('');
  const [csvString, setCsvString] = useState('');
  const [isDroppedFileLoaded, setIsDroppedFileLoaded] = useState(false);
  const [droppedFileName, setDroppedFileName] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const setDataFrame = usePyodideStore((state) => state.setDataFrame);
  const sourceUrl = usePyodideStore((state) => state.sourceUrl);
  const setSourceUrl = usePyodideStore((state) => state.setSourceUrl);
  const setPyodideManager = usePyodideStore((state) => state.setPyodideManager);

  useEffect(() => {
    // Setting pyodide manager
    if (!pyodideManager) {
      let newManager = new PyodideManager();

      setPyodideManager(newManager);

      (window as any).pyodideManager = newManager;
    }

    setCsvUrl(
      router.query.hasOwnProperty('dataUrl')
        ? Array.isArray(router.query.dataUrl)
          ? router.query.dataUrl[0]
          : router.query.dataUrl
        : sourceUrl
    );
  }, []);

  const getCsvStringFromUrl = async (url) => {
    const corsProxyUrl = getCorsProxyUrl(url);

    return new Promise((resolve, reject) => {
      fetch(corsProxyUrl)
        .then(async (response) => {
          const text = await response.text();

          if (response.status >= 400 && response.status < 600) {
            toast.error(
              `Fetching the CSV file failed. HTTP Status ${response.status}`
            );
            reject();
          } else {
            setCsvString(text);

            resolve();
          }
        })
        .catch((err) => {
          console.error(err);

          toast.error('Fetching the CSV file failed. ' + err.message);

          reject();
        });
    });
  };

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    if (acceptedFiles.length == 0 && fileRejections.length > 0) {
      toast.error('Invalid file: ' + fileRejections[0].errors[0].message);
    }

    reader.onabort = () => {
      console.log('File reading was aborted');
      toast.error('File reading was aborted');
    };
    reader.onerror = () => {
      console.log('File reading has failed');
      toast.error('File reading has failed');
    };
    reader.onload = () => {
      // Do whatever you want with the file contents
      const fileStr = reader.result;

      toast.success(`Successfully loaded ${file.name}`);

      setDroppedFileName(file.name);
      setCsvString(fileStr as string);
      setIsDroppedFileLoaded(true);
    };

    try {
      reader.readAsText(file);
    } catch (ex) {
      toast.error(`Failed reading file: ${ex.message}`);
    }
  }, []);

  const resetDropFile = (e) => {
    setDroppedFileName('');
    setCsvString('');
    setIsDroppedFileLoaded(false);
  };

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept: '.csv',
  });

  const loadCsvStringToDataFrame = async () => {
    (window as any).csv_string = csvString;

    const loadCodeResult = await pyodideManager.runCode(createDataFrameCode);

    setDataFrame(loadCodeResult.output);
    (window as any).df = loadCodeResult.output;

    setSourceUrl(csvUrl);

    (window as any).router = router;

    router.push('/select');
  };

  return isWaiting ? (
    <LoadingOverlay callback={loadCsvStringToDataFrame} />
  ) : (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={0} />
      </Container>

      <div className={cx('fluidWrapper')}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Container>
          <Row className={styles.loadSourceComponent}>
            <Col>
              {!isDroppedFileLoaded && (
                <>
                  <label>URL to your CSV file</label>
                  <input
                    type="text"
                    className={cx('urlInput')}
                    onChange={(e) => setCsvUrl(e.target.value)}
                    value={csvUrl}
                    disabled={isDroppedFileLoaded}
                  />
                </>
              )}

              <div className={styles.dropBoxWrapper} {...getRootProps()}>
                <input {...getInputProps()} />

                {!isDroppedFileLoaded && (
                  <div className={styles.orDisplay}>
                    <span>OR</span>
                  </div>
                )}

                <div className={styles.dropBox}>
                  {isDroppedFileLoaded
                    ? 'Click or drop your file here to change'
                    : 'Select or drop your file here'}
                  {isDroppedFileLoaded && (
                    <span className={styles.fileName}>{droppedFileName}</span>
                  )}
                </div>
              </div>

              {isDroppedFileLoaded && (
                <button
                  className={styles.resetDropFileButton}
                  onClick={resetDropFile}
                >
                  ⌦ Clear File Selection
                </button>
              )}

              <div className={styles.proceedButtonWrapper}>
                <FullButton
                  label="Start Digging →"
                  disabled={
                    !pyodideManager || (!csvUrl && !isDroppedFileLoaded)
                  }
                  onClick={async () => {
                    // Normally, you would directly call a function to start loading the data
                    // However, the main UI will freeze and loading screen won't be displayed without using this wierd workaround where the loading component is first rendered, and then data starts to load

                    if (!isDroppedFileLoaded) {
                      await getCsvStringFromUrl(csvUrl);
                    }

                    setIsWaiting(true);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
