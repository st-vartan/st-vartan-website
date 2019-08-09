import Link from 'next/link';
import { useEffect } from 'react';
import menuSideEffects, {
  init_classic_menu,
  init_classic_menu_resize,
} from './menuSideEffects';

const Index = () => {
  useEffect(() => {
    init_classic_menu();
    init_classic_menu_resize();
    menuSideEffects();
  });
  return (
    <nav className="main-nav dark transparent stick-fixed">
      <div className="full-wrapper relative clearfix">
        <div className="nav-logo-wrap">
          <Link href={'/'}>
            <a className="logo">
              <img src="/static/images/logo-white.png" alt="" />
            </a>
          </Link>
        </div>

        <div className="mobile-nav">
          <i className="fa fa-bars"></i>
        </div>

        <div className="inner-nav desktop-nav">
          <ul className="clearlist">
            {/*<li>*/}
            {/*  <a href="#" className="mn-has-sub active">*/}
            {/*    Players <i className="fa fa-angle-down"></i>*/}
            {/*  </a>*/}

            {/*  <ul className="mn-sub">*/}
            {/*    <li>*/}
            {/*      <Link href={'/russ'}>*/}
            {/*        <a>Russ</a>*/}
            {/*      </Link>*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            {/*</li>*/}
            <li>
              <Link href={'/'}>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href={'/players'}>
                <a>PLayers</a>
              </Link>
            </li>
            <li>
              <Link href={'/leagues'}>
                <a>Leagues</a>
              </Link>
            </li>
            <li>
              <Link href={'/visualization'}>
                <a>Visualization</a>
              </Link>
            </li>
            <li>
              <Link href={'/gallery'}>
                <a>Gallery</a>
              </Link>
            </li>
            <li>
              <Link href={'/lifestyle'}>
                <a>Lifestyle</a>
              </Link>
            </li>
            <li>
              <Link href={'/about'}>
                <a>About</a>
              </Link>
            </li>
            <li>
              <a
                href={'https://github.com/st-vartan/st-vartan-website'}
                target="_blank"
              >
                Github
              </a>
            </li>
            {/*<li>*/}
            {/*  <a href="#" className="mn-has-sub">*/}
            {/*    <i className="fa fa-search"></i> Search*/}
            {/*  </a>*/}

            {/*  <ul className="mn-sub">*/}
            {/*    <li>*/}
            {/*      <div className="mn-wrap">*/}
            {/*        <form method="post" className="form">*/}
            {/*          <div className="search-wrap">*/}
            {/*            <input*/}
            {/*              type="text"*/}
            {/*              className="form-control search-field"*/}
            {/*              placeholder="Search..."*/}
            {/*            />*/}
            {/*            <button*/}
            {/*              className="search-button animate"*/}
            {/*              type="submit"*/}
            {/*              title="Start Search"*/}
            {/*            >*/}
            {/*              <i className="fa fa-search"></i>*/}
            {/*            </button>*/}
            {/*          </div>*/}
            {/*        </form>*/}
            {/*      </div>*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            {/*</li>*/}
          </ul>
        </div>
        {/* End Main Menu */}
      </div>
    </nav>
  );
};

export default Index;
