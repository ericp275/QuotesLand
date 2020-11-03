({
	setTextLimitsHelper: function(component) {
        console.log("Text Height is:");
        let QH = component.find("QuoteHolder").getElement();
        console.log(QH.offsetHeight);
        let imgHeight = component.get("v.imageHeight");
        let maxHeight = Math.max(0,imgHeight - 60 - QH.offsetHeight);
        let maxWidth = Math.max(0,960 - QH.offsetWidth);
        let updateAction = $A.get("e.c:broadcastUpdate");
        updateAction.setParams({
            "stat": maxHeight,
            "stat2": maxWidth
        });
        updateAction.fire();
    },
    getImageHelper: function(component, event) {
        let action = component.get("c.loadPicture");
        let theKeyword = component.get("v.imageKeywordCategory") == "Custom" ? component.get("v.imageKeywordCustom") : component.get("v.imageKeyword");
        action.setParams({
            "searchKeyword":theKeyword.replaceAll(" ","+")
        });
        action.setCallback(this, function(response){
            if(response.getState() == "SUCCESS") {
                console.log("Value Returned:");
                console.log(response.getReturnValue());
                component.set("v.imageUrl", response.getReturnValue());
            }
        })
        $A.enqueueAction(action);
    },
    getQuotationHelper: function(component, event) {
        let nextAction = component.get("c.loadQuote");
        nextAction.setParams({
            "searchType":component.get("v.quoteKeywordCategory"),
            "searchKeyword":component.get("v.quoteKeyword").replaceAll(" ","+")
        });
        nextAction.setCallback(this, function(response){
            if(response.getState() == "SUCCESS") {
                console.log("Value Returned:");
                console.log(response.getReturnValue());
                let parts = response.getReturnValue().split("]x[");
                component.set("v.textSize", 50 - (Math.max(0, parts[0].length - 60) / 5.5));
                component.set("v.quote", parts[0]);
                component.find("QuoteText").getElement().innerHTML = parts[0];
                if(component.get("v.quoteKeywordCategory") == "Tag"){
                    console.log("length of " + parts[1] + ":");
                    console.log(parts[1].length);
                    let partsLastLetter = parts[1].length - 1;
                    console.log("last letter is [" + parts[1][partsLastLetter] + "]");
                    while(partsLastLetter > -1 && (parts[1][partsLastLetter] == ' ' || 
                                                   parts[1][partsLastLetter] == ',' ||
                                                   parts[1][partsLastLetter] == '\n')){
                        console.log("removing [" + parts[1][partsLastLetter] + "]");
                        partsLastLetter--;
                    }
    
                    parts[1] = parts[1].substring(0,partsLastLetter + 1);
                    component.set("v.author", parts[1]);
                } else {
                    component.set("v.author", component.get("v.quoteKeyword"));
                }
            }
        })
        $A.enqueueAction(nextAction);
    },
    setPicture: function(component){
        let action = component.get("c.getPicture");

        action.setParams({
            "imageSearch": component.get("v.poster") 
        });
        
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS") {
                let po = component.get("v.poster");
                po.Picture__c = {Url__c : response.getReturnValue()};
                component.set("v.poster",po);
            }
        })
        $A.enqueueAction(action);
    }
})