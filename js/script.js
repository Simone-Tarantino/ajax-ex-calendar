$(document).ready(function(){
  calendarGen();
  $.ajax({
    'url' : 'https://flynn.boolean.careers/exercises/api/holidays',
    'method' : 'GET',
    'success' : function(data){

    },
    'error' : function(request, state, errors){
      alert(errors);
    }
  });

  // function calendarGen(){
  //   var firstDMonth = moment([2018, 0, 1]);
  //   var lastDMonth = moment([2018, 1, 1]);
  //   var monthLength = lastDMonth.diff(firstDMonth, 'days');
  //   for(var i = 1; i <= monthLength; i++){
  //     var day = moment(firstDMonth).format('D');
  //     var source = $("#entry-template").html();
  //     var template = Handlebars.compile(source);
  //     var dayObj = {
  //       'day' : day,
  //       'month' : moment(firstDMonth).format('MMMM')
  //     };
  //     var html = template(dayObj);
  //     $('.month').append(html);
  //   }
  // }

  function calendarGen(){
    var firstMonth = moment([2018, 0, 1]);
    console.log(firstMonth);
    var monthDays = moment(firstMonth).daysInMonth();
    console.log(monthDays);
    for(var i = 0; i < monthDays; i++){

    }
  }
});
