import { useEffect } from 'react';

import Layout from '../layout';

import IntroStaticSection from './sections/introStatic';
import HistorySection from './sections/history';
import ContactUsSection from './sections/contactUs';
import RuleSection from './sections/rules';
import LeaguesSection from './sections/leagues';
import LeagueStyleSection from './sections/leagueStyle';

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
      <HistorySection />
      <hr className="mt-0 mb-0 " />
      <LeaguesSection />
        <hr className="mt-0 mb-0 "/>
        <RuleSection/>
        <hr className="mt-0 mb-0"/>
        <LeagueStyleSection/>
        <hr className="mt-0 mb-0"/>
        <ContactUsSection/>
    </Layout>
  );
};
