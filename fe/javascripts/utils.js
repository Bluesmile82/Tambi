define(function(require) {

  var Utils = {

    parsePx: function(string){
                return parseInt(string.replace('px',''));
              },

    toSnakeCase: function( text ){
                return text.replace(/\s/g, '_')
              },

    toWhiteSpace: function( text ){
                return text.replace(/_/g, ' ')
              },

    ajax: function(url, type, datatype, data){
                    return $.ajax({
                        type: type,
                        url: url ,
                        dataType: datatype,
                        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                        data: data,
                        success: function(result){
                           if (result.error == "true"){ alert("An error occurred: " & result.errorMessage);
                           }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                          console.log(thrownError);
                      }
                    });
                  },

    getUrl: function(url){
              return $.ajax({
                url: url,
                dataType: 'json',
                error: function (request, error) {
                  console.log('request', request);
                console.log(" Can't do because: " + error);
                }
            })
            },

    windowSize: function(){
                  var docEl = document.documentElement,
                      bodyEl = document.getElementsByTagName('body')[0];

                  var width = window.innerWidth || docEl.clientWidth || bodyEl.clientWidth,
                      height =  window.innerHeight|| docEl.clientHeight|| bodyEl.clientHeight;

                  return { width: width, height:height }
                },
    selectElementContents: function(el) {
                  var range = document.createRange();
                  range.selectNodeContents(el);
                  var sel = window.getSelection();
                  sel.removeAllRanges();
                  sel.addRange(range);
                },
    findType: function(title){
            var regexp_web = /([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)/
            var regexp_pic = /(.+\.)(jpg|gif|png)$/
            if (title.search(regexp_web) > -1){
              if(title.search(regexp_pic) > -1){ return 'image' }
              else{ return 'url'; }
            }else{
              return 'concept';
            }
    }


  //   getEm: function(selected){
  //            return  parsePx($("html").css("font-size")) / parsePx(selected.style('font-size'))
  //           }
   }

  return Utils;
});