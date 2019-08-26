import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/aboutUs'), {
  ssr: false,
});

const aboutUs = props => <DynamicComponent />;
export default aboutUs;
