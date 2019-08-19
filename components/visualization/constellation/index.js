import { useEffect } from 'react';
import * as d3 from 'd3';
import createConstellationVisual from './createConstellationVisual';
import locations from './locations';
import { createTooltip, removeTooltip } from '../util';

const constellation = props => {
  const { nodes, edges } = props;
  let simulation = false;

  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      const container = d3.select('#chart');

      const w = container.node().parentNode.clientWidth;
      const h = Math.max(
        window.innerHeight,
        container.node().parentNode.clientHeight
      );

      //Link the locations to the nodes in the graph
      if (!simulation) {
        let location_id_map = {};
        locations.forEach(l => (location_id_map[l.id] = l));
        nodes.forEach(d => {
          let node = location_id_map[d.id];
          if (node) {
            d.x = node.x_fixed;
            d.y = node.y_fixed;
            d.degree = node.degree;
            if (node.community > -1) d.community = node.community;
          } //if
        }); //forEach
      } //if

      let visual = createConstellationVisual()
        .width(w)
        .height(h)
        .language('en')
        .showTooltip(obj => createTooltip(obj, w, h))
        .hideTooltip(removeTooltip);

      //Set up the basis of the chart - initial containers are drawn
      visual(container, nodes, edges);

      //Draw the charts
      if (simulation) visual.initializeSimulation();
      else visual.createChart(() => {});
    }
  }, [nodes, edges]);

  return (
    <div id="chart">
      <div id="chart-tooltip">
        <p className="tooltip-type"></p>
        <p className="tooltip-title"></p>
      </div>
    </div>
  );
};

export default constellation;
