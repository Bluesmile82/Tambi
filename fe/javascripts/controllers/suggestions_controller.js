define(["../utils.js", "./ideas_controller.js", "./links_controller.js"], function(Utils, Idea, Link) {

  var getUrl = Utils.getUrl;
  var toWhiteSpace = Utils.toWhiteSpace;

  var Suggestions = function(graph){
    this.graph = graph;
  };

  Suggestions.prototype.create = function(id, type, language){
    var graph = this.graph;
    var clean_id = id.replace(/#/, '');
    var id = '#id' + clean_id;
    var selectedIdea = new Idea(graph).find_by_id(clean_id);
    var title =  selectedIdea.title;
      fetch_suggestions(type, title, language).done(function(data, errors){
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
                    var idea = new Idea(graph);
                    var d = {title: toWhiteSpace(d3.select(this).attr('id')) , x: translate[0] , y: translate[1], font_size: 20 , type: 'concept'};
                    idea.create( d ).done(function(data){
                      new Link(graph).create( selectedIdea, new Idea(graph).find_by_id(data.id) , graph.idLink++ );
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

  function random_sign(){ return Math.random() < 0.5 ? -1 : 1};

  function random_delay(){ return (Math.random() * 2000) }; // delay 0 to 2000

  function random_top(parent_top, bias){ return parseInt( parent_top + (Math.random() * bias) * random_sign() )}; // top parent + 100 + (0 to bias * sign)

  function random_left(parent_left, bias){ return parent_left + (( Math.random() * bias) *  random_sign() ) }; // left parent + 100 + 0 to bias * sign

  function random_font_size(){ return  parseInt( Math.random() * 3 + 0.3 ) + 'em' }; // 0.1 to 3 em

  function fetch_suggestions(type, title, language){

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
      return getMatches(title);
    break;
    }

    return getUrl(url);
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

  return Suggestions;
});