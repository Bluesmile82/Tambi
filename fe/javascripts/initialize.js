define(function(require) {

var GraphCreator = require("./graph-creator.js");
var windowSize = require("./utils.js").windowSize;

  var nodes = [];
  var edges = [];

  var svg = d3.select("body").append("svg")
        .attr("width", windowSize().width)
        .attr("height", windowSize().height);

  var graph = new GraphCreator(svg, nodes, edges);

  graph.load_data();
  graph.setIdCt(2);
  graph.setIdLink(2);
  graph.updateGraph();

return graph ;

});
