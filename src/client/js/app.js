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

//Global variables
const myTrip = document.querySelector(".planTheTrip");
const myResult = document.getElementById("results");
const theInput = document.getElementById("theSubmit");

//Async function for the user Input
async function handleSubmit(e) {
    e.preventDefault();
    const first_city = document.getElementById("firstCity").value;
    const second_city = document.getElementById("secondCity").value;
    const departing = document.getElementById("date1").value;
    const arriving = document.getElementById("date2").value;

    // Create a new date instance dynamically with JS
    const d = new Date();
    const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    console.log(newDate);

    // Days to travel
    const startTrip = new Date(departing);
    const endTrip = new Date(arriving);
    const tripDays = endTrip.geTime() - startTrip.getTime();
    const daysToTravel = tripDays / (1000 * 3600 * 24);
    console.log(daysToTravel);
}
