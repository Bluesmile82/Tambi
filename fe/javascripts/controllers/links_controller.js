define(["../utils.js", "../views/view.js" ], function(utils, View) {

var toWhiteSpace = utils.toWhiteSpace;
var ajax = utils.ajax;

  var Link = function( graph ){
    this.graph = graph;
  }

  Link.prototype.create = function( idea_one, idea_two, id ){
    var graph = this.graph;
    this.save(idea_one, idea_two, id).done(function(data, errors){
      var newEdge = {source: idea_one, target: idea_two, id: data.id};
      graph.edges.push(newEdge);
      graph.updateGraph();
    });
  }

  Link.prototype.save = function(idea_one, idea_two, id){
    return $.ajax({
        type: "POST",
        url: 'links/' ,
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data: {link: { idea_a_id: idea_one.id, idea_b_id: idea_two.id }},
          dataType: 'json',
        success: function(result){
          return result;
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(thrownError);
        }
      });
  }

  Link.prototype.delete = function(selectedEdge){
    var graph = this.graph;
    var link_index = graph.edges.indexOf(selectedEdge)
    graph.edges.splice( link_index , 1);
    ajax('links/' + selectedEdge.id, 'DELETE');
  }


  return Link
});