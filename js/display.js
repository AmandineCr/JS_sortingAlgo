
var COMPARE_COLOR = '#00f';
var SWAP_COLOR = '#0f0';
var DEFAULT_COLOR = '#000';

var prev1 = null;
var prev2 = null;
var displayBuffer = [];

function swap_attr(p1,p2,attr)
{
  var tmp = p1.attr(attr);
  p1.attr(attr,p2.attr(attr));
  p2.attr(attr,tmp);
}

function swap_rect(p1,p2)
{
  swap_attr(p1,p2,"x");
  swap_attr(p1,p2,"id");
}

function getRect(i)
{
  return d3.select("rect#c"+i);
}



var oneStep = function() {

  if (displayBuffer.length === 0) {
    return;
  }

  var action = displayBuffer.shift();
  var i = getRect(action[1]);
  var j = getRect(action[2]);
  if (prev1)
  {
    prev1.attr("fill",DEFAULT_COLOR);
  }
  if (prev2)
  {
    prev2.attr("fill",DEFAULT_COLOR);
  }
  prev1 = i;
  prev2 = j;

  if (action[0] === 'compare') {
    i.attr("fill",COMPARE_COLOR);
    j.attr("fill",COMPARE_COLOR);
  } else if (action[0] === 'swap') {
    swap_rect(i,j);
    i.attr("fill",SWAP_COLOR);
    j.attr("fill",SWAP_COLOR);
  }
};


function setupDisplay()
{

  var w= 800;
  var h= 400;
  var xScale = d3.scaleLinear().domain([0, csvData.length]).range([0, w]);
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, function(d) { return d.dist; })])
    .range([0, h]);

  d3.selectAll("svg > *").remove();

  var canvas=d3.select("body")
    .select("svg")
    .attr("width",w)
    .attr("height",h)
    .call(d3.zoom().on("zoom", function () {
      canvas.attr("transform", d3.event.transform)}))
    .append("g");

  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var bars=canvas.selectAll("rect")
    .data(csvData)
    .enter()
      .append("rect")
      .attr("id",function(i,j){return "c"+j;})
      .attr("width", xScale(1))
      .attr("height", function(i){return yScale(i.dist);})
      .attr("x", function(i,j){return xScale(j);})
      .attr("y", function(i,j){return h-yScale(i.dist);})
      .attr("fill", function (i) {return i.dist;})
      .attr("str", function (i) {return i.str;})
      .on("mouseover", function(d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(d.str)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

  // Make the canvas fit the available space
  var resize_canvas = function() {
    $('#main-canvas').width($('#canvas-div').width());
  }
  resize_canvas();
  $(window).resize(resize_canvas);

}

function filterData(data)
{
  function num_dptIsntNAN(elt) {
    return !(isNaN(elt.dist) || elt.latitude==0 || elt.longitude==0);
  }

  return data.filter(num_dptIsntNAN);
}
