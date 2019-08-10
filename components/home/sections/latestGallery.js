import Link from 'next/link';
import { Fragment } from 'react';

const LatestGallery = () => (
  <Fragment>
    <section className="page-section pb-0" id="portfolio">
      <div className="relative">
        <div className="section-icon">
          <span className="icon-trophy" />
        </div>
        <h2 className="section-title font-alt mb-30 mb-xxs-10">
          2019 Summer Tour
        </h2>
        <div className="section-text align-center mb-20 mb-md-20 mb-sm-20">
          St.Vartan Basketball Tournament is a summer street basketball league
          running for 10 weeks 7 DAYS A WEEK from June - August every summer.
        </div>

        <ul className="works-grid work-grid-3 work-grid-gut clearfix font-alt hover-white hide-titles">
          <li className="work-item">
            <div className="work-ext-link">
              <div className="work-img">
                <img
                  className="work-img"
                  src="/static/images/projects-13.jpg"
                  alt="Russ"
                />
              </div>
              <div className="work-intro">
                <h3 className="work-title">Russ</h3>
                <div className="work-descr">Hook shot</div>
              </div>
            </div>
          </li>

          <li className="work-item">
            <div className="work-ext-link">
              <div className="work-img">
                <img
                  className="work-img"
                  src="/static/images/projects-14.jpg"
                  alt="Work"
                />
              </div>
              <div className="work-intro">
                <h3 className="work-title">George</h3>
                <div className="work-descr">A good shot</div>
              </div>
            </div>
          </li>

          <li className="work-item">
            <div className="work-ext-link">
              <div className="work-img">
                <img
                  className="work-img"
                  src="/static/images/projects-6.jpg"
                  alt="Work"
                />
              </div>
              <div className="work-intro">
                <h3 className="work-title">Jordan</h3>
                <div className="work-descr">3 pt down pour</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section className="small-section bg-dark">
      <div className="container relative">
        <div className="align-center">
          <div>
            <Link href={'/gallery'}>
              <a className="btn btn-mod btn-w btn-medium btn-round">
                Join League
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

export default LatestGallery;
