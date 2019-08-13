import Link from 'next/link';
import Layout from '../layout';
import data from './data';

const players = () => {
  const items = data.map((d, i) => {
    return (
      <li
        className="work-item dark-hover col-md-2 col-lg-2 col-xs-4 col-sm-3 mb-60 mb-xs-40"
        key={d.name + i}
      >
        <Link href={'/' + d.url}>
          <a className="work-lightbox-link mfp-image">
            <div className="work-img">
              <img src={d.image} alt={d.name} key={d.name + i} />
            </div>
            <div className="work-intro">
              <h3 className="work-title">{d.name}</h3>
              <div className="work-descr">{d.desc}</div>
            </div>
          </a>
        </Link>
      </li>
    );
  });

  return (
    <Layout title={'St.Vartan Basektball Players'}>
      <section className="small-section bg-dark">
        <div className="relative container align-left">
          <div className="row">
            <div className="col-md-8">
              <h1 className="hs-line-11 font-alt mb-10 mb-xs-0">Players</h1>
            </div>

            <div className="col-md-4 mt-10">
              <div className="mod-breadcrumbs font-alt align-right">
                <Link href={'/'}>
                  <a>Home</a>
                </Link>
                &nbsp;/&nbsp;<span>Players</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section pb-0">
        <div className="container relative">
          <ul
            className={'works-grid clearfix font-alt hover-white work-grid-gut'}
          >
            {items}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default players;
