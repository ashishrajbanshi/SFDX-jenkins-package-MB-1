({	
    doInit : function(component, event, helper){
        helper.fetchAllMovie(component);
    },
    handleCreate : function(component, event, helper) {
        component.set( 'v.newRec', true);
        component.set( 'v.ShowButton', false);
        var modalFade1 = component.find('eventPopId');    
        component.find("eventPopId").submitDR(modalFade1);
    },
    
    handleShowList : function(component, event, helper){
        component.set( 'v.newRec', false);
        component.set( 'v.ShowButton', true);
        helper.fetchAllMovie(component);
        
    },
    OpenEventPopup : function(component, event, helper) {		
        var modalFade1 = component.find('eventPopId');    
        component.find("eventPopId").submitDR(modalFade1);
	},    
    
    
})