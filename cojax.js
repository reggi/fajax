(function( $ ) {
  $.cojax = function(args) {
    var _success = args.success || function(){};
    args.success = function(jqXHR, textStatus){
        _success(jqXHR, textStatus);
        $.cojax.done++;
        if($.cojax.done >= $.cojax.started){
             for(i=0;i<$.cojax.handlers.length;i++){
               $.cojax.handlers[i]();
             }
        }
    }
    $.cojax.started++;
    return $.ajax(args);
  };
  $.extend($.cojax, {
    started: 0,
    done: 0,
    handlers: [],
    addHandler: function(handler){
      $.cojax.handlers.push(handler);
    }
  });
})( jQuery );