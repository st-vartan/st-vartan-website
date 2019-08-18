import * as d3 from 'd3';
import translations from './translationsConstellation';
const language = 'en';

function createConstellationVisual() {
  //Sizes
  let base_width = 2400, base_height = 2400
  let width = 2400, height = 2400
  let total_width, total_height
  let margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  //Containers
  let svg, g
  let node_hover_group, node_hover
  let node_modal_group
  let canvas_edges, canvas_nodes, canvas_hover, canvas_hidden
  let ctx_edges, ctx_nodes, ctx_hover, ctx_hidden

  //Constants
  let sf = 2 //canvas scale factor - is now adjustable
  let sf_original = sf
  let sf_scale = 1
  let sf_set = false
  let sf_set_original = sf_set

  //Geo
  const pi2 = 2 * Math.PI
  const pi1_2 = Math.PI / 2
  const sqrt3 = Math.sqrt(3)
  const padding = 2 //Padding around each node in pixels

  //Mappings
  let edge_by_id = {}
  let linked_to_id = {}
  let node_by_id = {}
  let color_to_edge = {}

  //Data
  let nodes, nodes_primary = [], nodes_selected = []
  let edges, edges_primary = [], edges_selected = []
  let types = ["element", "project", "ngo", "whc", "concept", "country", "region"]
  let modal_types = types
  let language = "en"

  //Simulation
  let simulation_primary, simulation_secondary
  let voronoi, diagram
  let community_count = []
  //Will define the radial-based layouts of the network simulations
  const radius_primary = base_width * 0.275 //0.275
  const radius_secondary = base_width * 0.125 //0.125
  // const radius_ngo = base_width * 0.45

  //Zooming
  let g_zoom, mouse_zoom_rect
  const min_zoom = 0.3
  const max_zoom = 6
  let start_zoom = 0.6 //is now adjustable from the outside
  let zoom_duration = 1500
  let zoom
  let initial_transform
  let transform
  let transform_old = {x: 0, y: 0, k: 1}
  let zoom_first
  let forced_load = true

  //Visual design
  const region_radius = 20
  const node_fade_opacity = 0.15
  const primary_edge_weight = 3
  const edge_primary_opacity = 0.3
  const edge_secondary_opacity = 0.025
  // const primary_stroke = "#727272"
  // const secondary_stroke = "#b9b9b9"
  let primary_line_width = 1.4
  // const primary_line_width_fixed = primary_line_width
  let secondary_line_width = 0.7
  // const secondary_line_width_fixed = secondary_line_width
  let latest_year //most recent year of the ICH elements

  //Mouse events
  let m = [0,0] //mouse position
  let current_hover = null, current_click = null, current_double_click = null
  let click_active = false
  let found, found_edge = null
  let next_color = 1 //will give each edge a unique color for the edge hover capture
  let click_double = false
  let click_timeout //To check for a double click
  let showTooltip = function(node) { }
  let hideTooltip = function() { }
  let timer_draw = null

  //Modal
  let modal_icon_circle
  let modal_icon_cross
  let icon_default_size
  let showModal = function(node) { }

  //Saving the image
  let show_photos = false
  let previous_photos
  let do_print_run = false

  //Other
  let visual_type
  let font_family = "Oswald"

  /////////////////////////// Scales ///////////////////////////
  //The radius that belongs to the nodes based on their type (concept is done differently)
  const radius_scale = d3.scaleOrdinal()
      .domain(types)
      .range([7,6,6,6,2,5,7])
      .unknown(1)
  //The radius that belongs to the concept nodes based on their degree
  const degree_scale = d3.scaleLinear() //linear on purpose
      .domain([0,10,250])
      .range([1,4,100])
  // //The radius that belongs to the region nodes based on their ICH element degree
  // const region_degree_scale = d3.scaleSqrt()
  //     .domain([0,250])
  //     .range([2,35])

  //Basic color that is given to the nodes based on their type
  const color_type_scale = d3.scaleOrdinal()
      .domain(types)
      .range(["#000000","#E4650B","#616161","#101420","#08977F","#7EB852","#7EB852"])
      .unknown("#c4c4c4")

  //What color should the nodes get that are part of the first simulation
  const node_community_color = d3.scaleLinear()
      .range([0,1])
  const dark_rainbow = ["#EFB605", "#E58903", "#E01A25", "#C20049", "#991C71", "#66489F", "#2074A0","#10A4C0"]//, "#10A66E"]//, "#7EB852"]
  const node_color_interpolate = d3.scaleLinear()
      .domain(d3.range(dark_rainbow.length).map(d => d/(dark_rainbow.length-1)))
      .range(dark_rainbow)
      .interpolate(d3.interpolateHcl)

  //How thick is the stroke around a node element based on their radius (except for elements)
  const node_stroke_scale = d3.scaleLinear()
      .domain([1,10,80])
      .range([1,2,5])
      .clamp(true)

  //The extra radius increase for element nodes based on zoom factor
  const zoom_node_increase = d3.scaleLinear()
      .domain([1, max_zoom - 2])
      .range([1, 1.75])
      .clamp(true)

  //The extra stroke width increase when zooming into the chart
  const zoom_edge_increase = d3.scaleLinear()
      .domain([0.5, max_zoom])
      .range([0.7, 6.5])
  // .clamp(true)

  //Simulation scale | How much charge to the nodes exert based on their type
  const node_charge_scale = d3.scaleOrdinal()
      .domain(types)
      .range([-50,-10,-30,-30,-3,-10,-3])
      .unknown(-1)
  //Simulation scale | How much charge do the concept nodes exert based on their degree (thus size)
  const node_charge_degree_scale = d3.scaleLinear()
      .domain([10, 250])
      .range([-10,-1000])
  //Simulation scale | How long do the edges between nodes "want" to become based on their edge weight
  const edge_distance_scale = d3.scaleOrdinal()
      .domain([3,2,1])
      .range([20,10,50])
      .unknown(5)
  //Simulation scale | How strong do the edges play a role in node positioning based on edge weight
  const edge_strength_scale = d3.scaleOrdinal()
      .domain([3,2,1])
      .range([0.05,0.3,0.3])
      .unknown(1)

  //////////////////////////////////////////////////////////////
  //////////////////// Create chart function ///////////////////
  //////////////////////////////////////////////////////////////

  function chart(selection, nodes_raw, edges_raw) {

    nodes = nodes_raw
    edges = edges_raw

    total_width = width + margin.left + margin.right
    total_height = height + margin.top + margin.bottom

    //////////////////////////////////////////////////////////////
    //////////////// Create the canvas containers ////////////////
    //////////////////////////////////////////////////////////////

    //Canvas for the hidden edge clicking on node fix
    canvas_hidden = selection.append("canvas").attr("id", "canvas-hidden").style("display","none")
    ctx_hidden = canvas_hidden.node().getContext("2d")
    crispyCanvas(canvas_hidden, ctx_hidden, 1)

    //Canvas for the edges
    canvas_edges = selection.append("canvas").attr("id", "canvas-edges")
    ctx_edges = canvas_edges.node().getContext("2d")
    crispyCanvas(canvas_edges, ctx_edges, sf)

    //Canvas for the nodes
    canvas_nodes = selection.append("canvas").attr("id", "canvas-nodes")
    ctx_nodes = canvas_nodes.node().getContext("2d")
    crispyCanvas(canvas_nodes, ctx_nodes, sf)

    //Canvas for the hover effects - mostly for performance
    canvas_hover = selection.append("canvas").attr("id", "canvas-hover")
    ctx_hover = canvas_hover.node().getContext("2d")
    crispyCanvas(canvas_hover, ctx_hover, sf)

    //////////////////////////////////////////////////////////////
    ////////////////// Create the SVG container //////////////////
    //////////////////////////////////////////////////////////////

    //SVG container for the things on top such as text
    svg = selection.append("svg")
        .attr("width", total_width)
        .attr("height", total_height)

    //Group that will not move when zooming and panning
    g_zoom = svg.append("g")
        .attr("id", "zoom-group")
        .attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")")

    //Create the rectangle that will capture the mouse events
    mouse_zoom_rect = g_zoom.append("rect")
        .attr("id","zoom-rect")
        .style("fill", "none")
        .style("pointer-events", "all")

    //Group for all visual elements
    g = svg.append("g")
        .attr("id","visual-elements-group")
        .attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")")

    //Group for the rotating dotted circle
    node_hover_group = g.append("g")
        .attr("id","node-hover-group")
        .style("pointer-events", "none")

    //Create circle to show hovered node outer moving dotted line
    //Happens when another node is "fixed" after click
    node_hover = node_hover_group.append("circle")
        .attr("class", "node-hovered")
        .style("fill", "none")
        .style("stroke-linecap", "round")
        .style("pointer-events", "none")
        .style("display", "none")

    //Group for the "icon" that appears on a node click
    node_modal_group = g.append("g").attr("id","node-modal-group")
        .style("visibility", "hidden") //For firefox to work
        .style("pointer-events", "all")
        .style("cursor", "pointer")
        .on("mouseover", () => {
          d3.event.stopPropagation()
          found_edge = null
          mouseMoveActions(null, found_edge)
        })
        .on("click", function() {
          showModal(current_click)
        })

    //Create an circle icon to show when you fix a node
    modal_icon_circle = node_modal_group.append("circle")
        .attr("class", "modal-circle")
        .style("fill", "black")
        .style("stroke", "white")

    //The "+" sign inside the circle that shows when you fix a node
    modal_icon_cross = node_modal_group.append("path")
        .attr("class", "modal-cross")
        .style("fill", "white")
        .style("stroke-width", 2.5)
        .attr("d", d3.symbol().size(64).type(d3.symbolCross))

    //Needed to calculate the cross icon size for each node
    //Based on https://bl.ocks.org/mbostock/3dd515e692504c92ab65
    icon_default_size = modal_icon_cross.node().getBBox().width
    node_modal_group
        .style("display", "none")
        .style("visibility", null)

    //////////////////////////////////////////////////////////////
    ////////////////////// Set-up simulations ////////////////////
    //////////////////////////////////////////////////////////////

    //Initialize the first force simulation
    //Which will set-up the primary structure of the nodes attached to edges of weight 3
    simulation_primary = d3.forceSimulation()
        .force("link",
            d3.forceLink()
                .id(d => d.id)
                .distance(d => edge_distance_scale(d.weight))
                .strength(d => edge_strength_scale(d.weight))
        )
        .force("collide",
            d3.forceCollide()
                .radius(d => d.r * 1.1 + d.stroke_width + padding).strength(0)
        )
        .force("charge",
            d3.forceManyBody()
                .strength(d => d.type === "element" ? -10 : node_charge_degree_scale(d.degree))
                .distanceMax(base_width/3)
        )
        .force("x", d3.forceX().x(d => d.focusX).strength(0.08)) //0.1
        .force("y", d3.forceY().y(d => d.focusY).strength(0.08)) //0.1
    // .force("center", d3.forceCenter(0,0))

    //Set up the second force simulation
    //That will place the other nodes (the ones used in the primary will now be fixed)
    simulation_secondary = d3.forceSimulation()
    // .alphaMin(0.015)
    // .velocityDecay(0.9)
        .force("link",
            d3.forceLink()
                .id(d => d.id)
                .distance(d => edge_distance_scale(d.weight))
                .strength(d => edge_strength_scale(d.weight))
        )
        // .force("collide",
        //     d3.forceCollide().radius(d => d.r * 1.1 + d.stroke_width + padding).strength(0).iterations(2)
        // )
        .force("charge",
            d3.forceManyBody()
                .strength(d => node_charge_scale(d.type))
                .distanceMax(base_width/3)
        )
        .force("r", d3.forceRadial(radius_secondary).strength(0.2))

    //////////////////////////////////////////////////////////////
    ////////////////////// Set-up the voronoi ////////////////////
    //////////////////////////////////////////////////////////////

    //Initialize the voronoi for the mouseover events
    voronoi = d3.voronoi()
        .x(d => d.x)
        .y(d => d.y)

    //////////////////////////////////////////////////////////////
    //////////////////// Set-up zoom processes ///////////////////
    //////////////////////////////////////////////////////////////

    zoom = d3.zoom()
        .scaleExtent([min_zoom, max_zoom])
        .interpolate( (a,b) => {
          zoom_duration = Math.max(1000, d3.interpolateZoom(a,b).duration) //Sets a suggested duration for the zoom
          return d3.interpolateArray(a,b)
        })
        //Make the zoom in faster
        // .wheelDelta(() => -(d3.event.deltaY*3) * (d3.event.deltaMode ? 120 : 1) / 500 )
        .on("zoom", zoomChart)
        .on("end", zoomChartEnd)

    //Set the initial zoom scale
    initial_transform = d3.zoomIdentity.translate(0,0).scale(start_zoom)

    //Set-up an invisible rectangle across the entire canvas that captures
    //the mouse events (zoom and hover)
    mouse_zoom_rect
        .attr("x", -total_width/2)
        .attr("y", -total_height/2)
        .attr("width", total_width)
        .attr("height", total_height)

  }//function chart

  //////////////////////////////////////////////////////////////
  //////////// Perform the entire simulation process ///////////
  //////////////////////////////////////////////////////////////

  chart.initializeSimulation = () => {
    visual_type = "simulation"

    //Prepare the node data
    filterNodeData()
    replaceDuplicates()
    filterUnconnectedNodes()

    //Prepare the edge data
    prepareEdgeData()

    //Prepare the node data
    calculateNodeSettings()

    //Final data set-up, clean up unconnected nodes & edges, redo mappings
    finalDataFiltering()

    // console.log(nodes.length, edges.length)

    //////////////////////////////////////////////////////////////
    /////////////////// Run the force simulations ////////////////
    //////////////////////////////////////////////////////////////

    //Prepare the node and edge data for the first simulation
    createPrimaryData()

    //Run the first simulation that only places the elements and nodes with an edge weight of 3 + whc
    runPrimarySimulation()

    //Run the secondary simulation that places all the remaining nodes (based on all edges)
    runSecondarySimulation()

    //////////////////////////////////////////////////////////////
    //////////////////////// Final settings //////////////////////
    //////////////////////////////////////////////////////////////

    //Add all nodes to the selected ones as a default
    nodes_selected = nodes

    //Calculate a voronoi layout - for mouse events
    diagram = voronoi(nodes)

    //Perform an initial zoom out, which also draws the network & sets the mouseover events
    mouse_zoom_rect
        .call(zoom)
        .on("dblclick.zoom", null)
        .call(zoom.transform, initial_transform)
    forced_load = false

    return chart
  }//function chart.initializeSimulation

  //////////////////////////////////////////////////////////////
  ////////////// Immediate placement chart creation ////////////
  //////////////////////////////////////////////////////////////

  chart.createChart = function(callback) {
    visual_type = "placement"

    //Prepare the node data
    filterNodeData()
    replaceDuplicates()
    //Remove all nodes without positions
    nodes = nodes.filter(d => d.hasOwnProperty("x"))
    // filterUnconnectedNodes()
    //Create a new node -> node id mapping
    node_by_id = {}
    nodes.forEach(d => { node_by_id[d.id] = d })

    //Prepare the edge data
    prepareEdgeData()

    //Prepare the node data
    calculateNodeSettings()

    //Final data set-up, clean up unconnected nodes & edges, redo mappings
    finalDataFiltering()

    // console.log(nodes.length, edges.length)

    //Connect the nodes to the edge data
    edges.forEach(d => {
      d.source = node_by_id[d.source]
      d.target = node_by_id[d.target]
    })//forEach

    //Set-up the color scale of the communities
    node_community_color.domain([0, d3.max(nodes, d => d.community )])
    //Adjust the color fill for those nodes that have a community
    nodes.forEach(d => {
      if(d.community > -1 && (d.type === "element" || d.type === "concept"))
        d.fill = node_color_interpolate(node_community_color(d.community))
    })//forEach
    nodes.sort((a,b) => types.indexOf(b.type) - types.indexOf(a.type))

    //////////////////////////////////////////////////////////////
    //////////////////////// Final settings //////////////////////
    //////////////////////////////////////////////////////////////

    //Add all nodes to the selected ones as a default
    nodes_selected = nodes

    //Calculate a voronoi layout
    diagram = voronoi(nodes)

    //Save the primary edges -> these are shown during no mouse event
    edges_primary = edges.filter(d => d.weight === primary_edge_weight || testTypeId(d,"whc"))

    //Perform an initial zoom out, which also draws the network & sets the mouseover events
    mouse_zoom_rect
        .call(zoom)
        .on("dblclick.zoom", null)
        .call(zoom.transform, initial_transform)
    forced_load = false

    //Return filtered nodes
    if(callback) callback(nodes)

    return chart
  }//function createChart

  //////////////////////////////////////////////////////////////
  ///////////////////// Resize the chart ///////////////////////
  //////////////////////////////////////////////////////////////

  chart.resize = () => {
    total_width = width + margin.left + margin.right
    total_height = height + margin.top + margin.bottom

    //Change sizes of the svg
    svg.attr("width", total_width).attr("height", total_height)
    g.attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")")
    g_zoom.attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")")
    //Update the size of the zoom rectangle
    mouse_zoom_rect
        .attr("x", -total_width/2)
        .attr("y", -total_height/2)
        .attr("width", total_width)
        .attr("height", total_height)

    //If the canvas scale factor hasn't been set yet
    //figure out the best for this screen
    if(!sf_set) {
      sf = Math.min(2, getPixelRatio(ctx_nodes) ) //no more than 2
      sf_original = sf
    }//if

    //Change sizes of the canvas
    crispyCanvas(canvas_edges, ctx_edges, sf)
    crispyCanvas(canvas_nodes, ctx_nodes, sf)
    crispyCanvas(canvas_hover, ctx_hover, sf)
    crispyCanvas(canvas_hidden, ctx_hidden, 1)

    //Redraw
    hideTooltip()
    zoom_first = true
    forced_load = true
    zoomChartEnd()
    forced_load = false

    return 1 //Needed for the saveImage function
  }//function resize

  //////////////////////////////////////////////////////////////
  ////////////////////// Data Prep functions ///////////////////
  //////////////////////////////////////////////////////////////

  ///////////////// Filter out non-needed nodes ////////////////
  function filterNodeData() {
    // //Create a node -> node id mapping
    // node_by_id = {}
    // nodes.forEach(d => { node_by_id[d.id] = d })
    // //Test to see if any nodes exist in the edges, but not the nodes list
    // let lost_edges = []
    // edges.forEach(d => {
    //     //Check which node id's in the edges is not in the node list
    //     if(!node_by_id[d.source]) lost_edges.push(d.source)
    //     if(!node_by_id[d.target]) lost_edges.push(d.target)
    // })//forEach
    // if(lost_edges.length > 0) console.log("WARNING -- Missing node id's not in node list:", [...new Set(lost_edges)])

    //Filter out any node that is an NGO or project
    nodes = nodes.filter(d => d.type !== "ngo" && d.type !== "project")
    //Filter out any node that is a concept that isn't of group: main, unesco or nature
    nodes = nodes.filter(d => {
      if(d.type === "concept") {
        if(d.group === "main" || d.group === "unesco" || d.group === "nature") return true
        else return false
      } else return true
    })//filter
  }//function filterNodeData

  //////////// Replace duplicate labelled nodes //////////
  function replaceDuplicates() {
    //Create a node -> node id mapping
    node_by_id = {}
    nodes.forEach(d => { node_by_id[d.id] = d })

    let duplicates = edges.filter(d => d.predicate === "exactMatch")
    duplicates.forEach(d => {
      let source_node = node_by_id[d.source]
      let target_node = node_by_id[d.target]

      if(source_node && target_node) {
        let n_stay, n_replace
        if(source_node.group === "unesco") { n_stay = source_node; n_replace = target_node }
        else if(target_node.group === "unesco") { n_stay = target_node; n_replace = source_node }
        else if(source_node.group === "main") { n_stay = source_node; n_replace = target_node }
        else if(target_node.group === "main") { n_stay = target_node; n_replace = source_node }
        else { console.log("strange exactMatch going on ", source_node, target_node); return }

        //Replace all edges of the replaced node by the staying node
        edges
            .filter(l => l.source === n_replace.id || l.target === n_replace.id)
            .forEach(l => {
              if(l.source === n_replace.id) l.source = n_stay.id
              else l.target = n_stay.id
            })//forEach
      }//if
    })//forEach

    //Remove all exactMatch edges
    edges = edges.filter(d => d.predicate !== "exactMatch")
  }//function replaceDuplicates

  //////////// General node data preparation function //////////
  function filterUnconnectedNodes() {
    //Create a node -> node id mapping
    node_by_id = {}
    nodes.forEach(d => { node_by_id[d.id] = d })
    //Filter out any edges that were associated to the nodes filtered earlier
    edges = edges.filter(d => { return node_by_id[d.source] && node_by_id[d.target] })

    //////////// Remove unconnected countries and regions //////////

    //What connections remain per node
    linked_to_id = {}
    edges.forEach(d => {
      //Save all of the connections to a specific node
      if(!linked_to_id[d.source]) linked_to_id[d.source] = []
      if(!linked_to_id[d.target]) linked_to_id[d.target] = []
      linked_to_id[d.source].push(node_by_id[d.target])
      linked_to_id[d.target].push(node_by_id[d.source])
    })//forEach

    //Filter out any countries that are not connected to any remaining elements
    let connected_ids = nodes
        .filter(d => d.type === "element")
        .map(d => linked_to_id[d.id].filter(n => n.type === "country").map(n => n.id))
    connected_ids = [...new Set([].concat.apply([], connected_ids))]
    //Filter the non-connected ones out
    nodes = nodes.filter(d => {
      if(d.type === "country") return connected_ids.indexOf(d.id) >= 0 ? true : false
      else return true
    })//filter

    //Create a new node -> node id mapping
    node_by_id = {}
    nodes.forEach(d => { node_by_id[d.id] = d })
    //Filter out any edges that were associated to the nodes filtered above
    edges = edges.filter(d => { return node_by_id[d.source] && node_by_id[d.target] })

    //////////// Remove unconnected remaining concepts //////////

    //Filter out any node that is a concept and has only 1 degree
    nodes = nodes.filter(d => {
      if(d.type === "concept") {
        let degree_now = edges.filter(l => l.source == d.id || l.target == d.id).length
        return degree_now > 1 ? true : false
      } else { return true }
    })//forEach

    //Redo node mapping
    node_by_id = {}
    nodes.forEach(d => { node_by_id[d.id] = d })
    //Filter out any edges that were associated to the nodes filtered above
    edges = edges.filter(d => { return node_by_id[d.source] && node_by_id[d.target] })
  }//function filterUnconnectedNodes

  function calculateNodeSettings() {
    // let linked_nodes
    latest_year = d3.max(nodes.filter(d => d.type === "element"), d => d.meta.year)

    nodes.forEach(d => {
      //Only redo this if this is there's not yet a degree known (from the simulation), because it takes a long time
      if(!d.degree) {
        //Redo the degree calculation for the remaining nodes
        d.degree = edges.filter(l => l.source == d.id || l.target == d.id).length
        // //Get the degree for regions based on the number of connections to ICH elements
        // if(d.type === "region") {
        //     //Find the number of elements connected to this region
        //     let node_list = []
        //     regionNodes(d, node_list)
        //     //Filter out all regions and countries
        //     node_list = node_list.filter(n => n.includes("element"))
        //     //Set the new degree
        //     d.degree = Math.max(d.degree, [...new Set(node_list)].length)
        // }//if
      }//if

      //Get all connected countries for an ICH element
      if(d.type === "element") d.countries = linked_to_id[d.id].filter(l => l.type === "country").map(l => l.label)

      //Scale the concepts based on their degree
      if(d.type === "concept") d.r = degree_scale(d.degree)
      else if(d.type === "region") d.r = region_radius //region_degree_scale(d.degree)
      else d.r = radius_scale(d.type)

      d.fill = color_type_scale(d.type)
      //Scale stroke weight of the nodes based on their radius
      //Except for the elements which get a predefined stroke width
      d.stroke_width = d.type !== "element" ? node_stroke_scale(d.r) : 3.5

      //Save a few duplicate, to account for the zooming and padding
      d.x_fixed = d.x
      d.y_fixed = d.y
      d.r_fixed = d.r
      d.stroke_width_fixed = d.stroke_width
      d.opacity = 1

      //Add image to the elements to show when zoomed in
      if(d.type === "element" && d.degree > 0 && d.meta && d.meta.icon){
        d.img = new Image
        d.img.src = d.meta.icon.small
        d.img_loaded = false
        d.img.onload = function() {
          d.img_loaded = true
          // d.img_ratio = this.width / this.height
        }//onload
      }//if
    })//forEach
  }//function calculateNodeSettings

  // //////////// Find ICH degree of regions //////////
  // function regionNodes(n, node_list) { //Recursive
  //     //Find the nodes connected to this node for which n is a target and the source is a region, country or element
  //     let connected_nodes = nodes.filter(d => edge_by_id[d.id + "," + n.id] && (d.type === "region" || d.type === "country" || d.type === "element"))
  //     //Save in array for drawing
  //     node_list.push.apply(node_list, connected_nodes.map(d => d.id))

  //     //If there are nodes in the list redo the same function for each node
  //     if (connected_nodes.length > 0) connected_nodes.forEach(d => { regionNodes(d, node_list) })
  // }//function regionNodes

  //////////// General edge data preparation function //////////
  function prepareEdgeData() {
    //Only keep the edges that exist in the node list
    edges = edges.filter(d => node_by_id[d.source] && node_by_id[d.target])

    linked_to_id = {}
    edges.forEach(d => {
      d.id = d.source + "," + d.target
      edge_by_id[d.id] = true

      //Save specific stylings
      if(d.weight === primary_edge_weight || testType(d,"whc")) {
        d.focus = testType(d,"whc") ? "secondary" : "primary"
        d.opacity = edge_primary_opacity
      } else {
        d.focus = "secondary"
        d.opacity = edge_secondary_opacity
      }//else

      //Save all of the edges to a specific node
      if(!linked_to_id[d.source]) linked_to_id[d.source] = []
      if(!linked_to_id[d.target]) linked_to_id[d.target] = []
      linked_to_id[d.source].push(node_by_id[d.target])
      linked_to_id[d.target].push(node_by_id[d.source])

      d.stroke_hidden = genColor() //A unique rgb color for the edge hover later on
      color_to_edge[d.stroke_hidden] = d //Save a mapping of the color to the edge
    })//forEach
  }//function prepareEdgeData

  //////////// Reassess the filters and maps after all data prep //////////
  function finalDataFiltering() {
    //Reset the mappings
    node_by_id = {}
    edge_by_id = {}
    linked_to_id = {}

    //Filter out nodes without any remaining connections
    nodes = nodes.filter(d => d.degree > 0 )
    nodes.forEach(d => { node_by_id[d.id] = d })
    // nodes.sort((a,b) => types.indexOf(b.type) - types.indexOf(a.type))

    //Only keep the edges that exist in the node list
    edges = edges.filter(d => node_by_id[d.source] && node_by_id[d.target])
    //Save all of the edges to a specific node
    edges.forEach(d => {
      edge_by_id[d.source + "," + d.target] = true
      if(!linked_to_id[d.source]) linked_to_id[d.source] = []
      if(!linked_to_id[d.target]) linked_to_id[d.target] = []
      linked_to_id[d.source].push(node_by_id[d.target])
      linked_to_id[d.target].push(node_by_id[d.source])
    })//forEach

  }//function finalDataFiltering

  /////////// Create nodes & edges for 1st simulation //////////
  function createPrimaryData() {
    //Only keep the edges with edge weight of 3, or that are connected to a WHC
    edges_primary = edges.filter(d => d.weight === primary_edge_weight || testType(d,"whc"))

    //Redo the edges to filter out the single nodes afterwards
    let linked_to_id_primary = {}
    edges_primary.forEach(d => {
      //Save all of the edges to a specific node
      if(!linked_to_id_primary[d.source]) linked_to_id_primary[d.source] = []
      if(!linked_to_id_primary[d.target]) linked_to_id_primary[d.target] = []
      linked_to_id_primary[d.source].push(d.target)
      linked_to_id_primary[d.target].push(d.source)
    })
    //Only keep the nodes that have at least 1 edge
    nodes_primary = nodes.filter(d => linked_to_id_primary[d.id])

    //Add communities to the primary nodes and calculate the community centers for the nodes to gather around
    findCommunityCenters()
  }//function createPrimaryData

  //Test if one of the nodes of an edge is of a certain node type
  function testType(d, type) { return node_by_id[d.source].type === type || node_by_id[d.target].type === type }
  //A version that has to be used after the simulations have run
  function testTypeId(d, type) { return node_by_id[d.source.id].type === type || node_by_id[d.target.id].type === type }

  //////////////////////////////////////////////////////////////
  ////////////////////// Community functions ///////////////////
  //////////////////////////////////////////////////////////////

  ///////// Add community center points to primary nodes ///////
  function findCommunityCenters() {
    //Run a community algorithm on the primary nodes
    let community = jLouvain().nodes(nodes_primary.map(d => d.id)).edges(edges_primary)
    let community_result  = community()

    //Find the number of nodes per community
    community_count = byCount(d3.values(community_result))
    let community_count_by_id = {}
    community_count.forEach(d => {
      d.item = +d.item
      community_count_by_id[d.item] = d
    })//forEach
    community_count = community_count.sort((a,b) => { return d3.ascending(a.item, b.item) })

    //Find the id of the biggest group
    let counts = community_count.map(d => d.frequency)
    let community_biggest = community_count[counts.indexOf(Math.max(...counts))].item

    //Assign communities to the nodes
    nodes_primary.forEach(d => { d.community = community_result[d.id] })

    ///////// Replace communities that are too small ///////

    //Get the number of connections between the communities
    let community_connections = calculateCommunityConnections()
    //Move communities with less than X member to its most connected one
    community_count = replaceSmallCommunities(community_count, community_connections, community_count_by_id, community_biggest)

    //Which concepts are the largest per group
    community_count.forEach(d => {
      let chosen = nodes_primary.filter(n => n.community === d.item && n.type === "concept")
      let counts = chosen.map(d => d.degree)
      d.concept = chosen[counts.indexOf(Math.max(...counts))].label
    })

    /////////////////// 'SMART' LOCATION - START ///////////////////

    // Find placement of connected groups around circle
    // community_connections = calculateCommunityConnections()
    // community_connections.sort((a,b) => { return a.community_a - b.community_a })

    // let left_side = []
    // let right_side = []
    // let biggest_remaining
    // let range = d3.range(community_count.length)
    // let new_value
    // let current = community_biggest

    // //Start with the biggest
    // right_side.push(current)
    // removeNum(current)
    // new_value = findNextCommunity(left_side, current)
    // left_side.push(new_value)
    // removeNum(new_value)

    // function removeNum(value) {
    //     let index = range.indexOf(value)
    //     range.splice(index, 1)
    // }//function removeNum

    // //Fill in the other sides
    // let counter = 1
    // while(counter < community_count.length - 1) {
    //     current = right_side[right_side.length - 1]
    //     new_value = findNextCommunity(right_side, current)
    //     removeNum(new_value)
    //     right_side.push(new_value)
    //     counter += 1

    //     current = left_side[left_side.length - 1]
    //     new_value = findNextCommunity(left_side, current)
    //     left_side.push(new_value)
    //     counter += 1
    // }//while

    // ///////// Find the next biggest connection that hasn't been used ///////
    // function findNextCommunity(side_array, current) { //Recursive
    //     let next_group
    //     let order = side_array.slice(0) //Make clone

    //     //Find the largest and place left to it
    //     biggest_remaining = community_connections.filter(d => d.community_a === current)
    //     biggest_remaining.sort((a,b) => b.connections - a.connections)

    //     //Which connected groups is the biggest and not chosen yet
    //     for(let i = 0; i < biggest_remaining.length; i++) {
    //         let candidate = biggest_remaining[i].community_b
    //         if(left_side.indexOf(candidate) < 0 && right_side.indexOf(candidate) < 0) {
    //             next_group = candidate
    //             break
    //         }//if
    //     }//for i

    //     if(typeof next_group !== "undefined") {
    //         return next_group
    //     } else {
    //         if(range.length === 1) return range[0]
    //         else {
    //             //If nothing is found, go one back up the "tree" and try again
    //             order.pop()
    //             if(order.length <= 0) return range[0]
    //             else {
    //                 let new_current = order[order.length - 1]
    //                 return findNextCommunity(order, new_current)
    //             }//else
    //         }//else
    //     }//else
    // }//function findNextCommunity

    // ///////// Inverse the ordering to the index ///////

    // // let order = right_side.concat(left_side.reverse())
    // //Move quarter of the left side first, then full right side, then remaining left side
    // let left_middle = Math.ceil(left_side.length/2)
    // let left_top = left_side.slice(0, left_middle).reverse()
    // let left_bottom = left_side.slice(-(left_middle-1)).reverse()
    // let order = left_top.concat(right_side.concat(left_bottom))

    // //Get the sorting order
    // let indexed_order = order.map((d,i) => { return {index: i, order: d} })
    // indexed_order.sort((a,b) => a.order - b.order)
    // let indices = indexed_order.map(d => d.index)

    /////////////////// 'SMART' LOCATION - END ///////////////////

    community_count.forEach((d,i) => {
      // d.order = indices[d.item]
      d.order = i
      d.frequency = nodes_primary.filter(n => n.community === d.item).length
    })
    community_count = community_count.sort((a,b) => a.order - b.order)

    ///////// Assign positions based on order around circle ///////

    //Spread the centers of each community around a circle based on how many nodes are in each community
    let total_degrees = 0
    let num = nodes_primary.length
    community_count.forEach((d,i) => {
      d.angle_slice = Math.round( Math.pow( Math.max(num / (community_count.length * 4), d.frequency), 0.75 ) )
      total_degrees += d.angle_slice
    })

    let degrees = 0
    community_count.forEach((d,i) => {
      d.center_angle = pi2 * (degrees + d.angle_slice/2)/total_degrees
      // d.center_angle = pi2 * (degrees + d.frequency/2)/nodes_primary.length
      // d.center_angle = pi2 * degrees/total_degrees
      d.x = d.x_fixed = radius_primary * Math.cos(d.center_angle)
      d.y = d.y_fixed = radius_primary * Math.sin(d.center_angle)
      d.r = d.r_fixed = 50
      degrees += d.angle_slice
    })

    //Redo the community numbers
    let replacement = {}
    community_count.forEach((d, i) => {
      replacement[d.item] = i
      d.item_old = d.item
      d.item = i
    })
    // //Replace numbers for the nodes
    // nodes_primary.forEach(d => { d.community = replacement[d.community] })

    // console.log(community_count)

    //Set-up the color scale of the communities
    node_community_color.domain([0, d3.max(community_count, d => d.item)])

    //Set the central "gravity" point for each node and a first location
    nodes_primary.forEach(d => {
      //Replace numbers for the nodes
      d.community = replacement[d.community]
      if(d.type === "element" || d.type === "concept") {
        d.fill = node_color_interpolate(node_community_color(d.community))
      }//if

      //Set the center
      let angle = community_count[d.community].center_angle
      d.focusX = radius_primary * Math.cos(angle)
      d.focusY = radius_primary * Math.sin(angle)
      d.x = d.focusX + Math.random()
      d.y = d.focusY + Math.random()
    })//forEach
  }//function findCommunityCenters

  ///////// Find the number of (weighted) connections between each pair of communities /////////
  function calculateCommunityConnections() {
    let community_matrix = {}
    //Get the number of connections between the communities
    edges.forEach(d => {
      let sc = node_by_id[d.source].community
      let tc = node_by_id[d.target].community
      if(typeof sc === "undefined" || typeof tc === "undefined" || sc === tc) return
      let id = sc < tc ? sc + "," + tc : tc + "," + sc
      if(!community_matrix[id]) community_matrix[id] = 0
      community_matrix[id] += d.weight
    })//forEach

    //Convert the object into an array
    let connections = []
    for(duo in community_matrix) {
      let value = community_matrix[duo]
      let comm = duo.split(",")
      connections.push({ community_a: +comm[0], community_b: +comm[1], connections: value})
      connections.push({ community_a: +comm[1], community_b: +comm[0], connections: value})
    }//for

    return connections
  }//function calculateCommunityConnections

  ///////// Move communities with less than X member to its most connected one /////////
  function replaceSmallCommunities(community_count, community_connections, community_count_by_id, community_biggest) {
    let min_number = 10
    community_count
        .filter(d => d.frequency < min_number)
        .forEach(d => {
          let connections = community_connections.filter(c => c.community_a === d.item)
          connections = connections.sort((a,b) => b.connections - a.connections)

          let replacement_found = false
          let counter = 0
          let replace
          while(!replacement_found) {
            //The community that it's is most closely connected to
            replace = connections[0].community_b

            //Check if the replacement has enough nodes
            if(community_count_by_id[replace].frequency >= min_number) {
              replacement_found = true
            } else if (counter === (connections.length - 1)) {
              //If everything else is too small, just put them in the biggest group
              replace = community_biggest
              replacement_found = true
            } else {
              counter += 1
            }//else
          }
          d.community_replace = replace

          //Replace these community counts
          nodes.filter(n => n.community === d.item)
              .forEach(n => n.community = d.community_replace)
        })//forEach

    //Redo the community numbers
    let replacement = {}
    community_count = community_count.filter(d => d.frequency >= min_number)
    community_count.forEach((d,i) => {
      replacement[d.item] = i
      d.item = i
    })
    //Replace numbers for the nodes
    nodes_primary.forEach(d => { d.community = replacement[d.community] })

    return community_count
  }//function replaceSmallCommunities

  function drawCommunityCenters() {
    ctx_nodes.globalAlpha = 0.3
    community_count.forEach(d => {
      ctx_nodes.fillStyle = node_color_interpolate(node_community_color(d.item))
      ctx_nodes.beginPath()
      ctx_nodes.arc(d.x, d.y, d.r, 0, pi2)
      ctx_nodes.closePath()
      ctx_nodes.fill()
    })//forEach
  }//function drawCommunityCenters

  //////////////////////////////////////////////////////////////
  ///////////////////// Simulation functions ///////////////////
  //////////////////////////////////////////////////////////////

  /////////////////// Run the first simulation /////////////////
  function runPrimarySimulation() {
    //Add a temporary node in the center to make sure no primary nodes will end up in the center
    nodes_primary.push({
      id: "dummy",
      r: 0, //radius_secondary*0.4,
      stroke_width: 0,
      fill: "black",
      type: "element",
      degree: 0, //100,
      fx: 0,
      fy: 0
    })

    //Perform the first simulation to place the nodes connected through edges of weight 3
    simulation_primary
        .nodes(nodes_primary)
        .stop()
    //     .on("tick", ticked)

    // function ticked() {
    //     drawQuick()
    // }

    // // ramp up collision strength to provide smooth transition
    // var transitionTime = 3000
    // var t = d3.timer(function (elapsed) {
    //     var dt = elapsed / transitionTime
    //     simulation_primary.force('collide').strength(0.1 + Math.pow(dt, 2) * 0.6)
    //     if (dt >= 1.0) t.stop()
    // })

    simulation_primary.force("link").links(edges_primary)

    //Manually "tick" through the network
    let n_ticks = 300
    for (let i = 0; i < n_ticks; ++i) {
      simulation_primary.tick()
      //Ramp up collision strength to provide smooth transition
      simulation_primary.force('collide').strength(Math.pow(i / n_ticks, 2) * 0.7)
    }//for i
    // drawQuick()

    // function drawQuick() {
    //     clearCanvas([ctx_edges, ctx_nodes, ctx_hover, ctx_hidden])
    //     //Draw centers of communities
    //     drawCommunityCenters()
    //     //Draw the nodes
    //     ctx_nodes.globalAlpha = 1
    //     nodes_primary.forEach(d => { drawNodes(ctx_nodes, d, d.r) })
    //     //Draw the primary edges
    //     ctx_edges.lineWidth = 1
    //     edges_primary.forEach(d => { drawEdges(ctx_edges, d, d.gradient) })
    // }//function drawQuick

    //Remove the temporary node in the center
    nodes_primary = nodes_primary.filter(d => d.id !== "dummy")

    //Fix the positions of the nodes for the next simulation
    nodes_primary.forEach(d => {
      d.fx = d.x
      d.fy = d.y
    })

    //Get initial positions of the other nodes in the center of the fixed nodes that they're connected to
    nodes.forEach(d => {
      //Don't do anything if it's already a fixed node
      if(d.fx){
        delete d.vx
        delete d.vy
        return
      }//if

      //Initial setting in the center
      d.x = 0 + Math.random()
      d.y = 0 + Math.random()

      //Find all fixed nodes that are connected to this node
      let connected = linked_to_id[d.id]
      let x_center = 0, y_center = 0
      let counter = 0
      connected.forEach(d => {
        if(node_by_id[d.id].fx) {
          counter += 1
          x_center += node_by_id[d.id].fx
          y_center += node_by_id[d.id].fy
        }//if
      })//forEach

      //Take the average
      if(counter > 0) {
        d.x = x_center/counter
        d.y = y_center/counter
      }//if
    })//forEach

  }//function runPrimarySimulation

  ////////////////// Run the secondary simulation //////////////
  function runSecondarySimulation() {
    let collide

    simulation_secondary
        .nodes(nodes)
        .stop()
    // .on("tick", drawQuick)
    // .on("end", () => {
    //     //Save the final positions for zooming and panning
    //     nodes.forEach(d => {
    //         d.x_fixed = d.x
    //         d.y_fixed = d.y
    //     })
    //     nodes.sort((a,b) => types.indexOf(b.type) - types.indexOf(a.type))
    //     //Calculate a voronoi layout - for mouse events
    //     diagram = voronoi(nodes)
    //     //Perform an initial zoom out, which also draws the network & sets the mouseover events
    //     mouse_zoom_rect.call(zoom.transform, initial_transform)
    // })

    //Set up the anti-collision function
    collide = forceCollision()
        .iterations(3)
        .radius(d => d.r * 1.1 + d.stroke_width + padding)
        .initialize(nodes)

    // let counter = 0, n_ticks = 300
    // function drawQuick() {
    //     collide.strength(Math.min(2.2, 0.3 + Math.pow(counter / (n_ticks*0.6), 2) * 1))
    //     counter++
    //     //Run anti-collision algorithm - the default d3 one doesn't work correctly...
    //     collide()
    //     //Draw the nodes & communities
    //     clearCanvas([ctx_nodes])
    //     drawCommunityCenters()
    //     ctx_nodes.globalAlpha = 1
    //     nodes.forEach(d => { drawNodes(ctx_nodes, d, d.r) })
    // }//function drawQuick

    // //Ramp up collision strength to provide smooth transition
    // const transitionTime = 3000
    // let t = d3.timer(elapsed => {
    //     let dt = elapsed / transitionTime
    //     // simulation_secondary.force('collide').strength(Math.pow(dt, 2) * 0.7).iterations(2)
    //     collide.strength(Math.pow(dt, 2) * 0.7).iterations(2)
    //     if (dt >= 1.0) t.stop()
    // })

    //Only use the edges that make any difference (not between fixed nodes)
    let edges_secondary = edges.filter(d => d.weight !== primary_edge_weight)
    simulation_secondary.force("link").links(edges_secondary)

    //Manually "tick" through the network
    let n_ticks = 300
    for (let i = 0; i < n_ticks; ++i) {
      simulation_secondary.tick()
      //Ramp up collision strength to provide smooth transition
      collide.strength(Math.min(2.2, 0.3 + Math.pow(i / (n_ticks*0.6), 2) * 1))
      // simulation_secondary.force('collide').strength(Math.pow(i / n_ticks, 2) * 0.7)

      //Run anti-collision algorithm - the default d3 one doesn't work correctly...
      collide()
    }//for i

    //Save the final positions for zooming and panning
    nodes.forEach(d => {
      d.x_fixed = d.x
      d.y_fixed = d.y
    })
    //Sort so the elements are always on top
    nodes.sort((a,b) => types.indexOf(b.type) - types.indexOf(a.type))

    //After all is done, save the node location info to a file
    saveToFile(nodes)
  }//function runSecondarySimulation

  //////////// Anti collision during simulation ///////////
  function forceCollision() {
    let nodes
    let radii
    let strength = 1
    let iterations = 1

    function radius(d) { return d.r }
    function x(d) { return d.x + d.vx }
    function y(d) { return d.y + d.vy }
    function constant(x) { return function() { return x } }

    function force() {
      let i
      let n = nodes.length
      let tree
      let node
      let xi
      let yi
      let ri
      let ri2

      for (let k = 0; k < iterations; ++k) {
        tree = d3.quadtree(nodes, x, y).visitAfter(prepare)
        for (i = 0; i < n; ++i) {
          node = nodes[i]
          ri = radii[node.index]
          ri2 = ri * ri
          xi = node.x + node.vx
          yi = node.y + node.vy
          tree.visit(apply)
        }//for i
      }//for k

      function apply(quad, x0, y0, x1, y1) {
        let data = quad.data
        let rj = quad.r
        let r = ri + rj
        if (data) {
          if (data.index > node.index) {
            let x = xi - data.x - data.vx
            let y = yi - data.y - data.vy
            let l = x * x + y * y
            if (l < r * r) {
              if (x === 0) x = jiggle(), l += x * x
              if (y === 0) y = jiggle(), l += y * y
              l = (r - (l = Math.sqrt(l))) / l * strength
              node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj))
              node.vy += (y *= l) * r
              data.vx -= x * (r = 1 - r)
              data.vy -= y * r
            }//if
          }//if
          return
        }//if
        return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r
      }//function apply
    }//function force

    function prepare(quad) {
      if (quad.data) return quad.r = radii[quad.data.index];
      for (let i = quad.r = 0; i < 4; ++i) {
        if (quad[i] && quad[i].r > quad.r) {
          quad.r = quad[i].r
        }//if
      }//for i
    }//function prepare

    function initialize() {
      if (!nodes) return;
      let i, n = nodes.length, node
      radii = new Array(n)
      for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes)
    }//function initialize

    force.initialize = function (_) {
      nodes = _
      initialize()
      return force
    }

    force.iterations = function (_) {
      return arguments.length ? (iterations = +_, force) : iterations
    }

    force.strength = function (_) {
      return arguments.length ? (strength = +_, force) : strength
    }

    force.radius = function (_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), force) : radius
    }

    return force
  }//function forceCollision

  //////////// Save the node simulation info to file ///////////
  function saveToFile(nodes) {
    //Only keep the needed values
    let nodes_minimal = []
    nodes.forEach(d => {
      nodes_minimal.push({
        "id": d.id,
        "community": d.community,
        "degree": d.degree,
        "x_fixed": roundTo(d.x_fixed, 2),
        "y_fixed": roundTo(d.y_fixed, 2),
      })
    })//forEach

    let graph = JSON.stringify(nodes_minimal)
    let file = new Blob([graph], {type: "text/plain"})

    let a = document.createElement("a")
    a.href = URL.createObjectURL(file)
    a.download = "constellation-node-locations.json"
    a.click()
  }//function saveToFile

  //////////////////////////////////////////////////////////////
  /////////////////// Zooming + Pan functions //////////////////
  //////////////////////////////////////////////////////////////

  /////////////////////// Run during a zoom ////////////////////
  function zoomChart() {
    transform = d3.event.transform
    zoom_first = true

    //Deactivate any mousover events during a zoom&pan event
    mouse_zoom_rect
        .on("mousemove", null)
        .on("mouseout", null)
        .on("click", null)
    hideTooltip()

    node_hover.style("display", "none") //Hide the rotating dots around hovered circle (if active)

    //Recalculate the node locations & attributes
    nodes.forEach(d => {
      let [x, y] = transform.apply([d.x_fixed,d.y_fixed])
      d.x = x
      d.y = y
      d.r = d.r_fixed * transform.k
      if(d.type === "element") d.r *= zoom_node_increase(transform.k)
      //Update the stroke weight to appear to get bigger on zoom in, except for the elements
      if(d.type !== "element") d.stroke_width = d.stroke_width_fixed * transform.k

      //https://stackoverflow.com/questions/23759457
      //Find a first guess for the font-size
      let font_size = roundTo( (d.r - d.stroke_width)/2.5 * (10/(d.label.length+1)), 2)
      //When it actually seems to be drawn, find a better guess
      if(d.type === "concept" && d.r > 10 && font_size > 6) {
        // let old = font_size
        let font_width = (d.r - d.stroke_width) * 2 * (d.label.length >= 10 ? 0.7 : 0.75)
        let step = font_size < 8 ? 0.2 : 0.5
        //Find a font-size that fits the circle
        font_size = roundTo( fitTextInCircle(ctx_nodes, d.label, Math.round(font_size) + 4, font_width, step), 2)
      }//if
      d.font_size = font_size
    })//forEach

    // //Resize the community test circles
    // community_count.forEach(d => {
    //     let [x, y] = transform.apply([d.x_fixed,d.y_fixed])
    //     d.x = x
    //     d.y = y
    //     d.r = d.r_fixed * transform.k
    // })//forEach

    //Redraw the "+" icon
    if(click_active) renderClickIcon(current_click)
    else node_modal_group.style("display", "none")

    //Calculate new edge drawing variables
    if(edges_selected.length > 0) {
      calculateEdgeCenters(edges_selected)
      calculateEdgeGradient(edges_selected)
    }//if

    //Draw the nodes & egdes
    drawSelected()

    //Draw the possible hovered node as well
    if(current_hover) {
      drawHoveredNode(current_hover)
      showTooltip(current_hover)
      if(click_active) {
        //Draw rotating circle around the hovered node
        drawDottedHoverCircle(current_hover)
      }//if
    }//if
  }//function zoomChart

  ///////////////// Run during the end of a zoom ///////////////
  function zoomChartEnd() {
    //Only do this if there was an actual zoom/pan first and not a click
    if(!zoom_first) return
    zoom_first = false

    //Calculate new edge drawing variables
    calculateEdgeCenters(edges)
    calculateEdgeGradient(edges)

    //Redraw modal icon
    if(click_active) renderClickIcon(current_click)

    //Reset some of the mouse events
    mouse_zoom_rect
        .on("mousemove", mouseMoveChart)
        .on("click", mouseClickChart)

    //If a node is not clicked or hovered, reset
    if(!click_active && !current_hover) {
      //Draw the nodes and edges as normal
      mouseOutNode()
      //Reset the mouse events
      mouse_zoom_rect.on("mouseout", d => { if(current_hover !== null) mouseOutNode() })
    } else {
      //Draw the previously selected nodes
      drawSelected()
      //If no query multi-node-fix is active, draw hidden edges as well
      if(!(click_active && current_click === "multi")) drawHiddenEdges(found)

      //Draw the possible hovered node as well
      if(current_hover) {
        drawHoveredNode(current_hover)
        showTooltip(current_hover)
        if(click_active) {
          //Draw rotating circle around the hovered node
          drawDottedHoverCircle(current_hover)
        }//if
      }//if
    }//else
  }//function zoomChartEnd

  /////////////////// Zoom into specific node //////////////////
  chart.zoomIntoNode = (node_id) => {
    //Find the node location
    let node = node_by_id[node_id]
    //If the node is found, zoom into it
    if(node) {
      current_double_click = node
      performManualZoom(node, calculateZoomLevel(node))
    }//if
  }//function zoomIntoNode

  /////////// Actual function that zooms & translates //////////
  function performManualZoom(node, zoom_level) {
    //Set the "selected" node
    found = node

    //Set the new final location
    //Based on https://bl.ocks.org/mbostock/b783fbb2e673561d214e09c7fb5cedee
    let new_zoom = d3.zoomIdentity
        .scale(zoom_level)
        .translate(-node.x_fixed, -node.y_fixed)

    //Zoom into the node with transition
    //The variable zoom_duration comes from the zoom function
    mouse_zoom_rect
        .transition()
        .duration(zoom_duration)
        .call(zoom.transform, new_zoom)
        .on("end", () => { setMouseClick(node) })
  }//function performManualZoom

  /////////////// Calculate the optimum zoom level /////////////
  function calculateZoomLevel(node) {
    //Find an optimal zoom level in terms of how big the node will get
    //But the zoom level cannot be bigger than the max zoom
    return Math.min(max_zoom, Math.min(width*0.4, height*0.4) / (2*node.r_fixed))
  }//function calculateZoomLevel

  //////////////////////////////////////////////////////////////
  //////////////////// Query event functions ///////////////////
  //////////////////////////////////////////////////////////////

  ///////////////////// Fix multiple nodes /////////////////////
  chart.fixMultiNodes = (node_ids) => {
    let connected_edge_by_id = {}
    let connected_node_by_id = {}
    edges_selected = []
    nodes_selected = []

    //Loop over each node and add the connected edges and nodes to the list to be highlighted
    node_ids.forEach(d => {
      let node = node_by_id[d]
      if(node) {
        //Find all edges and nodes connected to the "fixed" node
        if(!connected_node_by_id[node.id]) {
          connected_node_by_id[node.id] = true
          nodes_selected.push(node)
        }//if
        setMultiSelection(node, connected_node_by_id, connected_edge_by_id)
      }//if
    })//forEach

    //Set this as a click
    click_active = true
    //Disable mouseout events
    mouse_zoom_rect.on("mouseout", null)
    //Hide possible click icon
    node_modal_group.style("display", "none")
    //Draw the connected edges and nodes
    drawSelected()
    //Draw the edges on the hidden canvas for edge hover
    // drawHiddenEdges("nodes")
    //Set for reference in other locations
    current_click = "multi"
    current_double_click = "multi"
  }//function fixMultiNodes

  //////////// Add new connections to the selection ////////////
  function setMultiSelection(node, connected_node_by_id, connected_edge_by_id) {
    //Only keep edges that are connected to the node
    let edges_connected = edges.filter(d => d.source === node || d.target === node)
    edges_connected.forEach(d => {
      if(!connected_edge_by_id[d.id]) {
        connected_edge_by_id[d.id] = true
        edges_selected.push(d)
      }//if
    })//forEach

    //Save only those nodes that are neighbors
    let nodes_connected = nodes.filter(d => neighboring(node, d) || node.id === d.id)
    nodes_connected.forEach(d => {
      if(!connected_node_by_id[d.id]) {
        connected_node_by_id[d.id] = true
        nodes_selected.push(d)
      }//if
    })//forEach
  }//function setMultiSelection

  //////////////////////////////////////////////////////////////
  //////////////////// Mouse event functions ///////////////////
  //////////////////////////////////////////////////////////////

  /////// Hit test + voronoi to find possible hovered node /////
  function mouseNodeFind(m) {
    //First do hit-test of largest nodes
    let hit_test = false
    let found = null
    let max_size = click_active ? 8 : 16
    for(let i = 0; i < nodes.length; i++) {
      if(nodes[i].r < max_size) continue
      let dx = nodes[i].x - m[0]
      let dy = nodes[i].y - m[1]
      if (sq(dx) + sq(dy) < sq(nodes[i].r + nodes[i].stroke_width)) {
        //The mouse is within the radius of a bigger node
        hit_test = true
        found = nodes[i]
        break
      }//if
    }//for i

    //If no bigger node is found, do the voronoi finding algorithm
    if(!hit_test) {
      //Take any zoom+pan into account
      let x_find = (m[0] - transform.x)/transform.k
      let y_find = (m[1] - transform.y)/transform.k
      found = diagram.find(x_find, y_find, max_size / transform.k)
      if(found) found = found.data
    }//if

    return found
  }//function mouseNodeFind

  ///////// Use unique edge color to test an edge hover ////////
  function mouseEdgeFind(m) {
    //Request the color of the pixel that the mouse is over and see if it matches an edge color
    let x = m[0] + (margin.left + width/2)
    let y = m[1] + (margin.top + height/2)
    let col = ctx_hidden.getImageData(x, y, 1, 1).data
    let col_string = "rgb(" + col[0] + "," + col[1] + ","+ col[2] + ")"
    let found_edge = color_to_edge[col_string]

    return found_edge
  }//function mouseEdgeFind

  //////////////////////////////////////////////////////////////
  //////////////////// Mouse click functions ///////////////////
  //////////////////////////////////////////////////////////////

  /////////////////// When clicked in the chart ////////////////
  function mouseClickChart() {
    d3.event.stopPropagation()

    //Find the nearest node to the mouse, within a distance of X pixels using the voronoi technique
    let m = d3.mouse(this)
    found = mouseNodeFind(m)
    found_edge = null

    //Check if this is a double click
    //Based on https://stackoverflow.com/questions/35620462
    if(click_double) { //Double click
      if (found) { //Zoom in and set a click
        d3.event.preventDefault()
        //If the person double clicks on the same again, zoom out
        if(found === current_double_click) performManualZoom(found, start_zoom)
        else performManualZoom(found, calculateZoomLevel(found))

        current_click = found
        current_double_click = found
      }//else if
      click_double = false
    } else { //This is a single click
      d3.event.preventDefault()
      //Set a timeout to check for a double click
      clearTimeout(click_timeout)
      click_timeout = setTimeout(() => { click_double = false }, 500)

      //If no node is found, check if an edge is clicked (only needed during an active click)
      if (click_active && !found) found_edge = mouseEdgeFind(m)

      if (click_active && found_edge) {
        //Move to the other side of the edge
        let node = (current_click.id === found_edge.source.id ? found_edge.target : found_edge.source)
        performManualZoom(node, transform.k)
        found = node
        current_click = node
      } else if ((current_click === found || !found) && click_active) {
        //Reset
        removeMouseClick()
      } else if (found) { //Set a click
        //Calculate and draw the new state
        setMouseClick(found)
      }//else if
    }//else

    click_double = !click_double
  }//function mouseClickChart

  //////////// Perform visual steps after "good" click /////////
  function setMouseClick(node) {
    click_active = true
    //Disable mouseover events
    mouse_zoom_rect.on("mouseout", null)
    //Send out for pop-up
    showTooltip(node)
    //Find all edges and nodes connected to the "found" node
    setSelection(node)
    //Draw the connected edges and nodes
    drawSelected()
    //Draw the edges on the hidden canvas for edge hover
    drawHiddenEdges(node)
    //Add the extra click icon in the bottom right
    renderClickIcon(node)
    //Draw rotating circle around the hovered node
    drawDottedHoverCircle(node)
    //Set for reference
    current_click = node
  }//function setMouseClick

  //////////// Reset visual steps after "empty" click //////////
  function removeMouseClick() {
    click_active = false
    current_click = null
    nodes_selected = nodes
    //Re-instate the mouse events
    mouse_zoom_rect.on("mouseout", d => { if(current_hover !== null) mouseOutNode() })
    //Release click
    mouseOutNode()
    hideTooltip()
    //Hide the rotating circle
    node_hover.style("display", "none")
    //Hide the icon to the bottom right of a clicked node
    node_modal_group.style("display", "none")
  }//function removeMouseClick

  ////////// Draw edges of clicked node on hidden canvas ///////
  function drawHiddenEdges(node) {
    if(!node) return
    //Draw the selected edges
    clearCanvas([ctx_hidden])
    edges_selected.forEach(d => { drawEdges(ctx_hidden, d, d.stroke_hidden, Math.max(10, getLineWidth(d)) ) })
  }//function drawHiddenEdges

  //////////////////////////////////////////////////////////////
  //////////////////// Mouse hover functions ///////////////////
  //////////////////////////////////////////////////////////////

  /////////////// Check if the mouse is close enough ///////////
  function mouseMoveChart() {
    if(d3.event) {
      d3.event.stopPropagation()
      m = d3.mouse(this)
    } else {
      current_hover = null
    }//else

    //Find the nearest person to the mouse, within a distance of X pixels
    //Using the voronoi technique
    let found_hover = mouseNodeFind(m)
    found_edge = null

    if(found_hover) showTooltip(found_hover)

    //If no node is found, check if an edge is clicked (only needed during an active click)
    if (click_active && !found_hover) found_edge = mouseEdgeFind(m)

    //Run the correct "interaction" event
    mouseMoveActions(found_hover, found_edge, m)
  }//function mouseMoveChart

  /////// What mouseover action to run depending on state //////
  function mouseMoveActions(found_hover, found_edge, m) {
    m = m ? m : [0,0] //default value

    //Call mouse events
    if (current_hover === found_hover && found_hover !== null) {
      //do nothing
    } else if(found_hover === null && found_edge === null && current_hover === null) {
      //do nothing
    } else if (found_hover && click_active) {
      //Only run this if there is a click active & a node is hovered
      //Highlight the hovered node on the hover canvas
      clearCanvas([ctx_hover])
      drawHoveredNode(found_hover)
      //Draw rotating circle around the hovered node
      drawDottedHoverCircle(found_hover)
    } else if (found_edge && click_active) {
      //Only run of there is a click, no node is hovered, but and edge is
      clearCanvas([ctx_hover])
      node_hover.style("display", "none") //Hide the rotating circle
      //Draw the hovered edge in the color of the other side's node
      let other_side = found_edge.source.id === current_click.id ? found_edge.target : found_edge.source
      let line_width = getLineWidth(found_edge) * (transform.k < 1.5 ? 2 : 1)
      drawEdges(ctx_hover, found_edge, other_side.fill, line_width)
      //Draw both sides of the hovered edge's nodes on top of the edge
      drawHoveredNode(current_click)
      drawHoveredNode(other_side)
      //Draw a tooltip above the mouse position | create an array
      let edge_pos = { "type": "edge", "x": m[0], "y": m[1], "label": other_side.label, "node": other_side }
      showTooltip(edge_pos)
    } else if (click_active) {
      //Run only if there's a click active, but no node or edge hover
      hideTooltip()
      node_hover.style("display", "none")
      clearCanvas([ctx_hover])
    } else if (found_hover && !click_active) {
      //Only run this if there is no click active, but a node hover is found
      found = found_hover
      setSelection(found)
      drawSelected() //Draw the selected nodes
    }  else { //Reset
      hideTooltip()
      nodes_selected = nodes //Reset the selected nodes
      node_hover.style("display", "none") //Hide the rotating circle
      if(!click_active) mouseOutNode()
    }//else

    current_hover = found_hover
  }//function mouseMoveActions

  /////////////////// Run on "mouseover" of node ///////////////
  function setSelection(node) {
    if(!node) return

    //For all non regions, just draw all connected edges & do this for all when a click is active
    if(node.type !== "region" || click_active) {
      //Only keep edges that are connected to the current node
      edges_selected = edges.filter(d => d.source === node || d.target === node)

      //Save only those that are neighbors
      nodes_selected = nodes.filter(d => neighboring(node, d) || node.id === d.id)
    } else { //For regions look all the way down to the countries and elements
      edges_selected = []
      nodes_selected = [node]
      //Go into a recursive function that searches the regions, countries and
      //then to the elements connected to the countries
      connectedNodes(node)
    }//else
  }//function setSelection

  //////////////// Check which nodes are a neighbor ////////////
  function neighboring(a, b) {
    //From https://stackoverflow.com/questions/8739072
    return edge_by_id[a.id + "," + b.id] || edge_by_id[b.id + "," + a.id]
  }//function neighboring

  //////////// Recursive node drawing for the regions //////////
  function connectedNodes(n) {
    //Save the edges for which n is a target and the source is a region, country or element
    let connected_edges = edges.filter(d => d.target === n && (d.source.type === "region" || d.source.type === "country" || d.source.type === "element"))
    //https://stackoverflow.com/questions/1374126
    //Save in array for drawing
    edges_selected.push.apply(edges_selected, connected_edges)

    //Find the nodes connected to this node for which n is a target and the source is a region, country or element
    let connected_nodes = nodes.filter(d => edge_by_id[d.id + "," + n.id] && (d.type === "region" || d.type === "country" || d.type === "element"))
    //Save in array for drawing
    nodes_selected.push.apply(nodes_selected, connected_nodes)

    //If there are nodes in the list redo the same function for each node
    if (connected_nodes.length > 0) connected_nodes.forEach(d => { connectedNodes(d) })
  }//function connectedNodes

  //////////////////////////////////////////////////////////////
  ///////////////////// Mouse out functions ////////////////////
  //////////////////////////////////////////////////////////////

  /////////////////// Run on "mouseout" of node ////////////////
  function mouseOutNode() {
    if(timer_draw) timer_draw.stop()

    ctx_nodes.globalAlpha = 1
    ctx_edges.lineWidth = zoom_edge_increase(transform.k) * primary_line_width

    //Reset
    edges_selected = []
    nodes_selected = nodes

    //Is this from a true mouse-out or forced programmatically?
    if(forced_load) {
      //Draw without fade
      clearCanvas([ctx_edges, ctx_nodes, ctx_hover, ctx_hidden])
      edges_primary.forEach(l => { drawEdges(ctx_edges, l, l.gradient) })
      nodes.forEach(n => { drawNodes(ctx_nodes, n, n.r) })
      renderNodeLabels(ctx_nodes, nodes)
    } else fadeCanvasBackIn()
  }//function mouseOutNode

  /////////////////// Fade everything back in //////////////////
  function fadeCanvasBackIn() {
    //Transition settings
    const duration = 500
    const ease = d3.easeQuadInOut

    //Calculate the opacity interpolator
    nodes.forEach(n => { n.interpolate_opacity = d3.interpolate(n.opacity, 1) })
    edges_primary.forEach(l => { l.interpolate_opacity = d3.interpolate(0, 1) })

    //Fade everything back in
    timer_draw = d3.timer(elapsed => {
      //How far along the total duration are we (taking the easing into account)
      let t = ease(Math.min(1,elapsed/duration))

      clearCanvas([ctx_edges, ctx_nodes, ctx_hover, ctx_hidden])

      // //Test to draw the centers of the communities
      // drawCommunityCenters()

      //Set new opacities and draw
      nodes.forEach(n => {
        n.opacity = n.interpolate_opacity(t)
        drawNodes(ctx_nodes, n, n.r, n.opacity)
      })
      //Concept labels
      renderNodeLabels(ctx_nodes, nodes)

      edges_primary.forEach(l => {
        let opacity = l.interpolate_opacity(t)
        ctx_edges.globalAlpha = opacity
        drawEdges(ctx_edges, l, l.gradient)
      })
      ctx_edges.globalAlpha = 1

      //Stop when the duration has been reached
      if (elapsed >= duration) timer_draw.stop()
    })//timer
  }//function fadeCanvasBackIn

  //////////////////////////////////////////////////////////////
  //////////////// Hover state drawing functions ///////////////
  //////////////////////////////////////////////////////////////

  ////////////// Draw the selected nodes and edges /////////////
  function drawSelected() {
    if(timer_draw) timer_draw.stop()

    //Clear all the canvases
    clearCanvas([ctx_edges, ctx_nodes, ctx_hover, ctx_hidden])

    //Draw the edges
    edges_selected.forEach(d => {
      //Make the selected edges more visually apparent
      drawEdges(ctx_edges, d, d.gradient_hover, getLineWidth(d) )
    })

    if(nodes !== nodes_selected) {
      //First make all the nodes lightly drawn
      ctx_nodes.globalAlpha = node_fade_opacity
      nodes.forEach(d => {
        d.opacity = node_fade_opacity
        drawNodes(ctx_nodes, d, d.r)
      })
      //And do the same for the labels inside
      renderNodeLabels(ctx_nodes, nodes)
    }//if
    //Draw the selected nodes in full
    ctx_nodes.globalAlpha = 1
    nodes_selected.forEach(d => {
      d.opacity = 1
      drawNodes(ctx_nodes, d, d.r)
    })
    //Draw the labels of the selected nodes in full
    renderNodeLabels(ctx_nodes, nodes_selected)

    // community_count.forEach(d => {
    //     ctx_nodes.fillStyle = node_color_interpolate(node_community_color(d.item))
    //     ctx_nodes.beginPath()
    //     ctx_nodes.arc(d.x, d.y, d.r, 0, pi2)
    //     ctx_nodes.closePath()
    //     ctx_nodes.fill()
    // })//forEach
  }//function drawSelected

  /////// Calculate edge thickness based on type and zoom //////
  function getLineWidth(d) {
    //The min value of how thin the lines can become depends on the zoom level
    let min_edge = transform.k < 1 ? transform.k : 0.8

    let line_width = 2 * Math.max(min_edge, zoom_edge_increase(transform.k) * (d.focus === "primary" ? primary_line_width : secondary_line_width))

    return line_width
  }//function getLineWidth

  //////// Draw the hovered node element on the ctx_hover //////
  function drawHoveredNode(node) {
    drawNodes(ctx_hover, node_by_id[node.id], node.r, 1)
    //Also highlight the hovered node label (if it exists)
    renderNodeLabels(ctx_hover, [node_by_id[node.id]], 1)
  }//function drawHoveredNode

  /////// Draw the dotted circle around the hovered node ///////
  function drawDottedHoverCircle(node) {
    //Draw rotating circle around the node
    node_hover
        .attr("cx", node.x)
        .attr("cy", node.y)
        .attr("r", node.r + Math.min(10, Math.max(5, node.r * 0.1)))
        .style("stroke", node.fill)
        .style("display", null)
  }//function drawDottedHoverCircle

  //////////////////////////////////////////////////////////////
  //////////////////// Node drawing functions //////////////////
  //////////////////////////////////////////////////////////////

  /////////////////////// Draw the nodes ///////////////////////
  function drawNodes(ctx, d, r, opacity) {
    if(opacity) ctx.globalAlpha = opacity

    //If this is an element from the most recent year, make a black "outline"
    if(d.type === "element" && d.meta.year === latest_year) {
      ctx.beginPath()
      ctx.strokeStyle = "black"
      ctx.lineWidth = d.stroke_width / 2
      ctx.arc(d.x, d.y, d.r + d.stroke_width, 0, pi2)
      ctx.stroke()
      // ctx.closePath()
    }//if

    ctx.fillStyle = d.fill

    //If the element circles are big enough, draw images inside
    if ((d.type === "element" && d.img && d.img_loaded) && (r > 10 || show_photos)) {
      let img_w = d.img.width
      let img_h = d.img.height
      let min_size = Math.min(img_w, img_h)
      //When saving, making the stroke width smaller
      let radius = show_photos ? r - (d.stroke_width * 0.2)/2 : r - d.stroke_width/2

      //Clip the image to the circle
      ctx.save()
      ctx.beginPath()
      ctx.arc(d.x, d.y, radius, 0, pi2)
      ctx.clip()
      ctx.drawImage(d.img,
          (img_w-min_size)/2, (img_h-min_size)/2, min_size, min_size, //sx, sy, swidth, sheight
          d.x-r, d.y-r, 2*r, 2*r) //x, y, width, height
      ctx.restore()
    }//if

    ctx.beginPath()

    //The shape depends on the type of node
    if(d.type === "whc") {
      drawDiamond(ctx, d.x, d.y, 1.5*r, 2*r)
      ctx.fill()
      // } else if (d.type === "ngo" || d.type === "project") {
      //     drawNinjaStar(ctx, d.x, d.y, 2*r)
      //     ctx.fill()
    } else if (d.type === "region") {
      drawHexagon(ctx, d.x, d.y, sqrt3*r, 2*r)
      ctx.fill()
      ctx.lineWidth = d.stroke_width
      ctx.strokeStyle = "white"
      ctx.stroke()
    } else if (d.type === "country") {
      drawDiamond(ctx, d.x, d.y, 2*r, 2*r)
      ctx.fill()
      ctx.lineWidth = d.stroke_width
      // ctx.strokeStyle = "white"
      // ctx.stroke()
    } else if (d.type === "concept") {
      //Bigger nodes are white with a colored stroke
      //Small nodes get the colored fill with no stroke
      if(r > 2) {
        ctx.arc(d.x, d.y, r, 0, pi2)
        ctx.strokeStyle = d.fill
        ctx.lineWidth = d.stroke_width
        ctx.fillStyle = "white"

        if(opacity) ctx.globalAlpha = 1
        ctx.fill()
        if(opacity) ctx.globalAlpha = opacity
        ctx.stroke()
      } else {
        ctx.moveTo(d.x, d.y)
        ctx.arc(d.x, d.y, r, 0, pi2)
        ctx.fillStyle = d.fill
        ctx.fill()
      }//else
    } else if (d.type === "element") {
      //If the element circles are big enough, draw images inside
      if((d.img && d.img_loaded) && (r > 10 || show_photos)) {
        //Draw a colored stroke around the image
        ctx.lineWidth = d.stroke_width * (show_photos ? 0.2 : 1)
        ctx.strokeStyle = d.fill
        ctx.arc(d.x, d.y, r, 0, pi2)
        ctx.stroke()
      } else {
        //Draw a completely filled circle
        ctx.moveTo(d.x, d.y)
        ctx.arc(d.x, d.y, r, 0, pi2)
        ctx.fill()
      }//else
    } else {
      //All other node types become circles
      ctx.moveTo(d.x, d.y)
      ctx.arc(d.x, d.y, r, 0, pi2)
      ctx.fill()
    }//else

    // ctx.closePath()
  }//function drawNodes

  /////////////////// Draw a triangle shape ////////////////////
  function drawTriangle(ctx, x_center, y_center, r) {
    let angle = -Math.PI/2
    let x, y

    x = r * Math.cos(angle) + x_center
    y = r * Math.sin(angle) + y_center
    ctx.moveTo(x, y)

    angle += (1/3)*(2*Math.PI)
    x = r * Math.cos(angle) + x_center
    y = r * Math.sin(angle) + y_center
    ctx.lineTo(x, y)

    angle += (1/3)*(2*Math.PI)
    x = r * Math.cos(angle) + x_center
    y = r * Math.sin(angle) + y_center
    ctx.lineTo(x, y)
  }//function drawTriangle

  //////////////////// Draw a diamond shape ////////////////////
  //https://websanova.com/blog/html5/10-shapes-to-extend-html5-canvas
  function drawDiamond(ctx, x, y, w, h) {
    x -= w/2
    y -= h/2
    ctx.moveTo(x + w*0.5, y)
    ctx.lineTo(x, y + h*0.5)
    ctx.lineTo(x + w*0.5, y + h)
    ctx.lineTo(x + w, y +h*0.5)
    ctx.lineTo(x + w*0.5, y)
  }//function drawDiamond

  //////////////////// Draw a hexagon shape ////////////////////
  function drawHexagon(ctx, x, y, w, h) {
    let facShort = 0.26
    let facLong = 1 - facShort

    x -= w/2
    y -= h/2
    ctx.moveTo(x + w*0.5, y)
    ctx.lineTo(x, y + h*facShort)
    ctx.lineTo(x, y + h*facLong)
    ctx.lineTo(x + w*0.5, y + h)
    ctx.lineTo(x + w, y + h*facLong)
    ctx.lineTo(x + w, y + h*facShort)
    ctx.lineTo(x + w*0.5, y)
  }//function drawHexagon

  ////////////////// Draw a ninja star shape ///////////////////
  function drawNinjaStar(ctx, x, y, r) {
    x -= r/2
    y -= r/2
    ctx.moveTo(x + r*0.5, y)
    ctx.lineTo(x + r*0.35, y + r*0.35)
    ctx.lineTo(x, y + r*0.5)
    ctx.lineTo(x + r*0.35, y + r*0.65)
    ctx.lineTo(x + r*0.5, y + r)
    ctx.lineTo(x + r*0.65, y + r*0.65)
    ctx.lineTo(x + r, y + r*0.5)
    ctx.lineTo(x + r*0.65, y + r*0.35)
    ctx.lineTo(x + r*0.5, y)
  }//function drawNinjaStar

  //////////////////////////////////////////////////////////////
  //////////////////// Edge drawing functions //////////////////
  //////////////////////////////////////////////////////////////

  /////////////////////// Draw the edges ///////////////////////
  function drawEdges(ctx, d, stroke, line_width) {
    if(stroke) ctx.strokeStyle = stroke
    if(line_width) ctx.lineWidth = line_width

    ctx.beginPath()
    ctx.moveTo(d.source.x, d.source.y)
    if(d.center) drawCircleArc(ctx, d.center, d.r, d.source, d.target, d.sign)
    else ctx.lineTo(d.target.x, d.target.y)
    ctx.stroke()
  }//function drawEdges

  ////////////////// Draw a curved edge line ///////////////////
  function drawCircleArc(ctx, c, r, p1, p2, side) {
    let ang1 = Math.atan2(p1.y - c.y, p1.x - c.x)
    let ang2 = Math.atan2(p2.y - c.y, p2.x - c.x)
    ctx.arc(c.x, c.y, r, ang1, ang2, side)
  }//function drawCircleArc

  /////////// Calculate the center for each edge arc ///////////
  function calculateEdgeCenters(edges) {
    edges.forEach(d => {
      //Find a good radius
      d.r = Math.sqrt(sq(d.target.x - d.source.x) + sq(d.target.y - d.source.y)) * 2
      //Find center of the arc function
      let centers = findCenters(d.r, d.source, d.target)
      d.sign = 1 //Math.random() > 0.5
      d.center = d.sign ? centers.c2 : centers.c1
    })

    ///////////// Calculate center for curved edges /////////////
    //https://stackoverflow.com/questions/26030023
    //http://jsbin.com/jutidigepeta/3/edit?html,js,output
    function findCenters(r, p1, p2) {
      // pm is middle point of (p1, p2)
      let pm = { x: 0.5 * (p1.x + p2.x), y: 0.5 * (p1.y + p2.y) }
      // compute leading vector of the perpendicular to p1 p2 == C1C2 line
      let perpABdx = - (p2.y - p1.y)
      let perpABdy = p2.x - p1.x
      // normalize vector
      let norm = Math.sqrt(sq(perpABdx) + sq(perpABdy))
      perpABdx /= norm
      perpABdy /= norm
      // compute distance from pm to p1
      let dpmp1 = Math.sqrt(sq(pm.x - p1.x) + sq(pm.y - p1.y))
      // sin of the angle between { circle center,  middle , p1 }
      let sin = dpmp1 / r
      // is such a circle possible ?
      if (sin < -1 || sin > 1) return null // no, return null
      // yes, compute the two centers
      let cos = Math.sqrt(1 - sq(sin))   // build cos out of sin
      let d = r * cos
      let res1 = { x: pm.x + perpABdx * d, y: pm.y + perpABdy * d }
      let res2 = { x: pm.x - perpABdx * d, y: pm.y - perpABdy * d }
      return { c1: res1, c2: res2 }
    }//function findCenters
  }//function calculateEdgeCenters

  /////////////// Create gradients for the edges ///////////////
  function calculateEdgeGradient(edges) {
    edges.forEach(d => {
      let alpha

      //Gradient for the hover state
      //Needed in such a roundabout way for a gradient+transparency bug in Safari, sigh...
      alpha = d.opacity === edge_primary_opacity ? 0.6 : 0.3
      createGradient(d, "gradient_hover", alpha)

      //Gradient for the normal state for the primary edges
      if(d.opacity === edge_primary_opacity) {
        alpha = edge_primary_opacity
        createGradient(d, "gradient", alpha)
      }//if
    })//forEach

    function createGradient(d, variable, alpha) {
      let col
      let color_rgb_source
      let color_rgb_target

      col = d3.rgb(d.source.fill)
      color_rgb_source = "rgba(" + col.r + "," + col.g + "," + col.b + "," + alpha + ")"
      col = d3.rgb(d.target.fill)
      color_rgb_target = "rgba(" + col.r + "," + col.g + "," + col.b + "," + alpha + ")"

      //if(d.source.x && d.target.x) {
      d[variable] = ctx_edges.createLinearGradient(d.source.x, d.source.y, d.target.x, d.target.y)
      d[variable].addColorStop(0, color_rgb_source)
      d[variable].addColorStop(1, color_rgb_target)
      //}
      // else d[variable] = "rgba(230,230,230,0.7)"
    }//function createGradient
  }//function calculateEdgeGradient

  //////////////////////////////////////////////////////////////
  //////////////////// Text + Icon functions ///////////////////
  //////////////////////////////////////////////////////////////

  ///////////////// Place labels inside nodes //////////////////
  function renderNodeLabels(ctx, nodes_to_label, opacity) {
    ctx.fillStyle = "black"
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    // ctx.globalAlpha = 1
    nodes_to_label
    // .filter(d => d.type === "concept" && (d.font_size > 7 || do_print_run))
        .filter(d => d.type === "concept" && (d.font_size > 7 || (do_print_run && d.font_size > (3/sf_scale))))
        .forEach(d => {
          ctx.font = "normal normal 300 " + d.font_size + "px " + font_family
          ctx.globalAlpha = opacity ? opacity : d.opacity
          ctx.fillText(d.label.toUpperCase(), d.x, d.y)
        })
    ctx.globalAlpha = 1
  }//function renderNodeLabels

  ////////////////////// Smallest fitting font size //////////////////////
  function fitTextInCircle(ctx, text, font_size, width, step) {
    //Lower the font size until the text fits the canvas
    do {
      font_size -= step
      ctx.font = "normal normal 300 " + font_size + "px " + font_family
    } while (ctx.measureText(text).width > width)
    return font_size
  }//function fitTextInCircle

  ///////// Place modal open icon next to clicked node /////////
  function renderClickIcon(node) {
    //If this node's type is not in the modal list, don't draw it
    if(modal_types.indexOf(node.type) === -1) {
      node_modal_group.style("display", "none")
      return
    }//if

    //Display the modal opening circle to the top right
    let modal_radius = Math.min(24, Math.max(12, node.r * 0.3))
    let modal_cross_size = 2 * modal_radius / icon_default_size
    let modal_icon_offset = node.r > 18 ? 0 : (modal_radius * 1.5)
    let modal_x = node.x + (node.r + modal_icon_offset) * Math.cos(Math.PI/4)
    let modal_y = node.y + (node.r + modal_icon_offset) * Math.sin(Math.PI/4)

    //Move the modal icon group to the bottom right of the clicked node
    node_modal_group
        .attr("transform", "translate(" + [modal_x, modal_y] + ")")
        .style("display", null)
    //Resize the modal icon circle
    modal_icon_circle
        .attr("r", modal_radius)
        .style("stroke-width", Math.max(2, modal_radius * 0.125))
    //Resize the modal icon cross
    modal_icon_cross
        .attr("d", d3.symbol().size(Math.pow(modal_cross_size,2) * 8).type(d3.symbolCross))
  }//function renderClickIcon

  //////////////////////////////////////////////////////////////
  ///////////////////// Save result to PNG /////////////////////
  //////////////////////////////////////////////////////////////

  chart.saveImage = (width_print = 20, units = "cm", photos = false) => {
    do_print_run = true

    //Remove the possible existing canvas
    let old_canvas = document.getElementById("canvas-print")
    if(old_canvas) document.body.removeChild(old_canvas)
    // document.body.style.overflow = "hidden"

    //Should the photos be shown or not
    show_photos = photos

    ///////////// Calculate new sizes /////////////
    //https://www.pixelcalculator.com/index.php?lang=en&dpi1=300&FS=2
    const dpi_scale = 300 / 2.54 //300 dpi / 2.54cm
    //Calculate the new scale factor
    let sf_new
    if(units === "px") sf_new = width_print / width
    else sf_new = (width_print * dpi_scale) / width
    sf_scale = sf_new / sf
    //Check sizes
    if(sf_new * width * sf_new * height > 268435456) console.log("requested canvas is probably too big for the browser to handle")

    ///////////// Resize everything /////////////
    sf = sf_new
    sf_set = true
    //Resize the actual canvas to this
    let resizeDone = new Promise(function (resolve, reject) {
      let result = chart.resize()
      if (result === 1) resolve("resizing done")
      else reject(Error("Resizing broke"))
    })
    //Do the next step after the resizing is done
    resizeDone.then(result => {
      mouseMoveChart()
      createPrintCanvas()
      //Resize back
      sf = sf_original
      sf_set = sf_set_original
      chart.resize()
    }, error => { console.log(error) })

    function createPrintCanvas() {
      //Create "off-screen" canvas to combine the different layers
      let canvas_save = document.createElement('canvas')
      canvas_save.id = "canvas-print"
      let ctx_save = canvas_save.getContext('2d')
      canvas_save.width = total_width * sf
      canvas_save.height = total_height * sf

      //Draw all the layers onto 1 canvas
      ctx_save.drawImage(canvas_edges.node(), 0, 0, canvas_save.width, canvas_save.height)
      ctx_save.drawImage(canvas_nodes.node(), 0, 0, canvas_save.width, canvas_save.height)
      ctx_save.drawImage(canvas_hover.node(), 0, 0, canvas_save.width, canvas_save.height)

      //Get the image
      // a.href = canvas_save.toDataURL("image/png") //won' work, too large a URL
      try {
        //Automatically download the canvas
        //https://stackoverflow.com/questions/35480112
        //Doesn't work in IE & Edge
        canvas_save.toBlob(blob => {
          let a = document.createElement("a")
          let url = URL.createObjectURL(blob)
          a.href = url
          a.download = "ICH_Constellation.png"
          // a.target = "_blank"
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
          console.log("downloading")
        },'image/png')
      } catch(err) {
        //Manually download the canvas
        document.body.appendChild(canvas_save)
        document.body.style.overflow = "auto"
        window.scrollTo(0,document.body.scrollHeight)
        console.log("Unable to automatically download the file. Instead an image has been added to the screen all the way at the bottom. Right-click and save this image. If no 'Save-as' window pops up, a browser extension might be blocking it. In that case try to open the page in a Chrome Incognito Window, or deactivate all extension, and redo the process.")
      }//try-catch

      //Reset
      show_photos = false
      previous_photos = photos
      do_print_run = false
    }//function createPrintCanvas

  }//function saveImage

  //////////////////////////////////////////////////////////////
  /////////////////// Canvas drawing functions /////////////////
  //////////////////////////////////////////////////////////////

  ///////////////// Find the device pixel ratio ////////////////
  function getPixelRatio(ctx) {
    //From https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    let devicePixelRatio = window.devicePixelRatio || 1
    let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1
    let ratio = devicePixelRatio / backingStoreRatio
    return ratio
  }//function getPixelRatio

  ////////////////// Retina non-blurry canvas //////////////////
  function crispyCanvas(canvas, ctx, sf) {
    canvas
        .attr("width", sf * total_width)
        .attr("height", sf * total_height)
        .style("width", `${total_width}px`)
        .style("height", `${total_height}px`)
    ctx.scale(sf, sf)
    ctx.translate(margin.left + width/2, margin.top + height/2)
  }//function crispyCanvas

  ////////////////////// Clear all canvases ////////////////////
  function clearCanvas(ctxs) {
    ctxs.forEach(d => {
      d.clearRect(-margin.left - width/2, -margin.top - height/2, total_width, total_height)
    })
  }//function clearCanvas

  //////////////////////////////////////////////////////////////
  /////////////////////// Helper functions /////////////////////
  //////////////////////////////////////////////////////////////

  function sq(x) { return x * x }

  function roundTo(n, digits) {
    let multiplicator = Math.pow(10, digits)
    n = parseFloat((n * multiplicator).toFixed(11))
    return Math.round(n) / multiplicator
  }//function roundTo

  //Be able to do a frequency count of an array
  function byCount(arr) {
    var itm, a = [], L = arr.length, o = {}
    for(var i = 0; i < L; i++){
      itm = arr[i]
      if(itm !== 0 && !itm) continue
      if(o[itm] === undefined) o[itm] = 1
      else ++o[itm]
    }
    for(var p in o) a[a.length] = {item: p, frequency: o[p]}
    return a.sort(function(a, b){
      return o[b.item]-o[a.item]
    })
  }//function byCount

  //Generates the next color in the sequence, going from 0,0,0 to 255,255,255.
  //From: https://bocoup.com/weblog/2d-picking-in-canvas
  function genColor() {
    let ret = []
    // via http://stackoverflow.com/a/15804183
    if (next_color < 16777215) {
      ret.push(next_color & 0xff) // R
      ret.push((next_color & 0xff00) >> 8) // G
      ret.push((next_color & 0xff0000) >> 16) // B

      next_color += 10 // This is exaggerated for this example and would ordinarily be 1.
    }//if
    return "rgb(" + ret.join(',') + ")"
  }//function genColor

  //////////////////////////////////////////////////////////////
  //////////////////// Accessor functions //////////////////////
  //////////////////////////////////////////////////////////////

  // chart.margin = function (value) {
  //     if (!arguments.length) return margin
  //     margin = value
  //     return chart
  // }

  chart.width = function (value) {
    if (!arguments.length) return width
    width = value
    return chart
  }

  chart.height = function (value) {
    if (!arguments.length) return height
    height = value
    return chart
  }

  chart.startZoom = function (value) {
    if (!arguments.length) return start_zoom
    start_zoom = value
    return chart
  }

  chart.scaleFactor = function (value) {
    if (!arguments.length) return sf
    sf = value
    sf_original = sf
    sf_set = true
    sf_set_original = true
    return chart
  }

  chart.language = function (value) {
    if (!arguments.length) return language
    language = value
    return chart
  }

  chart.showTooltip = function(_) {
    return arguments.length ? (showTooltip = _, chart) : showTooltip
  }

  chart.hideTooltip = function(_) {
    return arguments.length ? (hideTooltip = _, chart) : hideTooltip
  }

  chart.modalTypes = function (value) {
    if (!arguments.length) return modal_types
    modal_types = value
    return chart
  }

  chart.showModal = function(_) {
    return arguments.length ? (showModal = _, chart) : showModal
  }

  return chart

}//function createConstellationVisual

export default createConstellationVisual;