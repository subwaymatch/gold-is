import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './code-editor.module.scss';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { EditorDidMount, ControlledEditorOnChange } from '@monaco-editor/react';

const ControlledEditor = dynamic(
  import('@monaco-editor/react').then((mod) => mod.ControlledEditor),
  {
    ssr: false,
  }
);

type MonacoEditorComponentProps = {
  defaultCode: string;
  language: string;
};

export default function MonacoEditorComponent({
  defaultCode,
  language,
}: MonacoEditorComponentProps) {
  const [editorValue, setEditorValue] = useState<string>(defaultCode);
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>();

  const handleEditorDidMount: EditorDidMount = (_, editor) => {
    console.log(`handleEditorDidMount`);

    console.log(editor);

    editorRef.current = editor;

    // 3 == KeyCode.Enter, 2048 == KeyMod.CtrlCmd
    editor.addCommand(3 | 2048, () => {
      alert('CmdCtrl + Enter Pressed!');
    });
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
