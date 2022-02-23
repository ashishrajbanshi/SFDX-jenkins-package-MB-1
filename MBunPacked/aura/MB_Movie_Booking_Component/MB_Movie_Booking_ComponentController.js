({
    onInit : function(component, event, helper) {        
        var movie = component.get('v.movieDetail');       
        if(movie !== undefined){
            var movieDet = [];
            movieDet.push(JSON.parse(movie));
            component.set('v.movie',movieDet);    
        }        
    },
})