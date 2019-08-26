import { useEffect, Fragment } from 'react';
import * as d3 from 'd3';
import createThreatVisual from './createThreatVisual';

import { findGoodSize } from '../util';

const threat = props => {
  let visual;
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

      visual = createThreatVisual()
        .width(size)
        .height(size);

      visual(container, nodes, edges, 'en', () => {});
    }
  }, [nodes, edges]);

  return (
      <Fragment>
        <div id="chart" style={{marginTop: 73}}></div>
        <div type="button" style={{position: 'absolute', top: 80, right: 20}} className="btn btn-primary" onClick={() => visual.saveImage()}>
          Download
        </div>
      </Fragment>
  );
};

export default threat;
