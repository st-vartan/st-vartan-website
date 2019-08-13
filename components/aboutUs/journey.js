const speech = () => {
  return (
    <section className="page-section pt-10 pb-10 bg-grey-lighter">
      <div className="container relative">
        <div className="row">
          <div className="col-md-6 col-lg-6 mb-sm-40">
            {/* About Project */}
            <div className="text">
              <h3 className="mb-30 mb-xxs-10">Story of this site</h3>
              <p>
                I came to NYC and began to play basketball in St.Vartan park since 2017. After that it is a very slow process for me to get familiar with hoopers on this court.

              </p>
              <p>
                I avoid fake friendliness or being unwillingly social on a basketball court. Life is so short and time is
                precious, why not staying sincere and honest to the very myself, get to know people only who you appreciate
              </p>
              <p>
                Talented hoopers on this court make me a better player. Sometimes I feel things much more important than winning/losing
                games or basketball skills: trust, tolerance, support from teammates, and that drives me to make this website.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            {/* Work Gallery */}
            <div className="work-full-media mt-0 white-shadow wow fadeInUp">
              <ul className="clearlist work-full-slider owl-carousel">
                <li>
                  <img src="/static/images/court_bg.jpg" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default speech;
