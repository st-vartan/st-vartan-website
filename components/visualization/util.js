import * as d3 from 'd3';
import { typeConversion } from './modal-node'

function findGoodSize(w, h) {
  //Figure out a nice scaling to fit the _visual on your screen
  let size_ratio = h / w;
  let size;
  size = size_ratio > 0.8 ? w : h > 1100 ? h * 1 : h * 1.2;
  if (w > 900) size = Math.min(size, w);
  size = Math.min(size, 1210);

  return Math.round(size);
} //function findGoodSize

function prepareNodes(graph) {
  let nodes = [];
  //Place all nodes in array instead, since that's what d3's force wants
  for (let element in graph.nodes) {
    graph.nodes[element].id = element;
    nodes.push(graph.nodes[element]);
  } //for i
  return nodes;
} //function prepareNodes

function prepareEdges(graph) {
  let edges = graph.edges;
  //Rename since d3's force needs a "source-target" pair
  edges.forEach(d => {
    d.source = d.subject;
    d.target = d.object;
    delete d.subject;
    delete d.object;
  });
  return edges;
} //function prepareEdges

//Initialize the function for showing the tooltip on hover
//This tooltip function will be run when the user hovers over a node
//And when a click is active, it will also run when hovered over a visible edge
//You can distinguish between the two, because obj.type will be "edge" for the edge hover
function createTooltip(obj, w, h) {
  let radius, label, type, note
  if(obj.type === "edge") {
    radius = 0
    label = obj.node.label
    note = typeConversion(obj.node.type) + " connected to this line"
    d3.select("#chart-tooltip")
        .style("border", "2px solid " + obj.node.fill)
        .style("box-shadow", "none")
  } else { //node
    radius = obj.r
    label = obj.label
    note = typeConversion(obj.type)
    d3.select("#chart-tooltip")
        .style("border", null)
        .style("box-shadow", null)
  }//else

  //Change titles
  d3.select("#chart-tooltip .tooltip-type").html(note)
  d3.select("#chart-tooltip .tooltip-title").html(label)
  let box_size = document.getElementById("chart-tooltip").getBoundingClientRect()

  //Place & show the tooltip
  d3.select("#chart-tooltip")
      .style("top", (obj.y + h/2 - box_size.height - radius - Math.max( radius * 0.2, 30 )) + "px")
      .style("left", (obj.x + w/2 - box_size.width/2) + "px")
      .style("opacity", 1)
}//function createTooltip

function removeTooltip() {
  //Hide the tooltip
  d3.select("#chart-tooltip").style("opacity", 0)
}

export { findGoodSize, prepareNodes, prepareEdges, createTooltip, removeTooltip };
