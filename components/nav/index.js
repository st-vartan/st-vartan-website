import Link from 'next/link';
import { useEffect } from 'react';
import menuSideEffects, {
  init_classic_menu,
  init_classic_menu_resize,
} from './menuSideEffects';

const Nav = ({smallHeight}) => {
  useEffect(() => {
    init_classic_menu();
    init_classic_menu_resize();
    menuSideEffects();
  });

  const navClass = smallHeight === true
      ? 'main-nav dark stick-fixed'
      : 'main-nav dark transparent js-transparent stick-fixed'
  return (
    <nav className={navClass}>
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
              <a href="#" className="mn-has-sub">Visualization <i className="fa fa-angle-down"></i></a>
              <ul className="mn-sub to-left" style={{display: 'none'}}>
                <li>
                  <Link href={'/visualization/biome'}>
                    <a >Biome</a>
                  </Link>
                </li>
                <li>
                  <Link href={'/visualization/threat'}>
                    <a >Threat</a>
                  </Link>
                </li>
                <li>
                  <Link href={'/visualization/domain'}>
                    <a >domain</a>
                  </Link>
                </li>
                <li>
                  <Link href={'/visualization/constellation'}>
                    <a >Constellation</a>
                  </Link>
                </li>

              </ul>
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
      </div>
    </nav>
  );
};

export default Nav;
