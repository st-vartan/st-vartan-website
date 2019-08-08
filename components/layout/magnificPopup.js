import { useEffect } from 'react';

const toPhotos = data =>
  data.map((d, i) => (
    <div className="col-md-4 col-lg-4 mb-md-10" key={d.full + i}>
      <div className="post-prev-img">
        <a href={d.full} className="lightbox-gallery-2 mfp-image">
          <img src={d.cover} alt="" />
        </a>
      </div>
    </div>
  ));

const magnificPopup = ({ data }) => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const $ = window.jQuery || window.$;
    $(document).ready(function(){
      $('.lightbox-gallery-2').magnificPopup({
        type: 'image',
        gallery: {
          enabled: true,
        },
      });
    })
  }, []);
  const photos = toPhotos(data);
  return (
    <div className="container relative">
      <div className="row multi-columns-row mb-30 mb-xs-10">{photos}</div>
    </div>
  );
};

export default magnificPopup;
