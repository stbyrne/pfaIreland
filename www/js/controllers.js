angular.module('starter.controllers', [])

.factory('appFactory', function($http) {
    
 return{
    getJson : function() {
        return $http({
            url: 'content/content.json',
            method: 'GET'
        })
    }
 }
})

.factory('newsFactory', function($http) {
    
 return{
    getNews : function() {
        return $http({
            url: 'http://pfai.fireflyweb.ie/mobile/pfainews',
            method: 'GET'
        })
    }
 }
})

.factory('listFactory', function($http) {
    
 return{
    getList : function() {
        return $http({
            url: 'http://pfai.fireflyweb.ie/mobile/transferliststream',
            method: 'GET'
        })
    }
 }
})

.controller('AppCtrl', ['$scope', '$http', 'appFactory', function($scope, $http, appFactory) {
    
    $scope.app = [];
    $scope.item = {};
    
    appFactory.getJson().success(function(data){
        $scope.app = data;
        console.log($scope.app);
        
    });
    
        

    $scope.setItem = function(item){
        $scope.$parent.item = item;
        console.log(item);
       
    }
    $scope.getItem = function(){
        return $scope.$parent.item;
        console.log($scope.$parent.item);
    }
   
    
}])

.controller('NewsCtrl', ['$scope', 'newsFactory', '$ionicLoading', function($scope, newsFactory, $ionicLoading) {
   
    $scope.news = [];
    
    
    $ionicLoading.show({
    template: '<i class="icon ion-loading-c"></i>',
    showBackdrop: true
    });
    
    
    newsFactory.getNews().success(function(data){
        
        $scope.news = data;
        $scope.articles = [];
        $scope.articleList = [];
        
        
        
        angular.forEach($scope.news, function(value, key, i){
            
            var $getBody = value["body"],
                $articleBody = $($getBody).attr('p'),
                $timestamp = new Date(value["date"]*1000),
                $articleDate = $timestamp.toDateString(),
                $articleImage = value["field_image"],
                $articleTitle = value["node_title"],
                $articleIntro = $getBody.replace('<p>', '').substr(0,95),
                $articleThumb = $(value["thumbnail"]).attr('src');
            
            $.each($($getBody).find('img'), function(){
                if($(this).attr('src').slice(0,18)!='http://www.pfai.ie'){
                       $getBody = $getBody.replace($(this).attr('src'), 'http://www.pfai.ie' + $(this).attr('src'));
                 
                }
                
            });
            
            $scope.articleList.push([$articleThumb, $articleTitle, $articleIntro,$articleDate]);
                
            this.push([$getBody, $articleDate, $articleImage, $articleTitle, $articleIntro, $articleThumb]);
            
           
        }, $scope.articles)
        
        console.log($scope.articles);
        console.log($scope.articleList);
        
        
        /*angular.forEach($scope.list, function(i){
             console.log(Object.keys(i));  
        })*/
        $ionicLoading.hide();
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
/*.controller('PlatformCtrl', function ($scope, $http) {
    
    $scope.platform = {};
      
      $http.get('content/platform.json').success(function(data) {
            $scope.platforms = data;
          console.log(data);
        })
      $scope.setPlatform = function(platform){
        $scope.$parent.platform = platform;
       
    }
    $scope.getPlatform = function(){
        return $scope.$parent.platform;
    }
})*/
.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});