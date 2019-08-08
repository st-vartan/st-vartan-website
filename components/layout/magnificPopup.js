import { useEffect, useState, Fragment } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';

const magnificPopup = ({ data }) => {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const clickImg = idx => {
    setLightboxIsOpen(!lightboxIsOpen);
    setSelectedIndex(idx);
  };

  useEffect(() => {}, []);
  return (
    <Fragment>
      <div className="container relative">
        <div className="row multi-columns-row mb-30 mb-xs-10">
          {data.map(({ thumbnail, caption, source }, i) => (
            <div className="col-md-4 col-lg-4 mb-md-10" key={source + i}>
              <div className="post-prev-img">
                  <img style={{     cursor: 'pointer'}}
                    onClick={() => clickImg(i)}
                    src={thumbnail}
                    alt={caption}
                  />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalGateway>
        {lightboxIsOpen ? (
          <Modal onClose={clickImg}>
            <Carousel
              components={null}
              currentIndex={selectedIndex}
              frameProps={{ autoSize: 'height' }}
              views={data}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </Fragment>
  );
};

export default magnificPopup;
