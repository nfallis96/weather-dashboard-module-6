// assign global variables for the application
var input = document.getElementById("city-input");
var search = document.getElementById("search-button");
var clear = document.getElementById("clear-history");
var cityName = document.getElementById("city-name");
var currentPic = document.getElementById("current-pic");
var currentTemp = document.getElementById("temperature");
var currentHumidity = document.getElementById("humidity");
var currentWind = document.getElementById("wind-speed");
var historyEl = document.getElementById("history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// open weather API key
var apiKey = "90c48e0b1405c1cb823bcd2762acea8d"

// populate cities 
function weatherData(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial")
        .then((data) => data.json())
        .then(data => {
            cityName.innerHTML = data.name
            currentTemp.innerHTML = "Temp: " + data.main.temp + " &#176F"
            currentHumidity.innerHTML = "Hum: " + data.main.humidity + " %"
            currentWind.innerHTML = "Wind: " + data.wind.speed + " mph"
            currentPic.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            currentPic.setAttribute("alt", data.weather[0].description);
            fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + data.id + "&appid=" + apiKey + "&units=imperial")
                .then((data) => data.json())
                .then(data => {
                    console.log(data)
                    let forecastEl = document.querySelectorAll(".forecast")
                    for (let i = 0; i < forecastEl.length; i++) {
                        forecastEl[i].innerHTML = ""
                        const forecastIndex = i * 8 + 4;
                        const forecastWeather = document.createElement("img");
                        forecastWeather.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png");
                        forecastWeather.setAttribute("alt", data.list[forecastIndex].weather[0].description);
                        forecastEl[i].append(forecastWeather);
                        const forecastTemp = document.createElement("p")
                        forecastTemp.innerHTML = "Temp: " + data.list[forecastIndex].main.temp + " &#176F"
                        forecastEl[i].append(forecastTemp)
                        const forecastHum = document.createElement("p")
                        forecastHum.innerHTML = "Hum: " + data.list[forecastIndex].main.humidity + " %"
                        forecastEl[i].append(forecastHum)
                        const forecastWind = document.createElement("p")
                        forecastWind.innerHTML = "Wind: " + data.list[forecastIndex].wind.speed + " mph"
                        forecastEl[i].append(forecastWind)
                    }
                })
        })
}




search.addEventListener("click", function () {
    const searchedCity = input.value;
    weatherData(searchedCity);
    searchHistory.push(searchedCity)
    localStorage.setItem("city", JSON.stringify(searchHistory))
    renderHistory()
})

clear.addEventListener("click", function() {
    searchHistory = []
    renderHistory()
})

function renderHistory() {
 historyEl.innerHTML = "";
 for(let i = 0; i < searchHistory.length; i++) {
    const historyItem = document.createElement("input")
    historyItem.setAttribute("type", "text")
    historyItem.setAttribute("readonly", "true")
    historyItem.setAttribute("class", "form-control d-block bg-grey")
    historyItem.setAttribute("value", searchHistory[i])
    historyItem.addEventListener("click", function() {
        weatherData(historyItem.value)
    })
    historyEl.appendChild(historyItem)
 }
}

renderHistory();
