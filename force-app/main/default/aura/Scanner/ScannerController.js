({
    // Handler for borrow when enter is pressed
	handleBorrowKeyUp : function(component, event, helper) {
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            // Get itemID
            var itemID = component.find('borrowItemID').get('v.value');
            
            // Create action and set parameters
            let action = component.get("c.borrowItem");
            action.setParam("itemID", itemID);
            
            // Action callback
            action.setCallback(this, function(response){
            let state = response.getState();
                if (state === "SUCCESS"){
                    // Determine if borrow was successful
                    let status = response.getReturnValue();
                    if (status === true){
                        alert("Item borrowed successfully!");
                        // Refresh page
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
        }
	},
    
    // Handler for Borrow when button is pressed
    handleBorrowScan : function(component, event, helper){
        // Get itemID
        var itemID = component.find('borrowItemID').get('v.value');
        
        // Create action and set parameters
        let action = component.get("c.borrowItem");
        action.setParam("itemID", itemID);
        
        // Action callback
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                // Determine if borrow was successful
                let status = response.getReturnValue();
                if (status === true){
                    alert("Item borrowed successfully!");
                    // Refresh page
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

    // Handler for return when enter is pressed
	handleReturnKeyUp : function(component, event, helper) {
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            // Get itemID
            var itemID = component.find('returnItemID').get('v.value');
            
            // Create action and set parameters
            let action = component.get("c.returnItem");
            action.setParam("itemID", itemID);
            
            // Action callback
            action.setCallback(this, function(response){
            let state = response.getState();
                if (state === "SUCCESS"){
                    // Determine if return was successful
                    let status = response.getReturnValue();
                    if (status === true){
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
	},
    
    // Handler for return when button is pressed
    handleReturnScan : function(component, event, helper){
        // Get itemID
        var itemID = component.find('returnItemID').get('v.value');
        
        // Create action and set parameters
        let action = component.get("c.returnItem");
        action.setParam("itemID", itemID);
        
        // Action callback
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                // Determine if return was successful
                let status = response.getReturnValue();
                if (status === true){
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