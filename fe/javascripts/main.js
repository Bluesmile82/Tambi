define(function(require) {

var GraphCreator = require("./graph-creator.js");

  var docEl = document.documentElement,
      bodyEl = document.getElementsByTagName('body')[0];

  var width = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth,
      height =  window.innerHeight|| docEl.clientHeight|| bodyEl.clientHeight;

  var xLoc = width/2 + 50,
      yLoc = height/2;

  var nodes = [];
  var edges = [];

  var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

  var graph = new GraphCreator(svg, nodes, edges);

  graph.load_data();
  graph.setIdCt(2);
  graph.setIdLink(2);
  graph.updateGraph();

return graph;

});
