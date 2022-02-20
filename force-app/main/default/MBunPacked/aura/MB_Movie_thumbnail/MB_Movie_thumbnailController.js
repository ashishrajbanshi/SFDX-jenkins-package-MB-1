({
	onInit : function(component, event, helper) {
		/**
		 * APex call to get thumbnail
		 */
        var thumbnailAction = component.get('c.getBookingThumbnail');
        thumbnailAction.setParams({
            "bookingId": component.get('v.recordId')
        });
        thumbnailAction.setCallback(this,function(response){
            var state = response.getState();
            if (state ==='SUCCESS'){
                component.set('v.thumbnail',response.getReturnValue()[0].Show_Time__r.Movie__r.Thumbnail__c);
            }
           
        });
        $A.enqueueAction(thumbnailAction);
	}
})