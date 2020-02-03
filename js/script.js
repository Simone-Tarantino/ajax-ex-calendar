$(document).ready(function(){
  $.ajax({
    'url' : 'https://flynn.boolean.careers/exercises/api/holidays',
    'method' : 'GET',
    'data' : {
      'year' : 2018,
      'month' : 0
    },
    'success' : function(data){
      var firstMonth = moment('2018').startOf('year');
      var monthDays = moment(firstMonth).daysInMonth();
      var same = isSameData(data, firstMonth);
      console.log(same);
      // stampo il primo del mese
      var day = moment(firstMonth).format('D');
      var month = moment(firstMonth).format('MMMM');
      if (same == true) {
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var monthD = {
          'DD' : day,
          'MMMM' : month
          // 'FESTIVITY' :
        };
        var html = template(monthD);
        $('.month').append(html)
      } else {
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var monthD = {
          'DD' : day,
          'MMMM' : month,
          // 'FESTIVITY' : data.response
        };
        var html = template(monthD);
        $('.month').append(html)
      }
      // stampo il resto dei giorni
      for(var i = 1; i < monthDays; i++){
        firstMonth = moment(firstMonth, "YYYY-MMMM-D").add(1, 'days');
        same = isSameData(data, firstMonth);
        console.log(same);
        day = moment(firstMonth).format('D');
        month = moment(firstMonth).format('MMMM');
        if (same == true) {
          var source = $("#entry-template").html();
          var template = Handlebars.compile(source);
          var monthD = {
            'DD' : day,
            'MMMM' : month
          };
          var html = template(monthD);
          $('.month').append(html);
        } else {
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
    },
    'error' : function(request, state, errors){
      alert(errors);
    }
  });

  // funzione per verificare la data nella chiamata

  function isSameData(date1Obj, date2){
    var length = date1Obj.response.length;
    var i = 0;
    var result = false;
    while (i < length && result == false){
      result = moment(date1Obj.response[i].date).isSame(date2, 'day');
      i++;
    }
    return result;
  }

  function whichFestivity(date1Obj, date2){
    var length = date1Obj.response.length;
    var i = 0;
    var result = false;
    while (i < length && result == false){
      result = moment(date1Obj.response[i].date).isSame(date2, 'day');
      i++;
    }
    return result;
  }

});
