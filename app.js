// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0"; //api key

const weather = {};
weather.temperature = {
    unit: "celsius"
}

if("geolocation" in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else
{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
}

function setPosition(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getWeather(lat,long);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api).then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconID = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        console.log(data);
    }).then(displayWeather);
}


const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconID}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;

}

function celsiusToFahrenheit(cels){
    var fht = cels * 9 / 5 + 32;
    return fht;
}


tempElement.addEventListener("click",function(){
    if(weather.temperature.value === undefined)
        return;
    if(weather.temperature.unit ==="celsius"){
        let fht = celsiusToFahrenheit(weather.temperature.value);
        fht = Math.floor(fht);
        weather.temperature.unit = "fahrenheit";
        tempElement.innerHTML = `${fht}°<span>F</span>`;
    }
    else
    {
        weather.temperature.unit = "celsius";
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    }
});







