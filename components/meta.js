import Head from 'next/head';
import globalStyle from '../styles/globalStyle.js';

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <style jsx global>
        {globalStyle}
      </style>
    </Head>
  </div>
);
