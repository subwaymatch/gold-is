import TransformOptions from 'components/transform-options';
import Layout from 'components/Layout';
import steps from 'constants/steps';
import StepsDisplay from 'components/steps-display';

export default function TransformPage() {
  return (
    <Layout>
      <StepsDisplay steps={steps} currentIndex={1} />

      <TransformOptions />
    </Layout>
  );
}
