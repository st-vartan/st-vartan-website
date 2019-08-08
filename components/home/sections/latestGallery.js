import Link from "next/link";
import { Fragment } from 'react';

const LatestGallery = () => (
    <Fragment>
        <section className="page-section pb-0" id="portfolio">
            <div className="relative">
                <h2 className="section-title font-alt mb-70 mb-sm-40">
                    Latest Games
                </h2>

                <ul
                    className="works-grid work-grid-3 work-grid-gut clearfix font-alt hover-white hide-titles"
                    id="work-grid"
                >
                    <li className="work-item">
                        <a href="portfolio-single-1.html" className="work-ext-link">
                            <div className="work-img">
                                <img
                                    className="work-img"
                                    src="/static/images/projects-13.jpg"
                                    alt="Work"
                                />
                            </div>
                            <div className="work-intro">
                                <h3 className="work-title">Russ</h3>
                                <div className="work-descr">Hook shot</div>
                            </div>
                        </a>
                    </li>

                    <li className="work-item">
                        <a href="portfolio-single-1.html" className="work-ext-link">
                            <div className="work-img">
                                <img
                                    className="work-img"
                                    src="/static/images/projects-14.jpg"
                                    alt="Work"
                                />
                            </div>
                            <div className="work-intro">
                                <h3 className="work-title">George</h3>
                                <div className="work-descr">A good shot</div>
                            </div>
                        </a>
                    </li>

                    <li className="work-item">
                        <a href="portfolio-single-1.html" className="work-ext-link">
                            <div className="work-img">
                                <img
                                    className="work-img"
                                    src="/static/images/projects-6.jpg"
                                    alt="Work"
                                />
                            </div>
                            <div className="work-intro">
                                <h3 className="work-title">Jordan</h3>
                                <div className="work-descr">3 pt down pour</div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
        <section className="small-section bg-dark">
            <div className="container relative">
                <div className="align-center">
                    <div>
                        <Link href={'/gallery'}>
                            <a
                                className="btn btn-mod btn-w btn-medium btn-round"
                            >
                                Full gallery
                            </a>
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    </Fragment>
)

export default LatestGallery;