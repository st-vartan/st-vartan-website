import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { prepareEdges, prepareNodes } from './util';
import Domain from './domain';
import Threat from './threat';
import Biome from './biome';
import Constellation from './constellation';

import graphData from './graph';
import cloneDeep from 'lodash/cloneDeep';

const Visualization = props => {
  const chartRef = useRef(null);
  const [layout, setLayout] = useState('constellation');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const graph = cloneDeep(graphData);
    setNodes(prepareNodes(graph));
    setEdges(prepareEdges(graph));
  }, []);

  let vis = null;
  if (layout === 'threat') {
    vis = <Threat nodes={nodes} edges={edges}/>;
  } else if (layout === 'domain') {
    vis = <Domain nodes={nodes} edges={edges}/>;
  } else if (layout === 'constellation') {
    vis = <Constellation nodes={nodes} edges={edges}/>;
  } else if (layout === 'biome') {
    vis = <Biome nodes={nodes} edges={edges}/>;
  }

  return (
    <div>
      <div className="row align-center">
        <a
          className="btn btn-w btn-mod btn-medium btn-round hidden-xs"
          onClick={evt => setLayout('constellation')}
        >
          Constellation
        </a>
        <a
          className="btn btn-w btn-mod btn-medium btn-round hidden-xs"
          onClick={evt => setLayout('biome')}
        >
          Biome
        </a>
        <a
          className="btn btn-w btn-mod btn-medium btn-round hidden-xs"
          onClick={evt => setLayout('domain')}
        >
          Domain
        </a>
        <a
          className="btn btn-w btn-mod btn-medium btn-round hidden-xs"
          onClick={evt => setLayout('threat')}
        >
          Threat
        </a>
      </div>
      {vis}
    </div>
  );
};

export default Visualization;
