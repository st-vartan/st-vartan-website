import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/players/russ'), {
  ssr: false,
});

export default props => {
  return <DynamicComponent />;
};
