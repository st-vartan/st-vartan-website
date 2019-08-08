import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/gallery'), {
    ssr: false,
});

export default props => {
    return <DynamicComponent />;
};
