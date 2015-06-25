define(['../utils.js', './ideas_controller.js', './links_controller.js'], function(utils, Idea, Link) {

  var parsePx = utils.parsePx;
  var ajax = utils.ajax;
  var toWhiteSpace = utils.toWhiteSpace;
  var toSnakeCase = utils.toSnakeCase;
  var windowSize = utils.windowSize;
  var selectElementContents = utils.selectElementContents;

var GraphCreator = function(svg, nodes, edges, permission){
    var thisGraph = this;
        thisGraph.idct = 0;
        thisGraph.idLink = 0;
        thisGraph.permission = permission;

    thisGraph.nodes = nodes || [];
    thisGraph.edges = edges || [];

    thisGraph.state = {
      selectedNode: null,
      selectedEdge: null,
      mouseDownNode: null,
      mouseDownLink: null,
      justDragged: false,
      justScaleTransGraph: false,
      lastKeyDown: -1,
      shiftNodeDrag: false,
      selectedText: null
    };

    // define arrow markers for graph links
    var defs = svg.append('svg:defs');

    defs.append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")

    .attr("spreadMethod", "pad");

    // Define the gradient colors
    defs.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "#a00000")
        .attr("stop-opacity", 1);

    defs.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "#aaaa00")
        .attr("stop-opacity", 1);

    defs.append('svg:marker')
      .attr('id', 'end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 22)
      .attr('markerWidth', 3.5)
      .attr('markerHeight', 3.5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('fill', '#BEFFFF')
      .attr('d', 'M0,-5L10,0L0,5');

    // define arrow markers for leading arrow
    defs.append('svg:marker')
      .attr('id', 'mark-end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 7)
      .attr('markerWidth', 3.5)
      .attr('markerHeight', 3.5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('fill', '#BEFFFF')
      .attr('d', 'M0,-5L10,0L0,5');

    thisGraph.svg = svg;
    thisGraph.svgG = svg.append("g")
          .classed(thisGraph.consts.graphClass, true);
          // .attr('fill', "url(#gradient)" );
    var svgG = thisGraph.svgG;

    // displayed when dragging between nodes
    thisGraph.dragLine = svgG.append('svg:path')
          .attr('class', 'link dragline hidden')
          .attr('d', 'M0,0L0,0')
          // .attr("stroke-dasharray", '0.5,20')
          .attr("stroke-linecap", 'round')
          .style('marker-end', 'url(#mark-end-arrow)');

    // svg nodes and edges
    thisGraph.paths = svgG.append("g").selectAll("g");
    thisGraph.ideas = svgG.append("g").selectAll("g");

    thisGraph.drag = d3.behavior.drag()
          .origin(function(d){
            return {x: d.x, y: d.y};
          })
          .on("drag", function(args){
            thisGraph.state.justDragged = true;
            thisGraph.dragmove.call(thisGraph, args);
          })
          .on("dragend", function() {
            // todo check if edge-mode is selected
          });

    if (thisGraph.permission == 'false' ){
    thisGraph.drag.on('drag', null);
    }
        // listen for key events
        d3.select(window).on("keydown", function(){
          thisGraph.svgKeyDown.call(thisGraph);
        })
        .on("keyup", function(){
          thisGraph.svgKeyUp.call(thisGraph);
        });
        svg.on("mousedown", function(d){thisGraph.svgMouseDown.call(thisGraph, d);});
        svg.on("mouseup", function(d){thisGraph.svgMouseUp.call(thisGraph, d);});

    // listen for dragging
    // var dragSvg = d3.behavior.zoom();
    // d3.select('.graph').call(dragSvg);

    thisGraph.dragSvg = d3.behavior.zoom()
          .on("zoom", function(){
            if (d3.event.sourceEvent.shiftKey){
              // TODO  the internal d3 state is still changing
              return false;
            } else{
              thisGraph.zoomed.call(thisGraph);
            }
            return true;
          })
          .on("zoomstart", function(){
            var ael = d3.select("#" + thisGraph.consts.activeEditId).node();
            if (ael){
              ael.blur();
            }
            if (!d3.event.sourceEvent.shiftKey) d3.select('body').style("cursor", "move");
          })
          .on("zoomend", function(){
            d3.select('body').style("cursor", "auto");
          });

    svg.call(thisGraph.dragSvg).on("dblclick.zoom", null);

    // listen for resize
    window.onresize = function(){thisGraph.updateWindow(svg);};
};


  GraphCreator.prototype.consts =  {
    selectedClass: "selected",
    connectClass: "connect-node",
    circleGClass: "conceptG",
    graphClass: "graph",
    activeEditId: "editing",
    BACKSPACE_KEY: 8,
    DELETE_KEY: 46,
    ENTER_KEY: 13,
    nodeRadius: 50,
    min_size: 14,
    max_size: 154,
    change: 30,
    bias: 300,
    duration_in: 1000,
    duration: 10000,
    delay: 5000
  };

  GraphCreator.prototype.setIdCt = function(idct){
    this.idct = idct;
  };

  GraphCreator.prototype.setIdLink = function(idLink){
    this.idLink = idLink;
  };

  GraphCreator.prototype.position_first_idea = function(){
    var thisGraph = this;
    var first_idea = this.nodes[0]
    if (first_idea.title == 'Idea'){
     first_idea.x = windowSize().width/2;
     first_idea.y = windowSize().height/2;
     var idea = new Idea(thisGraph);
     idea.update(first_idea);
    };
  }

  GraphCreator.prototype.load_data = function(){
    var thisGraph = this;
    var graph_id = $('#window').attr('data-graph');
     $.ajax({
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        url: 'ideas/',
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        success: function(result){
          thisGraph.initialize_ideas(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(thrownError);
      }
      });
   }


  GraphCreator.prototype.initialize_ideas = function(jsonObj){
    var thisGraph = this,
        state = thisGraph.state;
    thisGraph.deleteGraph(true);
    thisGraph.nodes = jsonObj.nodes;
    thisGraph.setIdCt(jsonObj.nodes.length + 1);
    thisGraph.position_first_idea();
    var newEdges = jsonObj.edges;
    newEdges.forEach(function(e, i){
      newEdges[i] = {source: thisGraph.nodes.filter(function(n){return n.id == e.source;})[0],
                     target: thisGraph.nodes.filter(function(n){return n.id == e.target;})[0],
                     id: e.id
      };
    });
    thisGraph.edges = newEdges;
    thisGraph.updateGraph();
    thisGraph.nodes.forEach(function(d){
      if (d.font_size != 20){
        d3.select('#id' + d.id ).style('font-size', d.font_size);
      };
    });
  }


  GraphCreator.prototype.dragmove = function(d) {
    var thisGraph = this;
    if (thisGraph.state.shiftNodeDrag){
      thisGraph.dragLine.attr('d', 'M' + d.x + ',' + d.y + 'L' + d3.mouse(thisGraph.svgG.node())[0] + ',' + d3.mouse(this.svgG.node())[1]);
    } else{
      d.x += d3.event.dx;
      d.y +=  d3.event.dy;
      thisGraph.updateGraph();
    }
  };

  GraphCreator.prototype.deleteGraph = function(skipPrompt){
    var thisGraph = this,
        doDelete = true;
    if (!skipPrompt){
      doDelete = window.confirm("Press OK to delete this graph");
    }
    if(doDelete){
      thisGraph.nodes = [];
      thisGraph.edges = [];
      thisGraph.updateGraph();
    }
  };

  /* select all text in element: taken from http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element */



  // remove edges associated with a node
  GraphCreator.prototype.spliceLinksForNode = function(node) {
    var thisGraph = this,
        toSplice = thisGraph.edges.filter(function(l) {
      return (l.source === node || l.target === node);
    });
    toSplice.map(function(l) {
      thisGraph.edges.splice(thisGraph.edges.indexOf(l), 1);
    });
  };

  GraphCreator.prototype.replaceSelectEdge = function(d3Path, edgeData){
    var thisGraph = this;
    d3Path.classed(thisGraph.consts.selectedClass, true);
    if (thisGraph.state.selectedEdge){
      thisGraph.removeSelectFromEdge();
    }
    thisGraph.state.selectedEdge = edgeData;
  };

  GraphCreator.prototype.replaceSelectNode = function(d3Node, nodeData){
    var thisGraph = this;
    d3Node.classed(this.consts.selectedClass, true);
    if (thisGraph.state.selectedNode){
      thisGraph.removeSelectFromNode();
    }
    thisGraph.state.selectedNode = nodeData;
  };

  GraphCreator.prototype.removeSelectFromNode = function(){
    var thisGraph = this;
    thisGraph.ideas.filter(function(cd){
      return cd.id === thisGraph.state.selectedNode.id;
    }).classed(thisGraph.consts.selectedClass, false);
    thisGraph.state.selectedNode = null;
  };

  GraphCreator.prototype.removeSelectFromEdge = function(){
    var thisGraph = this;
    thisGraph.paths.filter(function(cd){
      return cd === thisGraph.state.selectedEdge;
    }).classed(thisGraph.consts.selectedClass, false);
    thisGraph.state.selectedEdge = null;
  };

  GraphCreator.prototype.pathMouseDown = function(d3path, d){
    var thisGraph = this,
        state = thisGraph.state;
    d3.event.stopPropagation();
    state.mouseDownLink = d;

    if (state.selectedNode){
      thisGraph.removeSelectFromNode();
    }

    var prevEdge = state.selectedEdge;
    if (!prevEdge || prevEdge !== d){
      thisGraph.replaceSelectEdge(d3path, d);
    } else{
      thisGraph.removeSelectFromEdge();
    }
  };

  // mousedown on node
  GraphCreator.prototype.circleMouseDown = function(d3node, d){
    var thisGraph = this,
        state = thisGraph.state;
    d3.event.stopPropagation();
    state.mouseDownNode = d;
    if (d3.event.shiftKey){
      state.shiftNodeDrag = d3.event.shiftKey;
      // reposition dragged directed edge
      thisGraph.dragLine.classed('hidden', false)
        .attr('d', 'M' + d.x + ',' + d.y + 'L' + d.x + ',' + d.y);
      return;
    }
  };

  // mouseup on nodes
  GraphCreator.prototype.circleMouseUp = function(d3node, d){
    var thisGraph = this,
        state = thisGraph.state,
        consts = thisGraph.consts;
    // reset the states
    state.shiftNodeDrag = false;
    d3node.classed(consts.connectClass, false);

    var mouseDownNode = state.mouseDownNode;

    if (!mouseDownNode) return;

    thisGraph.dragLine.classed("hidden", true);

    if (mouseDownNode !== d  && thisGraph.permission != 'false'){
      // we're in a different node: create new edge for mousedown edge and add to graph
      var newEdge = {source: mouseDownNode, target: d, id: 0 };
      var existing_link = thisGraph.edges.map(function(link){
        if ( link.target.id == newEdge.source.id && link.source.id == newEdge.target.id ||
            link.target.id == newEdge.target.id && link.source.id == newEdge.source.id ){
          return false;
        }
      });
      if( existing_link.indexOf(false) == -1 ){
        new Link(thisGraph).create(mouseDownNode, d, thisGraph.idLink++)
      }
    } else{
      // we're in the same node
      if (state.justDragged  && thisGraph.permission != 'false') {
        // dragged, not clicked
        var idea = new Idea(thisGraph);
        idea.update(d);
        state.justDragged = false;
      } else{
        // clicked, not dragged
        if (d3.event.shiftKey  && thisGraph.permission != 'false'){
          // shift-clicked node: edit text content
          thisGraph.interactionEditTextContent(d3node, d);
        } else{
          if (state.selectedEdge){
            thisGraph.removeSelectFromEdge();
          }
          var prevNode = state.selectedNode;

          if (!prevNode || prevNode.id !== d.id){
            thisGraph.replaceSelectNode(d3node, d);
          } else{
            thisGraph.removeSelectFromNode();
          }
        }
      }
    }
    thisGraph.selected = d3node;
    state.mouseDownNode = null;
    return;
  }; // end of ideas mouseup

  // mousedown on main svg
  GraphCreator.prototype.svgMouseDown = function(){
    this.state.graphMouseDown = true;
  };


  GraphCreator.prototype.interactionEditTextContent = function(d3node, d){
    var thisGraph = this;
    var d3txt = new Idea(thisGraph).changeText(d3node, d);
      var txtNode = d3txt.node();
      selectElementContents(txtNode);
      txtNode.focus();
  }

  GraphCreator.prototype.interactionCreateIdea = function(){
    var thisGraph = this;
    var xycoords = d3.mouse(thisGraph.svgG.node());
    var idea = new Idea(thisGraph);
    var d = {title: 'new_idea' , x: xycoords[0] , y: xycoords[1], font_size: 20 , concept_type: 'concept', parent_id: null };
    idea.create(d).done(function(data){
      var d = data;
      var d3txt = idea
                  .changeText(thisGraph.ideas.filter(function(dval){ return dval.id === d.id; }), d);
      var txtNode = d3txt.node();
      selectElementContents(txtNode);
      txtNode.focus();
      // return d
    });
}

  // mouseup on main svg
  GraphCreator.prototype.svgMouseUp = function(){
    var thisGraph = this,
        state = thisGraph.state;
    if (state.justScaleTransGraph) {
      // dragged not clicked
      state.justScaleTransGraph = false;
    } else if (state.graphMouseDown && d3.event.shiftKey && thisGraph.permission != 'false' ){
      // clicked not dragged from svg
      thisGraph.interactionCreateIdea();
      // make title of text immediently editable
    } else if (state.shiftNodeDrag && thisGraph.permission != 'false'){
      // dragged from node
      state.shiftNodeDrag = false;
      thisGraph.dragLine.classed("hidden", true);
    }
    state.graphMouseDown = false;
  };

  // keydown on main svg
  GraphCreator.prototype.svgKeyDown = function() {
    var thisGraph = this,
        state = thisGraph.state,
        consts = thisGraph.consts;
    // make sure repeated key presses don't register for each keydown
    if(state.lastKeyDown !== -1) return;

    state.lastKeyDown = d3.event.keyCode;
    var selectedNode = state.selectedNode,
        selectedEdge = state.selectedEdge;

    switch(d3.event.keyCode) {
    case consts.BACKSPACE_KEY:
    case consts.DELETE_KEY:
      d3.event.preventDefault();
      if (selectedNode && thisGraph.permission != 'false'){
        new Idea(thisGraph).delete(selectedNode, state);
      } else if (selectedEdge && thisGraph.permission != 'false'){
        new Link(thisGraph).delete(selectedEdge);
        state.selectedEdge = null;
        thisGraph.updateGraph();
      }
      break;
    }
  };

  GraphCreator.prototype.svgKeyUp = function() {
    this.state.lastKeyDown = -1;
  };


  GraphCreator.prototype.updateLinks = function( paths ){
    var constants = this.consts;
    var state = this.state;
    paths.style('marker-end', 'url(#end-arrow)')
      .classed(constants.selectedClass, function(d){
        return d === state.selectedEdge;
      })
      .attr("d", function(d){
        return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
      });
  }

  GraphCreator.prototype.addNewLinks = function( paths ){
    var thisGraph = this;
    var constants = this.consts;
    var state = this.state;
    paths.enter()
      .append("path")
      .style('marker-end','url(#end-arrow)')
      .classed("link", true)
      .attr("stroke-linecap", 'round')
      .attr("d", function(d){
        return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
      })
      .on("mousedown", function(d){
        thisGraph.pathMouseDown.call(thisGraph, d3.select(this), d);
        }
      )
      .on("mouseup", function(d){
        state.mouseDownLink = null;
      });
  }

  GraphCreator.prototype.updateGraph = function(){
    console.log('updateGraph')
    var thisGraph = this,
        consts = thisGraph.consts,
        state = thisGraph.state;

    thisGraph.paths = thisGraph.paths.data(thisGraph.edges, function(d){
      return String(d.source.id) + "+" + String(d.target.id);
    });
    var paths = thisGraph.paths;
    thisGraph.updateLinks( paths );
    thisGraph.addNewLinks( paths );
    paths.exit().remove();

    thisGraph.ideas = thisGraph.ideas.data(thisGraph.nodes, function(d){ return d.id;});
    thisGraph.ideas.attr("transform", function(d){return "translate(" + d.x + "," + d.y + ")";});
    thisGraph.reloadIdeas();
    thisGraph.addNewIdeas();
    thisGraph.ideas.exit().remove();
  };

  GraphCreator.prototype.reloadIdeas = function (){
    var thisGraph = this;
    var Ideas = thisGraph.ideas;
    thisGraph.deleteIdeasShape(Ideas);
    thisGraph.reloadIdeasShape(Ideas);
  }

  GraphCreator.prototype.deleteIdeasShape = function (Ideas){
    Ideas.selectAll('rect').remove();
    Ideas.selectAll('circle').remove();
    Ideas.selectAll('image').remove();
    Ideas.selectAll('text').remove();
  }

  GraphCreator.prototype.reloadIdeasShape = function(Ideas){
    var thisGraph = this;
    var idea = new Idea(thisGraph);
    Ideas.each(function(d){
                  var d3node = d3.select(this);
                  if (d.description != null && d.description != undefined && d.description != ''){ thisGraph.createDescriptionShape( d3node, d ); }
                  thisGraph.createIdeaShape(d3node, d);
                  idea.insertTitleLinebreaks(d3node, d.title, 2 );
                  if (d.description != null && d.description != undefined && d.description != ''){
                  idea.insertDescription( d3node , d );
                   }
                  d3node.attr("id",function(d){return 'id' + d.id});
                })
  }

  GraphCreator.prototype.addNewIdeas = function (){
    var thisGraph = this,
        consts = thisGraph.consts,
        state = thisGraph.state;

      var newIdeas = thisGraph.ideas.enter()
                .append("g");

      newIdeas.classed(consts.circleGClass, true)
        .attr("transform", function(d){return "translate(" + d.x + "," + d.y + ")";})
        .on("mouseover", function(d){
          if (state.shiftNodeDrag){
            d3.select(this).classed(consts.connectClass, true);
          }
        })
        .on("mouseout", function(d){
          d3.select(this).classed(consts.connectClass, false);
        })
        .on("mousedown", function(d){
          thisGraph.circleMouseDown.call(thisGraph, d3.select(this), d);
        })
        .on("mouseup", function(d){
          thisGraph.circleMouseUp.call(thisGraph, d3.select(this), d);
        })
        .call(thisGraph.drag);

      thisGraph.reloadIdeasShape(newIdeas);

    }

    GraphCreator.prototype.getTextMaxLenght = function( text , words_in_line ){
      var words = text.split(/\s+/g),
        nwords = words.length;
      var max = 0;
      for (var i = 0; i < words.length; i += words_in_line) {
        lineLenght = words.slice( i, i + words_in_line).join().length;
        if (lineLenght > max){ max = lineLenght };
      }
      return max;
    }

    GraphCreator.prototype.getDivMaxLenght = function( text , words_in_line ){
      text = text.replace(/<div>/g, '');
      var cleanText = text.replace(/<br>/g, '');
      var lines = cleanText.split(/<\/div>/g);
      var max = 0;
      for (var i = 0; i < lines.length ; i++) {
        var lineLenght = lines[i].length;
        if (lineLenght > max){ max = lineLenght };
      }
      return max;
    }

    GraphCreator.prototype.getNumberOfLines = function( text , words_in_line ){
      return Math.floor(text.split(/\s+/g).length / words_in_line) + 1 ;
    }

    GraphCreator.prototype.getNumberOfDivs = function( text ){
      return text.split(/<\/div>/g).length ;
    }

    GraphCreator.prototype.createDescriptionShape = function( newIdea, d ){
        var consts = this.consts;
            var width = consts.nodeRadius * 5;
            if (d.description != undefined){
              var width = this.getDivMaxLenght( d.description ) * 5 + 60 ;
              if (width < 100){ width = 100 };
            }


            var height = consts.nodeRadius * 1.5;
            if (d.description != undefined){
              var height = this.getNumberOfDivs( d.description ) * 15 + height ;
            if (d.concept_type == 'image'){
              height += 80;
            }

            }

            height += this.getNumberOfLines( d.title, 2 ) * 5;

             newIdea.append( 'rect' )
             .attr("width", width )
             .attr("height", height )
             .attr("x", String( - width / 2))
             .attr("y", String( -consts.nodeRadius ))
             .attr("rx", '25' )
             .attr("ry", '25' );
            newIdea.classed('text-hidden', false).classed('text-left', true);
    }

      GraphCreator.prototype.createIdeaShape = function(newIdea, d){
        var consts = this.consts;
        switch(d.concept_type){
          case 'concept':
            if (d.description == undefined || d.description == '' || d.description == null ){
              newIdea.append( 'circle' ).attr("r", String(consts.nodeRadius));
              newIdea.classed('text-hidden', false).classed('text-left', false);
            }
            else{
              newIdea.select('rect').attr('x','-20');
            }
            break;
          case 'url':
            newIdea.append( 'rect' )
                   .attr("width", String(consts.nodeRadius)* 2)
                   .attr("height", String(consts.nodeRadius)* 2)
                   .attr("y", String( -consts.nodeRadius))
                   .attr("x", String( -consts.nodeRadius));
            newIdea.classed('text-hidden', false).classed('text-left', false);
            break;
          case 'image':
            newIdea.append( 'rect' )
                   .attr("width", String(consts.nodeRadius)* 2)
                   .attr("height", String(consts.nodeRadius)* 2)
                   .attr("x", String( -consts.nodeRadius ))
                   .attr("y", String( -consts.nodeRadius ))
                   .attr("rx", '25' )
                   .attr("ry", '25' );
            newIdea.append('image')
                   .attr('xlink:href', d.title )
                   .attr("width", String(consts.nodeRadius)* 2)
                   .attr("height", String(consts.nodeRadius)* 2)
                   .attr("x", String( -consts.nodeRadius))
                   .attr("y", String( -consts.nodeRadius))
                   ;
            newIdea.classed('text-hidden', true).classed('text-left', false);
            break;
          default:
            console.log(d.concept_type);
        }

        if (d.parent_id != null){
          newIdea.classed('parent_id', true);
        }else{
          newIdea.classed('parent_id', false);
        }
      }


  GraphCreator.prototype.zoomed = function(){
    this.state.justScaleTransGraph = true;
    d3.select("." + this.consts.graphClass)
      .attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
    this.consts.zoom = d3.event.scale;
    $('#zoom').val(this.consts.zoom);
    $('#zoom-label').html(parseInt(this.consts.zoom * 100) + '%');
    this.translate = d3.event.translate;
  };

  GraphCreator.prototype.updateWindow = function(svg){
    var docEl = document.documentElement,
        bodyEl = document.getElementsByTagName('body')[0];
    var x = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth;
    var y = window.innerHeight|| docEl.clientHeight|| bodyEl.clientHeight;
    svg.attr("width", x).attr("height", y);
  };

  return GraphCreator;

});
