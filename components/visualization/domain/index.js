import { useEffect } from 'react';
import * as d3 from 'd3';
import createDomainVisual from './createDomainVisual';

import {findGoodSize, prepareEdges, prepareNodes} from '../util';
import graphData from "../graph";

const domain = props => {
  useEffect(() => {
    const container = d3.select('#chart');

    const w = container.node().parentNode.clientWidth;
    const h = Math.max(
        window.innerHeight,
        container.node().parentNode.clientHeight
    );
    const size = findGoodSize(w, h);

    const visual = createDomainVisual()
        .width(size)
        .height(size)
        //.scaleFactor(2)
        .nodeRadius(6.2) //Set the radius of the nodes, if you get a broken _visual, try adding or subtracting 0.1
        .showModal(() => {});

    const nodes = prepareNodes(graphData);
    const edges = prepareEdges(graphData);
    visual(container, nodes, edges, 'en', () => {});
  }, []);

  return <div id="chart"></div>;
};

export default domain;
