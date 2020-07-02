///current date///
let today = document.querySelector("span#today");
let now = new Date();
console.log(now);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let todays = days[now.getDay()];
console.log(todays);
today.innerHTML = `${todays}`;
let time = document.querySelector("span#time");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
console.log(now.getHours);
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
console.log(now.getMinutes);
time.innerHTML = `${hours}:${minutes}`;

///weather current location///
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#currenthumidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

///API///
function searchCity(city) {
  let apiKey = "1f29a8457a11c97a01e380819aae6d53";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("click", handleSubmit);

function showPosition(position) {
  let apiKey = "1f29a8457a11c97a01e380819aae6d53";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#geolocation");
button.addEventListener("click", getCurrentPosition);
searchCity("Berlin");

///Celsius Fahrenheit///

function showCelsius(response) {
  document.querySelector("#celsius-link").classList.add("tmp");
  document.querySelector("#fahrenheit-link").classList.remove("tmp");
  let currentTemp = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${currentTemp}`;
}

function getFahrenheit(event) {
  event.preventDefault();

  let apiKey = "d3565a1a83ca66a70607e27406dc0152";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showFahrenheit);
}

function showFahrenheit(response) {
  document.querySelector("#fahrenheit-link").classList.add("tmp");
  document.querySelector("#celsius-link").classList.remove("tmp");
  let currentTemp = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${currentTemp}`;
}