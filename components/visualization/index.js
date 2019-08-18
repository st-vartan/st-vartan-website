import graphData from './graph.json';
import { useEffect } from 'react';
import * as d3 from 'd3';
import createDomainVisual from './createDomainVisual';

function findGoodSize(w, h) {
  //Figure out a nice scaling to fit the _visual on your screen
  let size_ratio = h / w
  let size
  size = size_ratio > 0.8 ? w : (h > 1100 ? h * 1 : h * 1.2)
  if(w > 900) size = Math.min(size, w)
  size = Math.min(size, 1210)

  return 800;
  // return Math.round(size)
}//function findGoodSize

function prepareNodes(graph) {
  let nodes = []
  //Place all nodes in array instead, since that's what d3's force wants
  for(let element in graph.nodes) {
    graph.nodes[element].id = element
    nodes.push(graph.nodes[element])
  }//for i
  return nodes
}//function prepareNodes

function prepareEdges(graph) {
  let edges = graph.edges
  //Rename since d3's force needs a "source-target" pair
  edges.forEach(d => {
    d.source = d.subject
    d.target = d.object
    delete d.subject
    delete d.object
  })
  return edges
}//function prepareEdges


const domain = props => {
  useEffect(() => {
    //Div that will hold the chart
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

  return (
    <div>
      <style global jsx>{`
          #chart {
            text-align: center;
            position: relative;
          }

          #chart canvas {
            position: absolute;
            top: 0;
            pointer-events: none;
            z-index: -1;
          }

          #chart svg{
            z-index: 2;
            cursor: default;
          }
          .node-hovered {
            fill: none;
            stroke-width: 3px;
            stroke-opacity: 0.75;
            stroke-dasharray: 0,5;

            animation-duration: 1s;
            animation-name: changedash;
            animation-iteration-count: infinite;
            animation-direction: normal;
            animation-timing-function: linear;
          }

          @keyframes changedash {
            from { stroke-dashoffset: 5px; }
            to { stroke-dashoffset: 0px; }
          }

          #chart-tooltip {
            pointer-events: none;
            z-index: 4;
            font-size: 14px;
            background: rgba(255,255,255,0.93);
            padding: 10px 30px;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            box-shadow: 0px 0px 5px #c1c1c1;
            font-family: 'Oswald', sans-serif;
            max-width: 600px;
          }

          #chart-tooltip .tooltip-title {
            text-align: center;
            font-size: 18px;
            font-weight: 500;
          }

          #chart-tooltip .tooltip-type {
            text-align: center;
            font-size: 12px;
            color: #696969;
            font-weight: 300;
          }

          button:focus {
            outline: 0;
          }
      `}</style>
      <div id="chart">
      </div>
    </div>
  
  );
};

export default domain;
