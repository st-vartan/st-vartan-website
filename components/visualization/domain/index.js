import { useEffect } from 'react';
import * as d3 from 'd3';
import createDomainVisual from './createDomainVisual';

import {findGoodSize, prepareEdges, prepareNodes} from '../util';
import graphData from "../graph";

const domain = props => {
  const {nodes, edges} = props;
  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
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

      visual(container, nodes, edges, 'en', () => {});
    }
  }, [nodes, edges]);

  return <div id="chart"></div>;
};

export default domain;
