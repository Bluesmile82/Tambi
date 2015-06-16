define(["../utils.js", "./ideas_controller.js", "./links_controller.js"], function(Utils, Idea, Link) {

  var getUrl = Utils.getUrl;
  var toWhiteSpace = Utils.toWhiteSpace;
  var findType = Utils.findType;

  var Suggestions = function(graph){
    this.graph = graph;
  };

  Suggestions.prototype.create = function(id, type, language){
    var graph = this.graph;
    var constants = graph.consts
    console.log('delay', random_delay(constants.delay) );
    var clean_id = id.replace(/#/, '');
    var id = '#id' + clean_id;
    var selectedIdea = new Idea(graph).find_by_id(clean_id);
    var title =  selectedIdea.title;
      fetch_suggestions(type, title, language).done(function(data, errors){
        d3.select('#alert').text('');
        var data_b = data_base(data, type);
        if( data_b == undefined || data_b.length == 0){
          d3.select('#alert').text('Term not found');
        }
      var translate = d3.select(id).attr('transform');
      var parent = translate.match(/\((.+),(.+)\)/);
      var parent_left = parseInt(parent[1]);
      var parent_top = parseInt(parent[2]);
      var bias = constants.bias;
      var duration_in = constants.duration_in;
      var duration = constants.duration;

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
                  .attr('parent_id', function(data) { return parent_id(data, type); })
                  .on("click", function(){
                    var transform = d3.select(this).attr('transform');
                    var translate = d3.transform(transform).translate;
                    var idea = new Idea(graph);
                    var d = {title: toWhiteSpace(d3.select(this).attr('id')) , x: translate[0] , y: translate[1], font_size: 20 , parent_id: d3.select(this).attr('parent_id') };
                    d.concept_type = findType( d.title );
                    idea.create( d ).done(function(data){
                      new Link(graph).create( selectedIdea,
                                              new Idea(graph).find_by_id(data.id),
                                              graph.idLink++ );
                    });
                    d3.select(this).remove();
                  });

      if (type == 'pinterest'){
        new_concept.append('image')
                   .attr('xlink:href', function(data) { return data_title(data, type)})
                   .attr("width", 200)
                   .attr("height", 200);
      }else{
        new_concept.append('text').append('tspan')
                   .text(function(data) { return data_title(data, type)});
      }

      if (type == 'user'){
        new_concept.selectAll('text').style('fill','lightblue');
        new_concept.selectAll('text').append('tspan')
                                   .style({'fill':'white', 'font-size':'0.5em'})
                                   .attr('dy', '1em').attr('x', '0')
                                   .text(function(data) { return data.user });
      }

      if (type == 'youtube'){
        new_concept.selectAll('text').style({'fill':'white'})
                                   .attr('dy', '1em').attr('x', '0')
                                   .text(function(data) { return data.title });
      }

      var anim_concept = new_concept
                  .transition().delay(function(data) { return random_delay(constants.delay) }).duration(duration_in).style({'opacity':'1'})
                  .transition().duration(duration);

      var dead_concept = anim_concept.style({'opacity':'0'})
                  .duration(duration).attr('data-status','dead')
                  .remove();
    });
  }

  function parent_id(data, type){
    return type == 'user' ? data.id : null ;
  }

  function getMatches(title){
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

  function getLinks(title){
   return $.ajax({
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      url: '/links/' + title,
      beforeSend: function(xhr) {
        // xhr.setRequestHeader('Api-Key', '2e9dkuu9ydcauucmbqh3r3zp');
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
      },
      success: function(result){
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(thrownError);
      }
    });
  }

  function random_delay(delay){ return (Math.random() * delay) };

  function random_sign(){ return Math.random() < 0.5 ? -1 : 1};


  function random_top(parent_top, bias){ return parseInt( parent_top + (Math.random() * bias) * random_sign() )}; // top parent + 100 + (0 to bias * sign)

  function random_left(parent_left, bias){ return parent_left + (( Math.random() * bias) *  random_sign() ) }; // left parent + 100 + 0 to bias * sign

  function random_font_size(){ return  parseInt( ( Math.random() * 3 + 1 ) * 10 ) / 10  + 'em' }; // 0.1 to 3 em

  function fetch_suggestions(type, title, language){
    d3.select('#alert').text('loading...');
    console.log('loading');
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
    case 'getty_images':
      url =  'https://api.gettyimages.com:443/v3/search/images?phrase=' + title
        break;
    case 'google_images':
      url =  'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + title
        break;
    case 'pinterest':
      url =  'https://www.pinterest.com/search/pins/?q=' + title
      console.log(url);
      return scrape(url);
        break;
    case 'youtube':
      url =  'https://www.youtube.com/results?search_query=' + title
      return scrape(url);
        break;
    case 'synonym':
      return wordnik(title, 'synonym');
        break;
    case 'related-wordnik':
      return wordnik(title, 'related');
        break;
    case 'user':
      return getLinks(title);
    break;
    }

    return getUrl(url);
  }

function scrape( url ){
  return $.ajax({
     url: '/scraper/get/',
     dataType: 'json',
     data: url,
     success: function(data) {
      console.log('scraping', data);
          },
      error: function(error){
        console.log(error.responseText)
      }
  });
}

function wordnik( title, type ){
  return $.ajax({
     url: '/wordnik/get/',
     dataType: 'json',
     data: {title:title, type:type},
     success: function(data) {
      console.log('wordnik', data);
          },
      error: function(error){
        console.log(error.responseText)
      }
  });
}

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
      case 'pinterest':
        return data;
        break;
      case 'youtube':
        return data.data;
        break;
      case 'user':
        return data.title;
        break;
      case 'synonym':
        return data;
        break;
      case 'related-wordnik':
        return data;
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
      case 'pinterest':
        return d3.values(data.data);
      break;
      case 'youtube':
        return data.data;
      break;
      case 'flickr_tags':
      if (data.stat == 'fail'){
        console.log(data.message);
      }else{
        return data.tags.tag
      }
      break;
      case 'synonym':
        if( data.data == null){ return [] };
        return data.data.words;
      break;
      case 'related-wordnik':
        return data.data;
        break;
      case 'user':
        return data;
        break;
      default:
      console.log("base for " + type + " not found");
    }
  }

  return Suggestions;
});