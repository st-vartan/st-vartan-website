import Layout from '../layout';
import { useEffect } from 'react';
import initWidgets from "../home/initWidgets";
import $ from "jquery";

const Russ = props => {
    useEffect(() => {
        initWidgets();
    }, []);

  return (
    <Layout>
      <div className="page" style={{marginTop: 75}}>Russ</div>
    </Layout>
  );
};

export default Russ;
