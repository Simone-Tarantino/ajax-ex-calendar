$(document).ready(function(){
  var firstDMonth = moment([2018, 0, 1]);
  var lastDMonth = moment([2018, 1, 1]);
  var monthLength = lastDMonth.diff(firstDMonth, 'days');
  for(var i = 1; i <= monthLength; i++){
    // var source = $("entry-template").html();
    // var template = Handlebars.compile(source);
    var day = i;
    var month = moment(firstDMonth).month();
    console.log(day);
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var dayObj = {
      'day' : day,
      'month' : month
    };
    var html = template(dayObj);
    $('.month').append(html);
  }

  $.ajax({
    'url' : 'https://flynn.boolean.careers/exercises/api/holidays',
    'method' : 'GET',
    'success' : function(data){

    },
    'error' : function(request, state, errors){
      alert(errors);
    }
  });

  function calendarGen(){

  }


});
