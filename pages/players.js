import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/players'), {
    ssr: false,
});

export default props => {
    return <DynamicComponent />;
};
