({
	changeTextHeight : function(component, event, helper) {
		let height = component.get("v.textHeight");
        let updateEvent = component.getEvent("changeHeight");
        updateEvent.setParams({"stat":height});
        updateEvent.fire();
	},
    changeTextWidth : function(component, event, helper) {
		let width = component.get("v.textWidth");
        let updateEvent = component.getEvent("changeWidth");
        updateEvent.setParams({"stat":width});
        updateEvent.fire();
	},
    changeTextLeftMargin : function(component, event, helper) {
		let leftMargin = component.get("v.textLeftMargin");
        let updateEvent = component.getEvent("changeLeftMargin");
        updateEvent.setParams({"stat":leftMargin});
        updateEvent.fire();
	},
    changeTextLimits : function(component, event, helper) {
		console.log("Will set text limits to");
        component.set("v.maxHeight",Math.floor(event.getParam("stat")));
        component.set("v.maxWidth",Math.floor(event.getParam("stat2")));
	},
    changeTextColor : function(component, event, helper) {
        if(event.getSource().get("v.label").length == 7){
            component.set("v.textColor", event.getSource().get("v.label"));
            let color = component.get("v.textColor");
            console.log("color length",color.length);
            let updateEvent = component.getEvent("changeColor");
            updateEvent.setParams({"stat":color});
            updateEvent.fire();
        }
	},
})