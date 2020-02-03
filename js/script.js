$(document).ready(function(){
  $.ajax({
    'url' : 'https://flynn.boolean.careers/exercises/api/holidays',
    'method' : 'GET',
    'data' : {
      'year' : 2018,
      'month' : 0
    },
    'success' : function(data){

      calendarGen();

    },
    'error' : function(request, state, errors){
      alert(errors);
    }
  });

  function isSameData(date1, date2){
    var result = moment(date1).isSame(date2, 'day');
    return result;
  }




  function calendarGen(){
    var firstMonth = moment('2018').startOf('year');
    var monthDays = moment(firstMonth).daysInMonth();
    var day = moment(firstMonth).format('D');
    var month = moment(firstMonth).format('MMMM');
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var monthD = {
      'DD' : day,
      'MMMM' : month
    };
    var html = template(monthD);
    $('.month').append(html)

    for(var i = 1; i < monthDays; i++){
      firstMonth = moment(firstMonth, "YYYY-MMMM-D").add(1, 'days');
      day = moment(firstMonth).format('D');
      month = moment(firstMonth).format('MMMM');

      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);
      var monthD = {
        'DD' : day,
        'MMMM' : month
      };
      var html = template(monthD);
      $('.month').append(html);
    }
  }
});
