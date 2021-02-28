// current date and time
let now = new Date();

function formatDate(todaysDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[todaysDate.getDay()];
  let currentHour = todaysDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = todaysDate.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let currentTime = `${currentHour}:${currentMinute}`;

  let dateTime = document.querySelector("#dateTime");
  dateTime.innerHTML = `${currentDay} ${currentTime}`;

  let formattedDate = `${currentDay} ${currentTime}`;

  return formattedDate;
}

console.log(now);
console.log(formatDate(now));
// end of local date and time

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentHour}:${currentMinute}`;
}


// start forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(forecast);

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="col-sm-2">
        <div class="card text-center">
          <h5 class="card-title daysOfWeek">
            ${formatHours(forecast.dt * 1000)}
          </h5>
          <img
            src="https://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
            class="iconIcon"
          />
          <div class="card-body">
            <p class="card-text">
                ${Math.round(forecast.main.temp_min)}° | 
              <strong>
                ${Math.round(forecast.main.temp_max)}°
              </strong>
            </p>
          </div>
        </div>
      </div>
    `;
  }

}
// END forecast

// search engine
function searchCity(event) {
  event.preventDefault();
  let units = "metric";
  let apiKey = "31856a05b9b062fb137620991f56055f";
  let cityInput = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
// search engine END
// API City Search
function showTemperature(response) {
  console.log(response.data);

  celciusTemperature = response.data.main.temp;

  let temperature = Math.round(celciusTemperature);
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = temperature;

    if (temperature <= 18) {
      document.getElementById("funWeatherDescription").innerHTML = "Brrr... It's cold out here, better chuck on another layer.";
    } else if (temperature >= 26) {
      document.getElementById("funWeatherDescription").innerHTML = "It's a hot one. Slip, Slop, Slap and Drink more water.";
    } else {
      document.getElementById("funWeatherDescription").innerHTML = "Would you LOOK at that! Perfect temperature, enjoy your day!";
    }

  let cityName = response.data.name;
  let currentCityName = document.querySelector(".currentLocation");
  currentCityName.innerHTML = cityName;
  
  celciusFeelsLikeTemperature = response.data.main.feels_like; 

  let feelsLike = Math.round(celciusFeelsLikeTemperature);
  let currentFeelsLike = document.querySelector("#feelsLike");
  currentFeelsLike.innerHTML = feelsLike;

  celciusMaxTemp = response.data.main.temp_max;

  let tempMax = Math.round(celciusMaxTemp);
  let currentTempMax = document.querySelector("#tempMax");
  currentTempMax.innerHTML = tempMax;

  celciusMinTemp = response.data.main.temp_min;

  let tempMin = Math.round(celciusMinTemp);
  let currentTempMin = document.querySelector("#tempMin");
  currentTempMin.innerHTML = tempMin;

  let tempHumidity = response.data.main.humidity;
  let currentTempHumidity = document.querySelector("#tempHumidity");
  currentTempHumidity.innerHTML = tempHumidity;

  let windSpeed = response.data.wind.speed;
  let currentWindSpeed = document.querySelector("#windSpeed");
  currentWindSpeed.innerHTML = windSpeed;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
}
// API City Search END

// GeoLocation
function retrievePosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "31856a05b9b062fb137620991f56055f";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let geoLocationButton = document.querySelector("#geoLocation");
geoLocationButton.addEventListener("click", getPosition);
// GeoLocation END

// celcius fahrenheit switch unit links

function convertFDegree(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  cTemp.classList.remove("active");
  fTemp.classList.add("active");
  let fahrenheitTemperature = ((celciusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fTemp = document.querySelector("#fahrenheit-link");
fTemp.addEventListener("click", convertFDegree);

function convertCDegree(event) {
  event.preventDefault();
  cTemp.classList.add("active");
  fTemp.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let cTemp = document.querySelector("#celcius-link");
cTemp.addEventListener("click", convertCDegree);

let celciusTemperature = null;

// celcius fahrenheit switch on Feels Like

function convertFeelsLikeF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#feelsLike");
  let fahrenheitTemperature = ((celciusFeelsLikeTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let feelsLikeF = document.querySelector("#fahrenheit-link");
feelsLikeF.addEventListener("click", convertFeelsLikeF);

function convertFeelsLikeC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#feelsLike");
  temperatureElement.innerHTML = Math.round(celciusFeelsLikeTemperature);
}

let feelsLikeC = document.querySelector("#celcius-link");
feelsLikeC.addEventListener("click", convertFeelsLikeC);

let celciusFeelsLikeTemperature = null;

// celcius fahrenheit switch on Max

function convertMaxF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempMax");
  let fahrenheitTemperature = ((celciusMaxTemp * 9) / 5 + 32);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let maxF = document.querySelector("#fahrenheit-link");
maxF.addEventListener("click", convertMaxF);

function convertMaxC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempMax");
  temperatureElement.innerHTML = Math.round(celciusMaxTemp);
}

let maxC = document.querySelector("#celcius-link");
maxC.addEventListener("click", convertMaxC);

let celciusMaxTemp = null;

// celcius fahrenheit switch on Min

function convertMinF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempMin");
  let fahrenheitTemperature = ((celciusMinTemp * 9) / 5 + 32);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let minF = document.querySelector("#fahrenheit-link");
minF.addEventListener("click", convertMinF);

function convertMinC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempMin");
  temperatureElement.innerHTML = Math.round(celciusMinTemp);
}

let minC = document.querySelector("#celcius-link");
minC.addEventListener("click", convertMinC);

let celciusMinTemp = null;

// END celcius fahrenheit switch on Min