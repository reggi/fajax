
/*!
 * jQuery fajax v1.0
 * https://github.com/reggi/fajax
 * Licensed under the MIT license.
 * Copyright 2012, Thomas Reggi & Keith Roehrenbeck
 * Date: Fri May 04 03:02:39 2012 -0500
 */

(function( $ ) {
  $.fajax = function(args) {
    var _success = args.success || function(){};
    var _finished = args.finished || function(){};
    var done = $.fajax.done;
    var started = $.fajax.started;
    args.finished = function(){
      _finished();
      if(done == 0 && started == 0){
        $.fajax.started = 0;
        $.fajax.done = 0;
        $.fajax.laps = [];
      }
    }
    args.success = function(jqXHR, textStatus){
      _success(jqXHR, textStatus);
      $.fajax.done++;
      if($.fajax.done >= $.fajax.started){
        for(i=($.fajax.laps.length-1);i>=0;i--){
          $.fajax.laps[i]();
        }
      }
    }
    $.fajax.laps.push(args.finished);
    $.fajax.started++;
    return $.ajax(args);
  };
  $.extend($.fajax, {
    started: 0,
    done: 0,
    laps: [],
  });
})( jQuery );