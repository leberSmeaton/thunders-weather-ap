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
// end of date and time

// search engine
function searchCity(event) {
  // why event here?
  event.preventDefault();
  let units = "metric";
  let apiKey = "31856a05b9b062fb137620991f56055f";
  let cityInput = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
// search engine END
// API City Search
function showTemperature(response) {
  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = temperature;

    if (temperature <= 18) {
      document.getElementById("funWeatherDescription").innerHTML = "Brrr... It's chilly, better chuck on another layer.";
      document.getElementById("currentTempWeatherIcon").innerHTML = "<i class=\"fas fa-cloud\"></i>";
    } else if (temperature >= 26) {
      document.getElementById("funWeatherDescription").innerHTML = "It's a hot one. Slip, Slip, Slap and Drink more water.";
      document.getElementById("currentTempWeatherIcon").innerHTML = "<i class=\"fas fa-sun\"></i>";
    } else {
      document.getElementById("funWeatherDescription").innerHTML = "Would you LOOK at that! Perfect temperature, enjoy your day!";
      document.getElementById("currentTempWeatherIcon").innerHTML = "<i class=\"fas fa-rainbow\"></i>";
    }

  let cityName = response.data.name;
  let currentCityName = document.querySelector(".currentLocation");
  currentCityName.innerHTML = cityName;

  let feelsLike = Math.round(response.data.main.feels_like);
  let currentFeelsLike = document.querySelector("#feelsLike");
  currentFeelsLike.innerHTML = feelsLike;

  let tempMax = Math.round(response.data.main.temp_max);
  let currentTempMax = document.querySelector("#tempMax");
  currentTempMax.innerHTML = tempMax;

  let tempMin = Math.round(response.data.main.temp_min);
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

// celcius fahrenheit switch
// NOT WORKING... NAN?

function convertFDegree(event) {
  event.preventDefault();
  let degreeSwitch = document.querySelector("#temperature");
  if (degreeSwitch) {
    degreeSwitch.innerHTML = Math.round(degreeSwitch + 9 / 5 + 32);
  }
  console.log(degreeSwitch);
}

let fTemp = document.querySelector("#fahrenheit-link");
fTemp.addEventListener("click", convertFDegree);

function convertCDegree(event) {
  event.preventDefault();
  let degreeSwitch = document.querySelector("#temperature");
  if (degreeSwitch) {
    degreeSwitch.innerHTML = Math.round((degreeSwitch / 9) * 5 - 32);
  }
  console.log(degreeSwitch);
}

let cTemp = document.querySelector("#celcius-link");
cTemp.addEventListener("click", convertCDegree);
