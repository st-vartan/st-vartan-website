import { Fragment } from 'react';
import Link from 'next/link';

const leagues = () => (
  <Fragment>
    <section className="small-section bg-gray-lighter">
      <div className="container relative">
        <div className="section-icon">
          <span className="icon-trophy" />
        </div>
        <h2 className="section-title font-alt mb-30 mb-xxs-10">
          2019 Summer Tour
        </h2>
        <div className="section-text align-center">
          St.Vartan Basketball Tournament is a summer street basketball league
          running for 10 weeks 7 DAYS A WEEK from June - August every summer.
        </div>
      </div>
    </section>
    <section
      className="page-section banner-section bg-dark bg-dark-alpha-80"
      data-background="/static/images/court_bg.jpg"
      style={{
        backgroundImage: 'url(/static/images/home/tour_1.jpg)',
        opacity: 1,
        display: 'block',
      }}
    ></section>
      <section className="small-section bg-gray-lighter">
          <div className={'align-center'}>
              <Link href={'/leagues'}>
                  <a className="btn btn-mod btn-border btn-medium btn-round">
                      Join League
                  </a>
              </Link>
          </div>
      </section>

  </Fragment>
);

export default leagues;
