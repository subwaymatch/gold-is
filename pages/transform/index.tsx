import TransformOptions from 'components/transform-options';
import Layout from 'components/Layout';
import { useState } from 'react';
import LoadingOverlay from 'components/loading-overlay';

export default function TransformPage() {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <LoadingOverlay />
  ) : (
    <Layout>
      <TransformOptions />
    </Layout>
  );
}
