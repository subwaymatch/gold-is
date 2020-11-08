import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow';
import classNames from 'classnames/bind';
import styles from './code-editor.module.scss';

const cx = classNames.bind(styles);

export default function CodeEditor() {
  return (
    <div className={cx('codeEditorWrapper')}>
      <div className={cx('aceWrapper')}>
        <AceEditor
          placeholder="Placeholder Text"
          mode="python"
          theme="tomorrow"
          name="dfEditor"
          onLoad={() => {}}
          onChange={() => {}}
          fontSize={20}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={`import pandas as pd
import numpy as np`}
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
    </div>
  );
}
