import Layout from '../components/layout';
import DomainVis from '../components/domain';
import Link from 'next/link';

const leagues = props => {
  return (
    <Layout title={'St.Vartan Basketball Leagues'}>
      <section className="small-section bg-dark">
        <div className="relative container align-left">
          <div className="row">
            <div className="col-md-8">
              <h1 className="hs-line-11 font-alt mb-10 mb-xs-0">
                Visualization
              </h1>
              <div className="hs-line-4 font-alt"></div>
            </div>

            <div className="col-md-4 mt-10">
              <div className="mod-breadcrumbs font-alt align-right">
                <Link href={'/'}>
                  <a>Home</a>
                </Link>
                &nbsp;/&nbsp;<span>Data Visualization</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DomainVis/>
    </Layout>
  );
};
export default leagues;
