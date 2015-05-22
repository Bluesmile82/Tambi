/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	document.onload = start();

	function start() {

	  __webpack_require__(9);
	}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	  var Utils = {

	    parsePx: function parsePx(string) {
	      return parseInt(string.replace('px', ''));
	    },

	    toSnakeCase: function toSnakeCase(text) {
	      return text.replace(/\s/g, '_');
	    },

	    toWhiteSpace: function toWhiteSpace(text) {
	      return text.replace(/_/g, ' ');
	    },

	    ajax: function ajax(url, type, data) {
	      $.ajax({
	        type: type,
	        url: url,
	        beforeSend: function beforeSend(xhr) {
	          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
	        },
	        data: data,
	        success: function success(result) {
	          if (result.error == 'true') {
	            alert('An error occurred: ' & result.errorMessage);
	          }
	        },
	        error: function error(xhr, ajaxOptions, thrownError) {
	          console.log(thrownError);
	        }
	      });
	    },

	    getUrl: function getUrl(url) {
	      return $.ajax({
	        url: url,
	        dataType: 'json',
	        error: function error(request, _error) {
	          console.log(' Can\'t do because: ' + _error);
	        }
	      });
	    },

	    windowSize: function windowSize() {
	      var docEl = document.documentElement,
	          bodyEl = document.getElementsByTagName('body')[0];

	      var width = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth,
	          height = window.innerHeight || docEl.clientHeight || bodyEl.clientHeight;

	      return { width: width, height: height };
	    },
	    selectElementContents: function selectElementContents(el) {
	      var range = document.createRange();
	      range.selectNodeContents(el);
	      var sel = window.getSelection();
	      sel.removeAllRanges();
	      sel.addRange(range);
	    }

	    //   getEm: function(selected){
	    //            return  parsePx($("html").css("font-size")) / parsePx(selected.style('font-size'))
	    //           }
	  };

	  return Utils;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (GraphCreator, utils) {

	  var windowSize = utils.windowSize;

	  var nodes = [];
	  var edges = [];

	  var svg = d3.select("body").append("svg").attr("width", windowSize().width).attr("height", windowSize().height);

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

	  return graph;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10), __webpack_require__(7), __webpack_require__(3), __webpack_require__(13), __webpack_require__(14), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (GraphCreator, graph, utils, Idea, Suggestions, View) {

	  var parsePx = utils.parsePx;
	  var getUrl = utils.getUrl;
	  var toWhiteSpace = utils.toWhiteSpace;

	  click_button("related_idol_wt", "en");
	  click_button("wiki_category", "en");
	  click_button("random", "en");
	  click_button("related_idol", "en");
	  click_button("flickr_tags", "en");
	  click_button("wordnik", "en");
	  click_button("user", "en");

	  function click_button(id, language) {
	    d3.select("#" + id + "-button").on("click", function () {
	      var selectedId = new Idea(graph).selectedId();
	      if (selectedId == null) {
	        return new View().noSelection();
	      }
	      new Suggestions(graph).create("#" + selectedId, id, language);
	    });
	  }

	  d3.select("#idea-plus").on("click", function () {
	    var idea = new Idea(graph);
	    var selectedId = idea.selectedId();
	    if (selectedId == null) {
	      return new View().noSelection();
	    }
	    idea.update(idea.change_size(1));
	  });

	  d3.select("#idea-minus").on("click", function () {
	    var idea = new Idea(graph);
	    var selectedId = idea.selectedId();
	    if (selectedId == null) {
	      return new View().noSelection();
	    }
	    idea.update(idea.change_size(-1));
	  });

	  d3.select("#close-wiki").on("click", function () {
	    new View().clearIframeTab();
	  });

	  d3.select("#show-instructions").on("click", function () {
	    var instructions = d3.select("#instructions");
	    if (instructions.classed("hidden")) {
	      instructions.classed("hidden", false);
	    } else {
	      instructions.classed("hidden", true);
	    }
	  });

	  d3.select("#mode-switch").on("click", function () {
	    var thisButton = d3.select("#creative-structured");
	    if (thisButton.text() == "Structured") {
	      thisButton.text("Creative");
	      d3.selectAll("circle").classed("transparent", true);
	      d3.selectAll("path").attr("stroke-dasharray", "0.5, 20");
	      d3.selectAll(".link").style("stroke-width", "3px");
	    } else {
	      thisButton.text("Structured");
	      d3.selectAll("circle").classed("transparent", false);
	      d3.selectAll("path").attr("stroke-dasharray", "");
	      d3.selectAll(".link").style("stroke-width", "10px");
	    }
	  });

	  function show_wiki(title, language) {
	    var url = "http://" + language + ".wikipedia.org/w/api.php?action=parse&redirects&prop=text&page=" + title + "&format=json&callback=?";
	    getUrl(url).done(function (data) {
	      if (data.error != undefined) {
	        d3.select("#alert").html("Not found");
	        d3.select(".wiki").classed("wiki-open", false);
	      } else {
	        d3.select(".wiki").classed("wiki-open", true).append("div");
	        var text = data.parse.text["*"];
	        d3.select(".wiki div").html(text);
	      };
	    });
	  }

	  function open_url(url) {
	    console.log("reg", url.search(/(^https*:\/\/)/));
	    if (url.search(/(^https*:\/\/)/) == -1) {
	      var url = "http://" + url;
	    }
	    console.log("url", url);
	    d3.select(".wiki").classed("url-open", true);
	    d3.select(".wiki").append("div").classed("url-title", true).html(url);
	    d3.select(".wiki").append("iframe").attr("src", url);
	  }

	  // d3.select('#squares').on("click", function(){
	  //   circles = d3.selectAll("circle");
	  //   parents = circles.select(function() { return this.parentNode; })
	  //   // circles.remove();
	  //   // <image xlink:href="firefox.jpg" x="0" y="0" height="50px" width="50px"/>
	  //   texts = parents.selectAll('text');
	  //   parents.append('rect').attr({'width':'100', 'height':'100', 'x':'-50', 'y':'-50' });
	  // });

	  d3.select("#open-url").on("click", function () {
	    new View().clearIframeTab();
	    var id = new Idea(graph).selectedId();
	    if (id == null) {
	      return new View().noSelection();
	    }

	    new View().clearAlert();
	    var d = new Idea(graph).find_by_id(id);
	    var type = d.concept_type;

	    switch (type) {
	      case "url":
	        open_url(d.title);
	        break;
	      case "concept":
	        show_wiki(d.title, "en");
	        break;
	      default:
	        console.log("undefined");
	    }
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(13), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (utils, Idea, Link) {

	  var parsePx = utils.parsePx;
	  var ajax = utils.ajax;
	  var toWhiteSpace = utils.toWhiteSpace;
	  var toSnakeCase = utils.toSnakeCase;
	  var windowSize = utils.windowSize;
	  var selectElementContents = utils.selectElementContents;

	  var GraphCreator = function GraphCreator(svg, nodes, edges) {
	    var thisGraph = this;
	    thisGraph.idct = 0;
	    thisGraph.idLink = 0;

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

	    defs.append('svg:linearGradient').attr('id', 'gradient').attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%').attr('spreadMethod', 'pad');

	    // Define the gradient colors
	    defs.append('svg:stop').attr('offset', '0%').attr('stop-color', '#a00000').attr('stop-opacity', 1);

	    defs.append('svg:stop').attr('offset', '100%').attr('stop-color', '#aaaa00').attr('stop-opacity', 1);

	    defs.append('svg:marker').attr('id', 'end-arrow').attr('viewBox', '0 -5 10 10').attr('refX', '32').attr('markerWidth', 3.5).attr('markerHeight', 3.5).attr('orient', 'auto').append('svg:path').attr('fill', '#ccc').attr('d', 'M0,-5L10,0L0,5');

	    // define arrow markers for leading arrow
	    defs.append('svg:marker').attr('id', 'mark-end-arrow').attr('viewBox', '0 -5 10 10').attr('refX', 7).attr('markerWidth', 3.5).attr('markerHeight', 3.5).attr('orient', 'auto').append('svg:path').attr('fill', '#ccc').attr('d', 'M0,-5L10,0L0,5');

	    thisGraph.svg = svg;
	    thisGraph.svgG = svg.append('g').classed(thisGraph.consts.graphClass, true);
	    // .attr('fill', "url(#gradient)" );
	    var svgG = thisGraph.svgG;

	    // displayed when dragging between nodes
	    thisGraph.dragLine = svgG.append('svg:path').attr('class', 'link dragline hidden').attr('d', 'M0,0L0,0')
	    // .attr("stroke-dasharray", '0.5,20')
	    .attr('stroke-linecap', 'round').style('marker-end', 'url(#mark-end-arrow)');

	    // svg nodes and edges
	    thisGraph.paths = svgG.append('g').selectAll('g');
	    thisGraph.circles = svgG.append('g').selectAll('g');

	    thisGraph.drag = d3.behavior.drag().origin(function (d) {
	      return { x: d.x, y: d.y };
	    }).on('drag', function (args) {
	      thisGraph.state.justDragged = true;
	      thisGraph.dragmove.call(thisGraph, args);
	    }).on('dragend', function () {});

	    // listen for key events
	    d3.select(window).on('keydown', function () {
	      thisGraph.svgKeyDown.call(thisGraph);
	    }).on('keyup', function () {
	      thisGraph.svgKeyUp.call(thisGraph);
	    });
	    svg.on('mousedown', function (d) {
	      thisGraph.svgMouseDown.call(thisGraph, d);
	    });
	    svg.on('mouseup', function (d) {
	      thisGraph.svgMouseUp.call(thisGraph, d);
	    });

	    // listen for dragging
	    var dragSvg = d3.behavior.zoom().on('zoom', function () {
	      if (d3.event.sourceEvent.shiftKey) {
	        // TODO  the internal d3 state is still changing
	        return false;
	      } else {
	        thisGraph.zoomed.call(thisGraph);
	      }
	      return true;
	    }).on('zoomstart', function () {
	      var ael = d3.select('#' + thisGraph.consts.activeEditId).node();
	      if (ael) {
	        ael.blur();
	      }
	      if (!d3.event.sourceEvent.shiftKey) d3.select('body').style('cursor', 'move');
	    }).on('zoomend', function () {
	      d3.select('body').style('cursor', 'auto');
	    });

	    svg.call(dragSvg).on('dblclick.zoom', null);

	    // listen for resize
	    window.onresize = function () {
	      thisGraph.updateWindow(svg);
	    };
	  };

	  GraphCreator.prototype.consts = {
	    selectedClass: 'selected',
	    connectClass: 'connect-node',
	    circleGClass: 'conceptG',
	    graphClass: 'graph',
	    activeEditId: 'editing',
	    BACKSPACE_KEY: 8,
	    DELETE_KEY: 46,
	    ENTER_KEY: 13,
	    nodeRadius: 50,
	    min_size: 14,
	    max_size: 154,
	    change: 30
	  };

	  GraphCreator.prototype.setIdCt = function (idct) {
	    this.idct = idct;
	  };

	  GraphCreator.prototype.setIdLink = function (idLink) {
	    this.idLink = idLink;
	  };

	  GraphCreator.prototype.position_first_idea = function () {
	    var thisGraph = this;
	    var first_idea = this.nodes[0];
	    if (first_idea.title == 'Idea') {
	      first_idea.x = windowSize().width / 2;
	      first_idea.y = windowSize().height / 2;
	      var idea = new Idea(thisGraph);
	      idea.update(first_idea);
	    };
	  };

	  GraphCreator.prototype.load_data = function () {
	    var thisGraph = this;
	    var graph_id = $('#window').attr('data-graph');
	    $.ajax({
	      type: 'GET',
	      contentType: 'application/json',
	      dataType: 'json',
	      url: 'ideas/',
	      beforeSend: function beforeSend(xhr) {
	        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
	      },
	      success: function success(result) {
	        thisGraph.initialize_ideas(result);
	      },
	      error: function error(xhr, ajaxOptions, thrownError) {
	        console.log(thrownError);
	      }
	    });
	  };

	  GraphCreator.prototype.initialize_ideas = function (jsonObj) {
	    var thisGraph = this,
	        state = thisGraph.state;
	    thisGraph.deleteGraph(true);
	    thisGraph.nodes = jsonObj.nodes;
	    thisGraph.setIdCt(jsonObj.nodes.length + 1);
	    thisGraph.position_first_idea();
	    var newEdges = jsonObj.edges;
	    newEdges.forEach(function (e, i) {
	      newEdges[i] = { source: thisGraph.nodes.filter(function (n) {
	          return n.id == e.source;
	        })[0],
	        target: thisGraph.nodes.filter(function (n) {
	          return n.id == e.target;
	        })[0],
	        id: e.id
	      };
	    });
	    thisGraph.edges = newEdges;
	    thisGraph.updateGraph();
	    thisGraph.nodes.forEach(function (d) {
	      if (d.font_size != 20) {
	        d3.select('#id' + d.id).style('font-size', d.font_size);
	      };
	    });
	  };

	  GraphCreator.prototype.dragmove = function (d) {
	    var thisGraph = this;
	    if (thisGraph.state.shiftNodeDrag) {
	      thisGraph.dragLine.attr('d', 'M' + d.x + ',' + d.y + 'L' + d3.mouse(thisGraph.svgG.node())[0] + ',' + d3.mouse(this.svgG.node())[1]);
	    } else {
	      d.x += d3.event.dx;
	      d.y += d3.event.dy;
	      thisGraph.updateGraph();
	    }
	  };

	  GraphCreator.prototype.deleteGraph = function (skipPrompt) {
	    var thisGraph = this,
	        doDelete = true;
	    if (!skipPrompt) {
	      doDelete = window.confirm('Press OK to delete this graph');
	    }
	    if (doDelete) {
	      thisGraph.nodes = [];
	      thisGraph.edges = [];
	      thisGraph.updateGraph();
	    }
	  };

	  /* select all text in element: taken from http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element */

	  /* insert svg line breaks: taken from http://stackoverflow.com/questions/13241475/how-do-i-include-newlines-in-labels-in-d3-charts */
	  GraphCreator.prototype.insertTitleLinebreaks = function (gEl, title) {
	    var words = title.split(/\s+/g),
	        nwords = words.length;
	    var el = gEl.append('text').attr('text-anchor', 'middle').attr('dy', '-' + (nwords - 1) * 7.5);

	    for (var i = 0; i < words.length; i++) {
	      var tspan = el.append('tspan').text(words[i]);
	      if (i > 0) tspan.attr('x', 0).attr('dy', '15');
	    }
	  };

	  // remove edges associated with a node
	  GraphCreator.prototype.spliceLinksForNode = function (node) {
	    var thisGraph = this,
	        toSplice = thisGraph.edges.filter(function (l) {
	      return l.source === node || l.target === node;
	    });
	    toSplice.map(function (l) {
	      thisGraph.edges.splice(thisGraph.edges.indexOf(l), 1);
	    });
	  };

	  GraphCreator.prototype.replaceSelectEdge = function (d3Path, edgeData) {
	    var thisGraph = this;
	    d3Path.classed(thisGraph.consts.selectedClass, true);
	    if (thisGraph.state.selectedEdge) {
	      thisGraph.removeSelectFromEdge();
	    }
	    thisGraph.state.selectedEdge = edgeData;
	  };

	  GraphCreator.prototype.replaceSelectNode = function (d3Node, nodeData) {
	    var thisGraph = this;
	    d3Node.classed(this.consts.selectedClass, true);
	    if (thisGraph.state.selectedNode) {
	      thisGraph.removeSelectFromNode();
	    }
	    thisGraph.state.selectedNode = nodeData;
	  };

	  GraphCreator.prototype.removeSelectFromNode = function () {
	    var thisGraph = this;
	    thisGraph.circles.filter(function (cd) {
	      return cd.id === thisGraph.state.selectedNode.id;
	    }).classed(thisGraph.consts.selectedClass, false);
	    thisGraph.state.selectedNode = null;
	  };

	  GraphCreator.prototype.removeSelectFromEdge = function () {
	    var thisGraph = this;
	    thisGraph.paths.filter(function (cd) {
	      return cd === thisGraph.state.selectedEdge;
	    }).classed(thisGraph.consts.selectedClass, false);
	    thisGraph.state.selectedEdge = null;
	  };

	  GraphCreator.prototype.pathMouseDown = function (d3path, d) {
	    var thisGraph = this,
	        state = thisGraph.state;
	    d3.event.stopPropagation();
	    state.mouseDownLink = d;

	    if (state.selectedNode) {
	      thisGraph.removeSelectFromNode();
	    }

	    var prevEdge = state.selectedEdge;
	    if (!prevEdge || prevEdge !== d) {
	      thisGraph.replaceSelectEdge(d3path, d);
	    } else {
	      thisGraph.removeSelectFromEdge();
	    }
	  };

	  // mousedown on node
	  GraphCreator.prototype.circleMouseDown = function (d3node, d) {
	    var thisGraph = this,
	        state = thisGraph.state;
	    d3.event.stopPropagation();
	    state.mouseDownNode = d;
	    if (d3.event.shiftKey) {
	      state.shiftNodeDrag = d3.event.shiftKey;
	      // reposition dragged directed edge
	      thisGraph.dragLine.classed('hidden', false).attr('d', 'M' + d.x + ',' + d.y + 'L' + d.x + ',' + d.y);
	      return;
	    }
	  };

	  // mouseup on nodes
	  GraphCreator.prototype.circleMouseUp = function (d3node, d) {
	    var thisGraph = this,
	        state = thisGraph.state,
	        consts = thisGraph.consts;
	    // reset the states
	    state.shiftNodeDrag = false;
	    d3node.classed(consts.connectClass, false);

	    var mouseDownNode = state.mouseDownNode;

	    if (!mouseDownNode) return;

	    thisGraph.dragLine.classed('hidden', true);

	    if (mouseDownNode !== d) {
	      // we're in a different node: create new edge for mousedown edge and add to graph
	      var newEdge = { source: mouseDownNode, target: d, id: 0 };
	      var existing_link = thisGraph.edges.map(function (link) {
	        if (link.target.id == newEdge.source.id && link.source.id == newEdge.target.id || link.target.id == newEdge.target.id && link.source.id == newEdge.source.id) {
	          return false;
	        }
	      });
	      if (existing_link.indexOf(false) == -1) {
	        new Link(thisGraph).create(mouseDownNode, d, thisGraph.idLink++);
	      }
	    } else {
	      // we're in the same node
	      if (state.justDragged) {
	        // dragged, not clicked
	        var idea = new Idea(thisGraph);
	        idea.update(d);
	        state.justDragged = false;
	      } else {
	        // clicked, not dragged
	        if (d3.event.shiftKey) {
	          // shift-clicked node: edit text content
	          var idea = new Idea(thisGraph);
	          var d3txt = idea.changeText(d3node, d);
	          var txtNode = d3txt.node();
	          selectElementContents(txtNode);
	          txtNode.focus();
	        } else {
	          if (state.selectedEdge) {
	            thisGraph.removeSelectFromEdge();
	          }
	          var prevNode = state.selectedNode;

	          if (!prevNode || prevNode.id !== d.id) {
	            thisGraph.replaceSelectNode(d3node, d);
	          } else {
	            thisGraph.removeSelectFromNode();
	          }
	        }
	      }
	    }
	    thisGraph.selected = d3node;
	    state.mouseDownNode = null;
	    return;
	  }; // end of circles mouseup

	  // mousedown on main svg
	  GraphCreator.prototype.svgMouseDown = function () {
	    this.state.graphMouseDown = true;
	  };

	  // mouseup on main svg
	  GraphCreator.prototype.svgMouseUp = function () {
	    var thisGraph = this,
	        state = thisGraph.state;
	    if (state.justScaleTransGraph) {
	      // dragged not clicked
	      state.justScaleTransGraph = false;
	    } else if (state.graphMouseDown && d3.event.shiftKey) {
	      // clicked not dragged from svg
	      var xycoords = d3.mouse(thisGraph.svgG.node());
	      var idea = new Idea(thisGraph);
	      var d = { title: 'new_idea', x: xycoords[0], y: xycoords[1], font_size: 20, type: 'concept' };
	      idea.create(d).done(function (data) {
	        var d = data;
	        var tempIdea = new Idea(thisGraph);
	        var d3txt = tempIdea.changeText(thisGraph.circles.filter(function (dval) {
	          return dval.id === d.id;
	        }), d);
	        var txtNode = d3txt.node();
	        selectElementContents(txtNode);
	        txtNode.focus();
	      });

	      // make title of text immediently editable
	    } else if (state.shiftNodeDrag) {
	      // dragged from node
	      state.shiftNodeDrag = false;
	      thisGraph.dragLine.classed('hidden', true);
	    }
	    state.graphMouseDown = false;
	  };

	  // keydown on main svg
	  GraphCreator.prototype.svgKeyDown = function () {
	    var thisGraph = this,
	        state = thisGraph.state,
	        consts = thisGraph.consts;
	    // make sure repeated key presses don't register for each keydown
	    if (state.lastKeyDown !== -1) return;

	    state.lastKeyDown = d3.event.keyCode;
	    var selectedNode = state.selectedNode,
	        selectedEdge = state.selectedEdge;

	    switch (d3.event.keyCode) {
	      case consts.BACKSPACE_KEY:
	      case consts.DELETE_KEY:
	        d3.event.preventDefault();
	        if (selectedNode) {
	          new Idea(thisGraph)['delete'](selectedNode, state);
	        } else if (selectedEdge) {
	          new Link(thisGraph)['delete'](selectedEdge);
	          state.selectedEdge = null;
	          thisGraph.updateGraph();
	        }
	        break;
	    }
	  };

	  GraphCreator.prototype.svgKeyUp = function () {
	    this.state.lastKeyDown = -1;
	  };

	  // call to propagate changes to graph
	  GraphCreator.prototype.updateGraph = function () {
	    var thisGraph = this,
	        consts = thisGraph.consts,
	        state = thisGraph.state;

	    thisGraph.paths = thisGraph.paths.data(thisGraph.edges, function (d) {
	      return String(d.source.id) + '+' + String(d.target.id);
	    });
	    var paths = thisGraph.paths;
	    // update existing paths
	    paths.style('marker-end', 'url(#end-arrow)').classed(consts.selectedClass, function (d) {
	      return d === state.selectedEdge;
	    }).attr('d', function (d) {
	      return 'M' + d.source.x + ',' + d.source.y + 'L' + d.target.x + ',' + d.target.y;
	    });

	    // add new paths
	    paths.enter().append('path').style('marker-end', 'url(#end-arrow)').classed('link', true).attr('stroke-linecap', 'round').attr('d', function (d) {
	      return 'M' + d.source.x + ',' + d.source.y + 'L' + d.target.x + ',' + d.target.y;
	    }).on('mousedown', function (d) {
	      thisGraph.pathMouseDown.call(thisGraph, d3.select(this), d);
	    }).on('mouseup', function (d) {
	      state.mouseDownLink = null;
	    });

	    // remove old links
	    paths.exit().remove();
	    // update existing nodes
	    thisGraph.circles = thisGraph.circles.data(thisGraph.nodes, function (d) {
	      return d.id;
	    });
	    thisGraph.circles.attr('transform', function (d) {
	      return 'translate(' + d.x + ',' + d.y + ')';
	    });

	    // add new nodes
	    var newGs = thisGraph.circles.enter().append('g');

	    newGs.classed(consts.circleGClass, true).attr('transform', function (d) {
	      return 'translate(' + d.x + ',' + d.y + ')';
	    }).on('mouseover', function (d) {
	      if (state.shiftNodeDrag) {
	        d3.select(this).classed(consts.connectClass, true);
	      }
	    }).on('mouseout', function (d) {
	      d3.select(this).classed(consts.connectClass, false);
	    }).on('mousedown', function (d) {
	      thisGraph.circleMouseDown.call(thisGraph, d3.select(this), d);
	    }).on('mouseup', function (d) {
	      thisGraph.circleMouseUp.call(thisGraph, d3.select(this), d);
	    }).call(thisGraph.drag);

	    newGs.append('circle').attr('r', String(consts.nodeRadius));

	    // newGs.append("rect")
	    //   .attr("width", String(consts.nodeRadius))
	    //   .attr("height", String(consts.nodeRadius));

	    // title and  id into ideas
	    newGs.each(function (d) {
	      thisGraph.insertTitleLinebreaks(d3.select(this), d.title);
	    }).attr('id', function (d) {
	      return 'id' + d.id;
	    });

	    // remove old nodes
	    thisGraph.circles.exit().remove();
	  };

	  GraphCreator.prototype.zoomed = function () {
	    this.state.justScaleTransGraph = true;
	    d3.select('.' + this.consts.graphClass).attr('transform', 'translate(' + d3.event.translate + ') scale(' + d3.event.scale + ')');
	  };

	  GraphCreator.prototype.updateWindow = function (svg) {
	    var docEl = document.documentElement,
	        bodyEl = document.getElementsByTagName('body')[0];
	    var x = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth;
	    var y = window.innerHeight || docEl.clientHeight || bodyEl.clientHeight;
	    svg.attr('width', x).attr('height', y);
	  };

	  return GraphCreator;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	// todo check if edge-mode is selected

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (utils, View) {

	  var toWhiteSpace = utils.toWhiteSpace;
	  var ajax = utils.ajax;

	  var Link = function Link(graph) {
	    this.graph = graph;
	  };

	  Link.prototype.create = function (idea_one, idea_two, id) {
	    var graph = this.graph;
	    this.save(idea_one, idea_two, id).done(function (data, errors) {
	      var newEdge = { source: idea_one, target: idea_two, id: data.id };
	      graph.edges.push(newEdge);
	      graph.updateGraph();
	    });
	  };

	  Link.prototype.save = function (idea_one, idea_two, id) {
	    return $.ajax({
	      type: "POST",
	      url: "links/",
	      beforeSend: function beforeSend(xhr) {
	        xhr.setRequestHeader("X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content"));
	      },
	      data: { link: { idea_a_id: idea_one.id, idea_b_id: idea_two.id } },
	      dataType: "json",
	      success: function success(result) {
	        return result;
	      },
	      error: function error(xhr, ajaxOptions, thrownError) {
	        console.log(thrownError);
	      }
	    });
	  };

	  Link.prototype["delete"] = function (selectedEdge) {
	    var graph = this.graph;
	    var link_index = graph.edges.indexOf(selectedEdge);
	    graph.edges.splice(link_index, 1);
	    ajax("links/" + selectedEdge.id, "DELETE");
	  };

	  return Link;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (GraphCreator, graph, utils, Idea) {

	  var View = function View() {};

	  View.prototype.clearAlert = function () {
	    d3.select('#alert').text('');
	  };

	  View.prototype.noSelection = function () {
	    d3.select('#alert').text('Please select an Idea first');
	  };

	  View.prototype.clearIframeTab = function () {
	    d3.select('.wiki').classed('wiki-open', false).classed('url-open', false);
	    d3.select('.url-title').remove();
	    d3.select('.wiki iframe').remove();
	    d3.select('.wiki div').html('');
	  };

	  return View;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function (utils, View) {

	  var toWhiteSpace = utils.toWhiteSpace;
	  var ajax = utils.ajax;
	  var parsePx = utils.parsePx;

	  var Idea = function Idea(graph) {
	    this.graph = graph;
	  };

	  Idea.prototype.create = function (d) {
	    var graph = this.graph;
	    return this.save(d).done(function (data, errors) {
	      d = {
	        id: data.id,
	        title: toWhiteSpace(d.title),
	        x: data.x,
	        y: data.y,
	        font_size: data.font_size,
	        type: d.type
	      };
	      graph.nodes.push(d);
	      graph.updateGraph();
	      return d;
	    });
	  };

	  Idea.prototype.save = function (d) {
	    return $.ajax({
	      type: "POST",
	      url: "ideas/",
	      beforeSend: function beforeSend(xhr) {
	        xhr.setRequestHeader("X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content"));
	      },
	      data: { idea: { id: d.id, x: d.x, y: d.y, font_size: d.font_size, concept_title: d.title } },
	      dataType: "json",
	      success: function success(result) {
	        if (result.error == "true") {
	          alert("An error occurred: " & result.errorMessage);
	          return result;
	        }
	      },
	      error: function error(xhr, ajaxOptions, thrownError) {
	        console.log(thrownError);
	      }
	    });
	  };

	  Idea.prototype.changeText = function (d3node, d) {
	    var graph = this.graph,
	        idea = this,
	        constants = graph.consts,
	        htmlEl = d3node.node();
	    d3node.selectAll("text").remove();
	    var nodeBCR = htmlEl.getBoundingClientRect(),
	        curScale = nodeBCR.width / constants.nodeRadius,
	        placePad = 5 * curScale,
	        useHW = curScale > 1 ? nodeBCR.width * 0.71 : constants.nodeRadius * 1.42;
	    var d3txt = graph.svg.selectAll("foreignObject").data([d]).enter().append("foreignObject").attr("x", nodeBCR.left + placePad).attr("y", nodeBCR.top + placePad).attr("height", 2 * useHW).attr("width", useHW).append("xhtml:p").attr("id", constants.activeEditId).attr("contentEditable", "true").text(d.title).on("mousedown", function (d) {
	      d3.event.stopPropagation();
	    }).on("keydown", function (d) {
	      d3.event.stopPropagation();
	      if (d3.event.keyCode == constants.ENTER_KEY && !d3.event.shiftKey) {
	        this.blur();
	      }
	    }).on("blur", function (d) {
	      d.title = this.textContent;
	      d.type = findType(this.textContent);
	      idea.update_text(d3node, d, this);
	    });
	    return d3txt;
	  };

	  Idea.prototype.update_text = function (d3node, d, txt_tmp) {
	    var graph = this.graph,
	        thisIdea = this;
	    var htmlEl = d3node.node();
	    var idea = thisIdea.find_by_id(d.id);
	    idea.title = d.title;
	    idea.concept_type = d.type;
	    if (d.type == "url") {
	      insertUrl(d3node, d.title);
	    } else {
	      graph.insertTitleLinebreaks(d3node, d.title);
	    }

	    d3.select(txt_tmp.parentElement).remove();

	    d3.select(htmlEl).attr("id", "id" + d.id);
	    d3.select(htmlEl).attr("title", d.title);
	    thisIdea.update(d);
	  };

	  function insertUrl(gEl, title) {
	    var el = gEl.append("a").attr("href", title).attr("text-anchor", "middle");

	    var name = el.append("text").text(title);
	    name.attr("x", 0).attr("dy", "15");
	  };

	  function findType(title) {
	    var regexp_web = /([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
	    if (title.search(regexp_web) > -1) {
	      return "url";
	    } else {
	      return "concept";
	    }
	  }

	  Idea.prototype.update = function (d) {
	    $.ajax({
	      type: "PUT",
	      url: "ideas/" + d.id,
	      beforeSend: function beforeSend(xhr) {
	        xhr.setRequestHeader("X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content"));
	      },
	      data: { idea: { id: d.id, x: d.x, y: d.y, font_size: d.font_size, concept_title: d.title, concept_type: d.type } },
	      success: function success(result) {
	        if (result.error == "true") {
	          alert("An error occurred: " & result.errorMessage);
	          return result;
	        }
	      },
	      error: function error(xhr, ajaxOptions, thrownError) {
	        if (xhr.status == 422) {
	          console.log(thrownError);
	        };
	      }
	    });
	  };

	  Idea.prototype["delete"] = function (selectedNode, state) {
	    var graph = this.graph;
	    graph.nodes.splice(graph.nodes.indexOf(selectedNode), 1);
	    graph.spliceLinksForNode(selectedNode);
	    state.selectedNode = null;
	    graph.updateGraph();
	    ajax("ideas/" + selectedNode.id, "DELETE");
	  };

	  Idea.prototype.selectedId = function () {
	    var graph = this.graph;
	    if (graph.selected != undefined) {
	      return graph.selected.node().id.replace(/id/, "");
	    } else {
	      return null;
	    }
	  };

	  Idea.prototype.change_size = function (plus_minus) {
	    var graph = this.graph,
	        constants = graph.consts;
	    var selected = d3.select(".selected");
	    console.log(selected);
	    var size = parsePx(selected.style("font-size"));
	    var idea_font_size = parseInt(size + constants.change * plus_minus);
	    var circle = selected.select("circle");
	    var current_radius = parseInt(circle.attr("r"));
	    var tspans = selected.selectAll("tspan");
	    // var current_dy = parseInt(selected.select('tspan:nth-child(2)').attr('dy'));

	    if (size > constants.min_size && plus_minus == -1 || size < constants.max_size && plus_minus == 1) {
	      selected.style("font-size", idea_font_size + "px");
	      circle.attr("r", current_radius + constants.change * plus_minus);
	      // tspans.attr('dy', current_dy + constants.change * plus_minus);
	      idea = this.update_idea_size(selected, idea_font_size);
	      return idea;
	    }
	  };

	  Idea.prototype.update_idea_size = function (selected, idea_font_size) {
	    var graph = this.graph;
	    var selectedId = selected.node().id.replace(/id/, "");
	    var idea = this.find_by_id(selectedId);
	    idea.font_size = idea_font_size;
	    return idea;
	  };

	  Idea.prototype.find_by_title = function (title) {
	    var graph = this.graph;
	    var nodes = graph.nodes;
	    var idea = null;
	    $.each(nodes, function (index, value) {
	      if (value["title"] == title) {
	        return idea = value;
	      }
	    });
	    return idea;
	  };

	  Idea.prototype.find_by_id = function (id) {
	    var graph = this.graph;
	    var nodes = graph.nodes;
	    var idea = null;
	    $.each(nodes, function (index, value) {
	      if (value["id"] == id) {
	        return idea = value;
	      }
	    });
	    return idea;
	  };

	  Idea.prototype.find_title_by_id = function (id) {
	    return this.find_by_id(id)["title"];
	  };

	  return Idea;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(13), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Utils, Idea, Link) {

	  var getUrl = Utils.getUrl;
	  var toWhiteSpace = Utils.toWhiteSpace;

	  var Suggestions = function Suggestions(graph) {
	    this.graph = graph;
	  };

	  Suggestions.prototype.create = function (id, type, language) {
	    var graph = this.graph;
	    var clean_id = id.replace(/#/, "");
	    var id = "#id" + clean_id;
	    var selectedIdea = new Idea(graph).find_by_id(clean_id);
	    var title = selectedIdea.title;
	    fetch_suggestions(type, title, language).done(function (data, errors) {
	      var data_b = data_base(data, type);
	      if (data_b == undefined || data_b.length == 0) {
	        d3.select("#alert").text("Term not found");
	      }

	      var translate = d3.select(id).attr("transform");
	      var parent = translate.match(/\((.+),(.+)\)/);
	      var parent_left = parseInt(parent[1]);
	      var parent_top = parseInt(parent[2]);
	      var bias = 300;
	      var duration_in = 2000;
	      var duration = 6000;
	      console.log("delay", random_delay());

	      var new_concept = d3.select(".graph").selectAll("g." + data.title).data(data_b);

	      new_concept.enter().append("g").attr("class", "concept random").attr("transform", function (data) {
	        var l = random_left(parent_left, bias);
	        var t = random_top(parent_top, bias);
	        return "translate(" + l + "," + t + ")";
	      }).style("font-size", function (data) {
	        return random_font_size();
	      }).attr("id", function (data) {
	        return data_title(data, type);
	      }).on("click", function () {
	        var transform = d3.select(this).attr("transform");
	        var translate = d3.transform(transform).translate;
	        var idea = new Idea(graph);
	        var d = { title: toWhiteSpace(d3.select(this).attr("id")), x: translate[0], y: translate[1], font_size: 20, type: "concept" };
	        idea.create(d).done(function (data) {
	          new Link(graph).create(selectedIdea, new Idea(graph).find_by_id(data.id), graph.idLink++);
	        });
	        d3.select(this).remove();
	      }).append("text").append("tspan").text(function (data) {
	        return data_title(data, type);
	      });
	      if (type == "user") {
	        new_concept.selectAll("text").style("fill", "lightblue");
	        new_concept.selectAll("text").append("tspan").style({ "fill": "white", "font-size": "0.5em" }).attr("dy", "1em").attr("x", "0").text(function (data) {
	          return data.user;
	        });
	      }
	      var anim_concept = new_concept.transition().delay(random_delay).duration(duration_in).style({ "opacity": "1" }).transition().duration(duration);

	      var dead_concept = anim_concept.style({ "opacity": "0" }).duration(duration).attr("data-status", "dead").remove();
	    });
	  };

	  function getMatches(title) {
	    return $.ajax({
	      type: "GET",
	      contentType: "application/json",
	      dataType: "json",
	      url: "/matches/" + title,
	      beforeSend: function beforeSend(xhr) {
	        xhr.setRequestHeader("X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content"));
	      },
	      success: function success(result) {},
	      error: function error(xhr, ajaxOptions, thrownError) {
	        console.log(thrownError);
	      }
	    });
	  }

	  function random_sign() {
	    return Math.random() < 0.5 ? -1 : 1;
	  };

	  function random_delay() {
	    return Math.random() * 2000;
	  }; // delay 0 to 2000

	  function random_top(parent_top, bias) {
	    return parseInt(parent_top + Math.random() * bias * random_sign());
	  }; // top parent + 100 + (0 to bias * sign)

	  function random_left(parent_left, bias) {
	    return parent_left + Math.random() * bias * random_sign();
	  }; // left parent + 100 + 0 to bias * sign

	  function random_font_size() {
	    return parseInt(Math.random() * 3 + 0.3) + "em";
	  }; // 0.1 to 3 em

	  function fetch_suggestions(type, title, language) {

	    var url = "";
	    switch (type) {
	      case "random":
	        url = "http://" + language + ".wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=10&iwurl=&redirects=&converttitles=&format=json&callback=?";
	        break;
	      case "related_idol":
	        url = "https://api.idolondemand.com/1/api/sync/findrelatedconcepts/v1?text=" + title + "&indexes=&min_score=80&apikey=a4d88be8-aee2-40c3-9a02-dce7f749f01a";
	        break;
	      case "related_idol_wt":
	        url = "https://api.idolondemand.com/1/api/sync/getparametricvalues/v1?index=wiki_es&field_name=wikipedia_type&text=" + title + "&apikey=a4d88be8-aee2-40c3-9a02-dce7f749f01a";
	        break;
	      case "wiki_category":
	        url = "http://" + language + ".wikipedia.org/w/api.php?action=query&prop=categories&redirects&titles=" + title + "&format=json&callback=?";
	        break;
	      case "flickr_tags":
	        url = "https://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=46649a4365f1ea733e08c79954e4e55e&tag=" + title + "&format=json&nojsoncallback=1";
	        break;
	      case "wordnik":
	        url = "http://api.wordnik.com:80/v4/word.json/" + title + "/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	        break;
	      case "user":
	        return getMatches(title);
	        break;
	    }

	    return getUrl(url);
	  }

	  function data_title(data, type) {
	    switch (type) {
	      case "random":
	        return data.title;
	      case "related_idol":
	        return data.text;
	      case "wiki_category":
	        return data.title.replace(/Category:/, "");
	      case "related_idol_wt":
	        return data;
	      case "flickr_tags":
	        return data._content;
	      case "user":
	        return data.title;
	        break;
	      default:
	        console.log("title not found");
	    }
	  };

	  function data_base(data, type) {
	    switch (type) {
	      case "random":
	        return data.query.random;
	        break;
	      case "related_idol":
	        return data.entities;
	        break;
	      case "related_idol_wt":
	        return d3.keys(data.wikipedia_type);
	        break;
	      case "wiki_category":
	        return d3.values(data.query.pages)[0].categories;
	        break;
	      case "flickr_tags":
	        if (data.stat == "fail") {
	          console.log(data.message);
	        } else {
	          return data.tags.tag;
	        }
	        break;
	      case "wordnik":
	        console.log(data);
	        break;
	      case "user":
	        return data;
	        break;
	      default:
	        console.log("base not found");
	    }
	  }

	  return Suggestions;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ]);