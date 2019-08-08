import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const POSITION_CIRCLE_PAINT = {
  'circle-stroke-width': 1,
  'circle-radius': 8,
  'circle-color': '#fe0000',
  'circle-opacity': 0.8,
  'circle-stroke-color': 'white',
};

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYmlnZmF0ZG9nIiwiYSI6ImM1ZWIyYzYzMzkyM2JlMTc0M2VjNmRlOTk5NDdkN2VjIn0.DoyA-reichUjF_FO9dkazQ',
});

const map = () => (
  <section className="page-section" id="map">
    <div className="container relative">
      <div className="text">
        <h3 className="section-title font-alt mb-30 mb-xxs-10">Find us</h3>

        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="row">
              {/* Phone */}
              <div className="col-sm-6 col-lg-4 pt-20 pb-20 pb-xs-0">
                <div className="contact-item">
                  <div className="ci-icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="ci-title font-alt">Call Us</div>
                  <div className="ci-text">917-856-9616</div>
                </div>
              </div>
              {/* End Phone */}

              {/* Address */}
              <div className="col-sm-6 col-lg-4 pt-20 pb-20 pb-xs-0">
                <div className="contact-item">
                  <div className="ci-icon">
                    <i className="fa fa-map-marker"></i>
                  </div>
                  <div className="ci-title font-alt">Address</div>
                  <div className="ci-text">2nd AVE E 35th St</div>
                </div>
              </div>
              {/* End Address */}

              {/* Email */}
              <div className="col-sm-6 col-lg-4 pt-20 pb-20 pb-xs-0">
                <div className="contact-item">
                  <div className="ci-icon">
                    <i className="fa fa-envelope"></i>
                  </div>
                  <div className="ci-title font-alt">Email</div>
                  <div className="ci-text">
                    <a href="mailto:ink.xing.yun@gmail.com">
                      ink.xing.yun@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              {/* End Email */}
            </div>
          </div>
        </div>

        <div className="mt-40">
          <Map
            style="mapbox://styles/mapbox/light-v9"
            attributionControl={false}
            center={[-73.974317, 40.745468]}
            zoom={[12]}
            containerStyle={{
              height: '400px',
              width: '100%',
            }}
          >
            <Layer
              type="circle"
              id="marker"
              // layout={{ 'icon-image': 'marker-15' }}
              paint={POSITION_CIRCLE_PAINT}
            >
              <Feature coordinates={[-73.974317, 40.745468]} />
            </Layer>
          </Map>
        </div>
      </div>
    </div>
  </section>
);

export default map;
