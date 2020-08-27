import Layout from 'components/Layout';
import pyodideManager from 'lib/pyodide/manager';
import { useState } from 'react';

export default function PyodideTestPage() {
  const [code, setCode] = useState('5 + 8');

  (async () => {
    console.log(pyodideManager);
  })();

  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <h1>Pyodide Test</h1>

          <textarea value={code} onChange={(e) => setCode(e.target.value)} />

          <button onClick={() => pyodideManager.runCode(code)}>Run Code</button>
        </div>
      </div>
    </Layout>
  );
}
