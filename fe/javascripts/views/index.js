define( ["../controllers/canvas_controller.js", "../initialize.js", "../utils.js", "../controllers/ideas_controller.js","../controllers/suggestions_controller.js", "../views/view.js" ], function(GraphCreator, graph, utils, Idea, Suggestions, View) {

  var parsePx = utils.parsePx;
  var getUrl = utils.getUrl;
  var toWhiteSpace = utils.toWhiteSpace;
  var ajax = utils.ajax;
  var windowSize = utils.windowSize;


// $('#myModal').modal({ show: false})

  click_button('related_idol_wt', 'en');
  click_button('wiki_category', 'en');
  click_button('random', 'en');
  click_button('related_idol', 'en');
  click_button('pinterest', 'en');
  click_button('youtube', 'en');
  click_button('user', 'en');
  click_button('synonym', 'en');
  click_button('related-wordnik', 'en');
  // click_button('google_images', 'en');
  // click_button('flickr_tags', 'en');



  function click_button(id, language){
   d3.select('#' + id + '-button').on("click", function(){
    var selectedId = new Idea(graph).selectedId();
    if (selectedId == null ) { return new View().noSelection();}
    new Suggestions(graph).create( '#' + selectedId , id , language)
    });
  }

  function selectId(){
    var idea = new Idea(graph)
    var selectedId = idea.selectedId();
    if (selectedId == null ) { return new View().noSelection();}
    return selectedId;
  }

  d3.select('.modal-header .close').on("click", function(){
    d3.select('.modal-content iframe').remove();
    d3.select('.modal-title').html('Without parent');
  });

  d3.select('#open-canvas').on("click", function(){
    var parent_id = new Idea(graph).find_by_id(selectId()).parent_id;
    ajax( 'redirect_to/' + parent_id , 'GET', 'json' ).done(function(data) {
      d3.select('.modal-content').append('iframe').attr('src', data.path );
      d3.select('.modal-title').html( data.graph.title + ' by ' + data.user );
    });
  });

  d3.select('#center-tambi').on("click", function(){
    graph.consts.translate = [0,0]
    graph.dragSvg.translate([0,0])
    updateGraphTransform();
  });

// hotkeys

$( "body" ).on( "keydown", function( event ) {
  // console.log(event.which);
  // event.preventDefault();
  switch(event.which){
    case 83: // s
      $('#search').click();
    break;
    case 70: // f
      $('#focus').click();
    break;
    case 65: // a
      $('.fa-magic').click();
    break;
    case 73: // i
      $('.fa-info-circle').click();
    break;
     case 32: // space
      event.preventDefault();
      $('#open-url').click();
    break;
    case 67: // c
      event.preventDefault();
      $('#add-text').click();
    break;
    // case 107: // +
    //   $('#idea-plus').click();
    // break;
    // case 109: // -
    //   $('#idea-minus').click();
    // break;
    case 49: // 1
      $('#random-button').click();
    break;
    case 50: // 2
      $('#related_idol-button').click();
    break;
    case 51: // 3
      $('#wiki_category-button').click();
    break;
    case 52: // 4
      $('#user-button').click();
    break;
    case 53: // 5
      $('#pinterest-button').click();
    break;
    case 54: // 6
      $('#youtube-button').click();
    break;
    case 55: // 7
      $('#synonym-button').click();
    break;
    case 56: // 8
      $('#related-wordnik-button').click();
    break;
  }
})

var durationDiv = document.getElementById("duration");
if (durationDiv != null){
  durationDiv.addEventListener('change', function() {
    var selected = this.value;
    $('#duration-label').text(parseInt(selected / 1000) + 'secs');
    graph.consts.duration = selected;
  });
}

var delayDiv = document.getElementById("delay");
if (delayDiv != null){
  delayDiv.addEventListener('change', function() {
    var selected = this.value;
    $('#delay-label').text(parseInt(selected / 1000) + 'secs');
    graph.consts.delay = selected;
  });
}

var zoomDiv = document.getElementById("zoom");
if (zoomDiv != null){
  zoomDiv.addEventListener('change', function() {
    var selected = this.value;
    $('#zoom-label').text(parseInt(selected * 100) + '%');
    graph.consts.zoom = selected;
    graph.dragSvg.scale(selected)
    updateGraphTransform();
  });
}

function updateGraphTransform(){
  d3.select("." + graph.consts.graphClass)
    .attr("transform", "translate(" + graph.consts.translate + ") scale(" + graph.consts.zoom + ")");
}

  // document.getElementById('in').addEventListener('change', function() {
  //         var selected = this.value;
  //         $('#in-label').text(parseInt(selected / 1000) + 'secs');
  //         graph.consts.duration_in = selected;
  // });

  d3.select('svg').on("click", function(){
    new View().clearIframeTab();
  });

  d3.select('#add-text').on("click", function(){
    var idea = new Idea(graph)
    var selectedId = idea.selectedId();
    if (selectedId == null ) { return new View().noSelection();}
    idea.createLongText( selectedId );
  });

  d3.select('#focus').on("click", function(){
    var navbar = d3.select('.navbar-wagon');
    if (navbar.classed('hidden') == true ){
      navbar.classed('hidden', false)
    }else{ navbar.classed('hidden', true ) }
  });

  d3.select('#idea-plus').on("click", function(){
    var idea = new Idea(graph)
    var selectedId = idea.selectedId();
    if (selectedId == null ) { return new View().noSelection();}
    idea.update( idea.change_size(1) );
  });

  d3.select('#idea-minus').on("click", function(){
    var idea = new Idea(graph)
    var selectedId = idea.selectedId();
    if (selectedId == null ) { return new View().noSelection();}
    idea.update( idea.change_size(-1) );
  });

  d3.select('#close-wiki').on("click", function(){
    new View().clearIframeTab();
  });

  d3.select('#show-instructions').on("click", function(){
    var instructions = d3.select('#instructions');
    if (instructions.classed('hidden')){
    instructions.classed('hidden', false);
  } else{instructions.classed('hidden', true)}
  });

  d3.select('#close-instructions').on("click", function(){
    var instructions = d3.select('#instructions');
    instructions.classed('hidden', true);
  });

  d3.select('#close-toolbox').on("click", function(){
    var instructions = d3.select('#toolbox');
    instructions.classed('hidden', true);
  });

  d3.select('#open-toolbox').on("click", function(){
    var toolbox = d3.select('#toolbox');
    if (toolbox.classed('hidden')){
    toolbox.classed('hidden', false);
  } else{toolbox.classed('hidden', true)}
  });

  d3.select('#mode-switch').on("click", function(){
    var thisButton = d3.select('#creative-structured');
    if (thisButton.text() == 'Structured'){
      thisButton.text('Creative');
      d3.selectAll('circle').classed('transparent', true);
      d3.selectAll('path').attr('stroke-dasharray', '0.5, 20');
      d3.selectAll('.link').style('stroke-width', '3px');
    }
    else {
      thisButton.text('Structured');
      d3.selectAll('circle').classed('transparent', false);
      d3.selectAll('path').attr('stroke-dasharray', '');
      d3.selectAll('.link').style('stroke-width', '10px');
    }
  });

  function show_wiki(title, language){
    var url = 'http://' + language + '.wikipedia.org/w/api.php?action=parse&redirects&prop=text&page=' + title + '&format=json&callback=?';
    getUrl(url).done(function(data){
      if(data.error != undefined){
        d3.select('#alert').html('Not found')
        d3.select('.wiki').classed("wiki-open", false);
      }else{
      d3.select('.wiki').classed("wiki-open", true).append('div');
      var text = data.parse.text['*'];
      d3.select('.wiki div').html(text)};
    });
  }

  function open_url(url){
    if (url.search(/(^https*:\/\/)/) == -1){
    var url = 'http://' + url;
    }
    console.log('url', url);
      d3.select('.wiki').classed("url-open", true);
      d3.select('.wiki').append('div').classed('url-title', true).html(url);
      d3.select('.wiki').append('iframe').attr('src', url);
  }

  d3.select('#open-url').on("click", function(){
    new View().clearIframeTab();
    var id = new Idea(graph).selectedId();
    if (id == null ) { return new View().noSelection();}

    new View().clearAlert();
    var d = new Idea(graph).find_by_id(id);
    var type = d.concept_type;

    switch(type) {
      case 'concept':
      case 'text':
        open_url( 'http://en.wikipedia.org/wiki/' + d.title )
        break;
      case 'url':
        open_url( d.title );
        break;
      case 'image':
        open_url( d.title );
        break;
      default:
        console.log('concept_type', d.concept_type );
    }
  });

  d3.select('#search').on("click", function(){
    new View().clearIframeTab();
    var id = new Idea(graph).selectedId();
    var d = new Idea(graph).find_by_id(id);
    var title = ''
    if (id !== null ) { title = d.title }
    open_url( 'http://duckduckgo.com/' + title )
  });

});
