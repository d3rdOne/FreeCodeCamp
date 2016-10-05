var j = jQuery.noConflict();


/*j(".navigation li a").on("click", function() {
    console.log("Current tab Selected: " + j(this).html());
});*/

var app = angular.module('twitchUserViewApp', []);

app.controller('usersController', function($scope, $http) {
    $scope.data = [];
    $scope.tab = 0;
    var baseUrl = "https://api.twitch.tv/kraken/channels/";

    this.setTab = function(tabId) {

        this.populate(tabId);
    };
    this.populate = function(tabId) {
        $scope.data = [];
        j.each(channels, function(i, value) {
            var url = baseUrl + value + "?callback=JSON_CALLBACK";
            console.log("tabID=" + tabId);
            $http.jsonp(url).success(function(data) {
                if (data.status !== 404) {
                    if (tabId === 1) {
                        $scope.data.push(data);
                    } else if (tabId === 2) {
                        if (data.partner)
                            $scope.data.push(data);
                    } else if (tabId === 3) {
                        if (!data.partner)
                            $scope.data.push(data);
                    }

                }
            });
        });
    };
    $scope.openChannel = function(url, status) {
        if (status)
            window.open(url);
    };

});


var channels2 = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "n123123e"
];
var channels = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas"
];
