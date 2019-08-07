import {Link as ScrollLink} from "react-scroll/modules";
const introduction = () => ( <section
    className="home-section bg-dark-alfa-30"
    id="home"
    style={{
        backgroundPosition: '50% 0px',
        backgroundImage: 'url("/static/images/court_bg.jpg")',
    }}
>
    <div className="js-height-full container">
        <style jsx>
            {`
          .home-title {
            font-size: 70px;
            font-weight: 600;
            letter-spacing: 18px;
          }
          .home-sub-title {
            opacity: 0.8;
            font-size: 18px;
          }
        `}
        </style>
        <div className="home-content">
            <div className="home-text">
                <h1 className="hs-line-1 home-title font-alt mb-80 mb-xs-30 mt-50 mt-sm-0">
                    St.Vartan Hoops
                </h1>

                <div className="hs-line-6 home-sub-title">
                    Competition Passion Love
                </div>
            </div>
        </div>
        <ScrollLink to={'about'} spy={true} smooth={true}>
            <div className="scroll-down">
                <i className="fa fa-angle-down scroll-down-icon"></i>
            </div>
        </ScrollLink>
    </div>
</section>);

export default introduction;