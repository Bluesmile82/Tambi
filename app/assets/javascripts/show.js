function start(){

function parseRelated(){
  var url_related = 'http://es.wikipedia.org/w/api.php?action=query&prop=categories&format=json&titles=Albert%20Einstein&rnlimit=10&format=json&callback=?';
  return ajaxCall(url_related)
}

function ajaxCall(url){
  return $.ajax({
      url: url,
      dataType: 'json',
    });
}

  function getIdeas(type){
    var url = "";
    switch(type) {
    case 'random':
      url = "http://es.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=10&iwurl=&redirects=&converttitles=&format=json&callback=?";
        break;
    case 'related':
      parseRelated().done(function(data){console.log('parsed ', data)});
      break;
    }

    return $.ajax({
      url: url,
      dataType: 'json',
    });
  }

  function createIdeas(id, type){
    getIdeas(type).done(function(data){

      var translate = d3.select(id).attr('transform');
      var parent = translate.match(/\((.+),(.+)\)/);
      var parent_left = parent[1];
      var parent_top = parent[2];
      // $.each(data.query.random, function( index, value ) {
      function sign(){ return Math.random() < 0.5 ? -1 : 1};
      function delay(){ return (Math.random() * 5000) };
      console.log('delay',delay() )
      function left(){ return parseInt(parent_left) + (( Math.random() + 200) *  sign() ) };
      var duration = 3000;
      console.log('left',left() )

      var  new_concept = d3.select("#playground").selectAll('div').data(data.query.random)
                            .enter().append('div').attr('class', 'concept random')
                            .style('top', function(data){ return sign() * 10 + 'px' })
                            .style('left', function(data){ return left() +'px'  })
                            .html(function(data) { return data.title; });

      dead_concept = new_concept
                  .transition().delay(delay).duration(duration).style({'opacity':'1'})
                  .transition().duration(duration).style({'opacity':'0'})
                  .duration(duration).attr('data-status','dead')
                  .remove();
       // });
    });
  }
  // createIdeas("#initial","random");
  d3.select('#random-button').on("click", function(){ createIdeas("#Laura","random")} );
  d3.select('#related-button').on("click", function(){ createIdeas("#Laura","related")} );


  function parsePx(string){
    return parseInt(string.replace('px',''));
  }


}
