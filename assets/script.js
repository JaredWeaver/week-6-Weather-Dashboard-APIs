var searchHistoryArr = [];

var currentDate = moment().format('M/DD/YYYY');

$(document).ready(function() { 

    $("#searchCityBtn").on("click", function(event) {
        event.preventDefault(); 
        $("div").removeClass("currentForecast");
        $("div").removeClass("displayFuture");

        var inputValue = $("#citySearchInput").val().trim();

        $("#citySearchInput").val("");
        displayForecasts(inputValue, true);

    });

    $("#sideCityBtns").on("click", "li", function(event) {
        event.preventDefault()
        displayForecasts($(this).text(), false); 
    });

    function displayForecasts(inputValue, saveHistory) {
        var currentForecastURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputValue + "&appid=65b1aeae514118478696fff2338437b0";
        var futureForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputValue + "&appid=65b1aeae514118478696fff2338437b0";
        
        $.ajax({
            url: currentForecastURL,
            method: "GET"
        }).then(function(response){
        
            $("#currentCityName").text(response.name + " " + "(" + currentDate + ")");

            var currentIconID = response.weather[0].icon;
            var iconURL = "https://openweathermap.org/img/w/" + currentIconID + ".png";
            var currentIcon = $("<img>").attr("src", iconURL);
            $("#currentCityName").append(currentIcon);

            var currentTempF = (response.main.temp - 273.15) * 1.80 + 32;
            $("#currentTemp").text("Temperature: " + currentTempF.toFixed(2) + " °" + "F");
            $("#currentHumidity").text("Humidity: " + response.main.humidity + " %");
            $("#currentWind").text("Wind Speed: " + response.wind.speed + " MPH");
            
            var lat = response.coord.lat;
            var lon = response.coord.lon; 
            var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=65b1aeae514118478696fff2338437b0";
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

            if (saveHistory) addHistory(response.city.name);

            var day1 = createFutureDates(1);
            var day2 = createFutureDates(2);
            var day3 = createFutureDates(3);
            var day4 = createFutureDates(4);
            var day5 = createFutureDates(5);
            
            $("#day1").text(day1);
            $("#day2").text(day2);
            $("#day3").text(day3);
            $("#day4").text(day4);
            $("#day5").text(day5);

            var futureIconID1 = response.list[7].weather[0].icon;
            var futureIconURL1 = "https://openweathermap.org/img/w/" + futureIconID1 + ".png";
            var futureIcon1 = $("<img>").attr("src", futureIconURL1);
            $(".futureIcon1").empty();
            $(".futureIcon1").append(futureIcon1);

            var futureIconID2 = response.list[15].weather[0].icon;
            var futureIconURL2 = "https://openweathermap.org/img/w/" + futureIconID2 + ".png";
            var futureIcon2 = $("<img>").attr("src", futureIconURL2);
            $(".futureIcon2").empty();
            $(".futureIcon2").append(futureIcon2);

            var futureIconID3 = response.list[23].weather[0].icon;
            var futureIconURL3 = "https://openweathermap.org/img/w/" + futureIconID3 + ".png";
            var futureIcon3 = $("<img>").attr("src", futureIconURL3);
            $(".futureIcon3").empty();
            $(".futureIcon3").append(futureIcon3);

            var futureIconID4 = response.list[31].weather[0].icon;
            var futureIconURL4 = "https://openweathermap.org/img/w/" + futureIconID4 + ".png";
            var futureIcon4 = $("<img>").attr("src", futureIconURL4);
            $(".futureIcon4").empty();
            $(".futureIcon4").append(futureIcon4);

            var futureIconID5 = response.list[39].weather[0].icon;
            var futureIconURL5 = "https://openweathermap.org/img/w/" + futureIconID5 + ".png";
            var futureIcon5 = $("<img>").attr("src", futureIconURL5);
            $(".futureIcon5").empty();
            $(".futureIcon5").append(futureIcon5);

            var futureConv1 = (response.list[7].main.temp - 273.15) * 1.80 + 32;
            $("#temp1").text("Temp: " + futureConv1.toFixed(2) + " °" + "F");
            var futureConv2 = (response.list[15].main.temp - 273.15) * 1.80 + 32;
            $("#temp2").text("Temp: " + futureConv2.toFixed(2) + " °" + "F");
            var futureConv3 = (response.list[23].main.temp - 273.15) * 1.80 + 32;
            $("#temp3").text("Temp: " + futureConv3.toFixed(2) + " °" + "F");
            var futureConv4 = (response.list[31].main.temp - 273.15) * 1.80 + 32;
            $("#temp4").text("Temp: " + futureConv4.toFixed(2) + " °" + "F");
            var futureConv5 = (response.list[39].main.temp - 273.15) * 1.80 + 32;
            $("#temp5").text("Temp: " + futureConv5.toFixed(2) + " °" + "F");

            $("#humid1").text("Humidity: " + response.list[7].main.humidity + " %");
            $("#humid2").text("Humidity: " + response.list[15].main.humidity + " %");
            $("#humid3").text("Humidity: " + response.list[23].main.humidity + " %");
            $("#humid4").text("Humidity: " + response.list[31].main.humidity + " %");
            $("#humid5").text("Humidity: " + response.list[39].main.humidity + " %");

        });       
    }
    searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory")) || [];

    function addHistory(text) {

        searchHistoryArr.push(text);
            
        localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));

        var li = $("<li>").addClass("list-group-item list-group-item-action");
        var btn = $("<button>").addClass("btn btn-outline-dark sideCityBtn",);
        $(btn).text(text);
        $(li).append(btn);
        $("#sideCityBtns").append(li);
        
    }

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

    function createFutureDates(day) {
        return moment(currentDate, "M/DD/YYYY").add(day, 'd').format("M/DD/YYYY");   
    }
    
    searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (searchHistoryArr.length > 0) {
        $("div").removeClass("currentForecast");
        $("div").removeClass("displayFuture");
        displayForecasts(searchHistoryArr[searchHistoryArr.length-1], false);
    }
}); 