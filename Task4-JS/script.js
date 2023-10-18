async function weather () {
    let img = document.getElementById('text-icon');
    // Create image element
    let dynamicImage = document.createElement('img');
    // Remove old image value
    if (img.innerHTML) {
        img.innerHTML ="";
    }

    document.getElementById("loader").style.display = 'block';
    document.getElementById("weather-details").style.display = 'none';
    document.getElementById("no-result-found").style.display = 'none';

    const city = document.getElementById("city").value;

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}`;
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ca67a5a648msh419c931dc78af9bp175890jsn6e05a612687a',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
    };

    try {
        const response = await fetch(url, options);

        const result = await response.text();
        const finalResponse = JSON.parse(result);
        console.log('finalResponse', finalResponse)

        const currentWeather = finalResponse.current;
        if (currentWeather) {
        document.getElementById("weather-details").style.display = 'block';
        document.getElementById("loader").style.display = 'none';
        document.getElementById("no-result-found").style.display = 'none';

        document.getElementById("text-weather").innerHTML = currentWeather.condition.text;
        // Initialize the image source
        dynamicImage.src = `https:${currentWeather.condition.icon}`;
        // Add image to DOM
        img.appendChild(dynamicImage);
        
        document.getElementById("humidity").innerHTML =  currentWeather.humidity;
        document.getElementById("temperature-celsius").innerHTML =  currentWeather.temp_c;
        document.getElementById("temperature-fahrenheit").innerHTML = currentWeather.temp_f;
        document.getElementById("last_updated").innerHTML = currentWeather.last_updated;

    } else {
        document.getElementById("no-result-found").style.display = 'block';
        document.getElementById("loader").style.display = 'none';
         document.getElementById("weather-details").style.display = 'none';
        }
    } catch (error) {
        document.getElementById("loader").style.display = 'none';
        document.getElementById("no-result-found").style.display = 'block';
        console.error(error);
        document.getElementById("weather-details").style.display = 'none';
    }
    }