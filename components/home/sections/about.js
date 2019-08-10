import Link from 'next/link';
import Slider from 'react-slick';
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const about = () => {
  return (
      <section className="page-section" id="about">
        <div className="container relative">
          <h2 className="section-title font-alt">
            About St.Vartan Basketball
          </h2>

          <div className="row">

            <div className="col-md-8 col-md-offset-2">
              <div className="section-text align-center">
                  <p>
                    Full court pick-up basketball has been a tradition at St.Vartan park
                    for years, ever dated back to 1960s. On work days, when the sun goes
                    down, basketball rises until dark. (5:30pm - 8:30pm). On Saturday mornings, regular people play organized games from
                      9:00am.
                  </p>
                <div>
                  <a href="#start" className="btn btn-mod btn-border btn-medium btn-round mb-10">Pick-up</a>
                  <span className="hidden-xs">&nbsp;</span>
                  <a href="http://themeforest.net/user/theme-guru/portfolio"
                     className="btn btn-mod btn-border btn-medium btn-round mb-10">Join League</a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>


  );
};

export default about;
