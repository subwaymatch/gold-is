import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './monaco-editor.module.scss';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorDidMount } from '@monaco-editor/react';

const ControlledEditor = dynamic(
  import('@monaco-editor/react').then((mod) => mod.ControlledEditor),
  {
    ssr: false,
  }
);

type MonacoEditorComponentProps = {
  defaultCode: string;
};

export default function MonacoEditorComponent({
  defaultCode,
}: MonacoEditorComponentProps) {
  const [editorValue, setEditorValue] = useState(defaultCode);
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>();

  const handleEditorDidMount: EditorDidMount = (_, editor) => {
    console.log(`handleEditorDidMount`);

    console.log(editor);

    editorRef.current = editor;
  };

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
        editorDidMount={handleEditorDidMount}
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
