import MonacoEditorComponent from 'components/monaco-editor';
import Layout from 'components/layout';

export default function MonacoEditorPage() {
  return (
    <Layout>
      <div className="row">
        <div className="col-3">Monaco</div>
        <div className="col-9">
          <MonacoEditorComponent />
        </div>
      </div>
    </Layout>
  );
}
