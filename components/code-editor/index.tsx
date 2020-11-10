import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';
import styles from './code-editor.module.scss';

type CodeEditorProps = {
  value: string;
  onChange: (value) => void;
  onRun: (string) => void;
};

export default function CodeEditor({
  value,
  onChange,
  onRun,
}: CodeEditorProps) {
  const [lastRunCode, setLastRunCode] = useState('-');

  return (
    <div className={styles.codeEditorWrapper}>
      <div className={styles.aceWrapper}>
        <AceEditor
          placeholder="Placeholder Text"
          mode="python"
          theme="tomorrow"
          name="dfEditor"
          onLoad={() => {}}
          onChange={onChange}
          fontSize={20}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={value}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{
            width: '100%',
            lineHeight: '1.6',
          }}
        />
      </div>

      <div className={styles.controlsWrapper}>
        <button
          onClick={() => {
            onRun(value);
          }}
        >
          Run Code
        </button>
      </div>
    </div>
  );
}
