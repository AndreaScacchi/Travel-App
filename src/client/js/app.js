// Geonames API and URL
const geoNameURL = 'http://api.geonames.org/searchJSON?q=';
const geoNameUsername = 'andreascacchi';

// Weatherbit API and URL
const weatherBitURL = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const weatherBitKey = '1600fb6105a9450c851786ab67eb4437';

// Pixabay API and URL
const pixaBayURL = 'https://pixabay.com/api/?key=';
const pixaBayKey = '19344538-371102874db6349622a031d1a';

// Button function
const myButton = document.querySelector(".btn");

function theButton() {
    myButton.addEventListener("click", function () {
        window.scrollTo({ behavior: "smooth", top: 0 });
    });
}
theButton();

//Global variables
const myTrip = document.querySelector("#form");
const myResult = document.getElementById("results");
const dateNow = (Date.now()) / 1000;
const theInput = document.querySelector(".button_submit");

theInput.addEventListener("click", handleSubmit);
document.getElementById("print").addEventListener("click", handleSubmit);
document.getElementById("delete").addEventListener("click", handleSubmit);

//Async function for the user Input
function handleSubmit() {
    event.preventDefault();
    const departing = document.getElementById("input_from").value;
    const arriving = document.getElementById("input_to").value;
    const travelDate = document.getElementById("input_date").value;

    //Input validation
    if(departing.length == 0) {
        alert("Please enter departure");
        return
    }
    if(arriving.length == 0) {
        alert("Please enter destination");
        return
    }
    if(travelDate.length == 0) {
        alert("Please enter the date");
        return
    }

    const newDate = (new Date(arriving).getTime()) / 1000;

    getCityInfo(geoNameURL, arriving, geoNameUsername)
    .then((cityInfo) => {
        const latitude = cityInfo.geonames[0].lat;
        const longitude = cityInfo.geonames[0].lng;
        const country = cityInfo.geonames[0].countryName;
        const weatherData = getWeather(latitude, longitude, country, newDate)
        return weatherData;
    })
    .then((weatherData) => {
        const daysToTravel = Math.round((newDate - dateNow) / 86400);
        const theData = postTravelData('http://localhost8080/add', { departing, arriving, travelDate, weather: weatherData.data[0].high_temp, daysToTravel });
        return theData;
    })

}

    const getCityInfo = async (geoNameURL, arriving, geoNameUsername) => {
        const response = await fetch(geoNameURL + arriving + "username" + geoNameUsername);
        try {
            const cityInfo = await response.json();
            return cityInfo;
        } catch (error) {
            console.log("error", error);
        }
    };

    const getWeather = async (latitude, longitude) => {
        const response = await fetch(weatherBitURL + "lat=" + latitude + "&lon=" + longitude + "&key=" + weatherBitKey);
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
            body: JSON.stringify(data),
        });

        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    }

    //Update UI demo
    const updateUI = async() => {
        const request = await fetch('/all')
        try {
            const allData = await request.json()
            //console.log(allData);
            document.getElementById('city').innerHTML = allData.city;
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('days').innerHTML = allData.days;
            document.getElementById('weather').innerHTML = allData.weather;
        } catch (error) {
            console.log("error", error);
        }
    }

export {
    handleSubmit,
    theButton
}
