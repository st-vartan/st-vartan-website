import {useEffect, Fragment} from 'react';

const magnificPopup = ({data}) => {

    useEffect(() => {
        $(".lightbox").magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            image: {
                titleSrc: 'title'
            }
        });
    }, []);
    return (
        <Fragment>
            <div className="container relative">
                <div className="row multi-columns-row mb-30 mb-xs-10">
                    {data.map(({thumbnail, caption, source}, i) => (
                        <div className="col-md-3 col-lg-3 mb-md-10" key={source + i}>
                            <a className="post-prev-img lightbox" href={source} title={caption}>
                                <img
                                    style={{cursor: 'pointer'}}
                                    src={thumbnail}
                                    alt={caption}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>


        </Fragment>
    );
};

export default magnificPopup;
