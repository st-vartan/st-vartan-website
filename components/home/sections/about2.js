import Link from 'next/link';
import Slider from 'react-slick';
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const about = () => {
    return (
        <section className="page-section" id="about">
            <style jsx>{`
        .grey-text {
          color: #333;
        }
      `}</style>
            <div className="container relative">
                <h2 className="section-title font-alt align-left mb-70 mb-sm-40">
                    St.Vartan Park Basketball
                    <Link href={'/about'}>
                        <a className="section-more right">
                            More about us <i className="fa fa-angle-right"></i>
                        </a>
                    </Link>
                </h2>

                <div className="row">
                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30">
                        <blockquote>
                            <p>
                                If you can shoot on a 11 double foot rim than you can shoot
                                anywhere.
                            </p>
                            <footer>
                                Sealy
                            </footer>
                        </blockquote>
                    </div>

                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30 grey-text">
                        Full court pick-up basketball has been a tradition at St.Vartan park
                        for years, ever dated back to 1960s. On work days, when the sun goes
                        down, basketball rises until dark. (5:30pm - 8:30pm). Court gets
                        packed with 3 teams or more in summer, so get ready for going through intense games so as to stay on court.
                    </div>

                    <div className="col-md-4 col-sm-6 mb-sm-50 mb-xs-30 grey-text">
                        We've established a pattern of playing organized games on Saturday mornings, from 9:00am.
                        based on whitch we're working on organizing a league.
                    </div>
                </div>
            </div>
        </section>


    );
};

export default about;
