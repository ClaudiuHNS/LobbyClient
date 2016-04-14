///<reference path="./_app.ts" />
'use strict';

import "font-awesome/css/font-awesome.min.css";
import "./css/main.less";
import "./css/animations.less";
import "./css/ui.less";

// Import Angular and dependencies.
import "angular";
import "angular-route";

// Import controllers.
import loginCtrl from "./components/login/loginCtrl.ts";
import lobbyConfigCtrl from "./components/lobbyConfig/lobbyConfigCtrl.ts";
import lobbyCtrl from "./components/lobby/lobbyCtrl.ts";

// Import directives.
import * as selectCtrl from "./directives/uikit-select/selectCtrl.ts";
import * as checkboxCtrl from "./directives/checkbox/checkboxCtrl.ts";
import backgroundSrc from "./directives/backgroundSrc.ts";
import compile from "./directives/compile.ts";

// Create app.
const app = angular.module("app", ["ngRoute"]);

// Register view controllers.
app.controller("loginCtrl", loginCtrl);
app.controller("lobbyConfigCtrl", lobbyConfigCtrl);
app.controller("lobbyCtrl", lobbyCtrl);

// Register directives and corresponding controllers.
app.controller("checkboxCtrl", checkboxCtrl.CheckboxCtrl);
app.directive('checkbox', checkboxCtrl.directive);

app.controller("selectCtrl", selectCtrl.SelectCtrl);
app.directive("uikitSelect", selectCtrl.directive);

app.directive('compile', compile);
app.directive("backgroundSrc", backgroundSrc);

// Setup routes.
app.config(["$routeProvider", prov => {
    prov.when("/login", {
        template: require("./components/login/loginView.html"),
        controller: "loginCtrl"
    }).when("/lobby/config", {
        template: require("./components/lobbyConfig/lobbyConfigView.html"),
        controller: "lobbyConfigCtrl"
    }).when("/lobby", {
        template: require("./components/lobby/lobbyView.html"),
        controller: "lobbyCtrl"
    }).otherwise({ redirectTo: "/login" });
}]);