define(["../utils.js", "../views/view.js" ], function(utils, View) {

var toWhiteSpace = utils.toWhiteSpace;
var ajax = utils.ajax;
var parsePx = utils.parsePx;

  var Idea = function( graph ){
    this.graph = graph;
  }

  Idea.prototype.create = function( d ){
    var graph = this.graph;
    return this.save(d)
          .done(function(data, errors){
                d = {
                      id: data.id,
                      title: toWhiteSpace(d.title),
                      x: data.x ,
                      y: data.y,
                      font_size: data.font_size ,
                      concept_type: d.concept_type,
                      parent_id: d.parent_id
                    };
                graph.nodes.push(d);
                graph.updateGraph();
                return d
          });
  }

  Idea.prototype.save = function(d){
    return $.ajax({
        type: "POST",
        url: 'ideas/' ,
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data: {idea: { id: d.id, x: d.x , y: d.y, font_size: d.font_size , concept_title: d.title, concept_type: d.concept_type , parent_id: d.parent_id}},
          dataType: 'json',
        success: function(result){
           if (result.error == "true"){ alert("An error occurred: " & result.errorMessage);
          return result;
           }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(thrownError);
        }
      });
  }

  Idea.prototype.changeText = function(d3node, d){
    var graph = this.graph,
        idea = this,
        constants = graph.consts,
        htmlEl = d3node.node();
    d3node.selectAll("text").remove();
    var nodeBCR = htmlEl.getBoundingClientRect(),
        curScale = nodeBCR.width/constants.nodeRadius,
        placePad  =  5*curScale,
        useHW = curScale > 1 ? nodeBCR.width*0.71 : constants.nodeRadius*1.42;
    var d3txt = graph.svg.selectAll("foreignObject")
          .data([d]).enter()
          .append("foreignObject")
          .attr("x", nodeBCR.left + placePad )
          .attr("y", nodeBCR.top + placePad )
          .attr("height", 2*useHW)
          .attr("width", useHW)
          .append("xhtml:p")
          .attr("id", constants.activeEditId)
          .attr("contentEditable", "true")
          .text(d.title)
          .on("mousedown", function(d){
            d3.event.stopPropagation();
          })
          .on("keydown", function(d){
            d3.event.stopPropagation();
            if (d3.event.keyCode == constants.ENTER_KEY && !d3.event.shiftKey){
              this.blur();
            }
          })
          .on("blur", function(d){
            d.title = this.textContent;
            d.concept_type = findType(this.textContent);
            idea.update_text(d3node, d, this);
            graph.updateGraph()
          });
    return d3txt;
  };

  Idea.prototype.update_text = function(d3node, d, txt_tmp){
    var graph = this.graph,
        thisIdea = this;
    var htmlEl = d3node.node();
    var idea = thisIdea.find_by_id( d.id );
    idea.title = d.title;
    idea.concept_type = d.concept_type;
    if (d.type == 'concept'){
      graph.insertTitleLinebreaks(d3node, d.title);
    }

    d3.select(txt_tmp.parentElement).remove();

    d3.select(htmlEl).attr('id', 'id' + d.id);
    d3.select(htmlEl).attr('title', d.title);
    thisIdea.update(d);
  }

  function insertUrl(gEl, title) {
    var el = gEl.append("a")
          .attr("href", title)
          .attr("text-anchor","middle");

      var name = el.append('text').text(title);
        name.attr('x', 0).attr('dy', '15');
  };

  function findType(title){
    var regexp_web = /([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    var regexp_pic = /(.+\.)(jpg|gif|png)$/
    if (title.search(regexp_web) > -1){
      if(title.search(regexp_pic) > -1){ return 'image' }
      else{ return 'url'; }
    }else{
      return 'concept';
    }
  }


  Idea.prototype.update = function(d){
    $.ajax({
        type: "PUT",
        url: 'ideas/' + d.id ,
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data: {idea: { id: d.id, x: d.x , y: d.y, font_size: d.font_size , concept_title: d.title, concept_type: d.concept_type }},
        success: function(result){
           if (result.error == "true"){ alert("An error occurred: " & result.errorMessage);
           graph.updateGraph()
           return result;
           }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status == 422){
          console.log(thrownError);
        };
      }
    });
  }


  Idea.prototype.delete = function(selectedNode, state){
    var graph = this.graph;
    graph.nodes.splice(graph.nodes.indexOf(selectedNode), 1);
    graph.spliceLinksForNode(selectedNode);
    state.selectedNode = null;
    graph.updateGraph();
    ajax('ideas/' + selectedNode.id , 'DELETE');
  }

  Idea.prototype.selectedId = function(){
    var graph = this.graph;
    if ( graph.selected != undefined ){
      return graph.selected.node().id.replace(/id/, '')
    }
    else {
      return null;
    }
  }


  Idea.prototype.change_size = function(plus_minus){
    var graph = this.graph,
        constants = graph.consts;
    var selected = d3.select('.selected');
    var size = parsePx(selected.style('font-size'));
    var idea_font_size = parseInt( size + constants.change * plus_minus );
    var circle = selected.select('circle');
    var current_radius = parseInt(circle.attr('r'));
    var tspans = selected.selectAll('tspan');
    // var current_dy = parseInt(selected.select('tspan:nth-child(2)').attr('dy'));

    if (size > constants.min_size && plus_minus == -1 || size < constants.max_size && plus_minus == 1){
      selected.style('font-size', idea_font_size + 'px');
      circle.attr('r', current_radius + constants.change * plus_minus);
      // tspans.attr('dy', current_dy + constants.change * plus_minus);
      idea = this.update_idea_size(selected, idea_font_size);
      return idea;
    }
  };

  Idea.prototype.update_idea_size = function(selected, idea_font_size){
    var graph = this.graph;
    var selectedId = selected.node().id.replace( /id/, '');
    var idea = this.find_by_id ( selectedId );
    idea.font_size = idea_font_size;
    return idea;
  }

  Idea.prototype.find_by_title = function(title){
    var graph = this.graph;
    var nodes = graph.nodes;
    var idea = null;
    $.each( nodes, function(index, value){
      if (value['title'] == title){
        return idea = value;
      }
    })
    return idea;
  }

  Idea.prototype.find_by_id = function(id){
    var graph = this.graph;
    var nodes = graph.nodes;
    var idea = null;
    $.each( nodes, function(index, value){
      if (value['id'] == id){
        return idea = value;
      }
    })
    return idea;
  }

  Idea.prototype.find_title_by_id = function(id){
   return this.find_by_id(id)['title']
  }



return Idea;

});