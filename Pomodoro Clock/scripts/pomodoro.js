var circleOverlay = $(".circle-overlay");

var timerIndicatorObj = {
    radius: 200,
    seconds: 2,
    strokeWidth: 10,
     fillStyle: "#ffffff",
    strokeStyle:"#33d413",
    fontSize: undefined,
    fontColor: "rgba(#ffffff, 0)",
    autostart: false,
    smooth:true,
    onComplete: function(){
        circleOverlay.css("display","block");
    }
};
var countdownObj = $("#countdown").countdown360(timerIndicatorObj);
$("button").click(function(event){
    var $target = $(event.target);
    var val = $target.attr("value");
    if(val==="start"){
        $(".circle-overlay").css("display","none");
        countdownObj.start();
    } else if(val==="stop"){
        console.log("stop");
        countdownObj.stop();
    }

});
