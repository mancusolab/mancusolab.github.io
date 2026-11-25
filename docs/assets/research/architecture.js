(function () {
  var canvas = d3.select("#my_dataviz").append("svg").attr("viewBox", "0 0 450 350");
  var TOP_HEIGHT = 250
  var LOWER_HEIGHT = 100

  var left_margin = {top: 10, right: 0, bottom: 30, left: 50};
  var left_width = LOWER_HEIGHT - left_margin.left - left_margin.right;
  var left_height = TOP_HEIGHT - left_margin.top - left_margin.bottom;

  // append the svg object to the body of the page
  var left_chart = canvas.append("g").attr("transform", "translate(0,0)")
        .append("g")
          .attr("transform",
                "translate(" + left_margin.left + "," + left_margin.top + ")")
    // add the x Axis
    var x = d3.scaleLinear()
              .domain([-0.1, 0.5])
              .range([left_height, 0]);

    left_chart.append("g")
        .call(d3.axisLeft(x));

  // get the data
  var rng = d3.randomNormal(0.15, 0.05);
  var left_data = d3.range(1000).map((x) => { return rng()});

  // set the parameters for the histogram
  var histogram = d3.bin()
      .value(function(d) { return d; })
      .domain(x.domain())
      .thresholds(x.ticks(70));

  // And apply this function to data to get the bins
  var bins = histogram(left_data);

  // Y axis: scale and draw:
  var y = d3.scaleLinear()
      .range([0, left_width])
      .domain([0, d3.max(bins, function(d) { return d.length; })])

  left_chart.append("g")
       .attr("transform", "translate(0," + left_height + ")")
      .call(d3.axisBottom(y).ticks(2));

  // append the bar rectangles to the svg element
  left_chart.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 0)
        .attr("transform", function(d) { return "translate(0," + x(d.x1) + ")"; })
        .attr("height", function(d) { return Math.max(0, x(d.x0) - x(d.x1) - 1); })
        .attr("width", 0)
        .transition()
        .delay(function(d, i){return(50 + i*50)})
        .attr("width", function(d) { return y(d.length); })
  // text label for the y axis
  left_chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - left_margin.left - 5)
      .attr("x",0 - (left_height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("h2g,rare");

  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 30};
  var width = 350 - margin.left - margin.right;
  var height = TOP_HEIGHT - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var chart1 = canvas.append("g").attr("transform", "translate(100,0)")
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

  //Read the data
  const dataUrl = new URL("architecture.tsv", document.currentScript.src);
  d3.tsv(dataUrl).then(function(data) {
    // Add X axis
    var x = d3.scaleLinear()
      .domain([0, 1])
      .range([ 0, width ]);
    chart1.append("g")
      .attr("class", "myXaxis")   // Note that here we give a class to the X axis, to be able to call it later and modify it
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .attr("opacity", "1")

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([-0.1, 0.5])
      .range([ height, 0]);
    chart1.append("g")
      .call(d3.axisLeft(y));

    // Add dots
    chart1.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d.X); } )
        .attr("cy", function (d) { return 0; } )
        .attr("r", 1.5)
        //.style("fill", "#69b3a2")


    chart1.selectAll("circle")
      .attr("cx", function (d) { return x(d.X); } )
      .transition()
      .delay(function(d,i){return(i*2)})
      .attr("cy", function (d) { return y(d.Y); } )
  }).catch(function() {
    d3.select("#my_dataviz").append("p").text("The scatterplot data could not be loaded.");
  });

  // set the dimensions and margins of the graph
  var lower_height = 100 - margin.top - margin.bottom;

  var chart2 = canvas.append("g").attr("transform", "translate(100,250)")
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

    // add the x Axis
    var x = d3.scaleLinear()
              .domain([0, 1])
              .range([0, width]);

    chart2.append("g")
        .attr("transform", "translate(0," + lower_height + ")")
        .call(d3.axisBottom(x));

  // get the data
  var rng = d3.randomNormal(0.5, 0.05);
  var data2 = d3.range(1000).map((x) => { return rng()});

  // set the parameters for the histogram
  var histogram = d3.bin()
      .value(function(d) { return d; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(data2);

  // Y axis: scale and draw:
  var y = d3.scaleLinear()
      .range([lower_height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);
  chart2.append("g")
      .call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  chart2.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return Math.max(0, x(d.x1) - x(d.x0) - 1); })
        .attr("height", 0)
        .transition()
        .delay(function(d, i){return(50 + i*50)})
        .attr("height", function(d) { return lower_height - y(d.length); })
  chart2.append("text")
        .attr("transform",
              "translate(" + (width / 2) + " ," +
                             (lower_height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("𝜏");
})();
