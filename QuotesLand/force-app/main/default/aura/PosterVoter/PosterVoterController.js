({
	savePoster : function(component, event, helper) {
		let saveEvent = component.getEvent("saveThisPoster");
        saveEvent.fire();
	}
})