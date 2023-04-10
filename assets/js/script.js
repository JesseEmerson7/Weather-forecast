$(document).ready(function () {
  //sets locationArray to an array with info from local storage or if empty an empty array
  const locationArray = JSON.parse(localStorage.getItem("locations")) || [];
  displayHistory();

  //this function takes the input from the search bar and trims white space. If it is not an empty input it is saved into the locationArray and updates the array with the new city name.
  function localSearch() {
    let searchInput = document.getElementById("search-input").value.trim();
    if (searchInput.trim() !== "") {
      locationArray.push(searchInput);
    }
    localStorage.setItem("locations", JSON.stringify(locationArray));
  }
  //displays the contents of the locationArray onto the page as buttons
  function displayHistory() {
    $("#history-displayed").empty();
    for (i = 0; i < locationArray.length; i++) {
      let ListItemBtn = $("<button>");
      ListItemBtn.text(locationArray[i]).addClass("search-history-btn");
      $("#history-displayed").prepend(ListItemBtn);
    }
  }

  //if the search history buttons are clicked the page is wiped and the fetch to location api is started. the data is then passed to the weather api after checks on the response are made.
  $("#history-displayed").click(function (event) {
    searchTerm = event.target.innerText;
    console.log(searchTerm);
    console.log(event.target.innerText);

    $("#todays-weather").empty();
    $(".cards").empty();

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=bbbb7f099358f595a34abd46aedb1c99`
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

  //city name input is used to fetch location data from api when search button is clicked and data is sent to weather api after response status is checked.
  function cityInfo() {
    var cityInput = $("#search-input").val();
    $("#todays-weather").empty();
    $(".cards").empty();

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
  }

  //weather data is collected with a fetch to openweathermap api. response status is checked. data is sent to day one function and 5 day forecast function.
  function fetchingWeather(dataInfo) {
    console.log(dataInfo);
    var latitude = dataInfo.lat;
    var longitude = dataInfo.lon;

    console.log(latitude);
    console.log(longitude);

    fetch(
      `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&appid=e081906e41053d0045aef1f5836faf73&units=imperial`
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
        displayDayOne(data);
        displayCards(data.list);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //displays weather info for the current days weather conditions.
  function displayDayOne(dayOneData) {
    console.log(dayOneData.city.name);

    let topImg = $(
      `<img src="https://openweathermap.org/img/wn/${dayOneData.list[0].weather[0].icon}.png" alt="Weather icon" id='top-image'>`
    );

    let title = $("<h3>")
      .addClass("day-header")
      .text(dayOneData.city.name + " " + dayjs().format("(ddd, MMM/DD/YY)"));
    title.append(topImg);

    let dayTemp = $("<p>")
      .addClass("weather-info")
      .text("Temp: " + dayOneData.list[0].temp.day + " °F");

    let dayWind = $("<p>")
      .addClass("weather-info")
      .text("Wind Speed: " + dayOneData.list[0].speed + " MPH");

    let dayHumidity = $("<p>")
      .addClass("weather-info")
      .text("Humidity: " + dayOneData.list[0].humidity + " %");

    $("#todays-weather")
      .append(title)
      .append(dayTemp)
      .append(dayWind)
      .append(dayHumidity);
  }
  //5 day forecast data is sorted and displayed on the page into the card divs.
  function displayCards(cardData) {
    console.log(cardData);

    let cardOne = $("#card-1").addClass("cards");
    let cardTwo = $("#card-2").addClass("cards");
    let cardThree = $("#card-3").addClass("cards");
    let cardFour = $("#card-4").addClass("cards");
    let cardFive = $("#card-5").addClass("cards");

    cardOne
      .append($("<h4>").text(dayjs().add(1, "day").format("dddd(M/D/YY)")))
      .append(
        `<img src="https://openweathermap.org/img/wn/${cardData[1].weather[0].icon}.png" alt="Weather icon ">`
      )
      .append($("<p>").text("Temp: " + cardData[1].temp.day + " °F"))
      .append($("<p>").text("Wind Speed: " + cardData[1].speed + " MPH"))
      .append($("<p>").text("Humidity: " + cardData[1].humidity + " %"));

    cardTwo
      .append($("<h4>").text(dayjs().add(2, "day").format("dddd(M/D/YY)")))
      .append(
        `<img src="https://openweathermap.org/img/wn/${cardData[2].weather[0].icon}.png" alt="Weather icon">`
      )
      .append($("<p>").text("Temp: " + cardData[2].temp.day + " °F"))
      .append($("<p>").text("Wind Speed: " + cardData[2].speed + " MPH"))
      .append($("<p>").text("Humidity: " + cardData[2].humidity + " %"));

    cardThree
      .append($("<h4>").text(dayjs().add(3, "day").format("dddd(M/D/YY)")))
      .append(
        `<img src="https://openweathermap.org/img/wn/${cardData[3].weather[0].icon}.png" alt="Weather icon">`
      )
      .append($("<p>").text("Temp: " + cardData[3].temp.day + " °F"))
      .append($("<p>").text("Wind Speed: " + cardData[3].speed + " MPH"))
      .append($("<p>").text("Humidity: " + cardData[3].humidity + " %"));

    cardFour
      .append($("<h4>").text(dayjs().add(4, "day").format("dddd(M/D/YY)")))
      .append(
        `<img src="https://openweathermap.org/img/wn/${cardData[4].weather[0].icon}.png" alt="Weather icon">`
      )
      .append($("<p>").text("Temp: " + cardData[4].temp.day + " °F"))
      .append($("<p>").text("Wind Speed: " + cardData[4].speed + " MPH"))
      .append($("<p>").text("Humidity: " + cardData[4].humidity + " %"));

    cardFive
      .append($("<h4>").text(dayjs().add(5, "day").format("dddd(M/D/YY)")))
      .append(
        `<img src="https://openweathermap.org/img/wn/${cardData[5].weather[0].icon}.png" alt="Weather icon">`
      )
      .append($("<p>").text("Temp: " + cardData[5].temp.day + " °F"))
      .append($("<p>").text("Wind Speed: " + cardData[5].speed + " MPH"))
      .append($("<p>").text("Humidity: " + cardData[5].humidity + " %"));
  }
  //search history button
  $("#search-btn").click(function () {
    cityInfo();
    localSearch();
    displayHistory();
  });
});
