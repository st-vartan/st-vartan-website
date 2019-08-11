const speech = () => {
    return (
        <section className="page-section pt-10 pb-10 bg-grey-lighter">
        <div className="container relative">
          <div className="row">
          <div className="col-md-6 col-lg-6 mb-sm-40">
              {/* About Project */}
              <div className="text">
                <h3 className="font-alt mb-30 mb-xxs-10">Story of this site</h3>
                <p>
                  This site is built with erver Side Rendering. I also leverage D3, SVG, Canvas, WebGL and RxJS for big data visualization for basketball,
                  if you're interested in technology behind this site, please visit <a href="https://github.com/st-vartan/st-vartan-website" target="_blank">Github project</a>
                </p>
              </div>
            </div>
          <div className="col-lg-6">
              {/* Work Gallery */}
              <div className="work-full-media mt-0 white-shadow wow fadeInUp">
                <ul className="clearlist work-full-slider owl-carousel">
                  <li>
                    <img src="/static/images/full-project-4.jpg" alt="" />
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
  