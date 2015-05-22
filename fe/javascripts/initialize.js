define(["./canvas_controller", "./utils.js"], function( GraphCreator, utils) {

var windowSize = utils.windowSize;

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

  // var force = d3.layout.force()
  //   .size([windowSize().width, windowSize().height])
  //   .linkDistance(150)
  //   .charge(-500)
  //   .nodes(graph.nodes)
  //   .start()
  //   .on('tick',function(){
  //     graph.updateGraph();
  //   });

return graph ;

});
