({
    // https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_cb_init_handler.htm
	
    doInit : function(component, event, helper) {
        // Create action
		let action = component.get("c.getItem");
        
        // Add callback behaviour for when response is recieved
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
    
    // Handler for borrow
    handleBorrow: function(component, event, helper){
        // Get item info
        var target = event.getSource();
        var itemID = target.get("v.value");
        
        // Create action and set parameters
        let action = component.get("c.borrowItem");
        action.setParam("itemID", itemID);
        
        // Action callback
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                // Determine if borrow was successful
                let status = response.getReturnValue();
                if (status){
                    alert("Item borrowed successfully!");
                    // Refresh component
                    $A.get('event.force:refreshView').fire();
                }
                else{
                    alert("Item borrow was unsuccessful");
                }
            }
            else{
                console.log("Failed with state" + state);
            }
        });
        
        $A.enqueueAction(action);
    },
    
    // Handler for search
    handleKeyUp: function (component, event, helper) {
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            // Get search string
            var queryTerm = component.find('enter-search').get('v.value');
            
            // Create action and set parameters
            let action = component.get("c.getItem");
            action.setParam("queryTerm", queryTerm);
            
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
            
            $A.enqueueAction(action);
          
        }
    }
    
})