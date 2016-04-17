///<reference path="./_app.ts" />
'use strict';

import "font-awesome/css/font-awesome.min.css";
import "./css/main.less";
import "./css/animations.less";
import "./css/ui.less";

// Import Angular and dependencies.
import "angular";
import "angular-route";

// Import other dependencies.
import "bluebird";

// Import controllers.
import loginCtrl from "./components/login/loginCtrl.ts";
import lobbyCtrl from "./components/lobby/lobbyCtrl.ts";
import selectChampionCtrl from "./components/selectChampion/selectChampionCtrl.ts";
import selectSummonerSpellCtrl from "./components/selectSummonerSpell/selectSummonerSpellCtrl.ts";

// Import directives.
import * as selectCtrl from "./directives/uikit-select/selectCtrl.ts";
import * as checkboxCtrl from "./directives/checkbox/checkboxCtrl.ts";
import backgroundSrc from "./directives/backgroundSrc.ts";
import compile from "./directives/compile.ts";
import * as fadeBackground from "./directives/fadeBackground.ts";

// Import services.
import modalService from "./services/modal/modalService.ts";
import * as modalDirective from "./services/modal/modalDirective.ts";

import cdnService from "./services/cdnService.ts";

// Create app.
const app = angular.module("app", ["ngRoute"]);

// Register view controllers.
app.controller("loginCtrl", loginCtrl);
app.controller("lobbyCtrl", lobbyCtrl);
app.controller("selectChampionCtrl", selectChampionCtrl);
app.controller("selectSummonerSpellCtrl", selectSummonerSpellCtrl);

// Register directives and corresponding controllers.
app.controller("checkboxCtrl", checkboxCtrl.CheckboxCtrl);
app.directive('checkbox', checkboxCtrl.directive);

app.controller("selectCtrl", selectCtrl.SelectCtrl);
app.directive("uikitSelect", selectCtrl.directive);

app.controller("fadeBackgroundCtrl", fadeBackground.FadeBackgroundCtrl);
app.directive("fadeBackground", fadeBackground.directive);

app.directive('compile', compile);
app.directive("backgroundSrc", backgroundSrc);

app.controller("modalCtrl", modalDirective.ModalCtrl);
app.directive("modals", modalDirective.directive);

// Register services.
app.service("modalService", modalService);
app.service("cdnService", cdnService);

// Setup routes.
app.config(["$routeProvider", prov => {
    prov.when("/login", {
        template: require("./components/login/loginView.html"),
        controller: "loginCtrl"
    }).when("/lobby", {
        template: require("./components/lobby/lobbyView.html"),
        controller: "lobbyCtrl"
    }).otherwise({ redirectTo: "/login" });
}]);