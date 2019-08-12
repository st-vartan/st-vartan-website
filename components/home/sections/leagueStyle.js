import Link from 'next/link';

const leagueStyle = props => {
  return (
    <section className="page-section pt-0 pb-0 banner-section bg-dark">
      <div className="container relative">
        <div className="row">
          <div className="col-sm-6">
            <div className="mt-140 mt-lg-80 mb-140 mb-lg-80">
              <div className="banner-content">
                <h3 className="banner-heading font-alt">Basketball Lifestyle</h3>
                <div className="banner-decription">
                  Pour your energy on court and earn your name at St.Vartan park
                </div>
                <div className="local-scroll">
                  <Link href={'/lifestyle'}>
                    <a className="btn btn-mod btn-w btn-medium btn-round">
                      Explore more
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <img
              src="/static/images/lifestyle/tshirt_white_perfect_shot_carlos.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default leagueStyle;
