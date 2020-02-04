$(document).ready(function(){

  //stampo a schermo tutti i giorni del mese

  var thisMonth = 0;
  var year = 2018;
  var baseMonth = moment({
    'year' : year,
    'month' : thisMonth
  });

  getDaysMonth(baseMonth);
  getHoliday(baseMonth);


  function getDaysMonth(month){
    // genero dinamicamente l'h1 visualizzandolo a lettere con l'anno vicino
    $('h1').text(month.format('MMMM YYYY'));
    // ciclo che genera i numeri del mese + nome del mese tutto stampato su html
    for(var i = 1; i <= 31; i++){
      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);
      // oggetto da stampare con handlebars
      var context = {
        // i giorni sono = all i che cicla
        'day' : i,
        // i mesi sono uguali al valore (month) che andremo a passare alla nostra funzione e verrà visualizzato in formato "lettere"
        'month' : month.format('MMMM'),
        // la data completa che servirà per identificare le varie festività che riceveremo tramite la chiamata api, è uguale al valore che passeremo alla nostra funzione (che ci mostrerà sia l'anno che il mese scritto questa volta in numeri) + il giorno che è la i che viene ciclata con la funzione addZero
        'dataComplete' : month.format('YYYY-MM') + '-' + addZeroDate(i)
      };
      var html = template(context);
      $('.month-days').append(html);
    }
  }

  function getHoliday(month){
    $.ajax({
      'url' : 'https://flynn.boolean.careers/exercises/api/holidays',
      'method' : 'GET',
      'data' : {
        'year' : month.year(),
        'month' : month.month()
      },
      'success' : function(data) {
        var holidays = data.response;
        for (var i = 0; i < holidays.length; i++) {
          var thisHoliday = holidays[i];
          var thisHolidayDate = thisHoliday.date;
          $('.day').each(function (){
            var dateElement = $(this).attr('data-date-complete');
            if (thisHolidayDate == dateElement) {
              $(this).addClass('holiday');
              $(this).find('.holiday-name').append(thisHoliday.name);
            }
          });
        }
      }
    });
  }

  // funzione per aggiungere lo zero prima del numero del giorno nei giorni fino a 10
  function addZeroDate(num){
    if (num < 10){
      return '0' + num;
    }
    return num;
  }

});
