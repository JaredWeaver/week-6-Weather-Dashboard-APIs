var cities = [];



function displayForecasts() {


    $("#searchCityBtn").on("click", function(event) {
        event.preventDefault();

        $("div").removeClass("currentForecast");

        var city = $("#citySearchInput").val().trim();

        var currentForecastURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=65b1aeae514118478696fff2338437b0";
        var futureForecastURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=89984ca3ba5fa48da800bfaa61ada627";

        $.ajax({
            url: currentForecastURL,
            method: "GET"
        }).then(function(response){
            // console.log(response);

            var currentDate = moment().format('M/DD/YYYY');
           
            $("#currentCityName").text(response.name + " " + "(" + currentDate + ")");

            var currentIconID = response.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/w/" + currentIconID + ".png";
            var currentIcon = $("<img>").attr("src", iconURL);
            $("#currentCityName").append(currentIcon);

            var currentTempF = (response.main.temp - 273.15) * 1.80 + 32;
            $("#currentTemp").text("Temperature: " + currentTempF.toFixed(2) + " °" + "F");
            $("#currentHumidity").text("Humidity: " + response.main.humidity + " %");
            $("#currentWind").text("Wind Speed: " + response.wind.speed + " MPH");
            
            var lat = response.coord.lat
            var lon = response.coord.lon  
            var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=65b1aeae514118478696fff2338437b0";
            // $("#currentUV").text("UV Index: ");  
            $.ajax({
                url: uvIndexURL,
                method: "GET"
            }).then(function(data){
                $("#currentUVVal").text(data.value, uvIndexColor(data));
            });
            
        });
        $.ajax({
            url: futureForecastURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
        });
        
    });
}

displayForecasts();

function uvIndexColor(data) {
    
    if (data.value <= 2) {
        $("#currentUVVal").css("background-color","green");
    } else if (data.value > 2 && data.value <= 5) {
        $("#currentUVVal").css("background-color","#CCCC00");
    } else if (data.value > 5 && data.value <= 7) {
        $("#currentUVVal").css("background-color","orange");
    } else {
        $("#currentUVVal").css("background-color","red");
    }
}

function renderCityButtons() {
    $("#sideCityBtns").empty();

}

//append buttons to sidebar

//add future forecast to first onclick












// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast



// var futureForecastURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + "&cnt=5&appid=65b1aeae514118478696fff2338437b0"
