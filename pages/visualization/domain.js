import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(
  () => import('../../components/visualization'),
  {
    ssr: false,
  }
);
export default props => {
  return <DynamicComponent layout={'domain'} />;
};
