(function () {
  var width = 450,
      height = 200;

  var svg = d3.select("#mr-graph")
      .append("svg:svg")
      .attr("viewBox", "0 0 " + width + " " + height);

  // set up initial nodes and links
  //  - nodes are known by 'id', not by index in array.
  //  - links are always source < target; edge directions are set by 'left' and 'right'.

  var nlist = [{id: "G", group: 1, x: 34.48, y: 169.53},
               {id: "X", group: 2, x: 135.32, y: 167.01},
               {id: "Y", group: 3, x: 235.37, y: 177.72},
               {id: "U", group: 4, x: 194.82, y: 85.73}]

  //jitter
  nlist = nlist.map(function(n) {
      n.x += Math.random() * 50;
      n.y += Math.random() * 50;
      return n
  });

  var graph = {
    nodes : nlist,
    links : [
      {source: nlist[0], target: nlist[1], value: 2 },
      {source: nlist[1], target: nlist[2], value: 2 },
      {source: nlist[3], target: nlist[1], value: 2 },
      {source: nlist[3], target: nlist[2], value: 2 }
    ]};

  var color = d3.scaleOrdinal([1, 2, 3, 4], ["#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c"]);

  var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100).strength(1))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

  // add markers for arrows
  svg.append("defs").append("marker")
      .attr("id", "research-arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 22)
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .style("fill", "#999")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

  // add edges/links
  var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("marker-end", "url(#research-arrow)");

  // add nodes
  var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", 20)
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  // add labels for nodes
  var label = svg.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(graph.nodes)
      .enter().append("text")
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .style('font-family','sans-serif')
      .style('font-size','18px')
      .text(function (d) { return d.id; })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    label
        .attr("x", function(d) { return d.x; })
        .attr("y", function (d) { return d.y; })
  }

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
})();
