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
            href="https://stackpath.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"
          />
          <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js" />
          <script src="/static/js/jquery.magnific-popup.min.js" />
          <script
            type={'text/javascript'}
            src={
              'https://stackpath.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js'
            }
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
