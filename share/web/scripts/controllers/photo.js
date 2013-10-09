app.controller("PhotoCtrl", function($scope, $routeParams, PhotoSvc, SelectSvc, UserSvc, Tab) {
  var listener;
  $scope.items = [];
  $scope.tab = Tab;
  $scope.selected = SelectSvc.fetch();
  $scope.box = {
    width: 1000,
    height: 300
  };
  $scope.toolbar = false;
  $scope.user = UserSvc.info();
  $scope.$watch(UserSvc.status, function() {
    return $scope.user = UserSvc.info();
  });
  $scope.toolbar_toggle = function() {
    return $scope.toolbar = !$scope.toolbar;
  };
  $scope.select = function(photo) {
    photo.hover = false;
    if (photo.selected) {
      return SelectSvc.del(photo);
    } else {
      SelectSvc.add(photo);
      return $scope.toolbar = true;
    }
  };
  $scope.clear = function() {
    return SelectSvc.clear();
  };
  return (listener = function() {
    var data, item, width, _i, _len;
    width = $('#main').width();
    if (width !== $scope.box.width) {
      $scope.box.width = width;
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    }
    if ($scope.items.length < 1 && UserSvc.status() === 'login') {
      switch (Tab) {
        case 'album':
          data = PhotoSvc.album(1);
          console.log(data);
          break;
        case 'selected':
          data = SelectSvc.fetch();
          break;
        default:
          data = PhotoSvc.photo(1);
      }
      if (data instanceof Array) {
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          $scope.items.push(item);
        }
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      }
    }
    return setTimeout(listener, 1000);
  })();
});

/*
//@ sourceMappingURL=photo.js.map
*/