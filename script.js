let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentTime = document.querySelector("#current-time");
if (hour < 10) {
  currentTime.innerHTML = `${day} <br /> 0${hour} : ${minute}`;
}
if (minute < 10) {
  currentTime.innerHTML = `${day} <br /> ${hour} : 0${minute}`;
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let h1 = (document.querySelector("h1").innerHTML = `${temperature}°`);

  let description = response.data.weather[0].main;
  let status = (document.querySelector("#status").innerHTML = description);

  let humidity = response.data.main.humidity;
  let humidityElement = (document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${humidity}%`);

  let wind = Math.round(response.data.wind.speed);
  let windElement = (document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${wind} mph`);
}

function search(city) {
  let apiKey = "f22ac1427987190f2bc60c389965004c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function searchTemperature(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "f22ac1427987190f2bc60c389965004c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}
function getCurrentLocation(event) {
  debugger;
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", getCurrentLocation);

let searchTemp = document.querySelector("#search-form");
searchTemp.addEventListener("submit", searchTemperature);

search("London");
