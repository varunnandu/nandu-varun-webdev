
(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function () {
                    vm.error = "sorry that username is taken"
                })
                .error(function(){
                    UserService
                        .createUser(user)
                        .success(function(user){
                            $location.url('/user/' + user._id);
                        })
                        .error(function () {
                            vm.error = 'sorry could not register';
                        });
                });
        }
    }
})();
