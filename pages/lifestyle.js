import Layout from "../components/layout";
import Link from "next/link";

const data = [
  {
    image: "/static/images/lifestyle/tshirt_white_perfect_shot.jpg",
    title: 'A Perfect Shot',
    desc: 'Common ver.'
  },
  {
    image: "/static/images/lifestyle/tshirt_white_perfect_shot_carlos.png",
    title: "A Perfect Shot",
    desc: "Carlos Ver. \"A True Beast!\""
  },
  {
    image: "/static/images/lifestyle/tshirt_white_russ.png",
    title: "St.Vartan Tour 2019 White Shirt",
    desc: "Russ Ver."
  },
  {
    image: "/static/images/lifestyle/tshirt_white_sean.png",
    title: "St.Vartan Tour 2019 White Shirt",
    desc: "Sean Ver. \"Space Jam\""
  },
  {
    image: "/static/images/lifestyle/T-Shirt_dark_vallen.jpg",
    title: "St.Vartan Tour 2019 Black Shirt",
    desc: "Vallen Ver."
  },
  {
    image: "/static/images/lifestyle/T-Shirt_red_russ.jpg",
    title: "St.Vartan Tour 2019 Black Shirt",
    desc: "Russ Ver. A Red Variation."
  },
];



const lifestyle = props => {
  const styleItems = data.map((d, i) => (
    <div class="col-md-4 col-lg-4 col-sm-6 col-xs-12" key={d.image}>
    <div class="post-prev-img">
      <a >
        <img
          src={d.image}
          alt={d.title}
        />
      </a>
    </div>

    <div class="post-prev-title font-alt align-center">
      <a >{d.title}</a>
    </div>

    <div class="post-prev-text align-center">
      <strong>{d.desc}</strong>
    </div>
  </div>
  ));
  return (
    <Layout title={"St.Vartan Basketball Life Style"}>
      <section className="small-section bg-dark">
        <div className="relative container align-left">
          <div className="row">
            <div className="col-md-8">
              <h1 className="hs-line-11 font-alt mb-10 mb-xs-0">Life Style</h1>
              <div className="hs-line-4 font-alt"></div>
            </div>

            <div className="col-md-4 mt-10">
              <div className="mod-breadcrumbs font-alt align-right">
                <Link href={"/"}>
                  <a>Home</a>
                </Link>
                &nbsp;/&nbsp;<span>Life Style</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='container'>
        <div class="row multi-columns-row">
            {styleItems}
        </div>
      </div>
    </Layout>
  );
};
export default lifestyle;
