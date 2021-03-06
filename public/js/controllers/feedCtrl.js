angular.module('goodSees')
    .controller('feedCtrl', function ($scope, mainService, tmdbService, userService) {

        $scope.baseUrl = mainService.baseUrl;
        // var id = 2197287247035846;
        $scope.pageNum = 0;
        console.log('page: ')
        


        /*--------------------------------------------------------------------*
                      Event Handlers 
         *--------------------------------------------------------------------*/
        //movie title search
        userService.getUserId().then(response => {
            return response
        }).then(response => {
            mainService.getUserData(response)
                .then(function (response) {
                    return response[0];
                })
                .then(function (userData) {

                    var id = userData.fb_id;
                    console.log('id: ', id)


                    $scope.getMovieForFeed = function () {
                        mainService.getMovieForFeed(id, $scope.pageNum)
                            .then(function (response) {
                                console.log(response)
                                for(let i = 0; i < response.length; i++){
                                    if (response[i]['comment']){
                                        response[i]['comment'] = response[i]['comment'].substr(1);
                                    }
                                }
                                $scope.activities = response;
                            })
                    }

                    $scope.getMovieForFeed();
                })



        })

        $scope.newRecommendation;

        $scope.thumbUp = (userId, movieId) => {
            mainService.thumbUp(userId, movieId)
        }
        $scope.thumbSide = (userId, movieId) => {
            mainService.thumbSide(userId, movieId)
        }
        $scope.thumbDown = (userId, movieId) => {
            mainService.thumbDown(userId, movieId)
        }

        $scope.postRec = (userId, movieId) => {
            mainService.postRec(userId, movieId)
        }

        $scope.postReview = (movieId, commentTitle, comment, userId) => {
            mainService.postReview(movieId, commentTitle, comment, userId).then(function () {
                $scope.getMovieForFeed();
                console.log('got movies for feed');
                console.log('feedComment: ', $scope.feedComment);
            })
        }

        $scope.searchMovieByTitle = function (movieTitle) {
            tmdbService.searchMovieByTitle(movieTitle)
                .then(movieInfo => {
                    $scope.feedMovieInfo = movieInfo.data
                    console.log('feedSearch: ', $scope.feedMovieInfo)
                })
        }
        $scope.selectMovie = function (movie) {
            $scope.recSelection = movie;
        }

    });