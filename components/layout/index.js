import Head from 'next/head';
import globalStyle from '../../styles/globalStyle.js';
import Nav from '../nav';
import FooterSection from './footer';

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
      <link
        rel="stylesheet"
        type="text/css"
        href="/static/rs-plugin/css/settings.css"
      />
      <script type="text/javascript" src="/static/js/jquery-1.11.2.min.js" />
      <script
        type="text/javascript"
        src="/static/rs-plugin/js/jquery.themepunch.tools.min.js"
      />
      <script
        type="text/javascript"
        src="/static/rs-plugin/js/jquery.themepunch.revolution.js"
      />
    </Head>
    <Nav />
    <div className="page" id="top">
      {children}
      <FooterSection />
    </div>
  </div>
);
