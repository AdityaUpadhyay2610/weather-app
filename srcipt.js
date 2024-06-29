const apiKey = "e9571403308894749261ed91fc083414";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const seachBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".wheather-icon");

const toggleButton = document.getElementById("toggleButton");

const datetimeElement = document.getElementById("datetime");

function updateDateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    datetimeElement.textContent = `${time}\n(${date})`;
}
updateDateTime();
setInterval(updateDateTime, 1000); 

toggleButton.addEventListener("click", () => {
  const isDarkMode =!document.body.classList.contains("dark-mode");
  document.body.classList.toggle("dark-mode", isDarkMode);
  toggleButton.textContent = isDarkMode? "Dark" : "Light";
});


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);git 

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML= data.wind.speed + " km/hr";

    if (data.weather[0].main == "Clouds"){
        weatherIcon.src = "image/clouds.png"

    }
    else if (data.weather[0].main == "Clear"){
        weatherIcon.src = "image/clear.png"

    }
    else if (data.weather[0].main == "Rain"){
        weatherIcon.src = "image/rain.png"

    }
    else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src = "image/drizzle.png"

    }
    else if (data.weather[0].main == "Mist"){
        weatherIcon.src = "image/mist.png"

    }
    else if (data.weather[0].main == "Haze"){
        weatherIcon.src = "image/clear.png"

    }
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(seachBox.value);

});



