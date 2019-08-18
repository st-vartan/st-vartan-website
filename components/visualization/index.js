import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { findGoodSize, prepareEdges, prepareNodes } from './util';
import Domain from './domain';
import Threat from './threat';
import graphData from './graph';
import cloneDeep from 'lodash/cloneDeep';

const Visualization = props => {
  const chartRef = useRef(null);
  const [layout, setLayout] = useState('threat');
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

  } else if (layout === 'biome') {

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
