import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/rs-plugin/css/settings.css"
          />
          <link rel="stylesheet" href="//cdn.jsdelivr.net/jquery.magnific-popup/1.0.0/magnific-popup.css"/>
          {/*<script*/}
          {/*  type="text/javascript"*/}
          {/*  src="/static/js/jquery-1.11.2.min.js"*/}
          {/*/>*/}
          <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
          <script src="//cdn.jsdelivr.net/jquery.magnific-popup/1.0.0/jquery.magnific-popup.min.js"></script>
          <script
            type="text/javascript"
            src="/static/rs-plugin/js/jquery.themepunch.tools.min.js"
          />
          <script
            type="text/javascript"
            src="/static/rs-plugin/js/jquery.themepunch.revolution.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
