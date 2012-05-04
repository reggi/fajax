# Fajax

###Description

**fajax** is a simple function that replaces jquery's ajax function.

**fajax** stands for *finished asyncronous javascript xml*

**fajax** keeps jquery's ajax function fully intact and only enhances it *(adds `finished` agrument)*.

**fajax**'s purpose is to create a handler for when the ajax's success function is `finished`. You may be thinking that ajax already has this in the [`complete(jqXHR, textStatus)`](http://api.jquery.com/jQuery.ajax/ "ajax jquery documentation") argument. What `complete` does is fire when success is done, but does not include ajax calls within success. The `finished` argument will fire when the fajax request within is `success` argument is complete. 

**fajax** was originally named cojax, but I decided to rename it to promote it's asynchrony.

**fajax**'s inception started on [stackoverflow](http://stackoverflow.com/questions/10344136/ajax-when-success-is-complete) where I asked the question, "ajax when success is complete". Luckly [@kroehre](http://stackoverflow.com/users/733755/kroehre) aka [Keith Roehrenbeck](https://twitter.com/#!/kroehre) responded with a brilliant solution. I've taken Keith's codebase and made it support multiple instances as well as compartmentalize its variables.

###Example.1 : Regular nesting

code.

```
$.fajax({
  url: 'api/fajax.json',
  dataType: 'json',
  success: function(data1){
    console.log('1 success 1');
    $.fajax({
      url: 'api/fajax.json',
      dataType: 'json',
      success: function(data2){
        console.log('2 success');
      },
    });
    console.log('1 success 2');
  },finished:function(){
    console.log('1 finished');
  }
});
```
console.

```
1 success 1
1 success 2
2 success
1 finished
```

###Example.2 : looping

code.

```
$.fajax({
  url: 'api/fajax.json',
  dataType: 'json',
  success: function(data1){
    console.log('1 success');
    $.fajax({
      url: 'api/fajax.json',
      dataType: 'json',
      success: function(data2){
        console.log('2 success');
        var i;
        for (i=3;i<=5;i++){
          (function(i){
            $.fajax({
              url: 'api/fajax.json',
              dataType: 'json',
              success: function(data3){
                console.log(i+' success');
              },
              finished: function(){
                console.log(i+' finished');
              }
            });
          })(i);
        }
      },
      finished: function(){
        console.log('2 finished');
      }
    });
  },finished:function(){
    console.log('1 finished');
  }
});
```

console.

```
1 success
2 success
3 success
4 success
5 success
5 finished
4 finished
3 finished
2 finished
1 finished
```

###Epilogue

A special thanks to [Keith](http://stackoverflow.com/users/733755/kroehre), for helping me on stackoverflow, and building 99% of this.

This is my first major github repository so if you like it please tell me!

```
  _ __ ___  __ _  __ _(_)
 | '__/ _ \/ _` |/ _` | |
 | | |  __/ (_| | (_| | |
 |_|  \___|\__, |\__, |_|
           |___/ |___/   
```

* [reggi.com](http://reggi.com)
* Twitter [@thomasreggi](http://twitter.com/thomasreggi)
* GitHub [@reggi](https://github.com/reggi)
* StackOverflow [@thomasreggi](http://stackoverflow.com/users/340688/thomasreggi)


