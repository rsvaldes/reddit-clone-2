(function() {
'use strict';
angular.module('app')
  .component('post', {
    controller.inject = ['$http'];
    controller: function ($http) {
      const vm = this;
      vm.$onInit = function () {
        console.log('hi');
      };
  },
  templateUrl:'post.template.html'
}); //end of component

}()); //end of iffe
