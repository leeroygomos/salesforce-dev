({
	doInit : function(component, event, helper) {
        //create action
		let action = component.get("c.getItem");
        //add callback behaviour for when response is recieved
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                component.set("v.Item", response.getReturnValue());
            }
            else{
                console.log("Failed with state" + state);
            }
        });
        //send action off to be executed
        $A.enqueueAction(action);
	}
})