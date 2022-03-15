({
    // https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/js_cb_init_handler.htm
    
	doInit : function(component, event, helper) {
        // Create action
		let action = component.get("c.getHistory");
        
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
    
    // Handler for filter
    handleKeyUp: function (component, event, helper) {
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            // Get search string
            var queryTerm = component.find('enter-search').get('v.value');
            
            // Create action and set parameters
            let action = component.get("c.getHistory");
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