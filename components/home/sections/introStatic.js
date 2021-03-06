import { Link as ScrollLink } from 'react-scroll/modules';
const introduction = () => (
  <section
    className="home-section bg-dark bg-dark-alfa-70"
    id="home"
    style={{
      backgroundPosition: '50% 0px',
      backgroundImage: 'url("/static/images/home/court_bg.jpg")',
    }}
  >
    <div className="js-height-full container">
      <div className="home-content">
        <div className="home-text">
          <h1 className="hs-line-1 home-title font-alt mb-80 mb-xs-30 mt-50 mt-sm-0">
            St.Vartan Hoops
          </h1>

          <div className="hs-line-6 home-sub-title">
            <p>When the sun goes down, basketball rises</p>
          </div>
        </div>
      </div>
      <ScrollLink to={'about'} spy={true} smooth={true}>
        <div className="scroll-down">
          <i className="fa fa-angle-down scroll-down-icon"></i>
        </div>
      </ScrollLink>
    </div>
  </section>
);

export default introduction;
