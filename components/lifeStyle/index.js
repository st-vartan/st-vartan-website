import Link from 'next/link';
import Layout from '../layout';
import MagnificPopup from '../util/magnificPopup';
import data from './data';

const lifestyle = props => {
  return (
    <Layout title={'St.Vartan Basketball Life Style'}>
      <section className="small-section bg-dark">
        <div className="relative container align-left">
          <div className="row">
            <div className="col-md-8">
              <h1 className="hs-line-11 font-alt mb-10 mb-xs-0">Life Style</h1>
              <div className="hs-line-4 font-alt"></div>
            </div>

            <div className="col-md-4 mt-10">
              <div className="mod-breadcrumbs font-alt align-right">
                <Link href={'/'}>
                  <a>Home</a>
                </Link>
                &nbsp;/&nbsp;<span>Life Style</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className='container'>
        <div className="row multi-columns-row">
            {styleItems}
        </div>
      </div> */}
      <section className="page-section" style={{ paddingTop: 20 }}>
        <MagnificPopup
          data={data.map(d => ({
            thumbnail: d.image,
            source: d.image,
            caption: d.title + ' ' + d.desc,
          }))}
        />
      </section>
    </Layout>
  );
};
export default lifestyle;
