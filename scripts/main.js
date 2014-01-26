var fbUrl = 'https://kodjohin.firebaseio.com/';
var app = angular.module('poemreader', ["ngSanitize", "firebase", 'ngAnimate']);

var search = document.querySelector('.search');

app.controller('MainCtrl', function ($scope, $firebase) {

    /* var fb = new Firebase(fbUrl + "poems");
     fb.update(poems);*/

    var fb = $firebase(new Firebase(fbUrl));

    $scope.navMenu = fb.$child('navMenu');
    $scope.poems = fb.$child('poems');
    $scope.showPoem = false;

    $scope.navMenu.$on("loaded", function () {
        $scope.activeMenu = $scope.navMenu[0].name;
    });

    $scope.poems.$on("loaded", function () {
        $scope.poemTitle = $scope.poems[0].title;
        $scope.poemAuthor = $scope.poems[0].author;
        $scope.poemText = $scope.poems[0].text;

        //display a random poem
        var random = Math.floor(Math.random() * poems.length);
        $scope.displayPoem($scope.poems[random]);
    });

    $scope.displayPoem = function (poem) {
        $scope.poemTitle = poem.title;
        $scope.poemText = poem.text;
        $scope.poemAuthor = poem.author;
        $scope.showPoem = true;
    }

    $scope.displayPoems = function (poem) {
        $scope.currentAuthor = poem.author;
        $scope.showPoem = false;
    }

    search.onfocus = function (){
        $scope.currentAuthor = undefined;
        $scope.showPoem = false;
    }
});
app.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
});

