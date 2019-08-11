import Link from 'next/link';

const leagueStyle = props => {
  return (
    <section class="page-section pt-0 pb-0 banner-section bg-dark">
      <div class="container relative">
        <div class="row">
          <div class="col-sm-6">
            <div class="mt-140 mt-lg-80 mb-140 mb-lg-80">
              <div class="banner-content">
                <h3 class="banner-heading font-alt">Basketball Lifestyle</h3>
                <div class="banner-decription">
                  Pour your energy on court and earn your name on St.Vartan park
                </div>
                <div class="local-scroll">
                  <Link href={'/lifestyle'}>
                    <a className="btn btn-mod btn-w btn-medium btn-round">
                      Explore more
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6 banner-image">
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
