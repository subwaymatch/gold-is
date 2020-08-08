import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(import('@monaco-editor/react'), { ssr: false });

const MonacoEditorComponent = (_) => (
  <Editor height="90vh" language="javascript" />
);

export default MonacoEditorComponent;
