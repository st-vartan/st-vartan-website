import Link from 'next/link';

const teams = () => {
  return (
    <section className="page-section" id="news">
      <div className="container relative">
        <h2 className="section-title font-alt align-left mb-70 mb-sm-40">
          Memories
          <Link href={'/leagues'}>
            <a className="section-more right">
              All Galleries <i className="fa fa-angle-right"></i>
            </a>
          </Link>
        </h2>

        <div className="row multi-columns-row">
          <div className="col-sm-6 col-md-4 col-lg-4 mb-md-50">
            <div className="post-prev-img">
              <a href="blog-single-sidebar-right.html">
                <img src="/static/images/home/tour_1.jpg" alt="" />
              </a>
            </div>

            <div className="post-prev-title font-alt">
              <a href="">5 Bros | August 2019</a>
            </div>

            <div className="post-prev-text">
              From Left to right: George, Russ, Peter, Yun, Nick
            </div>
          </div>
          {/* End Post Item */}

          {/* Post Item */}
          <div className="col-sm-6 col-md-4 col-lg-4 mb-md-50">
            <div className="post-prev-img">
              <a href="blog-single-sidebar-right.html">
                <img src="/static/images/archive/post-prev-2.jpg" alt="" />
              </a>
            </div>

            <div className="post-prev-title font-alt">
              <a href="">Team B</a>
            </div>

            <div className="post-prev-info font-alt">
              <a href="">John Doe</a> | 9 December
            </div>

            <div className="post-prev-text">
              Maecenas volutpat, diam enim sagittis quam, id porta quam. Sed id
              dolor consectetur fermentum nibh volutpat, accumsan purus.
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-4 mb-md-50">
            <div className="post-prev-img">
              <a href="blog-single-sidebar-right.html">
                <img src="/static/images/archive/post-prev-3.jpg" alt="" />
              </a>
            </div>

            <div className="post-prev-title font-alt">
              <a href="">Team C</a>
            </div>

            <div className="post-prev-info font-alt">
              <a href="">John Doe</a> | 7 December
            </div>

            <div className="post-prev-text">
              Maecenas volutpat, diam enim sagittis quam, id porta quam. Sed id
              dolor consectetur fermentum nibh volutpat, accumsan purus.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default teams;
