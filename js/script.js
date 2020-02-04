$(document).ready(function(){

  var thisMonth = 0;
  var year = 2018;
  var baseMonth = moment({
    'year' : year,
    'month' : thisMonth
  });

  $(document).on('click', '.next', function(){
    // dalla variabile prendo il valore corrente dell'attributo ('data-this month' generato a riga 35)
    var thisMonth = $('h1').attr('data-this-month');
    // lo trasformiamo in un oggetto moment e usuiamo la funzione add per aggiungere un mese e passare a quello successivo
    var momentMonth = moment(thisMonth).add(1, 'M');
    // chiamiamo la funzione per generare il calendario del mese corrente
    getDaysMonth(momentMonth);
    // chiamiamo la funzione per generare le date dei giorni di vacanza del mese corrente
    getHoliday(momentMonth);

  });
  $(document).on('click', '.prev', function(){
    // dalla variabile prendo il valore corrente dell'attributo ('data-this month' generato a riga 35)
    var thisMonth = $('h1').attr('data-this-month');
    // lo trasformiamo in un oggetto moment e usuiamo la funzione subtract per rimuovere un mese e passare a quello successivo
    var momentMonth = moment(thisMonth).subtract(1, 'M');
    // chiamiamo la funzione per generare il calendario del mese corrente
    getDaysMonth(momentMonth);
    // chiamiamo la funzione per generare le date dei giorni di vacanza del mese corrente
    getHoliday(momentMonth);
  });

  // chiamo la funzione per generare il calendario del primo mese all'apertura della pagina
  getDaysMonth(baseMonth);
  // chiamo la funzione per cercare nella chiamata api i giorni di festa nel mese attuale
  getHoliday(baseMonth);
  console.log(thisMonth);


  function getDaysMonth(month){
    // rimuoviamo tutti gli li
    $('.month-days li').remove();
    // genero dinamicamente l'h1 visualizzandolo a lettere con l'anno vicino
    $('h1').text(month.format('MMMM YYYY'));
    // aggiungiamo l'attribuito (data-this-month) al nostro h1 tramite jquery passandogli il il mese in formato numeri (month.format('YYYY-MM')) così da poter fare piu facilmente e chiaramente una funzione per spostarci tra i mesi e far apparire a schermo il nome del mese corrente con l'anno
    $('h1').attr('data-this-month', month.format('YYYY-MM'));
    if (moment(month).isSame('2018', 'year') == true){
      // definisco con questa variabile, tramite la funzione omonima, il numero dei giorni di ogni mese
      var daysInMonth = month.daysInMonth();
      // ciclo che genera i numeri del mese + nome del mese tutto stampato su html
      for(var i = 1; i <= daysInMonth; i++){
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        // oggetto da stampare con handlebars
        var context = {
          // i giorni sono = all' i che cicla
          'day' : i,
          // i mesi sono uguali al valore (month) che andremo a passare alla nostra funzione e verrà visualizzato in formato "lettere"
          'month' : month.format('MMMM'),
          // la data completa che servirà per identificare le varie festività che riceverò tramite la chiamata api, è uguale al valore che passeremo alla nostra funzione (che ci mostrerà sia l'anno che il mese scritto questa volta in numeri) + il giorno che è la i che viene ciclata con la funzione addZero
          'dataComplete' : month.format('YYYY-MM') + '-' + addZeroDate(i)
        };
        var html = template(context);
        $('.month-days').append(html);
      }
    } else {
      alert('Data non accessibile');
    }
  }

  function getHoliday(month){
    // faccio una chiamata al server
    $.ajax({
      'url' : 'https://flynn.boolean.careers/exercises/api/holidays',
      'method' : 'GET',
      // chiedo la chiave anno (valore che immettiamo nella funzione.year()) e chiedo la chiave mese (valore che immettiamo nella funzione.month())
      'data' : {
        'year' : month.year(),
        'month' : month.month()
      },
      'success' : function(data) {
        // i giorni di festa sono il data che esce dalla chiamata.response
        var holidays = data.response;
        // faccio un ciclo sull'array (data.response)
        for (var i = 0; i < holidays.length; i++) {
          // una singola vacanza (data.response[i])
          var thisHoliday = holidays[i];
          // la singola data di un solo giorno di vacanza (data.response[i].date)
          var thisHolidayDate = thisHoliday.date;
          // passo in rassegna con la funzione each tutti i .day che ho generato dinamicamente
          $('.day').each(function (){
            // vado a valutare il valore che ho nell'attributo 'data-date-complete'
            var dateElement = $(this).attr('data-date-complete');
            // se il valore che ho valutato al passaggio prima è utuale alla data che ho ricevuto dalla chiamata api (data.response[i].date)
            if (thisHolidayDate == dateElement) {
              // allora aggiungo la classe holiday al quell'li specifico che sto prendendo in considerazione in questo momento tramite l'each
              $(this).addClass('holiday');
              // qui cerco l'elemento con la classe 'holiday-name' e ci aggiungo il nome della festività (data.reponse[i].name)
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
