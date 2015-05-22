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

    ajax: function(url, type, data){
                    $.ajax({
                        type: type,
                        url: url ,
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
  }

  //   getEm: function(selected){
  //            return  parsePx($("html").css("font-size")) / parsePx(selected.style('font-size'))
  //           }
   }

  return Utils;
});