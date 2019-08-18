import { useEffect } from 'react';
import * as d3 from 'd3';
import createThreatVisual from './createThreatVisual';

import {findGoodSize, prepareEdges, prepareNodes} from '../util';
import graphData from "../graph";

const domain = props => {
  const {nodes, edges} = props;
  useEffect(() => {
    const container = d3.select('#chart');

    const w = container.node().parentNode.clientWidth;
    const h = Math.max(
        window.innerHeight,
        container.node().parentNode.clientHeight
    );
    const size = findGoodSize(w, h);

    const visual = createThreatVisual()
        .width(size)
        .height(size);

    const nodes = prepareNodes(graphData);
    const edges = prepareEdges(graphData);
    visual(container, nodes, edges, 'en', () => {});
  }, []);

  return <div id="chart"></div>;
};

export default domain;
