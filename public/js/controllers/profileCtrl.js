angular.module('goodSees')
    .controller('profileCtrl', function($scope, mainService, userService){
        $scope.link = 'default'
        $scope.test = mainService.test;

        userService.getUserId().then( response => {
           return response
           $scope.currentUserData = response
        }).then( response =>  {

            
        mainService.getUserData(response)
        .then(function(response){
            $scope.userData = response[0];
        })
        mainService.getTopFriends(response)
        .then(function(response){
            $scope.friends = response;
        })

        mainService.getRecommendedMovies(response)
        .then(function(response){
            $scope.recMovies = response;
           
        })

        mainService.getFriends(response)
        .then(function(response){
            $scope.friendList = response;
        })

        mainService.getSeenMovies(response)
        .then(function(response){
            $scope.seenMovies = response;
        })

        mainService.getWantToSee(response)
        .then(function(response){
            $scope.wantToSee = response;
        })

        mainService.getFavMovies(response)
        .then(function(response){
            $scope.favMovies = response;
        })
    })
});