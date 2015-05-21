define(function(require) {

  var parsePx = function(string){
    return parseInt(string.replace('px',''));
  }

  return parsePx;
});