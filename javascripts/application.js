(function() {
  var REFERENCE_DATE = new Date(2015,3,16);
  var STEP = 6;
  var FORMAT = "dddd D [de] MMMM";

  function nextDate(date) {
    var nextDate = new Date(date);
    nextDate.setDate(date.getDate()+STEP);

    return nextDate;
  }

  function nextDates(count) {
    var nextDates = [];
    var date = new Date(REFERENCE_DATE);

    while (nextDates.length < count) {
      if (date > new Date()) {
        nextDates.push(new Date(date));
      }

      date = nextDate(date);
    }

    return nextDates;
  }

  function lastDate() {
    var date = new Date(REFERENCE_DATE);
    var next;

    while (next = nextDate(date)) {
      if (next > new Date()) {
        return date;
      } else {
        date = next;
      }
    }
  }

  function printDate(date) {
    return moment(date).locale("es").format(FORMAT);
  }

  function printFromNow(date) {
    return moment(date).locale("es").fromNow();
  }


  $(function() {
    var dates = nextDates(20);

    $('#last-date').append(printDate(lastDate()));
    $('#last-ago').append(printFromNow(lastDate()));

    $.each(dates, function(index,date) {
      var el = $('#next-dates').append('<tr><td>'+printDate(date)+'</td></tr>');
      if (index == 0) {
        $('td',el).append(' <span>('+printFromNow(date)+')</span>');
      }
    })
  });
})();
