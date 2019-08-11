import { useEffect } from 'react';

import Layout from '../layout';

import ContactUsSection from './sections/contactUs';
import RuleSection from './sections/rules';
import IntroductionSection from './sections/intro';
import IntroStaticSection from './sections/introStatic';
import HistorySection from './sections/history';
import LeaguesSection from './sections/leagues';
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
      <HistorySection />
      <hr className="mt-0 mb-0 " />
      <LeaguesSection />
      <hr className="mt-0 mb-0 " />
      <RuleSection />

      <hr className="mt-0 mb-0" />
      {/* <TeamsSection />
      <hr className="mt-0 mb-0 " /> */}
      {/*<LatestGallerySection />*/}
      {/*<QuoteSection/>*/}
      {/*<hr className="mt-0 mb-0 " />*/}

      <ContactUsSection />
    </Layout>
  );
};
