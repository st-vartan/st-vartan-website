import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/home'), {
  ssr: false,
});

export default props => {
  return <DynamicComponent />;
};
