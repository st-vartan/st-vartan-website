import { useEffect, useState, Fragment } from 'react';
import { prepareEdges, prepareNodes } from './util';
import Domain from './domain';
import Threat from './threat';
import Biome from './biome';
import Constellation from './constellation';
import Layout from '../layout';
import graphData from './graph';
import cloneDeep from 'lodash/cloneDeep';

const Visualization = ({layout}) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const graph = cloneDeep(graphData);
    setNodes(prepareNodes(graph));
    setEdges(prepareEdges(graph));
  }, []);

  let vis = null;
  if (layout === 'threat') {
    vis = <Threat nodes={nodes} edges={edges} />;
  } else if (layout === 'domain') {
    vis = <Domain nodes={nodes} edges={edges} />;
  } else if (layout === 'constellation') {
    vis = <Constellation nodes={nodes} edges={edges} />;
  } else if (layout === 'biome') {
    vis = <Biome nodes={nodes} edges={edges} />;
  }

  return (
      <Layout smallHeight={true}>
        {vis}
      </Layout>
  );
};

export default Visualization;
