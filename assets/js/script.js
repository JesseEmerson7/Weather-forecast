// http://api.openweathermap.org/geo/1.0/direct?q=Orlando&limit=5&appid=bbbb7f099358f595a34abd46aedb1c99
//fetch request for coords based on users search. Need to connect users input from the input and sent request with that value. get lat and long from that request and then use that lat and long to get weather api weather forecast to display on page.

//event listener for search btn taht takes the search-input value and uses that value to get coordinates from the api.  then promise begins a function that takes the fetch response and returns it to a JS object. Then The data from that response is console logged. errors are also console logged

$("#search-btn").click(function cityInfo() {

  var cityInput = $("#search-input").val();
   $('#todays-weather').empty();
   $('.cards').empty();
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


  fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=e081906e41053d0045aef1f5836faf73&units=imperial`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        window.alert("Error");
      }
    })
    .then(function (data) {
      console.log(data);
      displayDayOne(data)
      displayCards(data.list)
    })
    .catch(function (error) {
      console.log(error);
    });
}



function displayDayOne(dayOneData){
    console.log(dayOneData.city.name)

    let topImg = $(`<img src="https://openweathermap.org/img/wn/${dayOneData.list[0].weather[0].icon}.png" alt="Weather icon" id='top-image'>`)

    let title = $('<h3>').addClass('day-header').text(dayOneData.city.name + " " + dayjs().format('(MM/DD/YYYY)'));
    title.append(topImg)

    let dayTemp = $('<p>').addClass('weather-info').text('Temp: ' +dayOneData.list[0].temp.day+ " °F")

    let dayWind = $('<p>').addClass('weather-info').text('Wind Speed: ' + dayOneData.list[0].speed + ' MPH')

    let dayHumidity =  $('<p>').addClass('weather-info').text('Humidity: ' + dayOneData.list[0].humidity + ' %')

    

    $('#todays-weather').append(title).append(dayTemp).append(dayWind).append(dayHumidity);

};


function displayCards(cardData){
  console.log(cardData);

  let cardOne = $('#card-1').addClass('cards');
  let cardTwo = $('#card-2').addClass('cards');
  let cardThree = $('#card-3').addClass('cards');
  let cardFour = $('#card-4').addClass('cards');
  let cardFive = $('#card-5').addClass('cards');

  cardOne.append($('<h4>').text(dayjs().add(1, 'day').format('MM/DD/YY'))).append(`<img src="https://openweathermap.org/img/wn/${cardData[1].weather[0].icon}.png" alt="Weather icon ">`).append($('<p>').text('Temp: '+cardData[1].temp.day + ' °F')).append($('<p>').text('Wind Speed: '+cardData[1].speed + ' MPH')).append($('<p>').text('Humidity: '+cardData[1].humidity + ' %'));

  cardTwo.append($('<h4>').text(dayjs().add(2, 'day').format('MM/DD/YY'))).append(`<img src="https://openweathermap.org/img/wn/${cardData[2].weather[0].icon}.png" alt="Weather icon">`).append($('<p>').text('Temp: '+cardData[2].temp.day + ' °F')).append($('<p>').text('Wind Speed: '+cardData[2].speed + ' MPH')).append($('<p>').text('Humidity: '+cardData[2].humidity + ' %'));

  cardThree.append($('<h4>').text(dayjs().add(3, 'day').format('MM/DD/YY'))).append(`<img src="https://openweathermap.org/img/wn/${cardData[3].weather[0].icon}.png" alt="Weather icon">`).append($('<p>').text('Temp: '+cardData[3].temp.day + ' °F')).append($('<p>').text('Wind Speed: '+cardData[3].speed + ' MPH')).append($('<p>').text('Humidity: '+cardData[3].humidity + ' %'));

  cardFour.append($('<h4>').text(dayjs().add(4, 'day').format('MM/DD/YY'))).append(`<img src="https://openweathermap.org/img/wn/${cardData[4].weather[0].icon}.png" alt="Weather icon">`).append($('<p>').text('Temp: '+cardData[4].temp.day + ' °F')).append($('<p>').text('Wind Speed: '+cardData[4].speed + ' MPH')).append($('<p>').text('Humidity: '+cardData[4].humidity + ' %'));

  cardFive.append($('<h4>').text(dayjs().add(5, 'day').format('MM/DD/YY'))).append(`<img src="https://openweathermap.org/img/wn/${cardData[5].weather[0].icon}.png" alt="Weather icon">`).append($('<p>').text('Temp: '+cardData[5].temp.day + ' °F')).append($('<p>').text('Wind Speed: '+cardData[5].speed + ' MPH')).append($('<p>').text('Humidity: '+cardData[5].humidity + ' %'));



};