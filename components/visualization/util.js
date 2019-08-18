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

export { findGoodSize, prepareNodes, prepareEdges };
