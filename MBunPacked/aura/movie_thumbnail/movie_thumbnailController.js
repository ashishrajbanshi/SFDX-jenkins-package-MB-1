({
	onInit : function(component, event, helper) {
		/**
		 * APex call to get thumbnail
		 */
        var thumbnailAction = component.get('c.getThumbnail');
        thumbnailAction.setParams({
            "movieId": component.get('v.recordId')
        });
        thumbnailAction.setCallback(this,function(response){
            var state = response.getState();
            if (state ==='SUCCESS'){
                component.set('v.thumbnail',response.getReturnValue()[0].Thumbnail__c);
            }
            debugger;
        });
        $A.enqueueAction(thumbnailAction);
	}
})