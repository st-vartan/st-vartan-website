import Head from './head';
import Link from 'next/link';
import Page from "./page";

const Nav = () => (
    <nav className="main-nav dark transparent stick-fixed">
      <div className="full-wrapper relative clearfix">
        <div className="nav-logo-wrap">
          <a href="intro.html" className="logo">
            <img src="/static/images/logo-white.png" alt="" />
          </a>
        </div>

        <div className="mobile-nav">
          <i className="fa fa-bars"></i>
        </div>

        <div className="inner-nav desktop-nav">
          <ul className="clearlist">
            <li>
              <a href="#" className="mn-has-sub active">
                Home <i className="fa fa-angle-down"></i>
              </a>

              <ul className="mn-sub mn-has-multi">
                <li className="mn-sub-multi">
                  <a className="mn-group-title">Multi Page</a>

                  <ul>
                    <li>
                      <a href="mp-index.html">Main Demo</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <a href="#" className="mn-has-sub">
                <i className="fa fa-search"></i> Search
              </a>

              <ul className="mn-sub">
                <li>
                  <div className="mn-wrap">
                    <form method="post" className="form">
                      <div className="search-wrap">
                        <input
                            type="text"
                            className="form-control search-field"
                            placeholder="Search..."
                        />
                        <button
                            className="search-button animate"
                            type="submit"
                            title="Start Search"
                        >
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </li>
              </ul>
            </li>
            {/* End Search */}

            {/* Cart */}
            <li>
              <a href="#">
                <i className="fa fa-shopping-cart"></i> Cart(0)
              </a>
            </li>
            {/* End Cart */}

            {/* Languages */}
            <li>
              <a href="#" className="mn-has-sub">
                Eng <i className="fa fa-angle-down"></i>
              </a>

              <ul className="mn-sub">
                <li>
                  <a href="">English</a>
                </li>
                <li>
                  <a href="">France</a>
                </li>
                <li>
                  <a href="">Germany</a>
                </li>
              </ul>
            </li>
            {/* End Languages */}
          </ul>
        </div>
        {/* End Main Menu */}
      </div>
    </nav>
);

export default Nav;
