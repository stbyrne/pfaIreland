angular.module('starter.controllers', [])

.factory('appFactory', function($http) {
    
    return $http({
        url: 'https://googledrive.com/host/0B0778NZ3pAKKcHYxWjBiLTc5UjA/content_v2.json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json, text/plain, */*'  
        }
    });
})

.factory('newsFactory', function($http) {
    
 return{
    getNews : function() {
        return $http({
            url: 'http://pfai.ie/mobile/pfainews',
            method: 'GET'
        })
    }
 }
})

.factory('listFactory', function($http) {
    
 return{
    getList : function() {
        return $http({
            url: 'http://pfai.ie/mobile/transferliststream',
            /*url: 'content/getList.json',*/
            method: 'GET'
        })
    }
 }
})

.controller('AppCtrl', ['$scope', '$http', '$timeout', '$ionicLoading', '$ionicPopover', 'appFactory', function($scope, $http, $timeout, $ionicLoading, $ionicPopover, appFactory) {
    
    $ionicLoading.show({
    template: '<p>PFA Ireland is loading</p><i class="icon ion-loading-c"></i>',
    showBackdrop: true
    });
    
    console.log('App Controller');
        
        appFactory.then(function(data, status, headers, config){
            
                $scope.status = data.status;
                console.log('Request Status: ', $scope.status);
            
                console.log('Loading Remote App Json');
                                
                $ionicLoading.hide();

                $scope.section = data.data.app.section;

                $scope.sections = [];

                angular.forEach($scope.section, function(value, key, i){

                    var key = value['id'];

                    this[key] = value['content'];

                }, $scope.sections);
            
            }, function(data, status){
                
                $scope.status = data.status;
                console.log('Error Status: ', $scope.status);
            
                $http.get('content/content.json').then(function(data){
                    
                    
                    $ionicLoading.hide();
                    
                    console.log('Loading Local App Json');

                    $scope.section = data.data.app.section;

                    $scope.sections = [];

                    angular.forEach($scope.section, function(value, key, i){

                        var key = value['id'];

                        this[key] = value['content'];

                    }, $scope.sections);


                }, function(){
                    console.log('Error Loading Local App Json');   
                })
                
            });
   
   
    
    $scope.setItem = function(item){
        $scope.$parent.item = item;
        console.log(item);
       
    }
    $scope.getItem = function(){
        return $scope.$parent.item;
        console.log($scope.$parent.item);
    }
    
    $scope.openURL = function(urlString){
            console.log(urlString);
            myURL = encodeURI(urlString);
            window.open(myURL, '_system', 'location=yes');
        }
    
    $scope.goHome = function(){
        
        $timeout(function(){
            /*sideMenuCtrl.close();*/
            console.log('Home');
          /*$ionicSlideBoxDelegate.next();*/
      }, 500)
    }
    
          var template = '<ion-popover-view><ion-content><div class="list"><h4>Room 214 Players Union Offices</h4><p>National Sports Campus</p><p>Abbotstown</p><p>Dublin 15</p><p>Ireland</p></div></ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope,
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
   
    
}])

.controller('NewsCtrl', ['$scope', 'newsFactory', '$ionicLoading', '$ionicSlideBoxDelegate', '$timeout', function($scope, newsFactory, $ionicLoading , $ionicSlideBoxDelegate, $timeout) {
   
    $scope.news = [];
    $scope.article = [];
    
    $scope.setIndex = function(num){
        $scope.$parent.myNewsArticle=num;
    }
    
    /*$scope.clearSearch = function(){
        $scope.$parent.searchNews = '';   
    }*/

    $ionicLoading.show({
    template: '<p>Just getting the latest news</p><i class="icon ion-loading-c"></i>',
    showBackdrop: true
    });
    
    newsFactory.getNews().success(function(data){
        
        console.log(data);
        
        $scope.news = data;
        $scope.articles = [];
        $scope.articleList = [];
        
        angular.forEach($scope.news, function(value, key, i){
            
            var $getBody = value["body"],
                $articleBody = $getBody,
                $timestamp = new Date(value["date"]*1000),
                $articleDate = $timestamp.toDateString(),
                $articleImage = $(value["field_image"]).attr('src'),
                $articleTitle = value["node_title"],
                /*$articleIntro = $getBody.replace('<p*>', '').substr(0,95),*/
                $articleIntro = $($getBody).html().substr(0,80) + ' ...',
                $articleThumb = $(value["thumbnail"]).attr('src');
            
            $.each($($articleBody).find('img'), function(){
                if($(this).attr('src').slice(0,18)!='http://www.pfai.ie'){
                       $articleBody = $articleBody.replace($(this).attr('src'), 'http://www.pfai.ie' + $(this).attr('src'));
                 
                }
                
            });
            
            $scope.articleList.push([$articleThumb, $articleTitle, $articleIntro,$articleDate]);
                
            this.push([$articleTitle, $articleImage, $articleDate, $articleBody]);
            
        }, $scope.articles)
        
        console.log($scope.articles);
        console.log($scope.articleList);
        
        $ionicLoading.hide();
        
        $timeout(function(){
          $ionicSlideBoxDelegate.update();
          /*$ionicSlideBoxDelegate.next();*/
      }, 500)
    });
    
}])

.controller('ListCtrl', ['$scope', 'listFactory', '$ionicLoading', function($scope, listFactory, $ionicLoading) {
   
    $scope.list = [];
    
    
    $ionicLoading.show({
    template: '<i class="icon ion-loading-c"></i>',
    showBackdrop: true
    });
    
    
    listFactory.getList().success(function(data){
        
        $scope.list = data;
        $scope.players = [];
        
        angular.forEach($scope.list, function(value, key, i){
            
            var $getFirst = value["First Name"],
                $firstName = $getFirst.replace("&#039;", "'"),
                $getLast = value["Last Name"],
                $lastName = $getLast.replace("&#039;", "'"),
                $getClubs = value["Previous Clubs"],
                $preClubs = $getClubs.replace("&#039;", "'"),
                $dobTag = value["Date of Birth"],
                $dobString = $($dobTag).attr('content').substr(0,10),
                $dob = new Date($dobString),
                $dobDate = $dobString.substr(8,$dobString.length),
                $dobMonth = $dobString.substr(5,2),
                $dobYear = $dobString.substr(0,4),
                $dobPlayer = $dobDate + '/' + $dobMonth + '/' + $dobYear;
                
            this.push([$firstName + ' ' + $lastName, $preClubs, value["Position"], $dobPlayer]);
            
            /*console.log($scope.players);*/
           
        }, $scope.players)
        
        
        /*angular.forEach($scope.list, function(i){
             console.log(Object.keys(i));  
        })*/
        $ionicLoading.hide();
    });
    
    
}])

.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };
    
    var defaultLatLng = new google.maps.LatLng(53.3954533, -6.355980); 

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $ionicLoading.show({
        template: '<p>Lets find your current location</p><i class="icon ion-loading-c"></i>',
        showBackdrop: true
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
        
        console.log('Got pos', pos);
        var loc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        $scope.map.setCenter(loc);
        
        var pfaiOffices = 'img/loc.svg';
        
        new google.maps.Marker({
            position: defaultLatLng,
            map: $scope.map,
            icon: pfaiOffices,
            title: "PFA Ireland Offices"
        });
        
        var infowindow = new google.maps.InfoWindow({
    content: "<span>Here you are</span>"
});
        var location = new google.maps.Marker({
            position: loc,
            map: $scope.map
        });
        
        google.maps.event.addListener(location, 'click', function() {
  infowindow.open($scope.map,location);
});
        $ionicLoading.hide();
        
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
    /////////
    
    /*google.maps.event.addListener(map, 'click', function(event) {
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
    });
    */
    //////////
    
    function setCenter(latlng) {
        var myOptions = {
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // Add an overlay to the map of current lat/lng
        // Add custom image to map
        var pfaiOffices = 'images/loc.svg';
        /*var mark = 'images/mark.svg';*/
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            /*icon: mark,*/
            title: "You are here!"
        });
        var marker2 = new google.maps.Marker({
            position: defaultLatLng,
            map: map,
            icon: pfaiOffices,
            title: "PFA Ireland Offices"
        });
        
        google.maps.event.addListener(marker, 'click', function() {
            alert('You are here');
        });
        
        google.maps.event.addListener(marker2, 'click', function() {
            alert('PFA Ireland Offices');
        });
    }
    
    /////////////////
});