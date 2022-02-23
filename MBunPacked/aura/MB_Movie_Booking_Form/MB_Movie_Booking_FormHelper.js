({
    fetchAllMovie : function(component) {
	var action = component.get("c.getBooking");
         action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnValue = response.getReturnValue();
                component.set( 'v.bookings', returnValue);
                console.log(returnValue);
                }
            else if (state === "INCOMPLETE") {
                
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
       
        
        $A.enqueueAction(action);
	}
})