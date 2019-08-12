import { Link as ScrollLink } from 'react-scroll';

const footer = () => (
  <footer className="page-section bg-gray-lighter footer pb-60">
    <div className="container">
      <div className="mb-30">
        <ScrollLink to={'top'} spy={true} smooth={true}>
          <img
            src="/static/images/logo-footer.png"
            width="78"
            height="36"
            alt=""
          />
        </ScrollLink>
      </div>

      {/* End Footer Logo */}

      {/* Social Links */}
      <div className="footer-social-links mb-110 mb-xs-60">
        <a href="#" title="Facebook" target="_blank">
          <i className="fa fa-facebook"></i>
        </a>
        <a href="#" title="Twitter" target="_blank">
          <i className="fa fa-twitter"></i>
        </a>
        <a href="#" title="Behance" target="_blank">
          <i className="fa fa-behance"></i>
        </a>
        <a href="#" title="LinkedIn+" target="_blank">
          <i className="fa fa-linkedin"></i>
        </a>
        <a href="#" title="Pinterest" target="_blank">
          <i className="fa fa-pinterest"></i>
        </a>
      </div>
      {/* End Social Links */}

      {/* Footer Text */}
      <div className="footer-text">
        <div className="footer-copy font-alt">
          <a href="https://bigfatdog.github.io/" target="_blank">
            &copy; Yun Xing 2019
          </a>
        </div>

        <div className="footer-made">Made with love for hoopers</div>
      </div>
    </div>

    {/* Top Link */}
    <ScrollLink to={'top'} spy={true} smooth={true}>
      <div className="link-to-top">
        <i className="fa fa-caret-up"></i>
      </div>
    </ScrollLink>

    {/* End Top Link */}
  </footer>
);

export default footer;
