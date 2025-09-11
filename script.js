const search = document.querySelector('.fas.fa-search');
const input = document.querySelector('.searchbox');
const cityName = document.querySelector('.city-name');
const date = document.querySelector('.date');
const temp = document.querySelector('.temperature');
const weather = document.querySelector('.weather-type');
const humidity = document.querySelector('.humidity span');
const wind = document.querySelector('.wind span');
const icon = document.querySelector('.weather-icon');
const forecastCards = document.querySelectorAll('.forecast-day');

const apiKey = 'a5c0fae4b7fc460080481110251109';


search.addEventListener('click', function(){
    if(input.value === '')
    {
        alert("Please provide a valid city name")
    }
    else
    {
        getweather(input.value);
        forecast(input.value);
    }
    
    // console.log(input.value);
})

input.addEventListener('keyup' ,function() {
    if(event.key === 'Enter')
    {
        if(input.value === '')
        {
            alert("Please provide a valid city name");
        }
        else
        {
            getweather(input.value);
            forecast(input.value);
        }
    }
})

async function getweather(city) {
    try {
        // 1. Build the URL with city name and your key
        let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        // 2. Fetch the data
        let resposne = await fetch(url);
        // 3. Convert to JSON   
        let data = await resposne.json();
        // 4. Use the data (update UI)
        // console.log("Current Data:",  data);
    
        if (data.error) {
            alert("City not found. Please try again!");
            return;
        }
    
        cityName.innerHTML   = data.location.name;
        const localTime = data.location.localtime;
        const dayOfWeek = new Date(localTime).toLocaleDateString('en-US', { weekday: 'long' });
        date.innerHTML = `${localTime}<br>${dayOfWeek}`;
        temp.innerHTML = data.current.temp_c + "°C";
        weather.innerHTML = data.current.condition.text;
        humidity.innerHTML = data.current.humidity + "%";
        wind.innerHTML = data.current.wind_kph + " km/h";
        icon.innerHTML = `<img src="https:${data.current.condition.icon}" alt="weather icon">`;
    } catch(error) {
        alert("Failed to fetch weather data. Please check your internet connection.");
        }

}

async function forecast(city) {
    try {
        let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;
        let response = await fetch(url);
        let data = await response.json();
        // console.log("Forecast data:", data.forecast.forecastday);

         if (data.error) {
            alert("City not found. Please try again!");
            return;
        }
        
        // Convert date to weekday (Mon, Tue, etc.)
        data.forecast.forecastday.forEach((dayData, index) => {
            if(index < forecastCards.length) {
                let weekday = new Date(dayData.date).toLocaleDateString('en-US', { weekday: 'short'})
    
                let card = forecastCards[index];
                card.querySelector('.day').innerHTML = weekday;
                card.querySelector('.temp').innerHTML = dayData.day.maxtemp_c + "°C";
                card.querySelector('.icon').innerHTML = `<img src="https:${dayData.day.condition.icon}" alt="icon">`;
            }
        });
    } catch(error) {
            alert("Failed to fetch weather data. Please check your internet connection.");
        }
}
