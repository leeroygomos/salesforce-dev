({
    // https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_cb_init_handler.htm
    
	doInit : function(component, event, helper) {
        // Create action
		let action = component.get("c.getBorrowed");
        
        // Action callback
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                component.set("v.Item", response.getReturnValue());
            }
            else{
                console.log("Failed with state" + state);
            }
        });
        
        // Send action off to be executed
        $A.enqueueAction(action);
	},
    
    // Handler for return
    handleReturn: function(component, event, helper){
        // Get item info
        var target = event.getSource();
        var itemID = target.get("v.value");
        
        // Create action and set parameters
        let action = component.get("c.returnItem");
        action.setParam("itemID", itemID);
        
        // Action callback
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                // Determine if return was successful
                let status = response.getReturnValue();
                if (status){
                    alert("Item returned successfully!");
                    // Refresh page
                    $A.get('event.force:refreshView').fire();
                }
                else{
                    alert("Item return was unsuccessful");
                }
            }
            else{
                console.log("Failed with state" + state);
            }
        });
        
        $A.enqueueAction(action);
    }
})