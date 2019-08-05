import Link from 'next/link';
import dynamic from 'next/dynamic';
import Head from '../components/head';
import Nav from '../components/nav';
import { useEffect } from 'react';

const DynamicComponent = dynamic(() => import('../components/home'), {
  ssr: false,
});

export default props => {
  return <DynamicComponent />;
};
