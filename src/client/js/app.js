// Geonames API and URL
const geoNameURL = 'http://api.geonames.org/searchJSON?q=';
const geoNameUsername = 'andreascacchi';

// Weatherbit API and URL
const weatherBitURL = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const weatherBitAPI = '1600fb6105a9450c851786ab67eb4437';

// Pixabay API and URL
const pixaBayURL = 'https://pixabay.com/api/?key=';
const pixaBayAPI = '19344538-371102874db6349622a031d1a';

// Button function
const myButton = document.querySelector(".btn");

function theButton() {
    myButton.addEventListener("click", function () {
        window.scrollTo({ behavior: "smooth", top: 0 });
    });
}
theButton();

//Variables for the local storage
const form = document.querySelector('form')
const ul = document.querySelector('ul')
const button = document.querySelector('button')
const input = document.getElementById('item')

//Global variables
const myTrip = document.querySelector(".planTheTrip");
const myResult = document.getElementById("results");
const dateNow = (Date.now()) / 1000;
const theInput = document.getElementById("theSubmit");
/*const buttonPrint = document.getElementById("generate");
const buttonChange = document.getElementById("delete");*/

/*document.getElementById("theSubmit").addEventListener("click", handleSubmit);*/
theInput.addEventListener("click", handleSubmit);
document.getElementById("print").addEventListener("click", handleSubmit);
document.getElementById("delete").addEventListener("click", handleSubmit);

//Async function for the user Input
function handleSubmit() {
    event.preventDefault();
    const first_city = document.getElementById("firstCity").value;
    const second_city = document.getElementById("secondCity").value;
    const departing = document.getElementById("date1").value;
    const arriving = document.getElementById("date2").value;

    const newDate = (new Date(arriving).getTime()) / 1000;

    //Client.checkInput(first_city, second_city);

    getCityInfo(geoNameURL, second_city, geoNameUsername)
    .then((cityInfo) => {
        const latitude = cityInfo.geonames[0].lat;
        const longitude = cityInfo.geonames[0].lng;
        const country = cityInfo.geonames[0].countryName;
        const weatherData = getWeather(latitude, longitude, country, newDate)
        return weatherData;
    })
    .then((weatherData) => {
        const daysToTravel = Math.round((newDate - dateNow) / 86400);
        const allData = postTravelData('http://localhost8080/add', { first_city, second_city, arriving, weather: weatherData.data[0].high_temp, description: weatherData.data[0].weather.description, daysToTravel });
        return allData;
    }).then((allData) => {
        showTrip(allData);
    })

}

    const getCityInfo = async (geoNameURL, second_city, geoNameUsername) => {
        const response = await fetch(geoNameURL + second_city + "username" + geoNameUsername);
        try {
            const cityData = await response.json();
            return cityData;
        } catch (error) {
            console.log("error", error);
        }
    };

    const getWeather = async (latitude, longitude) => {
        const response = await fetch(weatherBitURL + "lat=" + latitude + "&lon=" + longitude + "&key=" + weatherBitAPI);
        try {
            const weatherInfo = await response.json();
            return weatherInfo;
        } catch (error) {
            console.log("error", error);
        }
    };

    const postTravelData = async (url ='', data = {}) => {
        const response = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json;"
            },
            body: JSON.stringify({
                first_city: data.first_city,
                second_city: data.second_city,
                arrivng: data.arrivng,
                weather: data.weather,
                description: data.description,
                daysToTravel: data.daysToTravel
            })
        })
        try {
            const allData = await response.json();
            return allData;
        } catch (error) {
            console.log("error", error);
        }
    }

    const showTrip = async (allData) => {
        myResult.classList.remove("hidden");
        myTrip.classList.add("hidden");

        const response = await fetch(pixaBayURL + pixaBayAPI + "&q=" + allData.second_city + "+city&image_type=photo");

        try {
            const getImage = await response.json();
            document.querySelector('.departing').innerHTML = allData.first_city;
            document.querySelector('arriving').innerHTML = allData.second_city;
            document.querySelector('first_date').innerHTML = allData.departing;
            document.querySelector('second_date').innerHTML = allData.arriving;
            document.querySelector('days').innerHTML = allData.daysToTravel;
            document.querySelector('weather').innerHTML = Math.round(allData.weather * 9 / 5 + 32)+ "&deg;F";
            document.querySelector('pixabay_image').setAttribute('src', getImage.hits[0].webformatURL);
        }
        catch (error) {
            console.log("error", error);
        }
    }

    // Create a new date instance dynamically with JS
    /*const d = new Date();
    const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    console.log(`newDate`);

    // Days to travel
    const startTrip = new Date(departing);
    const endTrip = new Date(arriving);
    const tripDays = endTrip.getTime() - startTrip.getTime();
    const daysToTravel = tripDays / (1000 * 3600 * 24);
    console.log(daysToTravel);

    const apiRequest = await fetch(geoNameURL+arriving+"username="+geoNameUsername)
    const geoData = apiRequest.json()
    const latitude = geoData.geonames[0].lat;
    const longitude = geoData.geonames[0].lng;
    const country = geoData.geonames[0].countryName;
    const weatherData = getWeather(latitude, longitude, country)
    return weatherData;*/

/*document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();

    const printTrip = document.getElementById('')
})*/

export {
    handleSubmit,
    theButton,
    getCityInfo,
    getWeather,
    showTrip
}
