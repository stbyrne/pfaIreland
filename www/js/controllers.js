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
            url: 'http://pfai.ie/mobile/pfainews',
            /*url: 'content/getNews.json',*/
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
    template: '<i class="icon ion-loading-c"></i>',
    showBackdrop: true
    });
    
    console.log('App Controller');
    
    
    appFactory.getJson().success(function(data){
        $scope.section = data.app.section;
        console.log($scope.section);
        
        $scope.sections = [];
        
        angular.forEach($scope.section, function(value, key, i){
            
            var key = value['id'],
                obj = {};
            
            this[key] = value['content'];
            
            console.log($scope.sections);
               
        }, $scope.sections);
        
        console.log($scope.app);
        
        $ionicLoading.hide();
        
    });

    $scope.setItem = function(item){
        $scope.$parent.item = item;
        console.log(item);
       
    }
    $scope.getItem = function(){
        return $scope.$parent.item;
        console.log($scope.$parent.item);
    }
    
    $scope.goHome = function(){
        
        $timeout(function(){
            /*sideMenuCtrl.close();*/
            console.log('Home');
          /*$ionicSlideBoxDelegate.next();*/
      }, 500)
    }
    
          var template = '<ion-popover-view><ion-content><div class="list"><h2>Room 214 Players Union Offices</h2><p>National Sports Campus</p><p>Abbotstown</p><p>Dublin 15</p><p>Ireland</p></div></ion-content></ion-popover-view>';

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
    
    
    $ionicLoading.show({
    template: '<i class="icon ion-loading-c"></i>',
    showBackdrop: true
    });
    
    /*$scope.setArticle = function(item){
        $scope.article = item;
        console.log(item);
       
    }
    $scope.getItem = function(){
        return $scope.$parent.item;
        console.log($scope.$parent.item);
    }*/
    
    
    newsFactory.getNews().success(function(data){
        
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
                $articleIntro = $getBody.replace('<p>', '').substr(0,95),
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