// http://api.openweathermap.org/geo/1.0/direct?q=Orlando&limit=5&appid=bbbb7f099358f595a34abd46aedb1c99
//fetch request for coords based on users search. Need to connect users input from the input and sent request with that value. get lat and long from that request and then use that lat and long to get weather api weather forecast to display on page.

//event listener for search btn taht takes the search-input value and uses that value to get coordinates from the api.  then promise begins a function that takes the fetch response and returns it to a JS object. Then The data from that response is console logged. errors are also console logged

$("#search-btn").click(function cityInfo() {
  var cityInput = $("#search-input").val();

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=bbbb7f099358f595a34abd46aedb1c99`
  )
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        window.alert("Error");
      }
    })
    .then(function (data) {
      console.log(data);
      fetchingWeather(data[0]);
    })
    .catch(function (error) {
      console.error(error);
    });
});

function fetchingWeather(dataInfo) {
  console.log(dataInfo);
  var latitude = dataInfo.lat;
  var longitude = dataInfo.lon;

  console.log(latitude);
  console.log(longitude);

  fetch()
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        window.alert("Error");
      }
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
