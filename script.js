const apiKey = 'e20f701cb403e2be19776ae616ca4619';
const city = 'Dhaka';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
const preferredUnit = 'metric'; 
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log('API Response:', data);

    const forecastContainer = document.getElementById('forecast-container');

    const dailyData = data.list.filter(entry => entry.dt_txt.includes('12:00:00'));

    dailyData.forEach(dayData => {
      const date = new Date(dayData.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

      const convertedTemperature = (preferredUnit === 'metric' ? dayData.main.temp - 273.15 : (dayData.main.temp - 273.15) * 9/5 + 32);

      const roundedTemperature = convertedTemperature.toFixed(1);

      const unitSymbol = (preferredUnit === 'metric' ? '°C' : '°F');

      const iconUrl = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.innerHTML = `
        <p>${dayName}</p>
        <img src="${iconUrl}" alt="${dayData.weather[0].description}">
        <p>${roundedTemperature} ${unitSymbol}</p>
      `;

      forecastContainer.appendChild(dayElement);
    });
  })
  .catch(error => console.error('Error fetching weather data:', error));
