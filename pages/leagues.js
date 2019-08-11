import Layout from '../components/layout';
import Link from 'next/link';

const leagues = props => {
  return (
    <Layout title={'St.Vartan Basketball Leagues'}>
      <section className="small-section bg-dark">
        <div className="relative container align-left">
          <div className="row">
            <div className="col-md-8">
              <h1 className="hs-line-11 font-alt mb-10 mb-xs-0">Leagues</h1>
              <div className="hs-line-4 font-alt"></div>
            </div>

            <div className="col-md-4 mt-10">
              <div className="mod-breadcrumbs font-alt align-right">
                <Link href={'/'}>
                  <a>Home</a>
                </Link>
                &nbsp;/&nbsp;<span>Leagues</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="relative">
          <h2 className="section-title font-alt mb-40 mb-sm-40">
            St.Vartan League 2019 Summer Tour
          </h2>
          <div className='align-center'>
          <img
            src="/static/images/league/logo_tour_2019.png"
            alt="St.Vartan Tour 2019"
            style={{maxHeight: 200}}
          />
          </div>
        
          <div className="container mt-20">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="section-text align-center mb-70 mb-xs-40">
                  We're working with NYC Park and Nike on a organized league,
                  meanwhile join us on Saturday 9:00am. If you have any
                  questions, please reach us.
                  <br />
                  <br />
                  <a className="btn btn-mod btn-border btn-medium btn-round">
                    ink.xing.yun@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default leagues;
