import * as d3 from 'd3';
import chroma from 'chroma-js';

const createConfig = () => {
  const node_radius = 7;
  const radius_elements = 400;
  const inner_radius_element =
    radius_elements - 2 * node_radius - 1.75 * node_radius;
  const country_radius = 12;
  const radius_countries = 600;
  const color_country = '#7EB852';

  //Will slightly offset the start and end from the source and target points
  const scale_angle_start_offset = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, 0.03]);
  const scale_angle_end_offset = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, 0.02]);

  const config = {
    pi: Math.PI,
    pi2: Math.PI * 2,
    pi1_2: Math.PI / 2,
    base_size: 1600,
    width: 1600,
    height: 1600,
    total_width: 0,
    total_height: 0,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    svg: null,
    g: null,
    g_scale: null,
    container: {
      canvas_edges: null,
      canvas_nodes: null,
      canvas_donuts: null,
      canvas_hover: null,
      ctx_edges: null,
      ctx_nodes: null,
      ctx_donuts: null,
      ctx_hover: null,
      sf: 2,
      sf_original: 2,
      sf_set: false,
      sf_set_original: false,
    },
    data: {
      nodes: [],
      edges: [],
      edges_country: [],
      edges_domain: [],
      domains: [],
      domain_ids: [],
      elements: [],
      countries: [],
      areas: [],
      domain_combinations: [],
      num_countries: 0,
      edges_domain_nest: [],
      edges_element_domain_nest: [],
      edges_country_nest: [],
      edges_element_country_nest: [],
      language: 'en',
    },

    mapping: {
      edge_country_by_id: {},
      edge_domain_by_id: {},
      linked_to_id: {},
      node_by_id: {},
      domain_by_id: {},
      domain_arc_by_id: {},
    },

    insideDonut: {
      domain_arcs: [],
      arc_domain: d3.arc(),
      pie_domain: d3
        .pie()
        .value(1)
        .sort(null),
      inner_radius_domain: 300,
      outer_radius_domain: 300 + 40,
      corner_radius_domain: 5,
      radius_dot_domain: 300 + 40 + 10,
    },

    //Middle domain-combination donut
    middleDonut: {
      node_radius,
      element_stroke_width: Math.max(1.5, roundTo(node_radius * 0.25, 1)),
      radius_elements,
      radius_elements_offset: 2 * node_radius,
      inner_radius_element,
      outer_radius_element:
        radius_elements + 2 * node_radius + 1.75 * node_radius,
      corner_radius_element: 4,
      radius_dot_element: inner_radius_element - 1,
      arc_element: d3.arc(),
      element_arcs: [],
    },
    //Outside country donut
    outsideDonut: {
      country_radius,
      radius_dot_country: radius_countries,
      inner_radius_country: radius_countries - country_radius - 10,
      outer_radius_country: inner_radius_country + 3,
      corner_radius_country: 3,
      area_arcs: [],
      area_arc_offset: 0,
      arc_area: d3.arc(),
      pie_area: d3
        .pie()
        .value(d => Math.max(3, d.values.length))
        .sort(null)
        .padAngle(0.04),
    },

    //Element
    arc_nodes: d3.arc(),
    pie_nodes: d3
      .pie()
      .sort(null)
      .value(1),
    //Countries
    arc_country: d3.arc(),
    country_text_opacity: 0.4,

    // lines
    scale_rad_curve: d3.scaleLinear(),
    line: d3
      .lineRadial()
      .angle(d => d.angle)
      .radius(d => d.radius)
      .curve(d3.curveBasis),
    opacity_edge_default: 0.15,

    //colors
    color_country,
    color_text: chroma.mix('black', color_country, 0.1),
    color_domain_scale: d3
      .scaleOrdinal()
      .range(['#E01A25', '#EDA400', '#42AC64', '#0088A5', '#991C71']),
    default_grey: 'rgb(230,230,230)',
    chosen_domain_color: 'rgb(230,230,230)',

    //mouse hovers
    voronoi: d3
      .voronoi()
      .x(d => d.x)
      .y(d => d.y),
    diagram: null,
    mouse_hover_active: false,
    current_hover: null,
    hover_type: null,
    timer_draw: null,

    //Mouse hovers
    hover: {
      voronoi: null,
      diagram: null,
      mouse_hover_active: false,
      current_hover: null,
      hover_type: null,
      timer_draw: null,
    },

    click: {
      current_click: null,
      click_active: false,
      hover_ich: null,
      hover_country: null,
      hover_domain: null,
    },
    innerPhoto: {
      photo_radius: 240,
      arc_photo: d3.arc(),
      scale_font_size: d3
        .scaleLinear()
        .domain([100, 300, 500])
        .range([30, 26, 24]),
    },
    font_family: 'Oswald',
    scale_factor: 1,
    scale_multiplier: 1,
    ICH_num: null,
    ICH_num_all: null,
    showModal: () => {},
  };

  return config;
};

export default createConfig();
