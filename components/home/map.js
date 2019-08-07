import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const POSITION_CIRCLE_PAINT = {
  'circle-stroke-width': 1,
  'circle-radius': 8,
  'circle-color': '#fe0000',
  'circle-opacity': 0.8,
  'circle-stroke-color': 'white'
};

const map = () => {
  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiYmlnZmF0ZG9nIiwiYSI6ImM1ZWIyYzYzMzkyM2JlMTc0M2VjNmRlOTk5NDdkN2VjIn0.DoyA-reichUjF_FO9dkazQ',
  });

  return (
    <section className="page-section" id="map">
      <div className="container relative">
        <div className="text">
          <h3 className="section-title font-alt mb-30 mb-xxs-10">Find us</h3>
          <p className="align-center">
            1st Avenue &, E 35th St, New York, NY 10016
          </p>

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
};

export default map;
