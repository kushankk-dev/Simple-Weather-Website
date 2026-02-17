// WEATHER WEBSITE
 
const weatherForm = document.querySelector(".weatherForm");
const cityName = document.querySelector(".cityName");
const card = document.querySelector(".card");
const api_Key = "YOUR_OWN_API_KEY"; // Generate a Free API Key from OpenWeather.org 

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    // When user submits empty string
    cityName.addEventListener("input", () => {
    cityName.classList.remove("invalid");
});

    const city = cityName.value;

    if (city){
    // Spinner loader to show loading    
    card.style.display = "flex";
    card.innerHTML = '<div class="loader"></div>';
    // spinner added before fetching to show some loading and can be used if many fetch requests
        try{
            const weatherData = await fetchWeather(city);
            dispWeather(weatherData);
        }
        catch(error){
            console.error(error);
            dispError("City not found. Please try again.");
        }
    }
    else{
        dispError("Please Enter a Valid City");
        // Shaker and red border for empty submit
        cityName.classList.add("invalid", "shake");
        // Remover when user starts typing
        cityName.addEventListener("animationend", () => {
            cityName.classList.remove("shake");
        }, { once: true });
    }
});

async function fetchWeather(city){
    const api_URL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}&units=metric`;// converted units in api_URL instead of tempDisp
    // Spinner delayer for resolving fast internet immediate fetch
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = await fetch(api_URL);
    if(!response.ok){
        throw new Error("Can't fetch data!");
    }
    // console.log(response);
    return await response.json();

}
function dispWeather(data){
    
//    console.log(data); for pre checking in console
//    // Destructuring weather data from API response
      const {name: city, sys:{country}, main:{temp, humidity, feels_like}, weather:[{description, id}]} = data;
      card.textContent = "";
      card.style.display = "flex";
      const cityName = document.createElement("h1");
      const tempDisp = document.createElement("p");
      const humidityDisp = document.createElement("p");
      const descriptionDisp = document.createElement("p");
      const weatherEmoji = document.createElement("p");
      const feelsLikeDisp = document.createElement("p");

      feelsLikeDisp.textContent = `Feels like: ${feels_like.toFixed(1)}°C`;
      cityName.textContent = `${city}, ${country}`;
      tempDisp.textContent = `${(temp).toFixed(1)}°C`;
      humidityDisp.textContent = `Humidity- ${humidity}%`;
      descriptionDisp.textContent = description;
      weatherEmoji.textContent = fetchWeatherEmoji(id);


      cityName.classList.add("cityDisp");
      tempDisp.classList.add("tempDisp");
      humidityDisp.classList.add("humidityDisp");
      descriptionDisp.classList.add("descriptionDisp");
      weatherEmoji.classList.add("weatherEmoji");
      feelsLikeDisp.classList.add("humidityDisp");

      card.appendChild(cityName);
      card.appendChild(tempDisp);
      card.appendChild(humidityDisp);
      card.appendChild(descriptionDisp);
      card.appendChild(weatherEmoji);
      card.appendChild(feelsLikeDisp);


      // New Added Code
      card.classList.remove("cold","mild","warm","hot");

      if(temp <= 10){
    card.classList.add("cold");
      }else if(temp <= 25){
    card.classList.add("mild");
      }else if(temp <= 35){
    card.classList.add("warm");
     }else{
    card.classList.add("hot");
     }

     // Change page background based on temperature
if(temp <= 10){
    document.body.style.background =
        "linear-gradient(135deg, #74ebd5, #ACB6E5)";
}
else if(temp <= 25){
    document.body.style.background =
        "linear-gradient(135deg, #a8e063, #56ab2f)";
}
else if(temp <= 35){
    document.body.style.background =
        "linear-gradient(135deg, #f7971e, #ffd200)";
}
else{
    document.body.style.background =
        "linear-gradient(135deg, #ff512f, #dd2476)";
}


}
function fetchWeatherEmoji(weather_id){
    // Weather emojis addition based on weather_id from API Classification
    switch(true){
        case (weather_id >= 200 && weather_id < 300):
        return "⛈️"; // thunderstorm
        case (weather_id >= 300 && weather_id < 400):
        return "🌧️"; // drizzle
        case (weather_id >= 500 && weather_id < 600):
        return "🌧️"; // rain
        case (weather_id >= 700 && weather_id < 800):
        return "🌞"; // sunny
        case (weather_id === 800):
        return "🌤️"; // sunny or clear skies
        case (weather_id >= 801 && weather_id < 810):
        return "☁️"; 
        default :
        return "🤔"; // for when value out of above cases
    }
}
// Displaying of error message 
function dispError(message){
    const errorDisp = document.createElement("p");
    errorDisp.textContent = message;
    errorDisp.classList.add("errorDisp");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisp);
}


