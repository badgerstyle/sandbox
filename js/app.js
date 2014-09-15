App = Ember.Application.create();

App.Router.map(function() {
	this.resource("search", function() {
		this.route("results");
	});
});

App.IndexController = Ember.ObjectController.extend({
	filter: null,
	
	actions: {
		search: function() {
			var filter = this.get("filter");

			this.transitionToRoute("search.results", {queryParams: {filter: filter}});
		}
	}
});

/* -------------------- Search -------------------- */

App.SearchRoute = Ember.Route.extend({
	model: function(params) {
		console.log("Model - SearchRoute");
        console.log(params);
        console.log("filter: " + params.filter);

        // TODO: Get data from controller (query params)
        return {
            filter: params.filter,
            minPrice: 600000,
            maxPrice: 700000,
            bedroomCount: 5,
            bathroomCount: 3,
            propertyType: "Single Family Home"
        }
	}
});

App.SearchController = Ember.ObjectController.extend({
    queryParams: ["filter"],
    filter: null,

    actions: {
        search: function() {
            alert("update search results....");

            // TODO: Refresh ResultsRoute
            this.transitionToRoute("search.results");
        }
    }
});

/* -------------------- Search/Results -------------------- */

App.SearchResultsRoute = Ember.Route.extend({
    model: function(params) {
        console.log("Model - ResultsRoute");
        console.log(params);

        return [
            "10067 Thrasher Circle, Moreno Valley, CA 92557",
            "109 S. Almansor Sreet, Alhambra, CA 91801",
            "1661 Colorado Street, Monterey Park, CA 91754",
            "477 Maple Drive, Beverly Hills, CA 90210"
        ];
    }
});

App.SearchResultsController = Ember.ObjectController.extend({

});

App.SearchResultsView = Ember.View.extend({
    controller: null,
    templateName: "search/results"

});

App.ApiClient = Ember.Object.extend({});
App.ApiClient.reopenClass({
	baseUrl: "http://tranquil-cove-8625.herokuapp.com",
	
	defaultOptions: {
		dataType: "json"
	},
	
	urls: {
		listings: {url: "/listings/search", method: "GET"}
	},
		
	execute: function(options, data, callback) {
		var specs = {
			url: this.baseUrl + options.url,
			type: options.method,
			data: data,
			success: function() {
				callback();
			}
		};
		
		$.extend(specs, this.defaultOptions);
		$.ajax(specs);
		//return Promise.resolve($.ajax(specs))
		//	.then(function(response) {
		//		callback(response);
		//	});
	}
});

App.Search = Ember.Object.extend({});

App.Search.reopenClass({
	getResults: function(params) {
		var apiClient = App.ApiClient;
		apiClient.execute(apiClient.urls.listings, params, function() {
			alert("YAY!!!!!");
		});
	}
});
