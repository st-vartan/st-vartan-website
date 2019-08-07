import Head from 'next/head';
import globalStyle from '../styles/globalStyle';
import { useEffect } from 'react';

const shop = props => {
  return (
    <div>
      <Head>
        <title>shop</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta charSet="utf-8" />
        <meta name="author" content="Yun Xing" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <style jsx global>
          {globalStyle}
        </style>
      </Head>
      <div>new shop</div>
    </div>
  );
};
export default shop;
