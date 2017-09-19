var app = angular.module("firstAngularApp",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home',{
			url : '/',
			templateUrl : 'home.html'
		})
		.state('posts',{
			url : '/posts',
			template : '<ui-view></ui-view>'
		})
		.state('posts.incomplete',{
			url : '/incomplete',
			template : '<posts-list posts="vm.incompletePosts"></posts-list>',
			controllerAs : 'vm'
		})
		.state('posts.complete',{
			url : '/complete',
			template : '<posts-list posts="vm.completePosts"></posts-list>',
			controllerAs : 'vm'
		});

});

app.controller('mainCtrl', function(mainService){
	
	var vm = this;
	mainService.getPosts().then(response =>{
		vm.incompletePosts = response.data.splice(0,50);
		vm.completePosts = response.data;
	});
	
});



app.filter('makePlural', function(){
	return function(input){
		return input+'s';
	}
});

app.service('mainService',function($http){

	this.getPosts = function(){
		return $http.get('https://jsonplaceholder.typicode.com/posts');	
	}

});