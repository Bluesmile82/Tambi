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

	  __webpack_require__(1);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(7), __webpack_require__(3), __webpack_require__(4), __webpack_require__(8), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (GraphCreator, graph, utils, Idea, Suggestions, View) {

	  var parsePx = utils.parsePx;
	  var getUrl = utils.getUrl;
	  var toWhiteSpace = utils.toWhiteSpace;
	  var ajax = utils.ajax;
	  var windowSize = utils.windowSize;

	  // $('#myModal').modal({ show: false})

	  click_button("related_idol_wt", "en");
	  click_button("wiki_category", "en");
	  click_button("random", "en");
	  click_button("related_idol", "en");
	  click_button("pinterest", "en");
	  click_button("youtube", "en");
	  click_button("user", "en");
	  click_button("synonym", "en");
	  click_button("related-wordnik", "en");
	  // click_button('google_images', 'en');
	  // click_button('flickr_tags', 'en');

	  function click_button(id, language) {
	    d3.select("#" + id + "-button").on("click", function () {
	      var selectedId = new Idea(graph).selectedId();
	      if (selectedId == null) {
	        return new View().noSelection();
	      }
	      new Suggestions(graph).create("#" + selectedId, id, language);
	    });
	  }

	  function selectId() {
	    var idea = new Idea(graph);
	    var selectedId = idea.selectedId();
	    if (selectedId == null) {
	      return new View().noSelection();
	    }
	    return selectedId;
	  }

	  d3.select(".modal-header .close").on("click", function () {
	    d3.select(".modal-content iframe").remove();
	    d3.select(".modal-title").html("Without parent");
	  });

	  d3.select("#open-canvas").on("click", function () {
	    var parent_id = new Idea(graph).find_by_id(selectId()).parent_id;
	    ajax("redirect_to/" + parent_id, "GET", "json").done(function (data) {
	      d3.select(".modal-content").append("iframe").attr("src", data.path);
	      d3.select(".modal-title").html(data.graph.title + " by " + data.user);
	    });
	  });

	  d3.select("#center-tambi").on("click", function () {
	    graph.consts.translate = [0, 0];
	    graph.dragSvg.translate([0, 0]);
	    updateGraphTransform();
	  });

	  // hotkeys

	  $("body").on("keydown", function (event) {
	    // console.log(event.which);
	    // event.preventDefault();
	    switch (event.which) {
	      case 83:
	        // s
	        $("#search").click();
	        break;
	      case 70:
	        // f
	        $("#focus").click();
	        break;
	      case 65:
	        // a
	        $(".fa-magic").click();
	        break;
	      case 73:
	        // i
	        $(".fa-info-circle").click();
	        break;
	      case 32:
	        // space
	        event.preventDefault();
	        $("#open-url").click();
	        break;
	      case 67:
	        // c
	        event.preventDefault();
	        $("#add-text").click();
	        break;
	      // case 107: // +
	      //   $('#idea-plus').click();
	      // break;
	      // case 109: // -
	      //   $('#idea-minus').click();
	      // break;
	      case 49:
	        // 1
	        $("#random-button").click();
	        break;
	      case 50:
	        // 2
	        $("#related_idol-button").click();
	        break;
	      case 51:
	        // 3
	        $("#wiki_category-button").click();
	        break;
	      case 52:
	        // 4
	        $("#user-button").click();
	        break;
	      case 53:
	        // 5
	        $("#pinterest-button").click();
	        break;
	      case 54:
	        // 6
	        $("#youtube-button").click();
	        break;
	      case 55:
	        // 7
	        $("#synonym-button").click();
	        break;
	      case 56:
	        // 8
	        $("#related-wordnik-button").click();
	        break;
	    }
	  });

	  var durationDiv = document.getElementById("duration");
	  if (durationDiv != null) {
	    durationDiv.addEventListener("change", function () {
	      var selected = this.value;
	      $("#duration-label").text(parseInt(selected / 1000) + "secs");
	      graph.consts.duration = selected;
	    });
	  }

	  var delayDiv = document.getElementById("delay");
	  if (delayDiv != null) {
	    delayDiv.addEventListener("change", function () {
	      var selected = this.value;
	      $("#delay-label").text(parseInt(selected / 1000) + "secs");
	      graph.consts.delay = selected;
	    });
	  }

	  var zoomDiv = document.getElementById("zoom");
	  if (zoomDiv != null) {
	    zoomDiv.addEventListener("change", function () {
	      var selected = this.value;
	      $("#zoom-label").text(parseInt(selected * 100) + "%");
	      graph.consts.zoom = selected;
	      graph.dragSvg.scale(selected);
	      updateGraphTransform();
	    });
	  }

	  function updateGraphTransform() {
	    d3.select("." + graph.consts.graphClass).attr("transform", "translate(" + graph.consts.translate + ") scale(" + graph.consts.zoom + ")");
	  }

	  // document.getElementById('in').addEventListener('change', function() {
	  //         var selected = this.value;
	  //         $('#in-label').text(parseInt(selected / 1000) + 'secs');
	  //         graph.consts.duration_in = selected;
	  // });

	  d3.select("svg").on("click", function () {
	    new View().clearIframeTab();
	  });

	  d3.select("#add-text").on("click", function () {
	    var idea = new Idea(graph);
	    var selectedId = idea.selectedId();
	    if (selectedId == null) {
	      return new View().noSelection();
	    }
	    idea.createLongText(selectedId);
	  });

	  d3.select("#focus").on("click", function () {
	    var navbar = d3.select(".navbar-wagon");
	    if (navbar.classed("hidden") == true) {
	      navbar.classed("hidden", false);
	    } else {
	      navbar.classed("hidden", true);
	    }
	  });

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

	  d3.select("#close-instructions").on("click", function () {
	    var instructions = d3.select("#instructions");
	    instructions.classed("hidden", true);
	  });

	  d3.select("#close-toolbox").on("click", function () {
	    var instructions = d3.select("#toolbox");
	    instructions.classed("hidden", true);
	  });

	  d3.select("#open-toolbox").on("click", function () {
	    var toolbox = d3.select("#toolbox");
	    if (toolbox.classed("hidden")) {
	      toolbox.classed("hidden", false);
	    } else {
	      toolbox.classed("hidden", true);
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
	    if (url.search(/(^https*:\/\/)/) == -1) {
	      var url = "http://" + url;
	    }
	    console.log("url", url);
	    d3.select(".wiki").classed("url-open", true);
	    d3.select(".wiki").append("div").classed("url-title", true).html(url);
	    d3.select(".wiki").append("iframe").attr("src", url);
	  }

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
	      case "concept":
	      case "text":
	        open_url("http://en.wikipedia.org/wiki/" + d.title);
	        break;
	      case "url":
	        open_url(d.title);
	        break;
	      case "image":
	        open_url(d.title);
	        break;
	      default:
	        console.log("concept_type", d.concept_type);
	    }
	  });

	  d3.select("#search").on("click", function () {
	    new View().clearIframeTab();
	    var id = new Idea(graph).selectedId();
	    var d = new Idea(graph).find_by_id(id);
	    var title = "";
	    if (id !== null) {
	      title = d.title;
	    }
	    open_url("http://duckduckgo.com/" + title);
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (utils, Idea, Link) {

	  var parsePx = utils.parsePx;
	  var ajax = utils.ajax;
	  var toWhiteSpace = utils.toWhiteSpace;
	  var toSnakeCase = utils.toSnakeCase;
	  var windowSize = utils.windowSize;
	  var selectElementContents = utils.selectElementContents;

	  var GraphCreator = function GraphCreator(svg, nodes, edges, permission) {
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

	    defs.append('svg:linearGradient').attr('id', 'gradient').attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%').attr('spreadMethod', 'pad');

	    // Define the gradient colors
	    defs.append('svg:stop').attr('offset', '0%').attr('stop-color', '#a00000').attr('stop-opacity', 1);

	    defs.append('svg:stop').attr('offset', '100%').attr('stop-color', '#aaaa00').attr('stop-opacity', 1);

	    defs.append('svg:marker').attr('id', 'end-arrow').attr('viewBox', '0 -5 10 10').attr('refX', 22).attr('markerWidth', 3.5).attr('markerHeight', 3.5).attr('orient', 'auto').append('svg:path').attr('fill', '#BEFFFF').attr('d', 'M0,-5L10,0L0,5');

	    // define arrow markers for leading arrow
	    defs.append('svg:marker').attr('id', 'mark-end-arrow').attr('viewBox', '0 -5 10 10').attr('refX', 7).attr('markerWidth', 3.5).attr('markerHeight', 3.5).attr('orient', 'auto').append('svg:path').attr('fill', '#BEFFFF').attr('d', 'M0,-5L10,0L0,5');

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
	    thisGraph.ideas = svgG.append('g').selectAll('g');

	    thisGraph.drag = d3.behavior.drag().origin(function (d) {
	      return { x: d.x, y: d.y };
	    }).on('drag', function (args) {
	      thisGraph.state.justDragged = true;
	      thisGraph.dragmove.call(thisGraph, args);
	    }).on('dragend', function () {});

	    if (thisGraph.permission == 'false') {
	      thisGraph.drag.on('drag', null);
	    }
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
	    // var dragSvg = d3.behavior.zoom();
	    // d3.select('.graph').call(dragSvg);

	    thisGraph.dragSvg = d3.behavior.zoom().on('zoom', function () {
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

	    svg.call(thisGraph.dragSvg).on('dblclick.zoom', null);

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
	    change: 30,
	    bias: 300,
	    duration_in: 1000,
	    duration: 10000,
	    delay: 5000
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
	    thisGraph.ideas.filter(function (cd) {
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

	    if (mouseDownNode !== d && thisGraph.permission != 'false') {
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
	      if (state.justDragged && thisGraph.permission != 'false') {
	        // dragged, not clicked
	        var idea = new Idea(thisGraph);
	        idea.update(d);
	        state.justDragged = false;
	      } else {
	        // clicked, not dragged
	        if (d3.event.shiftKey && thisGraph.permission != 'false') {
	          // shift-clicked node: edit text content
	          thisGraph.interactionEditTextContent(d3node, d);
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
	  }; // end of ideas mouseup

	  // mousedown on main svg
	  GraphCreator.prototype.svgMouseDown = function () {
	    this.state.graphMouseDown = true;
	  };

	  GraphCreator.prototype.interactionEditTextContent = function (d3node, d) {
	    var thisGraph = this;
	    var d3txt = new Idea(thisGraph).changeText(d3node, d);
	    var txtNode = d3txt.node();
	    selectElementContents(txtNode);
	    txtNode.focus();
	  };

	  GraphCreator.prototype.interactionCreateIdea = function () {
	    var thisGraph = this;
	    var xycoords = d3.mouse(thisGraph.svgG.node());
	    var idea = new Idea(thisGraph);
	    var d = { title: 'new_idea', x: xycoords[0], y: xycoords[1], font_size: 20, concept_type: 'concept', parent_id: null };
	    idea.create(d).done(function (data) {
	      var d = data;
	      var d3txt = idea.changeText(thisGraph.ideas.filter(function (dval) {
	        return dval.id === d.id;
	      }), d);
	      var txtNode = d3txt.node();
	      selectElementContents(txtNode);
	      txtNode.focus();
	      // return d
	    });
	  };

	  // mouseup on main svg
	  GraphCreator.prototype.svgMouseUp = function () {
	    var thisGraph = this,
	        state = thisGraph.state;
	    if (state.justScaleTransGraph) {
	      // dragged not clicked
	      state.justScaleTransGraph = false;
	    } else if (state.graphMouseDown && d3.event.shiftKey && thisGraph.permission != 'false') {
	      // clicked not dragged from svg
	      thisGraph.interactionCreateIdea();
	      // make title of text immediently editable
	    } else if (state.shiftNodeDrag && thisGraph.permission != 'false') {
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
	        if (selectedNode && thisGraph.permission != 'false') {
	          new Idea(thisGraph)['delete'](selectedNode, state);
	        } else if (selectedEdge && thisGraph.permission != 'false') {
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

	  GraphCreator.prototype.updateLinks = function (paths) {
	    var constants = this.consts;
	    var state = this.state;
	    paths.style('marker-end', 'url(#end-arrow)').classed(constants.selectedClass, function (d) {
	      return d === state.selectedEdge;
	    }).attr('d', function (d) {
	      return 'M' + d.source.x + ',' + d.source.y + 'L' + d.target.x + ',' + d.target.y;
	    });
	  };

	  GraphCreator.prototype.addNewLinks = function (paths) {
	    var thisGraph = this;
	    var constants = this.consts;
	    var state = this.state;
	    paths.enter().append('path').style('marker-end', 'url(#end-arrow)').classed('link', true).attr('stroke-linecap', 'round').attr('d', function (d) {
	      return 'M' + d.source.x + ',' + d.source.y + 'L' + d.target.x + ',' + d.target.y;
	    }).on('mousedown', function (d) {
	      thisGraph.pathMouseDown.call(thisGraph, d3.select(this), d);
	    }).on('mouseup', function (d) {
	      state.mouseDownLink = null;
	    });
	  };

	  GraphCreator.prototype.updateGraph = function () {
	    console.log('updateGraph');
	    var thisGraph = this,
	        consts = thisGraph.consts,
	        state = thisGraph.state;

	    thisGraph.paths = thisGraph.paths.data(thisGraph.edges, function (d) {
	      return String(d.source.id) + '+' + String(d.target.id);
	    });
	    var paths = thisGraph.paths;
	    thisGraph.updateLinks(paths);
	    thisGraph.addNewLinks(paths);
	    paths.exit().remove();

	    thisGraph.ideas = thisGraph.ideas.data(thisGraph.nodes, function (d) {
	      return d.id;
	    });
	    thisGraph.ideas.attr('transform', function (d) {
	      return 'translate(' + d.x + ',' + d.y + ')';
	    });
	    thisGraph.reloadIdeas();
	    thisGraph.addNewIdeas();
	    thisGraph.ideas.exit().remove();
	  };

	  GraphCreator.prototype.reloadIdeas = function () {
	    var thisGraph = this;
	    var Ideas = thisGraph.ideas;
	    thisGraph.deleteIdeasShape(Ideas);
	    thisGraph.reloadIdeasShape(Ideas);
	  };

	  GraphCreator.prototype.deleteIdeasShape = function (Ideas) {
	    Ideas.selectAll('rect').remove();
	    Ideas.selectAll('circle').remove();
	    Ideas.selectAll('image').remove();
	    Ideas.selectAll('text').remove();
	  };

	  GraphCreator.prototype.reloadIdeasShape = function (Ideas) {
	    var thisGraph = this;
	    var idea = new Idea(thisGraph);
	    Ideas.each(function (d) {
	      var d3node = d3.select(this);
	      if (d.description != null && d.description != undefined && d.description != '') {
	        thisGraph.createDescriptionShape(d3node, d);
	      }
	      thisGraph.createIdeaShape(d3node, d);
	      idea.insertTitleLinebreaks(d3node, d.title, 2);
	      if (d.description != null && d.description != undefined && d.description != '') {
	        idea.insertDescription(d3node, d);
	      }
	      d3node.attr('id', function (d) {
	        return 'id' + d.id;
	      });
	    });
	  };

	  GraphCreator.prototype.addNewIdeas = function () {
	    var thisGraph = this,
	        consts = thisGraph.consts,
	        state = thisGraph.state;

	    var newIdeas = thisGraph.ideas.enter().append('g');

	    newIdeas.classed(consts.circleGClass, true).attr('transform', function (d) {
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

	    thisGraph.reloadIdeasShape(newIdeas);
	  };

	  GraphCreator.prototype.getTextMaxLenght = function (text, words_in_line) {
	    var words = text.split(/\s+/g),
	        nwords = words.length;
	    var max = 0;
	    for (var i = 0; i < words.length; i += words_in_line) {
	      lineLenght = words.slice(i, i + words_in_line).join().length;
	      if (lineLenght > max) {
	        max = lineLenght;
	      };
	    }
	    return max;
	  };

	  GraphCreator.prototype.getDivMaxLenght = function (text, words_in_line) {
	    text = text.replace(/<div>/g, '');
	    var cleanText = text.replace(/<br>/g, '');
	    var lines = cleanText.split(/<\/div>/g);
	    var max = 0;
	    for (var i = 0; i < lines.length; i++) {
	      var lineLenght = lines[i].length;
	      if (lineLenght > max) {
	        max = lineLenght;
	      };
	    }
	    return max;
	  };

	  GraphCreator.prototype.getNumberOfLines = function (text, words_in_line) {
	    return Math.floor(text.split(/\s+/g).length / words_in_line) + 1;
	  };

	  GraphCreator.prototype.getNumberOfDivs = function (text) {
	    return text.split(/<\/div>/g).length;
	  };

	  GraphCreator.prototype.createDescriptionShape = function (newIdea, d) {
	    var consts = this.consts;
	    var width = consts.nodeRadius * 5;
	    if (d.description != undefined) {
	      var width = this.getDivMaxLenght(d.description) * 5 + 60;
	      if (width < 100) {
	        width = 100;
	      };
	    }

	    var height = consts.nodeRadius * 1.5;
	    if (d.description != undefined) {
	      var height = this.getNumberOfDivs(d.description) * 15 + height;
	      if (d.concept_type == 'image') {
	        height += 80;
	      }
	    }

	    height += this.getNumberOfLines(d.title, 2) * 5;

	    newIdea.append('rect').attr('width', width).attr('height', height).attr('x', String(-width / 2)).attr('y', String(-consts.nodeRadius)).attr('rx', '25').attr('ry', '25');
	    newIdea.classed('text-hidden', false).classed('text-left', true);
	  };

	  GraphCreator.prototype.createIdeaShape = function (newIdea, d) {
	    var consts = this.consts;
	    switch (d.concept_type) {
	      case 'concept':
	        if (d.description == undefined || d.description == '' || d.description == null) {
	          newIdea.append('circle').attr('r', String(consts.nodeRadius));
	          newIdea.classed('text-hidden', false).classed('text-left', false);
	        } else {
	          newIdea.select('rect').attr('x', '-20');
	        }
	        break;
	      case 'url':
	        newIdea.append('rect').attr('width', String(consts.nodeRadius) * 2).attr('height', String(consts.nodeRadius) * 2).attr('y', String(-consts.nodeRadius)).attr('x', String(-consts.nodeRadius));
	        newIdea.classed('text-hidden', false).classed('text-left', false);
	        break;
	      case 'image':
	        newIdea.append('rect').attr('width', String(consts.nodeRadius) * 2).attr('height', String(consts.nodeRadius) * 2).attr('x', String(-consts.nodeRadius)).attr('y', String(-consts.nodeRadius)).attr('rx', '25').attr('ry', '25');
	        newIdea.append('image').attr('xlink:href', d.title).attr('width', String(consts.nodeRadius) * 2).attr('height', String(consts.nodeRadius) * 2).attr('x', String(-consts.nodeRadius)).attr('y', String(-consts.nodeRadius));
	        newIdea.classed('text-hidden', true).classed('text-left', false);
	        break;
	      default:
	        console.log(d.concept_type);
	    }

	    if (d.parent_id != null) {
	      newIdea.classed('parent_id', true);
	    } else {
	      newIdea.classed('parent_id', false);
	    }
	  };

	  GraphCreator.prototype.zoomed = function () {
	    this.state.justScaleTransGraph = true;
	    d3.select('.' + this.consts.graphClass).attr('transform', 'translate(' + d3.event.translate + ') scale(' + d3.event.scale + ')');
	    this.consts.zoom = d3.event.scale;
	    $('#zoom').val(this.consts.zoom);
	    $('#zoom-label').html(parseInt(this.consts.zoom * 100) + '%');
	    this.translate = d3.event.translate;
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

	    ajax: function ajax(url, type, datatype, data) {
	      return $.ajax({
	        type: type,
	        url: url,
	        dataType: datatype,
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
	          console.log('request', request);
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
	    },
	    findType: function findType(title) {
	      var regexp_web = /([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
	      var regexp_pic = /(.+\.)(jpg|gif|png)$/;
	      if (title.search(regexp_web) > -1) {
	        if (title.search(regexp_pic) > -1) {
	          return 'image';
	        } else {
	          return 'url';
	        }
	      } else {
	        return 'concept';
	      }
	    }

	    //   getEm: function(selected){
	    //            return  parsePx($("html").css("font-size")) / parsePx(selected.style('font-size'))
	    //           }
	  };

	  return Utils;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Utils, View) {

	  var toWhiteSpace = Utils.toWhiteSpace;
	  var ajax = Utils.ajax;
	  var parsePx = Utils.parsePx;
	  var findType = Utils.findType;

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
	        concept_type: d.concept_type,
	        parent_id: d.parent_id
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
	      data: { idea: { id: d.id, x: d.x, y: d.y, font_size: d.font_size, concept_title: d.title, concept_type: d.concept_type, parent_id: d.parent_id } },
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

	  Idea.prototype.createLongText = function (id) {
	    var thisIdea = this;
	    var d = thisIdea.find_by_id(id);
	    var htmlElement = thisIdea.htmlElement(id);
	    var d3node = thisIdea.d3Element(id);

	    var textInput = thisIdea.appendTextInput(htmlElement, d, d.description, true);
	    document.getElementById("editing").focus();
	    textInput.on("blur", function (d) {
	      d.description = textInput.node().innerHTML;
	      thisIdea.updateDescription(d3node, d);
	      this.remove();
	    });
	  };

	  Idea.prototype.insertTitleLinebreaks = function (d3node, text, words_in_line) {
	    var words = text.split(/\s+/g),
	        nwords = words.length;
	    var newText = d3node.append("text").attr("dy", "-" + (nwords - 1) * 7.5 / words_in_line);

	    for (var i = 0; i < words.length; i += words_in_line) {
	      var tspan = newText.append("tspan").text(words.slice(i, i + words_in_line).join().replace(/\,/g, " "));
	      if (i > 0) tspan.attr("x", 0).attr("dy", "15");
	    }
	    return newText;
	  };

	  Idea.prototype.insertDescriptionText = function (d3node, text) {
	    var text = text.replace(/<div>/g, "<tspan dy=15 x=0 >");
	    text = text.replace(/<\/div>/g, "</tspan>");
	    text = text.replace(/<\/br>/g, "<tspan dy=15 x=0 ></tspan>");
	    return d3node.append("text").html(text);
	  };

	  Idea.prototype.insertDescription = function (d3group, d) {
	    if (d.description != null && d.description != "") {
	      var descriptionPadding = 20 + Math.abs(d3group.select("text").attr("dy"));
	      if (d.concept_type == "image") {
	        descriptionPadding += 80;
	      }
	      var newDescription = this.insertDescriptionText(d3group, d.description);
	      // Todo append a foreign object
	      newDescription.classed("description", true).attr("dy", descriptionPadding);
	    }
	  };

	  Idea.prototype.updateDescription = function (d3node, d) {
	    this.insertDescription(d3node, d);
	    this.graph.updateGraph();
	    this.update(d);
	  };

	  Idea.prototype.changeConceptType = function (d, concept_type) {
	    var thisIdea = this;
	    d.concept_type = concept_type;
	    thisIdea.update(d);
	    thisIdea.graph.updateGraph();
	  };

	  Idea.prototype.appendTextInput = function (htmlEl, d, initialText, enterKeyEscape) {
	    var graph = this.graph;
	    var constants = graph.consts;
	    var d3Element = this.d3Element(d.id);
	    var nodeBCR = htmlEl.getBoundingClientRect(),
	        curScale = nodeBCR.width / constants.nodeRadius,
	        placePad = 5 * curScale,
	        useHW = curScale > 1 ? nodeBCR.width * 0.71 : constants.nodeRadius * 1.5;
	    var textInput = graph.svg.selectAll("foreignObject").data([d]).enter().append("foreignObject").attr("x", nodeBCR.left + placePad).attr("y", nodeBCR.top + placePad).attr("height", useHW).attr("width", 2 * useHW).append("xhtml:p").style("overflow", "hidden").attr("id", constants.activeEditId).attr("contentEditable", "true").html(initialText).on("mousedown", function (d) {
	      d3.event.stopPropagation();
	    }).on("keydown", function (d) {
	      d3.event.stopPropagation();
	      if (d3.event.keyCode == constants.ENTER_KEY && (!enterKeyEscape || d3.event.shiftKey)) {
	        this.blur();
	        textInput.data([d]).exit().remove();
	      }
	    });

	    return textInput;
	  };

	  Idea.prototype.d3Element = function (id) {
	    return d3.select("#id" + id);
	  };

	  Idea.prototype.htmlElement = function (id) {
	    return this.d3Element(id).node();
	  };

	  Idea.prototype.changeText = function (d3node, d) {
	    var graph = this.graph,
	        idea = this;
	    htmlEl = d3node.node();
	    d3node.select("text").remove();
	    textInput = this.appendTextInput(htmlEl, d, d.title);

	    textInput.on("blur", function (d) {
	      d.concept_type = findType(this.textContent);
	      // if ( d.description != null && d.description != '' ){ d.concept_type = 'text' }
	      d.title = this.textContent;
	      idea.update_text(d3node, d, this);
	      graph.updateGraph();
	    });

	    return textInput;
	  };

	  Idea.prototype.update_text = function (d3node, d, txt_tmp) {
	    var graph = this.graph,
	        thisIdea = this;
	    var htmlEl = d3node.node();
	    var idea = thisIdea.find_by_id(d.id);
	    idea.title = d.title;
	    idea.concept_type = d.concept_type;
	    if (d.type == "concept") {
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

	  Idea.prototype.update = function (d) {
	    $.ajax({
	      type: "PUT",
	      url: "ideas/" + d.id,
	      beforeSend: function beforeSend(xhr) {
	        xhr.setRequestHeader("X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content"));
	      },
	      data: { idea: { id: d.id, x: d.x, y: d.y, font_size: d.font_size, concept_title: d.title, concept_type: d.concept_type, description: d.description } },
	      success: function success(result) {
	        if (result.error == "true") {
	          alert("An error occurred: " & result.errorMessage);
	          graph.updateGraph();
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (utils, View) {

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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (GraphCreator, utils) {

	  var windowSize = utils.windowSize;

	  var nodes = [];
	  var edges = [];
	  var svg = d3.select("body").append("svg").attr("width", windowSize().width).attr("height", windowSize().height);
	  var permission = d3.select("#window").attr("data-permission");
	  var graph = new GraphCreator(svg, nodes, edges, permission);

	  graph.load_data();
	  graph.setIdCt(2);
	  graph.setIdLink(2);
	  graph.updateGraph();

	  graph.consts = {
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
	    translate: [0, 0]
	  };

	  $("#zoom").val(graph.consts.zoom);

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Utils, Idea, Link) {

	  var getUrl = Utils.getUrl;
	  var toWhiteSpace = Utils.toWhiteSpace;
	  var findType = Utils.findType;

	  var Suggestions = function Suggestions(graph) {
	    this.graph = graph;
	  };

	  Suggestions.prototype.create = function (id, type, language) {
	    var graph = this.graph;
	    var constants = graph.consts;
	    console.log("delay", random_delay(constants.delay));
	    var clean_id = id.replace(/#/, "");
	    var id = "#id" + clean_id;
	    var selectedIdea = new Idea(graph).find_by_id(clean_id);
	    var title = selectedIdea.title;
	    fetch_suggestions(type, title, language).done(function (data, errors) {
	      d3.select("#alert").text("");
	      var data_b = data_base(data, type);
	      if (data_b == undefined || data_b.length == 0) {
	        d3.select("#alert").text("Term not found");
	      }
	      var translate = d3.select(id).attr("transform");
	      var parent = translate.match(/\((.+),(.+)\)/);
	      var parent_left = parseInt(parent[1]);
	      var parent_top = parseInt(parent[2]);
	      var bias = constants.bias;
	      var duration_in = constants.duration_in;
	      var duration = constants.duration;

	      var new_concept = d3.select(".graph").selectAll("g." + data.title).data(data_b);

	      new_concept.enter().append("g").attr("class", "concept random").attr("transform", function (data) {
	        var l = random_left(parent_left, bias);
	        var t = random_top(parent_top, bias);
	        return "translate(" + l + "," + t + ")";
	      }).style("font-size", function (data) {
	        return random_font_size();
	      }).attr("id", function (data) {
	        return data_title(data, type);
	      }).attr("parent_id", function (data) {
	        return parent_id(data, type);
	      }).on("click", function () {
	        var transform = d3.select(this).attr("transform");
	        var translate = d3.transform(transform).translate;
	        var idea = new Idea(graph);
	        var d = { title: toWhiteSpace(d3.select(this).attr("id")), x: translate[0], y: translate[1], font_size: 20, parent_id: d3.select(this).attr("parent_id") };
	        d.concept_type = findType(d.title);
	        idea.create(d).done(function (data) {
	          new Link(graph).create(selectedIdea, new Idea(graph).find_by_id(data.id), graph.idLink++);
	        });
	        d3.select(this).remove();
	      });

	      if (type == "pinterest") {
	        new_concept.append("image").attr("xlink:href", function (data) {
	          return data_title(data, type);
	        }).attr("width", 200).attr("height", 200);
	      } else {
	        new_concept.append("text").append("tspan").text(function (data) {
	          return data_title(data, type);
	        });
	      }

	      if (type == "user") {
	        new_concept.selectAll("text").style("fill", "lightblue");
	        new_concept.selectAll("text").append("tspan").style({ "fill": "white", "font-size": "0.5em" }).attr("dy", "1em").attr("x", "0").text(function (data) {
	          return data.user;
	        });
	      }

	      if (type == "youtube") {
	        new_concept.selectAll("text").style({ "fill": "white" }).attr("dy", "1em").attr("x", "0").text(function (data) {
	          return data.title;
	        });
	      }

	      var anim_concept = new_concept.transition().delay(function (data) {
	        return random_delay(constants.delay);
	      }).duration(duration_in).style({ "opacity": "1" }).transition().duration(duration);

	      var dead_concept = anim_concept.style({ "opacity": "0" }).duration(duration).attr("data-status", "dead").remove();
	    });
	  };

	  function parent_id(data, type) {
	    return type == "user" ? data.id : null;
	  }

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

	  function getLinks(title) {
	    return $.ajax({
	      type: "GET",
	      contentType: "application/json",
	      dataType: "json",
	      url: "/links/" + title,
	      beforeSend: function beforeSend(xhr) {
	        // xhr.setRequestHeader('Api-Key', '2e9dkuu9ydcauucmbqh3r3zp');
	        xhr.setRequestHeader("X-CSRF-Token", $("meta[name=\"csrf-token\"]").attr("content"));
	      },
	      success: function success(result) {},
	      error: function error(xhr, ajaxOptions, thrownError) {
	        console.log(thrownError);
	      }
	    });
	  }

	  function random_delay(delay) {
	    return Math.random() * delay;
	  };

	  function random_sign() {
	    return Math.random() < 0.5 ? -1 : 1;
	  };

	  function random_top(parent_top, bias) {
	    return parseInt(parent_top + Math.random() * bias * random_sign());
	  }; // top parent + 100 + (0 to bias * sign)

	  function random_left(parent_left, bias) {
	    return parent_left + Math.random() * bias * random_sign();
	  }; // left parent + 100 + 0 to bias * sign

	  function random_font_size() {
	    return parseInt((Math.random() * 3 + 1) * 10) / 10 + "em";
	  }; // 0.1 to 3 em

	  function fetch_suggestions(type, title, language) {
	    d3.select("#alert").text("loading...");
	    console.log("loading");
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
	      case "getty_images":
	        url = "https://api.gettyimages.com:443/v3/search/images?phrase=" + title;
	        break;
	      case "google_images":
	        url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + title;
	        break;
	      case "pinterest":
	        url = "https://www.pinterest.com/search/pins/?q=" + title;
	        console.log(url);
	        return scrape(url);
	        break;
	      case "youtube":
	        url = "https://www.youtube.com/results?search_query=" + title;
	        return scrape(url);
	        break;
	      case "synonym":
	        return wordnik(title, "synonym");
	        break;
	      case "related-wordnik":
	        return wordnik(title, "related");
	        break;
	      case "user":
	        return getLinks(title);
	        break;
	    }

	    return getUrl(url);
	  }

	  function scrape(url) {
	    return $.ajax({
	      url: "/scraper/get/",
	      dataType: "json",
	      data: url,
	      success: function success(data) {
	        console.log("scraping", data);
	      },
	      error: function error(_error) {
	        console.log(_error.responseText);
	      }
	    });
	  }

	  function wordnik(title, type) {
	    return $.ajax({
	      url: "/wordnik/get/",
	      dataType: "json",
	      data: { title: title, type: type },
	      success: function success(data) {
	        console.log("wordnik", data);
	      },
	      error: function error(_error2) {
	        console.log(_error2.responseText);
	      }
	    });
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
	      case "pinterest":
	        return data;
	        break;
	      case "youtube":
	        return data.data;
	        break;
	      case "user":
	        return data.title;
	        break;
	      case "synonym":
	        return data;
	        break;
	      case "related-wordnik":
	        return data;
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
	      case "pinterest":
	        return d3.values(data.data);
	        break;
	      case "youtube":
	        return data.data;
	        break;
	      case "flickr_tags":
	        if (data.stat == "fail") {
	          console.log(data.message);
	        } else {
	          return data.tags.tag;
	        }
	        break;
	      case "synonym":
	        if (data.data == null) {
	          return [];
	        };
	        return data.data.words;
	        break;
	      case "related-wordnik":
	        return data.data;
	        break;
	      case "user":
	        return data;
	        break;
	      default:
	        console.log("base for " + type + " not found");
	    }
	  }

	  return Suggestions;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ]);