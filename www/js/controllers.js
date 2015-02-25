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
            
            var $dobTag = value["Date of Birth"],
                $dobString = $($dobTag).attr('content').substr(0,10),
                $dob = new Date($dobString),
                $dobDate = $dobString.substr(8,$dobString.length),
                $dobMonth = $dobString.substr(5,2),
                $dobYear = $dobString.substr(0,4),
                $dobPlayer = $dobDate + '/' + $dobMonth + '/' + $dobYear;
                
            this.push([value["First Name"] + ' ' + value["Last Name"], value["Previous Clubs"], value["Position"], $dobPlayer]);
            
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