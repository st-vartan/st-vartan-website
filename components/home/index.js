import { useEffect } from 'react';

import Layout from '../layout';
import initWidgets from './initWidgets';


import MapSection from './sections/map';
import RuleSection from './sections/rules';
import IntroductionSection from './sections/intro';
import IntroStaticSection from './sections/introStatic';
import AboutSection from './sections/about';
import IntroDetailSection from './sections/introDetail';
import FooterSection from './sections/footer';
import LatestGallerySection from './sections/latestGallery';
import TeamsSection from './sections/teams';
import QuoteSection from './sections/quote';

export default props => {
  useEffect(() => {
    initWidgets();
  }, []);

  return (
    <Layout>
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
    </Layout>
  );
};
