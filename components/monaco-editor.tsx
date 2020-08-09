import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ControlledEditor = dynamic(
  import('@monaco-editor/react').then((mod) => mod.ControlledEditor),
  {
    ssr: false,
  }
);
import styles from './monaco-editor.module.scss';

console.log(styles);

type MonacoEditorComponentProps = {
  defaultCode: string;
};

export default function MonacoEditorComponent({
  defaultCode,
}: MonacoEditorComponentProps) {
  const [editorValue, setEditorValue] = useState(defaultCode);

  const handleEditorChange = (ev, value) => {
    console.log(`handleEditorChange`);
    console.log(ev);
    console.log(value);

    setEditorValue(value);
  };

  return (
    <div className={styles.codeEditorWrapper}>
      <ControlledEditor
        height="40vh"
        value={editorValue}
        onChange={handleEditorChange}
        language="python"
        options={{
          folding: false,
          fontSize: 19,
          wordWrap: 'on',
          minimap: {
            enabled: false,
          },
          extraEditorClassName: styles.codeEditor,
        }}
      />
    </div>
  );
}
