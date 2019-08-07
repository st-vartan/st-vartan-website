const rules = () => (
  <section className="page-section bg-gray-lighter">
    <div className="container relative">
      <h2 className="section-title font-alt">Rules & Regulations</h2>

      {/* Features Grid */}
      <div className="row multi-columns-row alt-features-grid">
        {/* Features Item */}
        <div className="col-sm-6 col-md-3 col-lg-3">
          <div className="alt-features-item align-center">
            <div className="alt-features-icon">
              <span className="icon-dribbble"></span>
            </div>
            <h3 className="alt-features-title font-alt">"Fault!"</h3>
            <div className="alt-features-descr align-left">
              Call your own faults ASAP, before ball goes over rims. "And 1"
              doesn’t count as continuation.
            </div>
          </div>
        </div>
        {/* End Features Item */}

        {/* Features Item */}
        <div className="col-sm-6 col-md-3 col-lg-3">
          <div className="alt-features-item align-center">
            <div className="alt-features-icon">
              <span className="icon-expand"></span>
            </div>
            <h3 className="alt-features-title font-alt">Poles & Lines</h3>
            <div className="alt-features-descr align-left">
              Poles and lines have been boundaries of this court. 1s and 2s all
              day.
            </div>
          </div>
        </div>
        {/* End Features Item */}

        {/* Features Item */}
        <div className="col-sm-6 col-md-3 col-lg-3">
          <div className="alt-features-item align-center">
            <div className="alt-features-icon">
              <span className="icon-shield"></span>
            </div>
            <h3 className="alt-features-title font-alt">Game 16 & 12</h3>
            <div className="alt-features-descr align-left">
              Only the first game of the day is 16, all following ones are 12.
            </div>
          </div>
        </div>
        {/* End Features Item */}

        {/* Features Item */}
        <div className="col-sm-6 col-md-3 col-lg-3">
          <div className="alt-features-item align-center">
            <div className="alt-features-icon">
              <span className="icon-chat"></span>
            </div>
            <h3 className="alt-features-title font-alt">Call next</h3>
            <div className="alt-features-descr align-left">
              Figure who gets the last next, call "I get next" and then you're
              on.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default rules;
