import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(import('@monaco-editor/react'), { ssr: false });

export default function MonacoEditorComponent(_) {
  return (
    <div style={{ backgroundColor: '#fc3' }}>
      <Editor height="30vh" language="python" />
    </div>
  );
}
