import Head from 'next/head';
import globalStyle from '../../styles/globalStyle.js';
import Nav from '../nav';
import FooterSection from './footer';

export default ({ children, title = 'St.Vartan Hoops', smallHeight = false }) => (
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
    <div className="page" id="top">
      <Nav smallHeight={smallHeight}/>
      {children}
      <FooterSection />
    </div>
  </div>
);
