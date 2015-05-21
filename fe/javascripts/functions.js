define(function(require) {

var GraphCreator = require("./graph-creator.js");
var graph = require("./main.js");
var parsePx = require("./utils.js");

  click_button('related_idol_wt', 'en');
  click_button('wiki_category', 'en');
  click_button('random', 'en');
  click_button('related_idol', 'en');
  click_button('flickr_tags', 'en');
  click_button('wordnik', 'en');
  click_button('user', 'en');


  function click_button(id, language){
   d3.select('#' + id + '-button').on("click", function(){
      if (graph.selected_id() != null){
    createSuggestions( '#' + graph.selected_id() , id , language)
      }
    });
  }


  function ajaxCall(url){
    return $.ajax({
        url: url,
        dataType: 'json',
      });
  }

  function get_ideas(type, title, language){
    var url = "";
    switch(type) {
    case 'random':
      url = "http://" + language + ".wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=10&iwurl=&redirects=&converttitles=&format=json&callback=?";
        break;
    case 'related_idol':
      url = "https://api.idolondemand.com/1/api/sync/findrelatedconcepts/v1?text=" + title + "&indexes=&min_score=80&apikey=a4d88be8-aee2-40c3-9a02-dce7f749f01a";
        break;
    case 'related_idol_wt':
      url = "https://api.idolondemand.com/1/api/sync/getparametricvalues/v1?index=wiki_es&field_name=wikipedia_type&text=" + title + "&apikey=a4d88be8-aee2-40c3-9a02-dce7f749f01a";
        break;
    case 'wiki_category':
      url = 'http://' + language + '.wikipedia.org/w/api.php?action=query&prop=categories&redirects&titles=' + title + '&format=json&callback=?';
        break;
    case 'flickr_tags':
      url =  'https://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=46649a4365f1ea733e08c79954e4e55e&tag=' + title + '&format=json&nojsoncallback=1'
        break;
    case 'wordnik':
      url =  'http://api.wordnik.com:80/v4/word.json/' + title + '/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        break;
    case 'user':
      return getUserIdeas(title);
    break;
    }

    return $.ajax({
      url: url,
      dataType: 'json',
       error: function (request, error) {
        alert(" Can't do because: " + error);
    },
    });
  }

  function random_sign(){ return Math.random() < 0.5 ? -1 : 1};

  function random_delay(){ return (Math.random() * 2000) }; // delay 0 to 2000

  function random_top(parent_top, bias){ return parseInt( parent_top + (Math.random() * bias) * random_sign() )}; // top parent + 100 + (0 to bias * sign)

  function random_left(parent_left, bias){ return parent_left + (( Math.random() * bias) *  random_sign() ) }; // left parent + 100 + 0 to bias * sign

  function random_font_size(){ return  parseInt( Math.random() * 3 + 0.3 ) + 'em' }; // 0.1 to 3 em

  function data_title(data, type) {
    switch(type) {
      case 'random':
        return data.title;
      case 'related_idol':
        return data.text;
      case 'wiki_category':
        return data.title.replace(/Category:/,'');
     case 'related_idol_wt':
        return data;
      case 'flickr_tags' :
        return data._content;
      case 'user':
        return data.title;
      break;
      default:
      console.log('title not found');
    } };

  function data_base(data, type) {
    switch(type) {
      case 'random':
        return data.query.random;
        break;
      case 'related_idol':
        return data.entities;
        break;
      case 'related_idol_wt':
        return d3.keys(data.wikipedia_type);
        break;
      case 'wiki_category':
        return d3.values(data.query.pages)[0].categories;
        break;
      case 'flickr_tags':
      if (data.stat == 'fail'){
        console.log(data.message);
      }else{
        return data.tags.tag
      }
      break;
      case 'wordnik':
        console.log(data);
      break;
      case 'user':
        return data;
      break;
      default:
      console.log('base not found');
    }
  }

  function getUserIdeas(title){
   return $.ajax({
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      url: '/matches/' + title,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: function(result){
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(thrownError);
      }
    });
  }

  function createSuggestions(id, type, language){
    var title =  graph.find_idea_by_id(id)['title'];
      get_ideas(type, title, language).done(function(data, errors){
        var data_b = data_base(data, type);
        if( data_b == undefined || data_b.length == 0){
          d3.select('#alert').text('Term not found');
        }

      var translate = d3.select(id).attr('transform');
      var parent = translate.match(/\((.+),(.+)\)/);
      var parent_left = parseInt(parent[1]);
      var parent_top = parseInt(parent[2]);
      var bias = 300;
      var duration_in = 2000;
      var duration = 6000;
      console.log('delay', random_delay() );

      var new_concept = d3.select(".graph").selectAll('g.' + data.title)
      .data(data_b);

      new_concept.enter().append('g')
                  .attr('class', 'concept random')
                  .attr('transform', function(data){
                   var l = random_left(parent_left, bias);
                   var t = random_top(parent_top, bias);
                    return 'translate(' + l + ',' + t + ')'
                  })
                  .style('font-size', function(data){ return random_font_size() })
                  .attr('id', function(data) { return data_title(data, type); })
                  .on("click", function(){
                    var transform = d3.select(this).attr('transform');
                    var translate = d3.transform(transform).translate;
                    graph.createIdea( d3.select(this).attr('id') , translate[0] , translate[1], 'concept' ).done(function(data){
                      graph.create_link( graph.find_idea_by_id(id), graph.find_idea_by_id_clean(data.id) , graph.idLink++ );
                    });
                    d3.select(this).remove();
                  })
                  .append('text').append('tspan')
                  .text(function(data) { return data_title(data, type) });
                  if (type == 'user'){
                  new_concept.selectAll('text').style('fill','lightblue');
                  new_concept.selectAll('text').append('tspan')
                                               .style({'fill':'white', 'font-size':'0.5em'})
                                               .attr('dy', '1em').attr('x', '0')
                                               .text(function(data) { return data.user });
                  }
      var anim_concept = new_concept
                  .transition().delay(random_delay).duration(duration_in).style({'opacity':'1'})
                  .transition().duration(duration);

      var dead_concept = anim_concept.style({'opacity':'0'})
                  .duration(duration).attr('data-status','dead')
                  .remove();
    });
  }

  function no_selection(){
    d3.select('#alert').text('Please select an Idea first');
  };


  function get_wiki(url){
    return $.ajax({
      url: url,
      dataType: 'json',
    });
  }




  function clearIframeTab(){
    d3.select('.wiki').classed('wiki-open', false).classed('url-open', false);
    d3.select('.url-title').remove();
    d3.select('.wiki iframe').remove();
    d3.select('.wiki div').html('');
  }

  d3.select('#close-wiki').on("click", function(){
    clearIframeTab();
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
    get_wiki(url).done(function(data){
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

  d3.select('#idea-plus').on("click", function(){
    graph.update_idea( graph.change_size(1) );
  });

  d3.select('#idea-minus').on("click", function(){
    graph.update_idea( graph.change_size(-1) );
  });

  d3.select('#open-url').on("click", function(){
    clearIframeTab();
    var id = graph.selected_id().replace(/id/, '');
    var type = graph.find_idea_by_id_clean(id).concept_type;
    if ( graph.selected_id()!= null ){
      switch(type) {
        case 'url':
          open_url( graph.find_idea_by_id_clean(id).title );
          break;
        case 'concept':
          show_wiki( graph.find_title_by_id( '#' + graph.selected_id() ), 'en');
          break;
        default:
          console.log('undefined');
          show_wiki( graph.find_title_by_id( '#' + graph.selected_id() ), 'en');
      }
    }
  });

  // function getEm(selected){
  //   return  parsePx($("html").css("font-size")) / parsePx(selected.style('font-size'))
  // }


});
