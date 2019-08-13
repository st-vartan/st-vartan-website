const speech = () => {
  return (
    <section className="page-section pt-10 pb-10 bg-grey-lighter">
      <div className="container relative">
        <div className="row">
          <div className="col-md-6 col-lg-6 mb-sm-40">
            {/* About Project */}
            <div className="text">
              <h3 className="mb-30 mb-xxs-10">Story of This Site</h3>
              <p>
                I began to play basketball in St.Vartan park since 2017. After that it is a very slow process for me to get familiar with hoopers on this court.
              </p>
              <p>
                Talented hoopers on this court make me a better player. Having runing with them, I come to realize things that are much more important than winning/losing
                games or basketball skills: trust, tolerance and support from teammates. To me, that's the best part of basketball.
              </p>

              <p>
                Yes! I build this site because I love St.Vartan hoops.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            {/* Work Gallery */}
            <div className="work-full-media mt-0 white-shadow wow fadeInUp">
              <ul className="clearlist work-full-slider owl-carousel">
                <li>
                  <img src="/static/images/about/5bro.jpg" alt="5 Bro" />
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
