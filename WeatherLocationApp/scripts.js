
var temperatureId="fahrenheit";
var tempDefault=0;

var bodyBackground = {
  "dawn":"http://res.cloudinary.com/d3rdone/image/upload/v1465895798/mountains_sky_bali_sunrise_kintamani_indonesia_95497_1920x1080_di0x9m.jpg",
  "day": "http://res.cloudinary.com/d3rdone/image/upload/v1465895922/river_cliffs_waterfalls_trees_landscape_86265_1920x1080_s6hege.jpg",
  "night":"http://res.cloudinary.com/d3rdone/image/upload/v1465895616/switzerland_alps_mountains_night_beautiful_landscape_99817_1920x1080_w0jag7.jpg"
};


function changeBackround(hour){
  if(hour>=5 && hour<7){
    return "url(\""+bodyBackground.dawn+"\")";
  }
  else if(hour>=17 && hour<19){
    return "url(\""+bodyBackground.dawn+"\")";
  }
  else if(hour>=7 && hour<17){
    return "url(\""+bodyBackground.day+"\")";
  }
  else{
    return "url(\""+bodyBackground.night+"\")";
  }
}


$(".temp-button").hide();

function getTime(){
  var time="";
  var d = new Date();
  var h = d.getHours();
  $("body").css("background",changeBackround(h));
  var m = (d.getMinutes()<10?'0':'')+d.getMinutes();
  if(h>12)
    time = (h-12)+":"+m+" PM";
  else {
    time = (h==0?12:h)+":"+m+" AM";
  }
  $(".time").html("<p>" + time + "</p>");

  var t = setTimeout(getTime,60000);
}

function tempEvaluate(selectedId,temp){
  var tempToDisplay;
  if(selectedId==="fahrenheit"){
     tempToDisplay = Math.round((temp-273.15)*(9/5)+32)  + " &deg;F";
  }
  else{
    tempToDisplay  = Math.round(temp-273.15)+ " &deg;C";
  }
  return tempToDisplay;
}

function weatherIcon(icon){
  return "<img src=\"http:\/\/openweathermap.org\/img\/w\/"+icon+".png\" >";
}
function weatherIconEvaluate(id){

}


function getWeatherData(){
  $(".location").hide();
  $(".weather").hide();
  $.getJSON("http:\/\/ip-api.com\/json",function(loc){
    console.log(JSON.stringify(loc));
    $.getJSON("http:\/\/api.openweathermap.org\/data\/2.5\/weather?lat="+loc.lat +"&lon="+loc.lon +"&id=524901&APPID=6fee3f6861fb6b16b16af023724fc330", function(json){
          var data = json;
          console.log(JSON.stringify(data));

          var location = "<h2><b>" + loc.city + "</b>,<br><b>" + loc.country+"</b></h2>";

        //var weather =  "Weather: " +weatherIcon(data.weather[0].icon) +"<br> "+data.weather[0].description;
        var weather= weatherIcon(data.weather[0].icon)+data.weather[0].description;
          var temperature= "<b>"+ tempEvaluate(temperatureId,data.main.temp)+"</b>";

          $(".location").html(location).show();
          $(".weather").html(weather).show();
          console.log("Weather Data: "+ data.weather[0].main +"\nWeather Description: " + data.weather[0].description);

          $(".temperature").html(temperature);

          $(".temp-button").show();
          $(".loading").hide();
          getTime();
    });
  });
}

$(".link").on("click",function(){
  $(".link").each(function(){
      $(".link").removeClass("toggle");
  });
  $(this).toggleClass("toggle");
  temperatureId = $(this).attr("id");
  $(".loading").show();
  $(".temp-button").hide();
  $(".weather").hide();
  $(".location").hide();
  getWeatherData();
});
getWeatherData();
