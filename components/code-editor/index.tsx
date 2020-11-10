import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';
import styles from './code-editor.module.scss';

type CodeEditorProps = {
  templateCode: string;
  onRun: (string) => void;
};

export default function CodeEditor({ templateCode, onRun }: CodeEditorProps) {
  const [userCode, setUserCode] = useState(templateCode);
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
          onChange={setUserCode}
          fontSize={20}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={userCode}
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
            onRun(userCode);
          }}
        >
          Run Code
        </button>
      </div>
    </div>
  );
}
