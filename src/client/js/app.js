// Geonames API and URL
const geoNameURL = 'http://api.geonames.org/searchJSON?q=';
const geoNameUsername = 'andreascacchi';

// Weatherbit API and URL
const weatherBitURL = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const weatherBitKey = '1600fb6105a9450c851786ab67eb4437';

// Pixabay API and URL
const pixaBayURL = 'https://pixabay.com/api/?key=';
const pixaBayKey = '19344538-371102874db6349622a031d1a';

// form submit
//form.addEventListener('submit', handleSubmit);

// Button function
const myButton = document.querySelector(".btn");

function theButton() {
    myButton.addEventListener("click", function () {
        window.scrollTo({ behavior: "smooth", top: 0 });
    });
}
theButton();

//Global variables
const form = document.querySelector("#form");
const result = document.getElementById("results");
const dateNow = (Date.now()) / 1000;
const theInput = document.querySelector(".button_submit");
const addBtn = document.querySelector('.addBtn');

addBtn.addEventListener('click', newElement);
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

    const newDate = (new Date(travelDate).getTime()) / 1000;

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
        const userData = postTravelData('/add', { departing, arriving, travelDate, weather: weatherData.data[0].high_temp, daysToTravel });
        return userData;
    }).then((userData) => {
        updateUI(userData);
    })
};

const getCityInfo = async (geoNameURL, arriving, geoNameUsername) => {
    const response = await fetch(geoNameURL + arriving + "&username=" + geoNameUsername);
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

const postTravelData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
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
};

//The countdown
const countDownDate = new Date().getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "BON VOYAGE";
    }
}, 1000);

// Create a "close" button and append it to each list item
const myNodelist = document.getElementsByTagName("LI");
let i;
for (i = 0; i < myNodelist.length; i++) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
};

// Click on a close button to hide the current list item
const close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        const div = this.parentElement;
        div.style.display = "none";
    }
};

// Add a "checked" symbol when clicking on a list item
const list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    const li = document.createElement("li");
    const inputValue = document.getElementById("myInput").value;
    const t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            const div = this.parentElement;
            div.style.display = "none";
        }
    }
};

//Update UI demo
const updateUI = async(userData) => {
    result.classList.remove('hidden');
    form.classList.add('hidden');
    const response = await fetch(pixaBayURL + pixaBayKey + "&q" + userData.arriving + "city&image_type=photo");
    try {
        const getImage = await response.json();
        //console.log(allData);
        document.querySelector('.city').innerHTML = userData.arriving;
        document.querySelector('.date').innerHTML = userData.travelDate;
        document.querySelector('.days').innerHTML = userData.daysToTravel;
        document.querySelector('.weather').innerHTML = Math.round(userData.weather * 9 / 5 + 32)+ "&deg;F";
        //document.querySelector('.pixabay-image').setAttribute('src', getImage.hits[0].webformatURL);
    } catch (error) {
        console.log("error", error);
    }
};

export {
    handleSubmit,
    theButton,
    updateUI,
    countDownDate,
    getCityInfo,
    newElement
}
