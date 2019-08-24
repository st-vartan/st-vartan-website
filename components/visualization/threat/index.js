import { useEffect } from 'react';
import * as d3 from 'd3';
import createThreatVisual from './createThreatVisual';

import { findGoodSize } from '../util';

const threat = props => {
  const { nodes, edges } = props;
  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      const container = d3.select('#chart');

      const w = container.node().parentNode.clientWidth;
      const h = Math.max(
        window.innerHeight,
        container.node().parentNode.clientHeight
      ) - 100;
      const size = findGoodSize(w, h);

      const visual = createThreatVisual()
        .width(size)
        .height(size);

      visual(container, nodes, edges, 'en', () => {});
    }
  }, [nodes, edges]);

  return <div id="chart" style={{marginTop: 73}}></div>;
};

export default threat;
