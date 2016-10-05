//$(".result").hide();
var j = jQuery.noConflict();
var app = angular.module('myApp', []);
app.controller('resultController', function($scope, $http) {
    var clear = j(".clear");
    var mainBody = j(".main-body");
    var resultsDisplay = j(".result");
    var entryDisplay = j(".entry");
    var input = j("#searchQuery");

    input.keyup(function(){
        if(event.keyCode == 13){
          $scope.searchWiki();
        }
    });

    $scope.searchWiki = function() {
        var search = $scope.searchQuery;
        $http({
            url: "http://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK",
            method: "JSONP",
            params: {
                srsearch: search,
                srprop: 'snippet',
                action: 'query',
                list: 'search',
                format: 'json',
                section: 'text'
            }
        }).success(function(data) {
            if (data.query !== undefined) {
                //console.log(data.query.search);
                var dataResults = data.query.search;
                var newResults = dataResults;
                mainBody.addClass("searched");
                for (var i = 0; i < dataResults.length; i++) {
                    newResults[i].snippet = (dataResults[i].snippet).replace(/<span class="searchmatch">|<\/span>/gi, "");
                    newResults[i].snippet = (dataResults[i].snippet).replace(/&quot;/gi, "\"");
                }

                $scope.resultData = newResults;
                clear.css("display", "block");
                resultsDisplay.addClass("results-displayed");

            } else {
                $scope.clearSearch();
            }
        });
    };

    $scope.clearSearch = function() {
        mainBody.removeClass("searched");
        clear.css("display", "none");
        resultsDisplay.removeClass("results-displayed");
        $scope.resultData = null;
        $scope.searchQuery = null;
    };

    $scope.randomSearch= function(){
      $http({
          url: "http://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK",
          method: "JSONP",
          params: {

              action: 'query',
              list: 'random',
              rnlimit: '1',
              format: 'json',
              section: 'text'
          }
      }).success(function(data){
        //console.log(data);
       var article=data.query.random[0].title;
        window.open("https://en.wikipedia.org/wiki/"+article);
        //window.open("http://www.google.com");
      });
    };


});
