import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsText(file);
    });
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

  return (
    <div
      style={{
        width: '600px',
        height: '600px',
        background: '#eee',
      }}
      {...getRootProps({ className: 'dropzone' })}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>

      <div>
        <h2>Accepted Files</h2>
        {acceptedFiles.map((file, idx) => (
          <div key={idx}>{(file as any).path}</div>
        ))}

        <h2>Rejected Files</h2>
        {fileRejections.map(({ file, errors }, idx) => (
          <div key={idx}>
            {(file as any).path}
            {errors.map((err) => (
              <div key={err.code}>{err.message}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
