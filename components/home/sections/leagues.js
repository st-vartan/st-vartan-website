import { Fragment } from "react";
import Link from "next/link";

const leagues = () => (
  <Fragment>
    <section className="small-section bg-gray-lighter">
      <div className="container relative">
        <h2 className="section-title font-alt mb-30 mb-xxs-10">
          2019 Summer Tour
        </h2>
        <div className="section-icon">
          <img
            src="/static/images/league/logo_tour_2019.png"
            alt="St.Vartan Tour 2019"
            style={{maxHeight: 200}}
          />
        </div>
        <div className="section-text align-center mt-20 mb-10">
          St.Vartan Basketball Tournament is a summer street basketball league
          running for 10 weeks 7 DAYS A WEEK from June - August every summer.
        </div>
      </div>
    </section>
    <section
      className="page-section banner-section bg-dark bg-dark-alpha-80"
      data-background="/static/images/court_bg.jpg"
      style={{
        backgroundImage: "url(/static/images/home/welcome_league.jpg)",
        opacity: 1,
        minHeight: 400,
        display: "block"
      }}
    ></section>
    <section className="small-section bg-gray-lighter">
      <div className={"align-center"}>
        <Link href={"/leagues"}>
          <a className="btn btn-mod btn-border btn-medium btn-round">
            Join League
          </a>
        </Link>
      </div>
    </section>
  </Fragment>
);

export default leagues;
