/////////////// Draw the hidden mouseover nodes //////////////
const drawHiddenElements = config => {
  const {
    pie_domain,
    domains,
    g_scale,
    arc_domain,
    elements,
    node_radius,
    countries,
    arc_country,
  } = config;
  //Create the donut arcs on the SVG for the mouse hover
  config.hover_domain = g_scale
    .append('g')
    .attr('class', 'arc-domain-group')
    .selectAll('.domain-arc')
    .data(pie_domain.padAngle(0)(domains))
    .enter()
    .append('path')
    .attr('class', 'domain-arc')
    .style('fill', 'none')
    .style('cursor', 'pointer')
    .style('pointer-events', 'all')
    .attr('d', d => arc_domain.context(null)(d));

  //Draw the invisible ICH element circles on the SVG for click
  config.hover_ich = g_scale
    .append('g')
    .attr('class', 'element-group')
    .selectAll('.element-circle')
    .data(elements)
    .enter()
    .append('circle')
    .attr('class', 'element-circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', node_radius)
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .style('cursor', 'pointer');

  //Create invisible SVG arc pieces that will capture a mouse event on a country
  config.hover_country = g_scale
    .selectAll('.country-hover-path')
    .data(countries)
    .enter()
    .append('path')
    .attr('class', 'country-hover-path')
    .attr('d', arc_country)
    .style('fill', 'none')
    .style('cursor', 'pointer')
    // .style("opacity", "0.4")
    .style('pointer-events', 'all');
}; //function drawHiddenElements

export default drawHiddenElements;
