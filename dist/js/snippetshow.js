/*! snippetshow, bro  */
"use strict";

angular.module("snippetshow.components.bluetooth", [ "ngRoute" ]).config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "components/bluetooth/console.html",
        controller: "BluetoothController"
    });
} ]).controller("BluetoothController", function($scope, $routeParams, Posts, $location, $log) {
    $log.log("Bluetooth controller");
    var type = $routeParams.type;
    Posts.query().then(function(posts) {
        type ? $scope.posts = _.where(posts, {
            type: type
        }) : $scope.posts = posts;
    }), $scope.openDetails = function(id) {
        $location.path("/posts/details/" + id);
    };
}), angular.module("snippetshow.components.tumblrPostControls", []).directive("tumblrPostControls", function($document) {
    return {
        restrict: "E",
        templateUrl: "components/tumblr-post/_post-controls.template.html",
        compile: function() {
            return {
                post: function(scope, element) {
                    element.find(".tabs").tabs();
                    var chipIconSelector = ".chip .material-icons";
                    $document.off(chipIconSelector);
                }
            };
        }
    };
}), angular.module("snippetshow.components.tumblrPost", []).directive("tumblrPost", function($compile, $interpolate, $templateRequest) {
    return {
        restrict: "E",
        controller: function($scope, $element) {
            var childDirective = "tumblr-" + $scope.post.type + "-post";
            $templateRequest("components/tumblr-post/_post.template.html").then(function(template) {
                template = $interpolate(template)({
                    directive: childDirective
                });
                var compiled = $compile(template)($scope);
                $element.addClass(childDirective), $element.append(compiled);
            });
        }
    };
}).factory("TumblrPostDirective", function() {
    return function(postType, link) {
        return {
            restrict: "A",
            require: "^^tumblrPost",
            templateUrl: "components/tumblr-post/" + postType + ".template.html",
            compile: function() {
                return {
                    pre: link,
                    post: function(scope, element) {
                        element.find(".tabs").tabs();
                    }
                };
            }
        };
    };
}).directive("tumblrTextPost", function(TumblrPostDirective) {
    return new TumblrPostDirective("text");
}).directive("tumblrQuotePost", function(TumblrPostDirective) {
    return new TumblrPostDirective("quote");
}).directive("tumblrChatPost", function(TumblrPostDirective) {
    return new TumblrPostDirective("chat");
}).directive("tumblrPhotoPost", function(TumblrPostDirective) {
    return new TumblrPostDirective("photo");
}).directive("tumblrLinkPost", function(TumblrPostDirective) {
    return new TumblrPostDirective("link");
}).directive("tumblrAudioPost", function(TumblrPostDirective) {
    return new TumblrPostDirective("audio", function(scope, element) {
        element.find(".video-container").html(scope.post.embed);
    });
}).directive("tumblrVideoPost", function(TumblrPostDirective) {
    return new TumblrPostDirective("video", function(scope, element) {
        var index = scope.post.player.length - 1, embed = scope.post.player[index].embed_code;
        element.find(".video-container").html(embed);
    });
}).directive("tumblrPostBody", function($showdown, $log) {
    return {
        restrict: "A",
        require: "^tumblrPost",
        scope: {
            markdown: "<",
            html: "<"
        },
        link: function(scope, element) {
            var html = scope.html || $showdown.makeHtml(scope.markdown);
            $log.log(html), element.html(html), element.find("pre code").each(function(i, el) {
                hljs.highlightBlock(el);
            }), element.find("code").each(function(i, el) {
                el = angular.element(el), el.hasClass("hljs") || el.addClass("inline-code");
            });
        }
    };
}), angular.module("snippetshow.components.posts", []).service("Posts", [ "$http", "$q", function($http, $q) {
    return {
        query: function() {
            return $http.get("/api/posts.json").then(function(response) {
                return response.data;
            });
        },
        get: function(id) {
            return $http.get("/api/posts.json").then(function(response) {
                var posts = response.data, single = _.findWhere(posts, {
                    id: Number(id)
                });
                return single;
            });
        }
    };
} ]), angular.module("snippetshow.views.posts", [ "ngRoute" ]).config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/posts/type/:type?", {
        templateUrl: "views/posts/posts.html",
        controller: "PostsController"
    }).when("/posts/details/:postId", {
        templateUrl: "views/posts/posts.html",
        controller: "PostDetailsController"
    }).when("/posts/:category?", {
        templateUrl: "views/posts/posts.html",
        controller: "PostsController"
    });
} ]).controller("PostsController", function($scope, $routeParams, Posts, $location, $log) {
    $log.log("Multi post view");
    var type = $routeParams.type;
    Posts.query().then(function(posts) {
        type ? $scope.posts = _.where(posts, {
            type: type
        }) : $scope.posts = posts;
    }), $scope.openDetails = function(id) {
        $location.path("/posts/details/" + id);
    };
}).controller("PostDetailsController", function($scope, $routeParams, Posts, $log) {
    $log.log("Single post view"), $scope.$routeParams = $routeParams, Posts.get($routeParams.postId).then(function(post) {
        $scope.posts = [ post ];
    });
}), angular.module("snippetshow.views.streamhub", [ "ngRoute" ]).controller("StreamController", function($scope, $routeParams, $log) {
    $log.log("loaded");
}), angular.module("snippetshow", [ "ngRoute", "ngResource", "ngSanitize", "snippetshow.views.posts", "snippetshow.components.tumblrPost", "snippetshow.components.tumblrPostControls", "snippetshow.components.posts", "ng-showdown" ]).config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/posts", {
        controller: "PostsController"
    }).when("/about", {
        templateUrl: "templates/about.html"
    }).otherwise({
        redirectTo: "/posts"
    });
} ]).config(function($showdownProvider) {
    $showdownProvider.setOption("noHeaderId", !0), $showdownProvider.setOption("headerLevelStart", 2);
});
/* watch the matrix tonight */
/* 1x10v3<21 */