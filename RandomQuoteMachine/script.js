var getQuote= function(){
 $(".quote-area div").fadeOut(500);

  $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function(json){
      var data = json;
        console.log(JSON.stringify(data));
        currentQuote=data.quoteText;
        var author=data.quoteAuthor;
        if(author===""){
          author="unknown";
        }
      $(".quote-content").html("\" "+data.quoteText+" \"");
      $(".quote-author").html("<h2>-"+author+"</h2>");
      $(".quote-area div").fadeIn("slow");
  });
};
var currentQuote="";

$(document).ready(function() {
  //Display Quote on Load

  getQuote();

//get a new Quote when clicked
  $("#newQuote").on("click", function(){
    getQuote();
  });
  $("#tweet").click(function(){

    var tweet_url = "https://twitter.com/intent/tweet?status="+encodeURIComponent(currentQuote);
    $(this).attr("href",tweet_url);
    window.open(this.href, 'mywin','left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
    return false;
  });
});
