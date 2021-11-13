const APIKEY = "005011f83aefc4124408a175063fc043"

document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  document.getElementById("container").classList.remove("land");

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=" + APIKEY;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += "<h2>Weather in " + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	       results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	       results += json.weather[i].description
	        if (i !== json.weather.length - 1)
	         results += ", "
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=" + APIKEY;
    let usedDates = [];
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let forecast = "";
        for (let i=0; i < json.list.length; i++) {
          forecast += "<div class='hour'>"
          let newDay = !usedDates.includes(moment(json.list[i].dt_txt).format('MMM Do'));
          if (newDay) {
            forecast += "<p class='day'>" + moment(json.list[i].dt_txt).format('MMM Do') + "</p>";
            usedDates.push(moment(json.list[i].dt_txt).format('MMM Do'));
          } else {
            forecast += "<p class='day dup'>.</p>";
          }
          forecast += "<div class='card forecast'><p>" + moment(json.list[i].dt_txt).format('h:mm a') + "</p>";
        	forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
          forecast += "<p class='temp'>" + json.list[i].main.temp + " &deg;F</p></div></div>";
        }
        document.getElementById("forecastResults").innerHTML = forecast;
      });

});
