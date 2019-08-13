const technology = () => {
    return (
        <section className="page-section pt-10 pb-10 bg-grey-lighter">
            <div className="container relative">
                <div className="row">
                    <div className="col-md-6 col-lg-6 mb-sm-40">
                        <div className="text">
                            <h3 className="mb-30 mb-xxs-10">Technology</h3>
                            <p>
                                This site is built with Server Side Rendering. I also leverage
                                D3, SVG, Canvas, WebGL and RxJS for big data visualization for
                                basketball.
                            </p>

                            <p>
                                If you're interested in technology behind this site,
                                please visit{' '}
                                <a
                                    href="https://github.com/st-vartan/st-vartan-website"
                                    target="_blank"
                                >
                                    Github project
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default technology;
