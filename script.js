// assign global variables for the application
var input = document.getElementById("city-input");
var search = document.getElementById("search-button");
var clear = document.getElementById("clear-history");
var name = document.getElementById("city-name");
var currentPic = document.getElementById("current-pic");
var currentTemp = document.getElementById("temperature");
var currentHumidity = document.getElementById("humidity");
var currentWind = document.getElementById("wind-speed");
var history = document.getElementById("history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// open
var apiKey = "90c48e0b1405c1cb823bcd2762acea8d"

function weatherData(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial")
        .then((data) => data.json())
        .then(data => {
            console.log(data)
        })
}

search.addEventListener("click", function () {
    const searchedCity = input.value;
    weatherData(searchedCity);
    searchHistory.push(searchedCity)
    localStorage.setItem("city", JSON.stringify(searchHistory))
})