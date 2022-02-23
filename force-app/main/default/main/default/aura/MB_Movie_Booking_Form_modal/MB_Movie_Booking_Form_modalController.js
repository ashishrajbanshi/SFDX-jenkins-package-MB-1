({
    openEventPopup : function(component, event, helper) {
        var modalFade = component.find('modalFade');
        var modalBackdrop = component.find('modalBackdrop');
        
        $A.util.addClass(modalFade,'slds-fade-in-open');
        $A.util.addClass(modalBackdrop,'slds-backdrop_open');
    },
    
    handleSuccess : function(component, event, helper) {
        var modalFade = component.find('modalFade');
        var modalBackdrop = component.find('modalBackdrop');
         debugger;
        $A.util.removeClass(modalFade,'slds-fade-in-open');
        $A.util.removeClass(modalBackdrop,'slds-backdrop_open');
        component.find('notifLib').showToast({
            "variant": "success",
            "title": "Success",
            "message": "Booking has been created."
        });
    },
    closeModal:function(component, event, helper) {
        var modalFade = component.find('modalFade');
        var modalBackdrop = component.find('modalBackdrop');
         debugger;
        $A.util.removeClass(modalFade,'slds-fade-in-open');
        $A.util.removeClass(modalBackdrop,'slds-backdrop_open');
    },
    doInit : function(component, event, helper){
        helper.fetchAllMovie(component);
    },
    handleShowList : function(component, event, helper){
        component.set( 'v.newRec', false);
        component.set( 'v.ShowButton', true);
        helper.fetchAllMovie(component);
        
    },    
})