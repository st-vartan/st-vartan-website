import Layout from './layout';
import Link from 'next/link';


const about = () => {
    return (
        <Layout title={'St.Vartan Basektball About us'}>
            <section className="small-section bg-dark">
                <div className="relative container align-left">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="hs-line-11 font-alt mb-10 mb-xs-0">Gallery</h1>
                            <div className="hs-line-4 font-alt">Memories of hot summer</div>
                        </div>

                        <div className="col-md-4 mt-10">
                            <div className="mod-breadcrumbs font-alt align-right">
                                <Link href={'/'}>
                                    <a>Home</a>
                                </Link>
                                &nbsp;/&nbsp;<span>Gallery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-section">
                <MagnificPopup data={data} />
            </section>
        </Layout>
    );
};

export default about;
