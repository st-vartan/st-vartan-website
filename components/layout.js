import Link from 'next/link';
import Head from 'next/head';
import globalStyle from '../styles/globalStyle.js';
import Nav from './nav';

export default ({ children, title = 'St.Vartan Hoops' }) => (
  <div>
    <Head>
      <title>{title}</title>
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
    <header>
      <Nav />
    </header>

    {children}
  </div>
);