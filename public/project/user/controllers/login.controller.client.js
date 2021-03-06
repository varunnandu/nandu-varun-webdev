(function () {
    angular
        .module("MovieNow")
        .controller("LoginController", loginController);

    function loginController($location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(user==null)
            {
                vm.error = "please fill in the username and password";
            }
            else {
                var promise = UserService.login(user);
                promise
                    .then(function (response) {
                        var user = response.data;
                        if(user.roles == "admin") {
                            UserService.setCurrentUser(user);
                            $location.url("/admin/");// + user._id);
                        }
                        else  {
                            UserService.setCurrentUser(user);
                            $location.url("/user/"+user._id);// + user._id);
                        }


                    },function (err) {
                        vm.error = "username/password does not match";
                    });
            }
        }
    }

})();

