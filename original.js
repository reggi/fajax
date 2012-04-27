var started = 0, done = 0;
var globalHandler = function(){
    //do stuff when all success handlers are done
}
function handleAjax(args){
    var _success = args.success || function(){};
    args.success = function(jqXHR, textStatus){
        _success(jqXHR, textStatus);
        done++;
        if(done >= started)
             globalHandler();
    }
    var ajax = $.ajax(args);
    started++;
    return ajax;
}

usage

handleAjax({
    url: 'api/periods.json',
    dataType: 'json',
    success: function (d1) {
        //more nested ajax requests like this:
        handleAjax({...});
    }
});




