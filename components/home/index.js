import { useEffect } from 'react';

import Layout from '../layout';

import MapSection from './sections/map';
import RuleSection from './sections/rules';
import IntroductionSection from './sections/intro';
import IntroStaticSection from './sections/introStatic';
import AboutSection from './sections/about';
import IntroDetailSection from './sections/introDetail';
import LatestGallerySection from './sections/latestGallery';
import TeamsSection from './sections/teams';

export default props => {
  useEffect(() => {
    $(window).resize(function() {
      $('.js-height-full').height($(window).height());
      $('.js-height-parent').each(function() {
        $(this).height(
          $(this)
            .parent()
            .first()
            .height()
        );
      });
    });

    $(window).trigger('resize');
    $(window).trigger('scroll');
  }, []);

  return (
    <Layout>
      <IntroStaticSection />
      {/*<IntroductionSection />*/}
      <AboutSection />
      <hr className="mt-0 mb-0 " />
      <RuleSection />
      <IntroDetailSection />
      <hr className="mt-0 mb-0" />
      <TeamsSection />
      <LatestGallerySection />
      {/*<QuoteSection/>*/}
      <hr className="mt-0 mb-0 " />

      <MapSection />
    </Layout>
  );
};
