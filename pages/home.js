import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/Home'), {
  ssr: false,
});

export default props => {
  return <DynamicComponent />;
};
