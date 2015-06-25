define(["./controllers/canvas_controller", "./utils.js"], function( GraphCreator, utils) {

var windowSize = utils.windowSize;

  var nodes = [];
  var edges = [];
  var svg = d3.select("body").append("svg")
        .attr("width", windowSize().width)
        .attr("height", windowSize().height);
  var permission = d3.select('#window').attr('data-permission');
  var graph = new GraphCreator(svg, nodes, edges, permission);

  graph.load_data();
  graph.setIdCt(2);
  graph.setIdLink(2);
  graph.updateGraph();

  graph.consts =  {
    selectedClass: "selected",
    connectClass: "connect-node",
    circleGClass: "conceptG",
    graphClass: "graph",
    activeEditId: "editing",
    BACKSPACE_KEY: 8,
    DELETE_KEY: 46,
    ENTER_KEY: 13,
    nodeRadius: 65,
    min_size: 14,
    max_size: 154,
    change: 30,
    bias: 300,
    duration_in: 1000,
    duration: 10000,
    delay: 5000,
    zoom: 1,
    translate: [0,0]
  };

 $('#zoom').val(graph.consts.zoom);

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
