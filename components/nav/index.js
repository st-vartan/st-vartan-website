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
      <style jsx>{`
        .inner-nav > ul > li > a,
        .mobile-nav {
          height: 75px;
        }
        
        .mobile-nav {
          width: 75px;
        }
      `}</style>
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
          </ul>
        </div>
        {/* End Main Menu */}
      </div>
    </nav>
  );
};

export default Index;
