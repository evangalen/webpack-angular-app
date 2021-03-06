'use strict';

var angular = require('angular');


module.exports = angular.module('admin-users', [
  require('./admin-users-list').name,
  require('./admin-users-edit').name,

  require('../../../common/services/crud').name,
  require('../../../common/security/authorization').name,
  require('../../../common/directives/gravatar').name
])

.config(['crudRouteProvider', 'securityAuthorizationProvider', function (crudRouteProvider, securityAuthorizationProvider) {

  crudRouteProvider.routesFor('Users', 'admin')
    .whenList({
      users: ['Users', function(Users) { return Users.all(); }],
      currentUser: securityAuthorizationProvider.requireAdminUser
    })
    .whenNew({
      user: ['Users', function(Users) { return new Users(); }],
      currentUser: securityAuthorizationProvider.requireAdminUser
    })
    .whenEdit({
      user:['$route', 'Users', function ($route, Users) {
        return Users.getById($route.current.params.itemId);
      }],
      currentUser: securityAuthorizationProvider.requireAdminUser
    });
}]);