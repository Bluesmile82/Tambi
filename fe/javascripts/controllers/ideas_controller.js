define(["../utils.js", "../views/view.js" ], function(Utils, View) {

var toWhiteSpace = Utils.toWhiteSpace;
var ajax = Utils.ajax;
var parsePx = Utils.parsePx;
var findType = Utils.findType;

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

  Idea.prototype.createLongText = function( id ){
    var thisIdea = this;
    var d = thisIdea.find_by_id( id );
    var htmlElement = thisIdea.htmlElement(id);
    var d3node = thisIdea.d3Element(id);

    var textInput = thisIdea.appendTextInput( htmlElement, d , d.description, true);
    document.getElementById('editing').focus();
    textInput.on("blur", function(d){
      d.description = textInput.node().innerHTML;
      thisIdea.updateDescription(d3node, d);
      this.remove();
    });
  }

  Idea.prototype.insertTitleLinebreaks = function ( d3node, text, words_in_line ) {
    var words = text.split(/\s+/g),
        nwords = words.length;
    var newText = d3node.append("text")
        .attr("dy", "-" + (nwords-1) * 7.5 / words_in_line);

    for (var i = 0; i < words.length; i += words_in_line) {
      var tspan = newText.append('tspan').text(words.slice( i, i + words_in_line).join().replace(/\,/g,' '));
      if (i > 0)
        tspan.attr('x', 0).attr('dy', '15');
    }
    return newText
  };

  Idea.prototype.insertDescriptionText = function ( d3node, text ) {
    var text = text.replace(/<div>/g,'<tspan dy=15 x=0 >');
    text = text.replace(/<\/div>/g,'<\/tspan>');
    text = text.replace(/<\/br>/g,'<tspan dy=15 x=0 ></tspan>');
    return d3node.append("text").html(text);
  };

  Idea.prototype.insertDescription = function( d3group, d ){
    if (d.description != null && d.description != ''){
      var descriptionPadding = 20 + Math.abs(d3group.select('text').attr('dy'));
      if (d.concept_type == 'image'){ descriptionPadding += 80; }
      var newDescription = this.insertDescriptionText( d3group, d.description )
      // Todo append a foreign object
      newDescription.classed('description', true ).attr('dy', descriptionPadding);
    }
  }

  Idea.prototype.updateDescription = function( d3node, d ){
    this.insertDescription( d3node, d );
    this.graph.updateGraph();
    this.update(d);
  }

  Idea.prototype.changeConceptType = function(d, concept_type){
    var thisIdea = this;
    d.concept_type = concept_type;
    thisIdea.update(d);
    thisIdea.graph.updateGraph();
  }

  Idea.prototype.appendTextInput = function( htmlEl, d , initialText, enterKeyEscape){
    var graph = this.graph;
    var constants = graph.consts;
    var d3Element = this.d3Element( d.id );
    var nodeBCR = htmlEl.getBoundingClientRect(),
        curScale = nodeBCR.width / constants.nodeRadius,
        placePad  =  5 * curScale,
        useHW = curScale > 1 ? nodeBCR.width*0.71 : constants.nodeRadius * 1.5;
    var textInput = graph.svg.selectAll("foreignObject")
          .data([d]).enter()
          .append("foreignObject")
          .attr("x", nodeBCR.left + placePad )
          .attr("y", nodeBCR.top + placePad )
          .attr("height", useHW)
          .attr("width", 2 * useHW)
          .append("xhtml:p")
          .style('overflow', 'hidden')
          .attr("id", constants.activeEditId)
          .attr("contentEditable", "true")
          .html(initialText)
          .on("mousedown", function(d){
            d3.event.stopPropagation();
          })
          .on("keydown", function(d){
            d3.event.stopPropagation();
            if (d3.event.keyCode == constants.ENTER_KEY && (!enterKeyEscape || d3.event.shiftKey)){
                this.blur();
                textInput.data([d]).exit().remove();
            }
          });

          return textInput;
  }

  Idea.prototype.d3Element = function( id ){
    return d3.select('#id' + id);
  }

  Idea.prototype.htmlElement = function ( id ){
    return this.d3Element( id ).node();
  }

  Idea.prototype.changeText = function(d3node, d){
    var graph = this.graph,
        idea = this;
        htmlEl = d3node.node();
    d3node.select("text").remove();
    textInput = this.appendTextInput( htmlEl, d , d.title );

    textInput.on("blur", function(d){
            d.concept_type = findType(this.textContent);
            // if ( d.description != null && d.description != '' ){ d.concept_type = 'text' }
            d.title = this.textContent;
            idea.update_text(d3node, d, this);
            graph.updateGraph()
          });

    return textInput;
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

  Idea.prototype.update = function(d){
    $.ajax({
        type: "PUT",
        url: 'ideas/' + d.id ,
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        data: {idea: { id: d.id, x: d.x , y: d.y, font_size: d.font_size , concept_title: d.title, concept_type: d.concept_type, description: d.description}},
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