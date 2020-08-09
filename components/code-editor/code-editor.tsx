import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './code-editor.module.scss';
import {
  editor,
  KeyMod,
  KeyCode,
} from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorDidMount, ControlledEditorOnChange } from '@monaco-editor/react';

const ControlledEditor = dynamic(
  import('@monaco-editor/react').then((mod) => mod.ControlledEditor),
  {
    ssr: false,
  }
);

type CodeEditorComponentProps = {
  defaultCode: string;
  language: string;
};

export default function CodeEditorComponent({
  defaultCode,
  language,
}: CodeEditorComponentProps) {
  const [editorValue, setEditorValue] = useState<string>(defaultCode);
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const handleEditorDidMount: EditorDidMount = (_, editor) => {
    console.log(`handleEditorDidMount`);

    console.log(editor);

    editorRef.current = editor;
  };

  const handleEditorChange: ControlledEditorOnChange = (ev, value) => {
    setEditorValue(value);
  };

  return (
    <div className={styles.codeEditorWrapper}>
      <ControlledEditor
        height="40vh"
        value={editorValue}
        editorDidMount={handleEditorDidMount}
        onChange={handleEditorChange}
        language={language}
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
