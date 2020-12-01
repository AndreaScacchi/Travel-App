
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
