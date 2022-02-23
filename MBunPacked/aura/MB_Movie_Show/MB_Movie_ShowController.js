({
	onInit : function(component, event, helper) {
		var movie_action = component.get('c.getMoviesBasedOnShowTime');
        movie_action.setParams({
            showTime : component.get('v.showTime')
        })
        debugger;
        movie_action.setCallback(this,function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.movies',response.getReturnValue());
            }
        });
        $A.enqueueAction(movie_action);
	},
    openBooking : function(component, event, helper) {
        var mbMovieBookingComponent = component.find('child_cmp');
        var mvId = event.target.dataset.id;
        var movies = component.get('v.movies');
        
        movies.forEach(function(movie){
            if(movie.Id === mvId)  { 
                component.set('v.isMovieChecked' , true);
                mbMovieBookingComponent.set('v.movie',movie)
            }
        })                 
    },
})