import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const map = () => {
    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoiYmlnZmF0ZG9nIiwiYSI6ImM1ZWIyYzYzMzkyM2JlMTc0M2VjNmRlOTk5NDdkN2VjIn0.DoyA-reichUjF_FO9dkazQ'
    });

    return (
        <section className="page-section" id="map">
            <div className="container relative">
                <div className="text">
                    <h3 className="font-alt mb-30 mb-xxs-10">Find us</h3>
                    <p>
                        1st Avenue &, E 35th St, New York, NY 10016
                    </p>

                    <div className="mt-40">
                        <Map
                            style="mapbox://styles/mapbox/streets-v9"
                            containerStyle={{
                                height: '100vh',
                                width: '100vw'
                            }}
                        >
                            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                            </Layer>
                        </Map>;
                    </div>
                </div>
            </div>
        </section>
    )
}

export default map;