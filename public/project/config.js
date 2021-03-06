(function(){
    angular
        .module("MovieNow")
        .config(configuration);

    function configuration($routeProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {
                templateUrl: "home/templates/main-page.view.client.html",
                controller: "MainController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/home", {
                templateUrl: "home/templates/main-page.view.client.html",
                controller: "MainController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/login", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: 'user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when("/home/:movieTitle",{
                templateUrl: 'movie/templates/movie-list.view.client.html',
                controller: 'MovieListController',
                controllerAs: 'model',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/home/movie/:movieId",{
                templateUrl: 'movie/templates/movie-details.view.client.html',
                controller: 'MovieDetailsController',
                controllerAs: 'model',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/user/:userId", {
                templateUrl: "user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                params: {
                    userId: null
                },
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })
            .when("/user/:userId/reviews", {
                templateUrl: "movie/templates/user-reviews.view.client.html",
                controller: "ReviewController",
                controllerAs: "model",
                params: {
                    userId: null
                },
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })
            .when("/user/:userId/movie/:movieId/review/:reviewId", {
                templateUrl: "movie/templates/user-review-edit.view.client.html",
                controller: "ReviewEditController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })
            .when("/admin", {
                templateUrl: "admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }

            })
            .when("/user/:userId/likes", {
                templateUrl: "movie/templates/user-likes.view.client.html",
                controller: "LikeController",
                controllerAs: "model",
                params: {
                    userId: null
                },
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            }) ;

    }
    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;
                UserService.setCurrentUser(user);
                deferred.resolve();
            });
        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;

                if (user) {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home/");
                }
            });
        return deferred.promise;
    }
    function checkAdmin(UserService, $q, $location) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;

                if (user) {
                    if (user != null && user.roles == 'admin') {
                        UserService.setCurrentUser(user);
                        deferred.resolve();
                    }
                    else {
                        deferred.reject();
                        $location.url("/home/");
                    }
                }
                else {
                    deferred.reject();
                    $location.url("/home/");
                }
            });

        return deferred.promise;
    }

})();