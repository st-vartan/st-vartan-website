

import Link from 'next/link';
import Layout from '../layout';
import SpeechSection from './speech';

const aboutUs = props => {
  return (
    <Layout title={'St.Vartan Basketball About Us'}>
      <section className="small-section bg-dark">
        <div className="relative container align-left">
          <div className="row">
            <div className="col-md-8">
              <h1 className="hs-line-11 font-alt mb-10 mb-xs-0">About Us</h1>
              {/* <div className="hs-line-4 font-alt">aaa</div> */}
            </div>

            <div className="col-md-4 mt-10">
              <div className="mod-breadcrumbs font-alt align-right">
                <Link href={'/'}>
                  <a>Home</a>
                </Link>
                &nbsp;/&nbsp;<span>About Us</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SpeechSection/>
    </Layout>
  );
};
export default aboutUs;