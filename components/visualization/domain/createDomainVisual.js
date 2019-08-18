import * as d3 from 'd3';
import chroma from 'chroma-js';
import translations from './translationsDomains';

function createDomainVisual() {
  //Constants
  const pi = Math.PI;
  const pi2 = Math.PI * 2;
  const pi1_2 = Math.PI / 2;

  //Sizes
  let base_size = 1600;
  let width = 1600,
    height = 1600;
  let total_width, total_height;
  let margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  //Containers SVG
  let svg, g;
  let g_scale;

  //Containers canvas
  let canvas_edges, canvas_nodes, canvas_donuts, canvas_hover;
  let ctx_edges, ctx_nodes, ctx_donuts, ctx_hover;
  let sf = 2; //canvas scale factor
  let sf_original = sf;
  let sf_set = false;
  let sf_set_original = sf_set;

  //Data
  let nodes;
  let edges;
  let edges_country,
    edges_domain = [];
  let domains, domain_ids;
  let elements = [];
  let countries = [];
  let areas;
  let domain_combinations;
  let num_countries;
  let edges_domain_nest, edges_element_domain_nest;
  let edges_country_nest, edges_element_country_nest;
  let language = 'en';

  //Mappings
  let edge_country_by_id = {};
  let edge_domain_by_id = {};
  let linked_to_id = {};
  let node_by_id = {};
  let domain_by_id = {};
  let domain_arc_by_id = {};

  //Inside domain donut
  let domain_arcs;
  const arc_domain = d3.arc();
  const pie_domain = d3
    .pie()
    .value(1)
    .sort(null);
  // .padAngle(.02)
  const inner_radius_domain = 300;
  const outer_radius_domain = inner_radius_domain + 40;
  const corner_radius_domain = 5;
  const radius_dot_domain = outer_radius_domain + 10;

  //Middle domain-combination donut
  let node_radius = 7;
  let element_stroke_width = Math.max(1.5, roundTo(node_radius * 0.25, 1));
  const radius_elements = 480;
  const radius_elements_offset = 2 * node_radius;
  const inner_radius_element =
    radius_elements - 2 * node_radius - 1.75 * node_radius;
  const outer_radius_element =
    radius_elements + 2 * node_radius + 1.75 * node_radius;
  const corner_radius_element = 4;
  const radius_dot_element = inner_radius_element - 1;
  const arc_element = d3.arc();
  let element_arcs = [];

  //Outside country donut
  const country_radius = 12;
  const radius_countries = 600;
  const radius_dot_country = radius_countries;
  const inner_radius_country = radius_countries - country_radius - 10;
  const outer_radius_country = inner_radius_country + 3;
  const corner_radius_country = 3;
  let area_arcs;
  let area_arc_offset;
  const arc_area = d3.arc();
  const pie_area = d3
    .pie()
    .value(d => Math.max(3, d.values.length))
    .sort(null)
    .padAngle(0.04);

  //Elements
  const arc_nodes = d3.arc();
  const pie_nodes = d3
    .pie()
    .sort(null)
    .value(1);

  //Countries
  const arc_country = d3.arc();
  const country_text_opacity = 0.4;

  //Lines
  const scale_rad_curve = d3.scaleLinear();
  const line = d3
    .lineRadial()
    .angle(d => d.angle)
    .radius(d => d.radius)
    .curve(d3.curveBasis);
  const opacity_edge_default = 0.15;
  //Will slightly offset the start and end from the source and target points
  const scale_angle_start_offset = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, 0.03]);
  const scale_angle_end_offset = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, 0.02]);

  //Colors
  const color_country = '#7EB852';
  const color_text = chroma.mix('black', color_country, 0.1);
  const color_domain_scale = d3
    .scaleOrdinal()
    .range(['#E01A25', '#EDA400', '#42AC64', '#0088A5', '#991C71']);
  const default_grey = 'rgb(230,230,230)';
  let chosen_domain_color = default_grey;

  //Mouse hovers
  const voronoi = d3
    .voronoi()
    .x(d => d.x)
    .y(d => d.y);
  let diagram;
  let mouse_hover_active = false;
  let current_hover = null;
  let hover_type = null;
  let timer_draw = null;

  //Mouse clicks
  let current_click = null;
  let click_active = false;
  let hover_ich, hover_country, hover_domain;

  //Inner photo
  const photo_radius = 240;
  const arc_photo = d3.arc();
  const scale_font_size = d3
    .scaleLinear()
    .domain([100, 300, 500])
    .range([30, 26, 24]);
  // const radius_shadow_blur = 80

  //Other
  let font_family = 'Oswald';
  let scale_factor = 1;
  let scale_multiplier = 1;
  let ICH_num, ICH_num_all;
  let showModal = function(element) {
    console.log(element);
  };

  //////////////////////////////////////////////////////////////
  //////////////////// Create chart function ///////////////////
  //////////////////////////////////////////////////////////////

  function chart(selection, nodes_raw, edges_raw, lang = 'en', callback) {
    language = lang;
    nodes = nodes_raw;
    edges = edges_raw;

    //////////////////////////////////////////////////////////////
    //////////////// Create the canvas containers ////////////////
    //////////////////////////////////////////////////////////////

    //Canvas for the donuts
    canvas_donuts = selection.append('canvas').attr('id', 'canvas-donuts');
    ctx_donuts = canvas_donuts.node().getContext('2d');

    //Canvas for the edges
    canvas_edges = selection.append('canvas').attr('id', 'canvas-edges');
    ctx_edges = canvas_edges.node().getContext('2d');

    //Canvas for the nodes
    canvas_nodes = selection.append('canvas').attr('id', 'canvas-nodes');
    ctx_nodes = canvas_nodes.node().getContext('2d');

    //Canvas for the hover effects - mostly for performance
    canvas_hover = selection.append('canvas').attr('id', 'canvas-hover');
    ctx_hover = canvas_hover.node().getContext('2d');

    //////////////////////////////////////////////////////////////
    ////////////////// Create the SVG container //////////////////
    //////////////////////////////////////////////////////////////

    //SVG container for the things on top such as text
    svg = selection
      .append('svg')
      .on('mousemove', findElement)
      .on('click', d => {
        click_active = false;
        mouseOverReset();
      });

    //Group for all _visual elements
    g = svg.append('g').attr('id', '_visual-elements-group');

    g_scale = g.append('g').attr('id', 'scaling-group');

    //////////////////////////////////////////////////////////////
    ////////////////////// Data preparation //////////////////////
    //////////////////////////////////////////////////////////////

    //General, data only, preparation to create the correct arrays
    dataPreparation();
    //Add variables to the data that have to do with _visual placement
    prepareArcData();
    //Create a few custom edge arrays
    prepareEdgeData();

    chart.resize();

    //////////////////////////////////////////////////////////////
    ////////////////////// Set-up the voronoi ////////////////////
    //////////////////////////////////////////////////////////////

    //Calculate a voronoi layout - for mouse events
    diagram = voronoi(elements);

    // //Show the voronoi sites
    // g_scale.append("g")
    //     .attr("class", "element-group")
    //     .selectAll(".element-cell")
    //     .data(diagram.polygons())
    //     .enter().append("path")
    //     .attr("class", ".element-cell")
    //     .style("fill", "none")
    //     .style("stroke", "black")
    //     .style("pointer-events", "none")
    //     .attr("d", d => d ? "M" + d.join("L") + "Z" : null)

    //////////////////////////////////////////////////////////////
    //////////////////////////// Draw ////////////////////////////
    //////////////////////////////////////////////////////////////

    line.context(ctx_edges);

    //Set-up the final parts of the arc functions
    prepareArcs();

    //Setup the hidden SVG mouseover elements
    drawHiddenElements();
    setHiddenHovers();

    //Draw all the pieces on the canvases
    drawCanvas();

    //Return filtered nodes
    if (callback) callback([...elements, ...countries]);
  } //function chart

  //////////////////////////////////////////////////////////////
  ///////////////////// Resize the chart ///////////////////////
  //////////////////////////////////////////////////////////////

  chart.resize = () => {
    total_width = width + margin.left + margin.right;
    total_height = height + margin.top + margin.bottom;

    //Change sizes of the svg
    svg.attr('width', total_width).attr('height', total_height);
    g.attr(
      'transform',
      'translate(' +
        (margin.left + width / 2) +
        ',' +
        (margin.top + height / 2) +
        ')'
    );

    //Get the scale factor to resize
    let size = Math.min(total_height, total_width);
    scale_factor = roundTo((size / base_size) * scale_multiplier, 2);
    //Scale everything to fit
    g_scale.attr('transform', 'scale(' + scale_factor + ')');

    //Update voronoi for mouseover
    voronoi.extent([
      [
        (-margin.left - width / 2) / scale_factor,
        (-margin.top - height / 2) / scale_factor,
      ],
      [total_width, total_height],
    ]);

    //If the canvas scale factor hasn't been set yet, figure out the best for this screen
    if (!sf_set) {
      sf = Math.min(2, getPixelRatio(ctx_nodes)); //no more than 2
      sf_original = sf;
    } //if

    //Change sizes of the canvas based on the scale factor
    crispyCanvas(canvas_donuts, ctx_donuts);
    crispyCanvas(canvas_edges, ctx_edges);
    crispyCanvas(canvas_nodes, ctx_nodes);
    crispyCanvas(canvas_hover, ctx_hover);
    ctx_edges.lineWidth = 2;

    //Redraw
    drawCanvas();

    return 1; //Needed for the saveImage function
  }; //function resize

  //////////////////////////////////////////////////////////////
  ///////////////// General data preparation ///////////////////
  //////////////////////////////////////////////////////////////

  function dataPreparation() {
    //Create a node -> node id mapping - total: 470 ICH elements
    nodes.forEach(d => {
      node_by_id[d.id] = d;
    });

    //Map the connections to each node
    edges.forEach(d => {
      //Save all of the edges to a specific node
      if (!linked_to_id[d.source]) linked_to_id[d.source] = [];
      if (!linked_to_id[d.target]) linked_to_id[d.target] = [];
      linked_to_id[d.source].push(node_by_id[d.target]);
      linked_to_id[d.target].push(node_by_id[d.source]);
    }); //forEach

    ///////////////////////// DOMAINS ////////////////////////

    //Get the domain label translations for in the arcs

    let data = translations[language].domains;
    //Get the domains
    domains = nodes.filter(d => d.group === 'domain');
    domains.forEach(d => {
      d.count = 0;
      domain_by_id[d.id] = d;
      d.title = data[data.map(b => b.id).indexOf(d.id)].label;
    });
    //Sort them by their id
    domains = domains.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
    domain_ids = new Set(domains.map(d => d.id));
    color_domain_scale.domain(domain_ids);
    //Knowledge and practices concerning nature and the universe - 102
    //Oral traditions and expressions - 158
    //Performing arts - 230
    //Social practices, rituals and festive events - 260
    //Traditional craftsmanship - 168
    //Total: 918

    ////////////////////// ICH ELEMENTS //////////////////////

    //Find the elements that are mapped to a domain
    let element_ids = domains.map(d => linked_to_id[d.id].map(l => l.id));
    element_ids = [...new Set([].concat.apply([], element_ids))].sort();

    //Get all the nodes(ICH elements) that are connected to domains
    element_ids.forEach(d => {
      let node = node_by_id[d];

      //Filter out any elements on the Register (GSP), so only keep the RL & USL
      if (node.meta.list !== 'RL' && node.meta.list !== 'USL') return;

      node.fill = 'black';
      node.opacity = 1;

      let links = linked_to_id[d].filter(d => d);
      links = new Set(links.map(n => n.id));
      let intersection = new Set([...links].filter(l => domain_ids.has(l)));
      node.domains = [...intersection];
      //Create a unique code for the combination of domains
      node.domains.sort();
      node.domain_code = node.domains
        .map(n => n.replace('vocabulary_ich_', ''))
        .join('_');

      //The main domain of an element - only one has a weight of 3
      let domain_edges = edges.filter(
        l => l.source === d && node.domains.indexOf(l.target) >= 0
      );
      let domain_main = domain_edges.filter(l => l.weight === 3);
      if (domain_main.length === 1) node.domain_main = domain_main[0].target;
      else node.domain_main = '0';

      //Add the domains to the total count of how often each domain is assigned
      node.domains.forEach(m => {
        domain_by_id[m].count += 1;
      });

      elements.push(node);
    });
    domain_ids = [...domain_ids];
    ICH_num_all = elements.length;

    // //Check to see which ICH elements have no HUG photo
    // let img_not = []
    // elements.forEach(d => {
    //     if(d.meta && d.meta.images) {
    //         d.img = new Image
    //         d.img.src = d.meta.icon.replace("MED","HUG")
    //         d.img.onerror = function() {
    //             img_not.push(d.id)
    //             let hiddenElement = document.createElement('a')
    //             hiddenElement.href = 'data:attachment/text,' + encodeURI(img_not)
    //             hiddenElement.target = '_blank'
    //             hiddenElement.download = 'ICH_no_HUG_file.txt'
    //             hiddenElement.click()
    //             hiddenElement.parentNode.removeChild(hiddenElement)
    //         }
    //     }//if
    //     else { console.log(d.id, " has no images")}
    // })//forEach

    //456 ICH elements - it's ok that the last 14 are missing
    // //Which don't have a domain?
    // //"element_320", "element_321", "element_322", "element_473", "element_543", "element_530", "element_532", "element_539", "element_541", "element_654", "element_678", "element_696", "element_1004", "element_1306"
    // let a = new Set(elements.map(d => d.id))
    // let b = new Set(nodes.filter(d => d.type === "element").map(d => d.id))
    // let difference = [...new Set([...b].filter(d => !a.has(d)))]

    //Sort by number of domains and then by their "unique domain combination id"
    elements = elements.sort((a, b) => {
      if (a.domains.length < b.domains.length) return -1;
      if (a.domains.length > b.domains.length) return 1;
      if (a.domain_code < b.domain_code) return -1;
      if (a.domain_code > b.domain_code) return 1;
      if (a.domain_main < b.domain_main) return -1;
      if (a.domain_main > b.domain_main) return 1;
      return 0;
    });

    //////////////////////// COUNTRIES ///////////////////////

    //Get all the unique countries that are connected to the (remaining) nodes
    let country_ids = elements.map(d => {
      let links = linked_to_id[d.id].filter(n => n);
      return links.filter(n => n.type === 'country').map(n => n.id);
    });
    country_ids = [...new Set([].concat.apply([], country_ids))];

    //Get the countries to which this element is connected
    elements.forEach(d => {
      let links = linked_to_id[d.id].filter(n => n);
      let countries = links.filter(n => n.type === 'country').map(n => n.id);
      countries = countries.filter(c => country_ids.indexOf(c) >= 0);
      // d.countries = countries
      d.countries = linked_to_id[d.id]
        .filter(l => l.type === 'country')
        .map(l => l.label);
    }); //forEach

    //Add the region and area information
    country_ids.forEach(d => {
      let node = node_by_id[d];
      node.fill = color_country;
      node.opacity = 1;
      node.opacity_text = country_text_opacity;

      //Get the region that belongs to this country
      let area = linked_to_id[d].filter(n => n.type === 'region');
      if (area.length > 1) Error('More than 1 region for country ', node.label);
      node.area = area[0].label;

      // //Get the region that belongs to this country
      // let region = linked_to_id[d].filter(n => n.type === "region")
      // if (region.length > 1) Error("More than 1 region for country ", node.label)
      // node.region = region[0].label
      // //And the region of that region
      // let area = linked_to_id[region[0].id].filter(n => n.type === "region")
      // if (region.length > 1) Error("More than 1 area for region ", node.region)
      // node.area = area[0].label

      //Find the elements that this country is connected to
      let elements = linked_to_id[d]
        .filter(n => n.type === 'element')
        .map(n => n.id);
      elements = elements.filter(r => element_ids.indexOf(r) >= 0);
      node.elements = elements;

      countries.push(node);
    }); //forEach
    //133 countries total and 117 remain in this list
    num_countries = countries.length;
    // console.log([...new Set(countries.map(d => d.region))])
    // console.log([...new Set(countries.map(d => d.area))]) ["Africa", "Americas", "Asia", "Europe", "Oceania"]

    //Sort the countries by area and then alphabetically
    countries = countries.sort((a, b) => {
      if (a.area < b.area) return -1;
      if (a.area > b.area) return 1;
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    }); //sort

    ////////////////////// EDGES COUNTRY /////////////////////
    //Only keep the edges that are between nodes and countries - 539 remaining
    edges_country = edges.filter(d => {
      if (
        element_ids.indexOf(d.source) >= 0 &&
        country_ids.indexOf(d.target) >= 0
      )
        return true;
      else if (
        element_ids.indexOf(d.target) >= 0 &&
        country_ids.indexOf(d.source) >= 0
      )
        return true;
      else return false;
    }); //filter
  } //function dataPreparation

  //////////////////////////////////////////////////////////////
  /////////////////// Prepare donut arc data ///////////////////
  //////////////////////////////////////////////////////////////

  function prepareArcData() {
    let circle_angle;

    //////////////////////// AREA ARCS ///////////////////////
    circle_angle = Math.atan2(country_radius, radius_countries);

    //Roll up the countries into an array of areas and the number of countries per area
    areas = d3
      .nest()
      .key(d => d.area)
      .entries(countries);

    area_arcs = pie_area(areas);
    ctx_nodes.font = 'normal normal 300 13px ' + font_family; //Needed to get the text width
    area_arcs.forEach(d => {
      d.totalAngle = d.endAngle - d.startAngle;
      d.centerAngle = d.startAngle + d.totalAngle / 2;
      d.center_x = radius_dot_country * Math.cos(d.centerAngle - pi1_2);
      d.center_y = radius_dot_country * Math.sin(d.centerAngle - pi1_2);
      d.opacity = 0.5;
      d.opacity_text = 1;

      let num = d.data.values.length;
      let offset = 2 * circle_angle;
      let angle_step = (d.totalAngle - 2 * offset) / num;
      let angle = d.startAngle + offset;

      //Loop over each country within this area
      d.data.values.forEach(n => {
        n.angle = angle;
        n.x = radius_countries * Math.cos(angle - pi1_2);
        n.y = radius_countries * Math.sin(angle - pi1_2);
        n.r = country_radius;
        n.width = ctx_nodes.measureText(n.label).width;
        angle = angle + angle_step;
      }); //forEach
    }); //forEach

    /////////////////////// DOMAIN ARCS //////////////////////

    //Needed for general drawing
    domain_arcs = pie_domain.padAngle(0.02)(domains);
    domain_arcs.forEach(d => {
      d.totalAngle = d.endAngle - d.startAngle;
      d.centerAngle = d.startAngle + d.totalAngle / 2;
      d.center_x = radius_dot_domain * Math.cos(d.centerAngle - pi1_2);
      d.center_y = radius_dot_domain * Math.sin(d.centerAngle - pi1_2);
      d.opacity = 1;
      domain_arc_by_id[d.data.id] = d;
    });

    //////////////////// ICH ELEMENT ARCS ////////////////////

    circle_angle = Math.atan2(node_radius, radius_elements);

    //Create an array of these separate element groups
    domain_combinations = d3
      .nest()
      .key(d => d.domain_code)
      .entries(elements);

    //Figure out how "wide" each arch should be, taking the multi-row into account
    let k = 0;
    let n_d = domain_combinations.length;
    let pad_angle = 0.01;
    let offset = circle_angle / 2;
    domain_combinations.forEach(d => {
      let n = d.values.length;
      if (n <= 2) d.n_adjusted = 1;
      else if (n <= 4) d.n_adjusted = 2;
      else d.n_adjusted = Math.ceil(n / 3) + (n % 3 === 1 ? 0 : 0.5);
      k += d.n_adjusted;
    });
    //Create a donut chart-like array of start and end angles per arc
    k = Math.max(0, pi2 - (pad_angle + 2 * offset) * n_d) / k;
    let x = 0;
    domain_combinations.forEach((d, i) => {
      let start = x;
      let end = x + d.n_adjusted * k + 2 * offset;
      element_arcs.push({
        index: i,
        startAngle: start,
        endAngle: end,
        value: d.n_adjusted,
        data: d,
      });
      x = end + pad_angle;
    });
    // element_arcs = pie_element(domain_combinations)

    //Find the x and y locations of the element circles within each piece of the arcs
    element_arcs.forEach(d => {
      d.totalAngle = d.endAngle - d.startAngle;
      d.centerAngle = d.startAngle + d.totalAngle / 2;
      d.center_x = radius_dot_element * Math.cos(d.centerAngle - pi1_2);
      d.center_y = radius_dot_element * Math.sin(d.centerAngle - pi1_2);
      d.opacity = 1;

      let num = d.data.values.length;
      let angle_step = (d.totalAngle - 2 * offset) / Math.round(d.value / 0.5);
      let angle = d.startAngle + angle_step + offset;

      //Loop over each element within this domain-combi-group
      let radius;
      d.data.values.forEach((n, i) => {
        if (num === 1) {
          //Place in the center if there's only 1 option
          n.angle = d.centerAngle;
          n.x = radius_elements * Math.cos(n.angle - pi1_2);
          n.y = radius_elements * Math.sin(n.angle - pi1_2);
        } else if (num === 2) {
          n.angle = d.centerAngle;
          if (i % 3 === 0)
            radius = radius_elements + (radius_elements_offset * 2) / 3;
          else radius = radius_elements - (radius_elements_offset * 2) / 3;
          n.x = radius * Math.cos(n.angle - pi1_2);
          n.y = radius * Math.sin(n.angle - pi1_2);
        } else {
          if (i % 3 === 0) radius = radius_elements;
          else if (i % 3 === 1)
            radius = radius_elements + radius_elements_offset;
          else radius = radius_elements - radius_elements_offset;
          // let sign = i % 2 === 0 ? 1 : -1
          // let radius = radius_elements + radius_elements_offset * sign
          n.angle = angle;
          n.x = radius * Math.cos(n.angle - pi1_2);
          n.y = radius * Math.sin(n.angle - pi1_2);
          if (i % 3 !== 1) angle = angle + angle_step;
        } //else
        n.global_radius = Math.sqrt(sq(n.x) + sq(n.y));
        n.r = node_radius;
      }); //forEach
    }); //forEach
  } //function prepareArcData

  //////////////////////////////////////////////////////////////
  ////////////////////// Prepare edge data /////////////////////
  //////////////////////////////////////////////////////////////

  function prepareEdgeData() {
    ////////////////// DOMAIN-ELEMENT EDGES //////////////////
    //Create an array with the edges between the domains and the domain-combo groups
    element_arcs.forEach(d => {
      let doms = d.data.values[0].domains;
      doms.forEach(n => {
        edge_domain_by_id[n + ',' + d.data.key] = true; //Domain -> ICH group
        edges_domain.push({
          source: domain_arc_by_id[n],
          target: d,
          opacity: opacity_edge_default,
        }); //push
      }); //forEach
    }); //forEach

    edges_domain.forEach(d => {
      addEdgeSettings(d, d.source.centerAngle, d.target.centerAngle);
    }); //forEach

    //Sort the edges by their starting point (domain), and then by their rotational direction and finally by their total angle
    edges_domain = edges_domain.sort((a, b) => {
      if (a.source.data.id < b.source.data.id) return -1;
      if (a.source.data.id > b.source.data.id) return 1;
      if (a.rotation < b.rotation) return -1;
      if (a.rotation > b.rotation) return 1;
      if (a.total_angle < b.total_angle) return -1;
      if (a.total_angle > b.total_angle) return 1;
      return 0;
    }); //sort

    edges_domain_nest = d3
      .nest()
      .key(d => d.source.data.id)
      .key(d => d.rotation)
      .entries(edges_domain);
    edges_domain_nest.forEach(d => {
      d.values.forEach(l => {
        l.edges_count = l.values.length;
      });
    }); //forEach

    ////////////////// ELEMENT-DOMAIN EDGES //////////////////

    //Sort the edges by their end point (ICH element), and then by their rotational direction and finally by their total angle
    edges_domain = edges_domain.sort((a, b) => {
      if (a.target.data.id < b.target.data.id) return -1;
      if (a.target.data.id > b.target.data.id) return 1;
      if (a.rotation < b.rotation) return -1;
      if (a.rotation > b.rotation) return 1;
      if (a.total_angle > b.total_angle) return -1;
      if (a.total_angle < b.total_angle) return 1;
      return 0;
    }); //sort

    edges_element_domain_nest = d3
      .nest()
      .key(d => d.target.data.key)
      .key(d => d.rotation)
      .entries(edges_domain);
    edges_element_domain_nest.forEach(d => {
      d.values.forEach(l => {
        l.edges_count = l.values.length;
      });
    }); //forEach

    ////////////////////// EDGES COUNTRY /////////////////////

    //Connect the nodes to the edge data
    edges_country.forEach(d => {
      edge_country_by_id[d.source + ',' + d.target] = true;
      d.source = node_by_id[d.source]; //ICH
      d.target = node_by_id[d.target]; //Country
      d.opacity = 0;

      addEdgeSettings(d, d.source.angle, d.target.angle);
    }); //forEach

    ////////////////// ELEMENT-COUNTRY EDGES /////////////////

    //Sort the edges by their starting point (ICH element), and then by their rotational direction and finally by their total angle
    edges_country = edges_country.sort((a, b) => {
      if (a.source.id < b.source.id) return -1;
      if (a.source.id > b.source.id) return 1;
      if (a.rotation < b.rotation) return -1;
      if (a.rotation > b.rotation) return 1;
      if (a.total_angle < b.total_angle) return -1;
      if (a.total_angle > b.total_angle) return 1;
      return 0;
    }); //sort

    edges_element_country_nest = d3
      .nest()
      .key(d => d.source.id)
      .key(d => d.rotation)
      .entries(edges_country);
    edges_element_country_nest.forEach(d => {
      d.values.forEach(l => {
        l.edges_count = l.values.length;
      });
    }); //forEach

    ////////////////// COUNTRY-ELEMENT EDGES /////////////////

    //Sort the edges by their end point (country), and then by their rotational direction and finally by their total angle
    edges_country = edges_country.sort((a, b) => {
      if (a.target.id < b.target.id) return -1;
      if (a.target.id > b.target.id) return 1;
      if (a.rotation < b.rotation) return -1;
      if (a.rotation > b.rotation) return 1;
      if (a.total_angle > b.total_angle) return -1;
      if (a.total_angle < b.total_angle) return 1;
      return 0;
    }); //sort

    edges_country_nest = d3
      .nest()
      .key(d => d.target.id)
      .key(d => d.rotation)
      .entries(edges_country);
    edges_country_nest.forEach(d => {
      d.values.forEach(l => {
        l.edges_count = l.values.length;
      });
    }); //forEach

    // console.log(edges_country_nest, edges_country)
  } //function prepareEdgeData

  ///// Add settings to the edge that are needed to draw it ////
  function addEdgeSettings(d, source_a, target_a) {
    if (target_a - source_a < -pi) {
      d.rotation = 'cw';
      d.total_angle = 2 + (target_a - source_a) / pi;
      d.angle_sign = 1;
    } else if (target_a - source_a < 0) {
      d.rotation = 'ccw';
      d.total_angle = (source_a - target_a) / pi;
      d.angle_sign = -1;
    } else if (target_a - source_a < pi) {
      d.rotation = 'cw';
      d.total_angle = (target_a - source_a) / pi;
      d.angle_sign = 1;
    } else {
      d.rotation = 'ccw';
      d.total_angle = 2 - (target_a - source_a) / pi;
      d.angle_sign = -1;
    } //else
  } //function addEdgeSettings

  //////////////////////////////////////////////////////////////
  //////////////////////////// Title ///////////////////////////
  //////////////////////////////////////////////////////////////

  ////////////////// Draw title in the center //////////////////
  function drawTitle(ICH_num) {
    let words = translations[language].main;

    let offset = -30;
    ctx_nodes.textAlign = 'center';

    ctx_nodes.fillStyle = 'black';
    ctx_nodes.font = 'normal normal 400 22px ' + font_family;
    ctx_nodes.fillText(ICH_num + ' ' + words[0], 0, offset - 170);

    ctx_nodes.fillStyle = 'rgb(150,150,150)';
    ctx_nodes.font = 'normal normal 300 24px ' + font_family;
    ctx_nodes.fillText(words[1], 0, offset - 50);

    ctx_nodes.fillStyle = 'black';
    ctx_nodes.font = 'normal normal 200 52px ' + font_family;
    ctx_nodes.fillText(words[2], 0, offset);

    ctx_nodes.fillStyle = 'rgb(150,150,150)';
    ctx_nodes.font = 'normal normal 300 20px ' + font_family;
    offset += 80;
    ctx_nodes.fillText(words[3], 0, offset);

    ctx_nodes.fillStyle = 'black';
    ctx_nodes.font = 'normal normal 200 44px ' + font_family;
    offset += 70;
    ctx_nodes.fillText(words[4], 0, offset);

    ctx_nodes.fillStyle = 'rgb(150,150,150)';
    ctx_nodes.font = 'normal normal 300 20px ' + font_family;
    offset += 45;
    ctx_nodes.fillText(words[5], 0, offset);
  } //function drawTitle

  /////////////// Draw domain name in the center ///////////////
  function drawDomainTitle(domain, ICH_num) {
    let words = translations[language].domain;

    let offset = -30;
    ctx_nodes.textAlign = 'center';

    ctx_nodes.fillStyle = 'black';
    ctx_nodes.font = 'normal normal 400 22px ' + font_family;
    ctx_nodes.fillText(ICH_num + ' ' + words[0], 0, offset - 170);

    ctx_nodes.fillStyle = 'rgb(150,150,150)';
    ctx_nodes.font = 'normal normal 300 24px ' + font_family;
    ctx_nodes.fillText(words[1], 0, offset - 50);

    ctx_nodes.fillStyle = 'black';
    ctx_nodes.font = 'normal normal 200 52px ' + font_family;
    ctx_nodes.fillText(words[2], 0, offset);

    ctx_nodes.fillStyle = 'rgb(150,150,150)';
    ctx_nodes.font = 'normal normal 300 20px ' + font_family;
    offset += 80;
    ctx_nodes.fillText(words[3], 0, offset);

    ctx_nodes.fillStyle = color_domain_scale(domain.id);
    ctx_nodes.font = 'normal normal 300 42px ' + font_family;
    offset += 50;
    let max_width = 2 * inner_radius_domain * 0.8;
    //Go to a 2nd line if it doesn't all fit
    wrapText(ctx_nodes, domain.title, 0, offset, max_width, 52);
  } //function drawDomainTitle

  /////////////// Draw country name in the center //////////////
  function drawCountryTitle(country, ICH_num) {
    let words = translations[language].country;

    let offset = -30;
    ctx_nodes.textAlign = 'center';

    ctx_nodes.fillStyle = 'black';
    ctx_nodes.font = 'normal normal 400 22px ' + font_family;
    ctx_nodes.fillText(ICH_num + ' ' + words[0], 0, offset - 170);

    ctx_nodes.fillStyle = 'rgb(150,150,150)';
    ctx_nodes.font = 'normal normal 300 24px ' + font_family;
    ctx_nodes.fillText(words[1], 0, offset - 50);

    ctx_nodes.fillStyle = 'black';
    ctx_nodes.font = 'normal normal 200 52px ' + font_family;
    ctx_nodes.fillText(words[2], 0, offset);

    ctx_nodes.fillStyle = 'rgb(150,150,150)';
    ctx_nodes.font = 'normal normal 300 20px ' + font_family;
    offset += 80;
    ctx_nodes.fillText(words[3], 0, offset);

    ctx_nodes.fillStyle = 'black';
    ctx_nodes.font = 'normal normal 200 52px ' + font_family;
    offset += 60;
    let max_width = 2 * inner_radius_domain * 0.75;
    //Go to a 2nd line if it doesn't all fit
    wrapText(ctx_nodes, country, 0, offset, max_width, 62);

    // let country_font_size = 52
    // //Check that the country name will fit
    // let text_width = ctx_nodes.measureText(country).width
    // let max_width = 2 * inner_radius_domain * 0.75
    // //If the text is too long, find a fitting font size
    // if(text_width > max_width) {
    //     country_font_size = fitTextInCircle(ctx_nodes, country, country_font_size, max_width)
    //     ctx_nodes.font = "normal normal 200 " + country_font_size + "px " + font_family
    // }//if
    // ctx_nodes.fillText(country, 0, offset)
  } //function drawCountryTitle

  ////////////////// Fit & wrap text on canvas /////////////////
  //From: https://codepen.io/bramus/pen/eZYqoO
  function wrapText(ctx, text, x, y, max_width, line_height) {
    let words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      let new_line = line + words[n] + ' ';
      let new_width = ctx.measureText(new_line).width;
      if (new_width > max_width && n > 0) {
        ctx.fillText(line.trim(), x, y);
        line = words[n] + ' ';
        y += line_height;
      } else line = new_line;
    } //for n
    ctx.fillText(line.trim(), x, y);
  } //function wrapText

  ////////////////////// Smallest fitting font size //////////////////////
  function fitTextInCircle(ctx, text, font_size, width) {
    //Lower the font size until the text fits the canvas
    do {
      font_size -= 1;
      ctx.font = 'normal normal 300 ' + font_size + 'px ' + font_family;
    } while (ctx.measureText(text).width > width);
    return font_size;
  } //function fitTextInCircle

  ////////////////////// Draw curved text //////////////////////
  function drawTextAlongArc(
    ctx,
    str,
    angle,
    radius,
    side,
    kerning = 0.6,
    do_stroke = false
  ) {
    let startAngle = side === 'up' ? angle : angle - pi;
    if (side === 'up')
      str = str
        .split('')
        .reverse()
        .join(''); // Reverse letters

    //Rotate 50% of total angle for center alignment
    for (let j = 0; j < str.length; j++) {
      let charWid = ctx.measureText(str[j]).width;
      startAngle +=
        (charWid + (j === str.length - 1 ? 0 : kerning)) / radius / 2;
    } //for j

    ctx.save();
    // ctx.translate(center_x, center_y)
    ctx.rotate(startAngle);
    for (let n = 0; n < str.length; n++) {
      let charWid = ctx.measureText(str[n]).width / 2; // half letter
      //Rotate half letter
      ctx.rotate(-charWid / radius);
      if (do_stroke)
        ctx.strokeText(str[n], 0, (side === 'up' ? -1 : 1) * radius);
      ctx.fillText(str[n], 0, (side === 'up' ? -1 : 1) * radius);
      //Rotate another half letter
      ctx.rotate(-(charWid + kerning) / radius);
    } //for n
    ctx.restore();
  } //function drawTextAlongArc

  //////////////////////////////////////////////////////////////
  //////////////// Hidden hover element functions //////////////
  //////////////////////////////////////////////////////////////

  /////////////// Draw the hidden mouseover nodes //////////////
  function drawHiddenElements() {
    //Create the donut arcs on the SVG for the mouse hover
    hover_domain = g_scale
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
    hover_ich = g_scale
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
    console.log(countries);
    hover_country = g_scale
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
  } //function drawHiddenElements

  /////////////// Set the mouseover functionality //////////////
  function setHiddenHovers() {
    hover_domain
      .on('click', d => mouseClick(d, 'domain'))
      .on('mouseover', d => {
        if (!click_active) mouseOverDomain(d);
        else {
          clearCanvas([ctx_hover]);
          ctx_hover.font = 'normal normal 400 16px ' + font_family;
          ctx_hover.textBaseline = 'middle';
          ctx_hover.textAlign = 'center';
          //Find the correct domain in the actual data
          let chosen = domain_arcs.map(l => l.data.id).indexOf(d.data.id);
          drawDomainDonutChart(ctx_hover, domain_arcs[chosen], 1);
        } //else
      })
      .on('mouseout', d => {
        if (!click_active) mouseOverReset();
        else clearCanvas([ctx_hover]);
      });

    hover_ich.on('click', d => {
      mouseClick(d, 'element');
      showModal(d);
    }); //on

    hover_country
      .on('click', d => mouseClick(d, 'country'))
      .on('mouseover', d => {
        if (!click_active) mouseOverCountry(d);
        else {
          clearCanvas([ctx_hover]);
          ctx_hover.textBaseline = 'middle';
          ctx_hover.lineWidth = 2;
          ctx_hover.font = 'normal normal 400 13.5px ' + font_family;
          drawCountries(ctx_hover, d, 1);
        } //else
      })
      .on('mouseout', d => {
        if (!click_active) mouseOverReset();
        else clearCanvas([ctx_hover]);
      });
  } //function setHiddenHovers

  //////////////////////////////////////////////////////////////
  ///////////////////////// Donut Charts ///////////////////////
  //////////////////////////////////////////////////////////////

  function prepareArcs() {
    ///////////////////// Node pie charts ////////////////////
    arc_nodes
      .outerRadius(node_radius)
      // .innerRadius(node_radius * 0.35)
      .innerRadius(0)
      .context(ctx_nodes);

    //////////////////// Photo pie charts ////////////////////
    arc_photo
      .outerRadius(photo_radius + 5)
      .innerRadius(0)
      .context(ctx_nodes);

    ///////////////////////// Domains ////////////////////////
    arc_domain
      .innerRadius(inner_radius_domain)
      .outerRadius(outer_radius_domain)
      .cornerRadius(corner_radius_domain);
    // .context(ctx_donuts)

    /////////////////////// ICH elements /////////////////////
    arc_element
      .innerRadius(inner_radius_element)
      .outerRadius(outer_radius_element)
      .cornerRadius(corner_radius_element)
      .context(ctx_donuts);

    ///////////////////// Country regions ////////////////////
    area_arc_offset = Math.atan2(country_radius, radius_countries) * 1.3;
    arc_area
      .startAngle(d => d.startAngle - area_arc_offset)
      .endAngle(d => d.endAngle - area_arc_offset)
      .innerRadius(inner_radius_country)
      .outerRadius(outer_radius_country)
      .cornerRadius(corner_radius_country)
      .context(ctx_donuts);

    ////////////////// Country hover region //////////////////
    let country_arc_width = (pi2 - 0.04 * area_arcs.length) / num_countries;
    arc_country
      .startAngle(d => d.angle - 0.5 * country_arc_width)
      .endAngle(d => d.angle + 0.5 * country_arc_width)
      .innerRadius(outer_radius_country)
      .outerRadius(
        d => outer_radius_country + 2 * country_radius + d.width + 10
      );
  } //function prepareArcs

  //////////////////// Draw the domain arcs ////////////////////
  function drawDomainDonutChart(ctx, d, opacity) {
    opacity = opacity ? opacity : d.opacity;

    //Draw the arc
    ctx.fillStyle = chroma(color_domain_scale(d.data.id))
      .alpha(opacity)
      .css();
    ctx.beginPath();
    arc_domain.context(ctx)(d);
    ctx.closePath();
    ctx.fill();

    //Draw the text inside the arcs
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    let side =
      d.centerAngle < pi1_2 || d.centerAngle > pi2 - pi1_2 ? 'up' : 'down';
    let radius =
      inner_radius_domain + (outer_radius_domain - inner_radius_domain) / 2;
    drawTextAlongArc(ctx, d.data.title, d.centerAngle, radius, side);
  } //function drawDomainDonutChart

  ////////// Draw the element domain combination arcs //////////
  function drawElementDonutChart() {
    element_arcs.forEach(d => {
      ctx_donuts.fillStyle = chroma('rgb(230,230,230)')
        .alpha(d.opacity)
        .css();
      ctx_donuts.beginPath();
      arc_element(d);
      ctx_donuts.closePath();
      ctx_donuts.fill();
    }); //forEach
  } //function drawElementDonutChart

  //////////////////// Draw the country arcs ///////////////////
  function drawCountryDonutChart() {
    ctx_donuts.lineWidth = 4;

    area_arcs.forEach(d => {
      //Draw the small arcs sectioning off a region on Earth
      ctx_donuts.fillStyle = chroma(color_country)
        .alpha(d.opacity)
        .css();
      ctx_donuts.beginPath();
      arc_area(d);
      ctx_donuts.closePath();
      ctx_donuts.fill();

      //Draw the text inside the arcs
      ctx_donuts.font = 'normal normal 400 16px ' + font_family;
      ctx_donuts.textBaseline = 'middle';
      ctx_donuts.textAlign = 'center';
      ctx_donuts.strokeStyle = chroma('white')
        .alpha(d.opacity_text)
        .css();
      ctx_donuts.fillStyle = chroma(color_country)
        .alpha(d.opacity_text)
        .css();
      let angle = d.centerAngle - area_arc_offset;
      let side, radius;
      if (angle < pi1_2 || angle > pi * 1.5) {
        side = 'up';
        radius = inner_radius_country + 3;
      } else {
        side = 'down';
        radius = inner_radius_country + 0;
      } //else
      drawTextAlongArc(ctx_donuts, d.data.key, angle, radius, side, 1.4, true);
    }); //forEach
  } //function drawCountryDonutChart

  //////////////////////////////////////////////////////////////
  //////////////////// Node drawing functions //////////////////
  //////////////////////////////////////////////////////////////

  /////////////////////// Draw the nodes ///////////////////////
  function drawElements(ctx, d, opacity) {
    opacity = opacity ? opacity : d.opacity;

    // //Clip to circle
    // ctx.save()
    // ctx.beginPath()
    // ctx.arc(d.x, d.y, node_radius, 0, pi2)
    // ctx.closePath()
    // ctx.clip()

    //White background circle, so the grey doesn't shine through
    if (mouse_hover_active) {
      ctx_donuts.beginPath();
      ctx_donuts.moveTo(d.x, d.y); //Needed to make sure Chrome keeps them as circles even at small sizes
      ctx_donuts.arc(d.x, d.y, node_radius, 0, pi2);
      ctx_donuts.closePath();
      ctx_donuts.fillStyle = 'rgb(255,255,255,0.8)';
      ctx_donuts.fill();
    } //if

    //Draw the circles as mini pie charts
    let arcs = pie_nodes(d.domains);
    ctx.save();
    ctx.translate(d.x, d.y);
    ctx.rotate(d.angle);
    arcs.forEach(a => {
      ctx.beginPath();
      ctx.moveTo(0, 0); //Needed to make sure Chrome keeps them as circles even at small sizes
      arc_nodes.context(ctx)(a);
      ctx.closePath();
      ctx.fillStyle = chroma(color_domain_scale(a.data))
        .alpha(opacity)
        .css();
      ctx.fill();
    }); //forEach
    ctx.restore();

    //Draw a stroke around the circles with a main domain
    if (d.domain_main !== '0') {
      //} && opacity === 1) {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.beginPath();
      // ctx.moveTo(d.x, d.y)
      ctx.arc(d.x, d.y, node_radius - element_stroke_width * 0.4, 0, pi2);
      ctx.closePath();
      ctx.strokeStyle = chroma(color_domain_scale(d.domain_main))
        .alpha(opacity)
        .css();
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
    } //if

    // ctx.restore()
  } //function drawElements

  //////////////////// Draw a country shapes ///////////////////
  function drawCountries(ctx, d, opacity) {
    let opacity_text = opacity ? opacity : d.opacity_text;
    opacity = opacity ? opacity : d.opacity;

    //Rotate and then move the canvas origin to the country "dot" location
    ctx.save();
    ctx.rotate(d.angle < pi ? d.angle - pi1_2 : d.angle - pi1_2 - pi);
    ctx.translate((d.angle < Math.PI ? 1 : -1) * radius_countries, 0);

    //Draw the country diamond
    ctx.beginPath();
    drawDiamond(ctx, 0, 0, d.r, d.r);
    ctx.closePath();
    ctx.fillStyle = chroma(color_country)
      .alpha(opacity)
      .css();
    ctx.strokeStyle = chroma('white')
      .alpha(opacity)
      .css();
    ctx.fill();
    ctx.stroke();

    //Draw the text
    ctx.textAlign = d.angle < Math.PI ? 'start' : 'end';
    ctx.fillStyle = chroma(color_text)
      .alpha(opacity_text)
      .css();
    ctx.translate((d.angle < Math.PI ? 1 : -1) * country_radius, 0);
    ctx.fillText(d.label, 0, -2);
    ctx.restore();
  } //function drawCountries

  //////////////////// Draw a diamond shape ////////////////////
  //https://websanova.com/blog/html5/10-shapes-to-extend-html5-canvas
  function drawDiamond(ctx, x, y, w, h) {
    x -= w / 2;
    y -= h / 2;
    ctx.moveTo(x + w * 0.5, y);
    ctx.lineTo(x, y + h * 0.5);
    ctx.lineTo(x + w * 0.5, y + h);
    ctx.lineTo(x + w, y + h * 0.5);
    ctx.lineTo(x + w * 0.5, y);
  } //function drawDiamond

  ////////////// Draw a dot outside the domain arc /////////////
  function drawDomainDots() {
    //Draw the dots to which all the lines will lead
    ctx_nodes.lineWidth = 2;
    domain_arcs.forEach(d => {
      ctx_nodes.fillStyle = chroma(color_domain_scale(d.data.id))
        .alpha(d.opacity)
        .css();
      ctx_nodes.strokeStyle = 'white';
      ctx_nodes.beginPath();
      ctx_nodes.arc(d.center_x, d.center_y, 5, 0, pi2);
      ctx_nodes.closePath();
      ctx_nodes.fill();
      ctx_nodes.stroke();
    }); //forEach
  } //function drawDomainDots

  /////////// Draw a dot outside the ICH element arc ///////////
  function drawElementArcDots() {
    ctx_nodes.lineWidth = 2;
    element_arcs.forEach(d => {
      let op = d.opacity > 0.6 ? d.opacity : 0;
      ctx_nodes.fillStyle = chroma(chosen_domain_color)
        .alpha(op)
        .css();
      ctx_nodes.strokeStyle = chroma('white')
        .alpha(op)
        .css();
      ctx_nodes.beginPath();
      ctx_nodes.arc(d.center_x, d.center_y, 3, 0, pi2);
      ctx_nodes.closePath();
      ctx_nodes.fill();
      ctx_nodes.stroke();
    }); //forEach
  } //function drawElementArcDots

  //////////////////////////////////////////////////////////////
  //////////////////// Line drawing functions //////////////////
  //////////////////////////////////////////////////////////////

  function drawLines(ctx, type, data, filter_id) {
    data.forEach(e => {
      //outer domains / elements / countries
      e.values.forEach(c => {
        //ccw vs cw
        c.values.forEach((d, i) => {
          //edges
          if (d.opacity === 0) return;

          if (type === 'domain' && filter_id && d.source.data.id !== filter_id)
            return;
          else if (
            type === 'element-domain' &&
            filter_id &&
            filter_id.indexOf(d.target.data.key) < 0
          )
            return;
          else if (
            type === 'element-country' &&
            filter_id &&
            d.source.id !== filter_id
          )
            return;
          else if (type === 'country' && filter_id && d.target.id !== filter_id)
            return;

          let source_a, source_r, target_a, target_r;
          let line_data = [];

          if (type === 'domain' || type === 'element-domain') {
            source_a = d.source.centerAngle;
            source_r = radius_dot_domain;
            target_a = d.target.centerAngle;
            target_r = radius_dot_element;
            scale_rad_curve.range([0.92, 0.78]);
          } else {
            source_a = d.source.angle;
            source_r = d.source.global_radius;
            target_a = d.target.angle;
            target_r = radius_countries;
            scale_rad_curve.range([1.22, 1.05]);
          } //else

          //Calculate the radius of the middle arcing section of the line
          scale_rad_curve.domain([-1, c.edges_count]);
          let rad_curve_line = scale_rad_curve(i) * radius_elements;

          //Slightly offset the first point on the curve from the source
          let start_angle =
            source_a +
            d.angle_sign * scale_angle_start_offset(d.total_angle) * pi;
          //Slightly offset the last point on the curve from the target
          let end_angle =
            target_a -
            d.angle_sign * scale_angle_end_offset(d.total_angle) * pi;

          let da_inner;
          if (target_a - source_a < -pi)
            da_inner = pi2 + (end_angle - start_angle);
          else if (target_a - source_a < 0) da_inner = start_angle - end_angle;
          else if (target_a - source_a < pi) da_inner = end_angle - start_angle;
          else if (target_a - source_a < pi2)
            da_inner = pi2 - (end_angle - start_angle);

          //Attach first point to data
          line_data.push({ angle: source_a, radius: source_r });
          //Attach first point of the curve section
          line_data.push({ angle: start_angle, radius: rad_curve_line });

          //Create points in between for the curve line
          const step = 0.07;
          const n = Math.abs(Math.floor(da_inner / step)) - 1;
          let curve_angle = start_angle;
          let sign = d.rotation === 'cw' ? 1 : -1;
          if (n >= 1) {
            for (let j = 0; j < n; j++) {
              curve_angle += (sign * step) % pi2;
              line_data.push({ angle: curve_angle, radius: rad_curve_line });
            } //for j
          } //if

          //Attach last point of the curve section
          line_data.push({ angle: end_angle, radius: rad_curve_line });
          //Attach last point to data
          line_data.push({ angle: target_a, radius: target_r });

          //Draw the path
          ctx.beginPath();
          line(line_data);
          let stroke =
            type === 'domain' || type === 'element-domain'
              ? color_domain_scale(d.source.data.id)
              : color_country;
          ctx.strokeStyle = chroma(stroke)
            .alpha(d.opacity)
            .css();
          ctx.stroke();
        }); //forEach d
      }); //forEach c
    }); //forEach e
  } //function drawLines

  //////////////////////////////////////////////////////////////
  /////////////////// Canvas drawing functions /////////////////
  //////////////////////////////////////////////////////////////

  function drawInnerSection(ctx, d) {
    //Draw a circle in the center as a "fallback" + it will create stroke around the image

    //Draw a white circle to block out the click active inner section
    if (click_active) {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(0, 0, inner_radius_domain - 3, 0, pi2);
      ctx.closePath();
      ctx.fill();
    } //if

    //Draw the circles as mini pie charts
    let arcs =
      d.domain_main !== '0' ? pie_nodes([d.domain_main]) : pie_nodes(d.domains);
    arcs.forEach(a => {
      ctx.beginPath();
      arc_photo.context(ctx)(a);
      ctx.closePath();
      ctx.fillStyle = color_domain_scale(a.data);
      ctx.shadowColor = color_domain_scale(a.data);
      ctx.fill();
    }); //forEach

    //Draw a photo of the hovered ICH in the center
    if (d.img && d.img_loaded) drawPhoto(ctx, d);
    else if (d.meta && d.meta.images) {
      //If the photo isn't yet loaded
      d.img = new Image();
      // d.img.src = d.meta.images[0]
      d.img.src = d.meta.icon.large;
      d.img_loaded = false;
      d.img.onload = () => {
        d.img_loaded = true;
        drawPhoto(ctx, d);
      }; //else
    } //if

    //Add the title of the ICH in a ring around the photo
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle =
      d.domain_main !== '0'
        ? color_domain_scale(d.domain_main)
        : d.domains.length === 1
        ? color_domain_scale(d.domains[0])
        : 'black';
    //Get the text width at 16px to figure out a font-size
    ctx.font = 'normal normal 400 16px ' + font_family;
    let font_size = scale_font_size(ctx.measureText(d.label).width);
    //Add the text
    ctx.font = 'normal normal 400 ' + font_size + 'px ' + font_family;
    let radius = photo_radius + (inner_radius_domain - photo_radius) / 2;
    drawTextAlongArc(ctx, d.label, 0, radius, 'up');
  } //function drawInnerSection

  ///////////// Draw an image in the center circle /////////////
  function drawPhoto(ctx, d) {
    if (!mouse_hover_active || d !== current_hover) return;

    let img_w = d.img.width;
    let img_h = d.img.height;
    let min_size = Math.min(img_w, img_h);
    let r = photo_radius;

    //Clip the image to the circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, pi2);
    ctx.clip();
    ctx.drawImage(
      d.img,
      (img_w - min_size) / 2,
      (img_h - min_size) / 2,
      min_size,
      min_size, //sx, sy, swidth, sheight
      -r,
      -r,
      2 * r,
      2 * r
    ); //x, y, width, height
    ctx.restore();
  } //function drawPhoto

  //////////////////////////////////////////////////////////////
  /////////////////// Canvas drawing functions /////////////////
  //////////////////////////////////////////////////////////////

  ////////////////////// Clear all canvases ////////////////////
  function clearCanvas(ctxs) {
    ctxs.forEach(d => {
      d.clearRect(
        (-margin.left - width / 2) / scale_factor,
        (-margin.top - height / 2) / scale_factor,
        total_width / scale_factor,
        total_height / scale_factor
      );
    });
  } //function clearCanvas

  /////////////// Draw all parts on the canvases ///////////////
  function drawCanvas() {
    //Clear everything
    clearCanvas([ctx_edges, ctx_donuts, ctx_nodes, ctx_hover]);

    //Draw the lines in between the domain arcs and the ICH element arcs
    if (hover_type === 'element')
      drawLines(ctx_edges, 'element-domain', edges_element_domain_nest);
    else if (hover_type !== 'country')
      drawLines(ctx_edges, 'domain', edges_domain_nest);
    if (hover_type === 'element')
      drawLines(ctx_edges, 'element-country', edges_element_country_nest);
    else drawLines(ctx_edges, 'country', edges_country_nest);

    //Draw the domain arcs
    ctx_donuts.font = 'normal normal 400 16px ' + font_family;
    ctx_donuts.textBaseline = 'middle';
    ctx_donuts.textAlign = 'center';
    domain_arcs.forEach(d => {
      drawDomainDonutChart(ctx_donuts, d);
    });
    //Draw the dots outside the domain arcs
    if (hover_type !== 'country') drawDomainDots();

    //Draw the ICH element arcs
    drawElementDonutChart();
    //Draw the dots outside the ICH element arcs
    drawElementArcDots();

    //Draw the ICH elements
    ctx_nodes.lineWidth = element_stroke_width;
    elements.forEach(d => {
      drawElements(ctx_nodes, d);
    });
    ctx_nodes.lineWidth = 1;

    //Draw the regional area arcs
    drawCountryDonutChart();

    //Draw the country diamonds around the outside
    ctx_nodes.textBaseline = 'middle';
    ctx_nodes.lineWidth = 2;
    ctx_nodes.font = 'normal normal 400 13.5px ' + font_family;
    countries.forEach(d => {
      drawCountries(ctx_nodes, d);
    });

    //Draw the title in the center
    if (hover_type === 'element') drawInnerSection(ctx_nodes, current_hover);
    else if (hover_type === 'domain')
      drawDomainTitle(current_hover.data, ICH_num);
    else if (hover_type === 'country')
      drawCountryTitle(current_hover.label, ICH_num);
    else drawTitle(ICH_num_all);
  } //function drawCanvas

  //////////////////////////////////////////////////////////////
  //////////////////// Mouse click functions ///////////////////
  //////////////////////////////////////////////////////////////

  function mouseClick(d, click_type) {
    if (d3.event) d3.event.stopPropagation();
    click_active = true;

    //Call the correct drawing function
    if (click_type === 'element') mouseOverElement(d);
    else if (click_type === 'country') mouseOverCountry(d);
    else if (click_type === 'domain') mouseOverDomain(d);

    current_click = d;
  } //function mouseClick

  ////////////////////// Manually fix node /////////////////////
  chart.fixNode = node_id => {
    //Check if it's in the data
    let node = node_by_id[node_id];
    if (node) mouseClick(node, node.type);
  }; //function fixNode

  //////////////////////////////////////////////////////////////
  ///////////////////// Mouse over functions ///////////////////
  //////////////////////////////////////////////////////////////

  /////////////////// Mouse over a domain arc //////////////////
  function mouseOverDomain(d) {
    // if(d3.event) d3.event.stopPropagation()
    if (timer_draw) timer_draw.stop();
    mouse_hover_active = true;
    hover_type = 'domain';
    current_hover = d;
    let id = d.data.id;
    let id_num = id.replace('vocabulary_ich_', '');

    //The edges
    edges_domain.forEach(l => {
      l.opacity = l.source.data.id === id ? 1 : 0;
    });

    //The domain arcs
    domain_arcs.forEach(n => {
      n.opacity = n.data.id === id ? 1 : 0.1;
    });

    //The ICH element arcs
    element_arcs.forEach(n => {
      n.opacity = n.data.key.includes(id_num) ? 1 : 0.1;
    });
    //The dots outside the ICH element arcs
    chosen_domain_color = color_domain_scale(id);

    //The ICH circles
    elements.forEach(n => {
      n.opacity = n.domains.indexOf(id) >= 0 ? 1 : 0.1;
    });

    //Number of connected ICH elements
    ICH_num = elements.filter(n => n.domains.indexOf(id) >= 0).length;

    //The country arcs
    area_arcs.forEach(n => {
      n.opacity = 0.5;
      n.opacity_text = 1;
    });

    //Connected elements
    let connected_elements = elements
      .filter(n => n.opacity >= 0.99)
      .map(n => n.id);
    countries.forEach(n => {
      //Check if there is any element that coincides between the two
      let found = n.elements.some(r => connected_elements.indexOf(r) >= 0);
      n.opacity = found ? 1 : 0.1;
      n.opacity_text = found ? country_text_opacity : 0.1;
    }); //forEach

    drawCanvas();
  } //function mouseOverDomain

  ////////////////// Mouse over an ICH element /////////////////
  function findElement() {
    let m = d3.mouse(this);
    let x = (m[0] - total_width / 2) / scale_factor;
    let y = (m[1] - total_height / 2) / scale_factor;
    let r = Math.sqrt(x * x + y * y);

    //Only continue of the mouse os somewhere near the ICH element arc
    if (r > inner_radius_element - 50 && r < outer_radius_element + 50) {
      //Search for nearby ICH element
      let found = diagram.find(x, y, (node_radius * 2) / scale_factor);
      //A match is found and it's a new one
      if (found && current_hover !== found.data) {
        if (!click_active) mouseOverElement(found.data);
        //If a click is active and you hover over another element
        else if (click_active) {
          current_hover = found.data;
          clearCanvas([ctx_hover]);
          drawElements(ctx_hover, found.data, 1);
          drawInnerSection(ctx_hover, found.data);
        } //else if
      } //if
      //When hovering away from an element and no click is active
      else if (!click_active && !found && mouse_hover_active) mouseOverReset();
      //When a click is active and you hover away
      else if (click_active && !found) {
        clearCanvas([ctx_hover]);
        current_hover = null;
      } //else if
    } //if
    else if (!click_active && mouse_hover_active && hover_type === 'element')
      mouseOverReset();
  } //function findElement

  function mouseOverElement(d) {
    if (timer_draw) timer_draw.stop();
    mouse_hover_active = true;
    hover_type = 'element';
    current_hover = d;
    let id = d.id;
    let domain_id = d.domain_code;

    //The edges from element to domain
    edges_domain.forEach(l => {
      l.opacity = l.target.data.key === domain_id ? 1 : 0;
    });

    //The domain arcs
    domain_arcs.forEach(n => {
      n.opacity = d.domains.indexOf(n.data.id) >= 0 ? 1 : 0.2;
    });

    //The ICH element arcs
    element_arcs.forEach(n => {
      n.opacity = n.data.key === domain_id ? 0.7 : 0.1;
    });

    //The ICH circles
    elements.forEach(n => {
      if (n.id === id) n.opacity = 1;
      else if (n.domain_code === domain_id) n.opacity = 0.3;
      else n.opacity = 0.1;
    }); //foreach

    //The country arcs
    area_arcs.forEach(n => {
      n.opacity = 0.2;
      n.opacity_text = 0;
    });

    //The country diamonds around the outside
    countries.forEach(n => {
      let found = n.elements.indexOf(id) >= 0;
      n.opacity = found ? 1 : 0.1;
      n.opacity_text = found ? 1 : 0.1;
    });

    //The edges from element to country
    edges_country.forEach(l => {
      l.opacity = l.source.id === id ? 1 : 0;
    });

    drawCanvas();
  } //function mouseOverElement

  //////////////////// Mouse over a country ////////////////////
  function mouseOverCountry(d) {
    // if(d3.event) d3.event.stopPropagation()
    //If the canvas fade is still active, stop it
    if (timer_draw) timer_draw.stop();
    mouse_hover_active = true;
    current_hover = d;
    hover_type = 'country';
    let id = d.id;

    //Find the domain-combination id's of all the elements
    let domain_codes = d.elements.map(n => node_by_id[n].domain_code);
    domain_codes = [...new Set(domain_codes)];
    //Find the unique domain ids that are connected to the elements of the country
    let domains = d.elements.map(n => node_by_id[n].domains);
    domains = [...new Set([].concat.apply([], domains))].sort();

    //The edges from element to domain
    edges_domain.forEach(l => {
      l.opacity = 0;
    });

    //The domain arcs
    domain_arcs.forEach(n => {
      n.opacity = domains.indexOf(n.data.id) >= 0 ? 1 : 0.2;
    });

    //The ICH element arcs
    element_arcs.forEach(n => {
      n.opacity = domain_codes.indexOf(n.data.key) >= 0 ? 0.5 : 0.1;
    });

    //The ICH circles
    elements.forEach(n => {
      n.opacity = d.elements.indexOf(n.id) >= 0 ? 1 : 0.1;
    });

    //Number of connected ICH elements
    ICH_num = elements.filter(n => d.elements.indexOf(n.id) >= 0).length;

    //The country arcs
    area_arcs.forEach(n => {
      n.opacity = 0.2;
      n.opacity_text = 0;
    });

    //The country diamonds around the outside
    countries.forEach(n => {
      let found = n.id === id;
      n.opacity = found ? 1 : 0.1;
      n.opacity_text = found ? 1 : 0.1;
    });

    //The edges from country to element
    edges_country.forEach(l => {
      l.opacity = l.target.id === id ? 1 : 0;
    });

    drawCanvas();
  } //function mouseOverCountry

  //////////////////////////////////////////////////////////////
  ///////////////////// Mouse out functions ////////////////////
  //////////////////////////////////////////////////////////////

  function mouseOverReset() {
    if (timer_draw) timer_draw.stop();
    mouse_hover_active = false;
    hover_type = null;
    current_hover = null;

    chosen_domain_color = default_grey;
    fadeCanvasBackIn();

    // //The domain to ICH element arcs as normal
    // edges_domain.forEach(n => { n.opacity = opacity_edge_default })
    // //All domain arcs as normal
    // domain_arcs.forEach(n => { n.opacity = 1 })
    // //The ICH element arcs as normal
    // element_arcs.forEach(n => { n.opacity = 1 })
    // //The ICH circles
    // elements.forEach(n => { n.opacity = 1 })
    // //The edges between the ICH and countries
    // edges_country.forEach(n => { n.opacity = 0 })
    // //The country arcs
    // area_arcs.forEach(n => {
    //     n.opacity = 0.5
    //     n.opacity_text = 1
    // })
    // //The country diamonds around the outside
    // countries.forEach(n => {
    //     n.opacity = 1
    //     n.opacity_text = country_text_opacity
    // })
    // drawCanvas()
  } //function mouseOverReset

  /////////////////// Fade everything back in //////////////////
  function fadeCanvasBackIn() {
    //Transition settings
    const duration = 250;
    const ease = d3.easeQuadInOut;

    /////////// Calculate the opacity interpolators //////////

    //The domain to ICH element edges
    edges_domain.forEach(n => {
      n.interpolate_opacity = d3.interpolate(n.opacity, opacity_edge_default);
    });
    //Domain arcs
    domain_arcs.forEach(n => {
      n.interpolate_opacity = d3.interpolate(n.opacity, 1);
    });
    //The ICH element arcs
    element_arcs.forEach(n => {
      n.interpolate_opacity = d3.interpolate(n.opacity, 1);
    });
    //The ICH circles
    elements.forEach(n => {
      n.interpolate_opacity = d3.interpolate(n.opacity, 1);
    });
    //The edges between the ICH and countries
    edges_country.forEach(n => {
      n.interpolate_opacity = d3.interpolate(n.opacity, 0);
    });
    //The country arcs
    area_arcs.forEach(n => {
      n.interpolate_opacity = d3.interpolate(n.opacity, 0.5);
      n.interpolate_opacity_text = d3.interpolate(n.opacity_text, 1);
    });
    //The country diamonds
    countries.forEach(n => {
      n.interpolate_opacity = d3.interpolate(n.opacity, 1);
      n.interpolate_opacity_text = d3.interpolate(
        n.opacity_text,
        country_text_opacity
      );
    });

    //Fade everything back in
    timer_draw = d3.timer(elapsed => {
      //How far along the total duration are we (taking the easing into account)
      let t = ease(Math.min(1, elapsed / duration));

      //Set new opacities
      elements.forEach(n => {
        n.opacity = n.interpolate_opacity(t);
      });
      countries.forEach(n => {
        n.opacity = n.interpolate_opacity(t);
        n.opacity_text = n.interpolate_opacity_text(t);
      });
      edges_domain.forEach(l => {
        l.opacity = l.interpolate_opacity(t);
      });
      edges_country.forEach(l => {
        l.opacity = l.interpolate_opacity(t);
      });
      domain_arcs.forEach(n => {
        n.opacity = n.interpolate_opacity(t);
      });
      element_arcs.forEach(n => {
        n.opacity = n.interpolate_opacity(t);
      });
      area_arcs.forEach(n => {
        n.opacity = n.interpolate_opacity(t);
        n.opacity_text = n.interpolate_opacity_text(t);
      });

      //Draw the canvas
      drawCanvas();

      //Stop when the duration has been reached
      if (elapsed >= duration) timer_draw.stop();
    }); //timer
  } //function fadeCanvasBackIn

  //////////////////////////////////////////////////////////////
  ///////////////////// Save result to PNG /////////////////////
  //////////////////////////////////////////////////////////////

  chart.saveImage = (width_print = 20, units = 'cm') => {
    ///////////// Calculate new sizes /////////////
    //https://www.pixelcalculator.com/index.php?lang=en&dpi1=300&FS=2
    const dpi_scale = 300 / 2.54; //300 dpi / 2.54cm
    //Calculate the new scale factor
    let sf_new;
    if (units === 'px') sf_new = width_print / width;
    else sf_new = (width_print * dpi_scale) / width;
    let sf_scale = sf_new / sf;
    //Check sizes
    if (sf_new * width * sf_new * height > 268435456)
      Error('requested canvas is probably too big for the browser to handle');
    sf = sf_new;
    sf_set = true;

    ///////////// Resize everything /////////////
    //Resize the actual canvas to this
    let resizeDone = new Promise(function(resolve, reject) {
      let result = chart.resize();
      if (result === 1) resolve('resizing done');
      else reject(Error('Resizing broke'));
    });
    //Do the next step after the resizing is done
    resizeDone.then(
      result => {
        createPrintCanvas();
        //Resize back
        sf = sf_original;
        sf_set = sf_set_original;
        chart.resize();
      },
      error => {
        console.log(error);
      }
    );

    function createPrintCanvas() {
      //Create "off-screen" canvas to combine the different layers
      let canvas_save = document.createElement('canvas');
      canvas_save.id = 'canvas-print';
      let ctx_save = canvas_save.getContext('2d');
      canvas_save.width = total_width * sf;
      canvas_save.height = total_height * sf;

      //Draw all the layers onto 1 canvas
      ctx_save.drawImage(
        canvas_donuts.node(),
        0,
        0,
        canvas_save.width,
        canvas_save.height
      );
      ctx_save.drawImage(
        canvas_edges.node(),
        0,
        0,
        canvas_save.width,
        canvas_save.height
      );
      ctx_save.drawImage(
        canvas_nodes.node(),
        0,
        0,
        canvas_save.width,
        canvas_save.height
      );
      ctx_save.drawImage(
        canvas_hover.node(),
        0,
        0,
        canvas_save.width,
        canvas_save.height
      );

      //Get the image
      // a.href = canvas_save.toDataURL("image/png") //won' work, too large a URL
      try {
        //Automatically download the canvas
        //https://stackoverflow.com/questions/35480112
        //Doesn't work in IE & Edge
        canvas_save.toBlob(blob => {
          let a = document.createElement('a');
          let url = URL.createObjectURL(blob);
          a.href = url;
          a.download = 'ICH_Domains.png';
          // a.target = "_blank"
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          // console.log("downloading")
        }, 'image/png');
      } catch (err) {
        //Manually download the canvas
        document.body.appendChild(canvas_save);
        document.body.style.overflow = 'auto';
        window.scrollTo(0, document.body.scrollHeight);
        console.log(
          'Unable to automatically download the file due to photo and wrong URL'
        );
      } //try-catch
    } //function createPrintCanvas
  }; //function saveImage

  //////////////////////////////////////////////////////////////
  /////////////////////// Helper functions /////////////////////
  //////////////////////////////////////////////////////////////

  function sq(x) {
    return x * x;
  }

  function roundTo(n, digits) {
    let multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return Math.round(n) / multiplicator;
  } //function roundTo

  ////////////////// Retina non-blurry canvas //////////////////
  function crispyCanvas(canvas, ctx) {
    canvas
      .attr('width', Math.round(sf * total_width))
      .attr('height', Math.round(sf * total_height))
      .style('width', `${total_width}px`)
      .style('height', `${total_height}px`);
    ctx.scale(sf * scale_factor, sf * scale_factor);
    ctx.translate(
      (margin.left + width / 2) / scale_factor,
      (margin.top + height / 2) / scale_factor
    );
  } //function crispyCanvas

  ////////////////// Find the device pixel ratio //////////////////
  function getPixelRatio(ctx) {
    //From https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;
    let ratio = devicePixelRatio / backingStoreRatio;
    return ratio;
  } //function getPixelRatio

  //////////////////////////////////////////////////////////////
  //////////////////// Accessor functions //////////////////////
  //////////////////////////////////////////////////////////////

  chart.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return chart;
  };

  chart.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return chart;
  };

  chart.nodeRadius = function(value) {
    if (!arguments.length) return node_radius;
    node_radius = value;
    return chart;
  }; //function nodeRadius

  chart.scaleFactor = function(value) {
    if (!arguments.length) return sf;
    sf = value;
    sf_original = sf;
    sf_set = true;
    sf_set_original = true;
    return chart;
  }; //function scaleFactor

  chart.zoomFactor = function(value) {
    if (!arguments.length) return scale_multiplier;
    scale_multiplier = value;
    return chart;
  }; //function zoomFactor

  chart.showModal = function(_) {
    return arguments.length ? ((showModal = _), chart) : showModal;
  }; //function showModal

  return chart;
}

export default createDomainVisual;
