import { useEffect } from 'react';

import Layout from '../layout';
import initWidgets from './initWidgets';


import MapSection from './sections/map';
import RuleSection from './sections/rules';
import IntroductionSection from './sections/introduction';
import IntroStaticSection from './sections/introduction-static';
import AboutSection from './sections/about';
import IntroDetailSection from './sections/intro-detail';
import FooterSection from './sections/footer';
import LatestGallerySection from './sections/latest-gallery';
import TeamsSection from './sections/teams';
import QuoteSection from './sections/quote';

export default props => {
  useEffect(() => {
    initWidgets();
  }, []);

  return (
    <Layout>
      <div className="page" id="top">
        <IntroStaticSection />
        {/*<IntroductionSection/>*/}
        <AboutSection />
        <hr className="mt-0 mb-0 " />
        <RuleSection />
        <IntroDetailSection />
        <hr className="mt-0 mb-0" />
        <TeamsSection/>
        <LatestGallerySection/>
        {/*<QuoteSection/>*/}
        <hr className="mt-0 mb-0 " />


        <MapSection />
        <FooterSection />
      </div>
    </Layout>
  );
};
