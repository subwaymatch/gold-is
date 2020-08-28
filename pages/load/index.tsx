import { Row, Col } from 'react-bootstrap';

import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import LoadSource from 'components/load-source';

const steps = ['Load File', 'Transform', 'Analyze'];

export default function LoadPage() {
  return (
    <Layout>
      <StepsDisplay steps={steps} currentIndex={0} />

      <LoadSource />
    </Layout>
  );
}
