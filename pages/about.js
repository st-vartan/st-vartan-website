const DynamicComponent = dynamic(() => import('../components/aboutUs'), {
    ssr: false,
});

const aboutUs = props => <DynamicComponent />;
export default aboutUs;
