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
  click_button('flickr_tags', 'en');
  click_button('wordnik', 'en');
  click_button('user', 'en');

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

if(graph.permission == 'user'){
}

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
    console.log('reg', url.search(/(^https*:\/\/)/));
    if (url.search(/(^https*:\/\/)/) == -1){
    var url = 'http://' + url;
    }
    console.log('url', url);
      d3.select('.wiki').classed("url-open", true);
      d3.select('.wiki').append('div').classed('url-title', true).html(url);
      d3.select('.wiki').append('iframe').attr('src', url);
  }

  // d3.select('#squares').on("click", function(){
  //   circles = d3.selectAll("circle");
  //   parents = circles.select(function() { return this.parentNode; })
  //   // circles.remove();
  //   // <image xlink:href="firefox.jpg" x="0" y="0" height="50px" width="50px"/>
  //   texts = parents.selectAll('text');
  //   parents.append('rect').attr({'width':'100', 'height':'100', 'x':'-50', 'y':'-50' });
  // });

  d3.select('#open-url').on("click", function(){
    new View().clearIframeTab();
    var id = new Idea(graph).selectedId();
    if (id == null ) { return new View().noSelection();}

    new View().clearAlert();
    var d = new Idea(graph).find_by_id(id);
    var type = d.concept_type;

    switch(type) {
      case 'concept':
        show_wiki( d.title , 'en');
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

});
