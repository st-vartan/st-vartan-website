import Layout from '../layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 100
};

const data = new Array(6).fill({
    image: '/static/images/projects-1.jpg',
    name: 'Russ',
    desc: 'One word',
    role: 'sg'
});

const players = () => {
    const [items, setItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    useEffect(() => {
        const widgets = data.map((d, i) => {
            return (
                <li className="work-item mix photography">
                    <a className="work-lightbox-link mfp-image">
                        <div className="work-img">
                            <img src={d.image} alt={d.name} />
                        </div>
                        <div className="work-intro">
                            <h3 className="work-title">{d.name}</h3>
                            <div className="work-descr">
                                {d.desc}
                            </div>
                        </div>
                    </a>
                </li>
            )
        });
        setAllItems(widgets);
        setItems(widgets)
    })


    const filterItems = (query) => {
        const widgets = allItems.filter(d => (d.role && query) ? true : d.role === query);
        setItems(widgets);
    };

    return (
        <Layout title={'St.Vartan Basektball Players'}>
            <section className="small-section bg-dark">
                <div className="relative container align-left">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="hs-line-11 font-alt mb-10 mb-xs-0">Players</h1>
                        </div>

                        <div className="col-md-4 mt-10">
                            <div className="mod-breadcrumbs font-alt align-right">
                                <Link href={'/'}>
                                    <a>Home</a>
                                </Link>
                                &nbsp;/&nbsp;<span>Players</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-section pb-0">
                <div className="relative">

                    {/*<div className="works-filter font-alt align-center">*/}
                    {/*    <a className="filter active" onClick={() => filterItems()}>All</a>*/}
                    {/*    <a  onClick={() => filterItems('sg')}>SG</a>*/}
                    {/*    <a  onClick={() => filterItems('pg')}>Point guard</a>*/}
                    {/*    <a  onClick={() => filterItems('sf')}>Small forward</a>*/}
                    {/*    <a  onClick={() => filterItems('pf')}>Power forward</a>*/}
                    {/*    <a  onClick={() => filterItems('c')}>Center</a>*/}
                    {/*</div>*/}
                    <Masonry
                        className={'works-grid clearfix font-alt'} // default ''
                        elementType={'ul'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                        {items}
                    </Masonry>

                </div>
            </section>
        </Layout>
    );
};

export default players;
