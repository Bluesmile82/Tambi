define( function(GraphCreator, graph, utils, Idea) {

  var View = function(){};

  View.prototype.clearAlert = function(){
    d3.select('#alert').text('');
  };

  View.prototype.noSelection = function(){
    d3.select('#alert').text('Please select an Idea first');
  };

  View.prototype.clearIframeTab = function(){
    d3.select('.wiki').classed('wiki-open', false).classed('url-open', false);
    d3.select('.url-title').remove();
    d3.select('.wiki iframe').remove();
    d3.select('.wiki div').html('');
  }

  return View;
});