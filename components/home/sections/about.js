import Link from 'next/link';

const about = () => {
  return (
    <section className="page-section" id="about">
      <div className="container relative">
        <h2 className="section-title font-alt align-left mb-70 mb-sm-40">
          St.Vartan Park Basketball
          <Link href={'/about'}>
            <a className="section-more right">
              More about us <i className="fa fa-angle-right"></i>
            </a>
          </Link>
        </h2>

        <div className="section-text">
          <div className="row">
            <div className="col-md-4 mb-sm-50 mb-xs-30">
              {/* Bar Item */}
              <div className="progress tpl-progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="90"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  Branding, % <span>90</span>
                </div>
              </div>
              {/* End Bar Item */}

              {/* Bar Item */}
              <div className="progress tpl-progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  Design, % <span>80</span>
                </div>
              </div>
              {/* End Bar Item */}

              {/* Bar Item */}
              <div className="progress tpl-progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="85"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  Development, % <span>85</span>
                </div>
              </div>
              {/* End Bar Item */}
            </div>

            <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              maximus ligula semper metus pellentesque mattis. Maecenas
              volutpat, diam enim sagittis quam, id porta quam. Sed id dolor
              consectetur fermentum nibh volutpat, accumsan purus.
            </div>

            <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
              Etiam sit amet fringilla lacus. Pellentesque suscipit ante at
              ullamcorper pulvinar neque porttitor. Integer lectus. Praesent sed
              nisi eleifend, fermentum orci amet, iaculis libero. Donec vel
              ultricies purus. Nam dictum sem, eu aliquam.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default about;
