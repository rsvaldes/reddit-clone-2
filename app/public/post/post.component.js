(function() {
  'use strict';
  angular.module('app')
    .component('post', {
      controller: controller,
      templateUrl: '/post/post.template.html'
    }); //end of component

  controller.inject = ['$http'];

  function controller($http) {
    const vm = this;
    vm.$onInit = function() {
      vm.show = false;
      vm.posts = [];
      vm.sortBy = '-vote_count';
      vm.sortText = 'Votes';
      vm.getPosts();
    };
    vm.getPosts = function() {
      $http.get('/api/posts').then((results) => {
        vm.posts = results.data;
        // vm.date = results.data[0].created_at.slice(0, 10);
      });
    };
    vm.toggleForm = function() {
      if (vm.show === true) {
        vm.show = false;
      } else {
        vm.show = true;
      }
    };
    vm.createPost = function() {
      $http.post('/api/posts', vm.post).then((post) => {
      post.data.comments = [];
      vm.show = false;
      post.data.createdAt = Date.now();
        vm.posts.push(post.data);
      })
      delete vm.post;
    };

    vm.createComment = function(post) {
      $http.post(`/api/posts/${post.id}/comments/`, {
        content: post.newComment
      }).then((response) => {
        post.comments.push(response.data);
      });
      delete post.newComment;
    };

    vm.vote = function(post, up) {
      if (up) {
        post.vote_count++
        $http.post(`/api/posts/${post.id}/votes/`, {content:post.vote_count}).then((response)=>{
          console.log(response);
        })
      } else {
        post.vote_count--
        $http.delete(`/api/posts/${post.id}/votes/`, {content:post.vote_count}).then((response)=>{
          console.log(response);
        })
      }
      if (post.vote_count < 0) {
        post.vote_count = 0
      }
    }

  } //close controller

}()); //end of iffe
