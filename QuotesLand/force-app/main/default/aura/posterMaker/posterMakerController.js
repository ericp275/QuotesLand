({
	doInit : function(component, event, helper) {
        /*
        console.log("doing Init...");
        let action = component.get("c.getPoster");
        action.setParams({
            "posterId":'a024W00000J8YDmQAN'
        });
        action.setCallback(this, function(response){
            if(response.getState() == "SUCCESS") {
                console.log("Value Returned:");
                console.log(response.getReturnValue());
                component.set("v.poster", response.getReturnValue());
            }
        })
        $A.enqueueAction(action);
        */
        let poster = component.get("v.poster");
        poster.Picture__c = component.get("v.pictureId");
        component.set("v.poster", poster);
	},
    changeKeywordList : function(component, event, helper) {
    	let category = component.get("v.imageKeywordCategory");
        if(category == 'Custom'){
            component.set("v.customImage", true);
        } else {
           component.set("v.customImage", false); 
        }
        let categoryLists = {'Custom':[],
                          'Landscape':['landscape','forest','beach','volcano','stars'],
                          'Animal':['animal','dog','elephant','frog','butterfly'],
                          'Sport':['sport','football','golf','baseball']};
        let categoryWords = categoryLists[String(category)];
        console.log("The first word is " + categoryWords[0]);
        component.set("v.imageKeyword",categoryWords[0]);
    	component.set("v.imageKeywordList",categoryWords);
	},
    changeQuoteKeywordList : function(component, event, helper) {
    	let category = component.get("v.quoteKeywordCategory");
        let categoryLists = {'Tag':['inspirational','funny','happy','crazy'],
                          'Author':['Ernest Hemingway','John Lennon','Albert Einstein','Ralph Emerson','William Shakespeare','Carl Sandburg','Yogi Berra','Benjamin Franklin','Socrates'],
                          'Title':['Pride and Prejudice','The Great Gatsby','Stuart Little']};
        let categoryWords = categoryLists[String(category)];
        console.log("The first word is " + categoryWords[0]);
        component.set("v.quoteKeyword",categoryWords[0]);
    	component.set("v.quoteKeywordList",categoryWords);
	},
    setImageBoundaries: function(component, event, helper) {
        console.log("Image dimensions are:");
        let img = component.find("posterImage").getElement();
        let imgHeight = img.naturalHeight * (960 / img.naturalWidth);
        console.log(imgHeight);
        component.set("v.imageHeight",imgHeight);
        helper.setTextLimitsHelper(component);
    },
    setTextLimits: function(component, event, helper) {
        helper.setTextLimitsHelper(component);
    },
    changeTextHeight: function(component, event, helper) {
        let newHeight = -200 - event.getParam("stat");
        component.set("v.textHeight", newHeight);
    },
    changeTextWidth: function(component, event, helper) {
        let newWidth = 50 + event.getParam("stat") / 2;
        component.set("v.textWidth", newWidth);
    },
    changeTextLeftMargin: function(component, event, helper) {
        let newLeftMargin = 25 + Number(event.getParam("stat"));
        component.set("v.textLeftMargin", newLeftMargin);
    },
    changeTextColor: function(component, event, helper) {
        let newColor = event.getParam("stat");
        component.set("v.textColor", newColor);
    },
    getPoster: function(component, event, helper) {
        helper.getImageHelper(component,event);
        helper.getQuotationHelper(component,event);
        component.set("v.showingPoster", true);
	},
    getImage: function(component, event, helper) {
        helper.getImageHelper(component,event);
	},
    getQuotation: function(component, event, helper) {
        helper.getQuotationHelper(component,event);
	},
    savePoster: function(component, event, helper){
        component.set("v.showingBuyScreen",!component.get("v.showingBuyScreen"));
        console.log("Save event received");
        let action = component.get("c.savePosterToDatabase");
        //Check if pic is null
        if(component.get("v.pictureId") == null && component.get("v.QuotationId") == null){
            action.setParams({
                "imageSearch": component.get("v.imageKeyword"), 
                "imageUrl": component.get("v.imageUrl"),
                "quoteSearch": component.get("v.quoteKeyword"),
                "quoteAuthor": component.get("v.author"), 
                "quoteCategory": component.get("v.quoteKeywordCategory"), 
                "quoteText": component.get("v.quote"),
                "posterTextHeight" : component.get("v.textHeight"), 
                "posterTextWidth": component.get("v.textWidth"),
                "posterLeftMargin" : component.get("v.textLeftMargin"), 
                "posterTextColor": component.get("v.textColor")
            });
        } else {
            console.log("They aren't null !")
            //check if quote is null
            action.setParams({
                "quoteSearch": component.get("v.quoteKeyword"),
                "quoteAuthor": component.get("v.author"), 
                "quoteCategory": component.get("v.quoteKeywordCategory"), 
                "quoteText": component.get("v.quote")
            });
            action.setParams({
                "posterTextHeight" : component.get("v.textHeight"), 
                "posterTextWidth": component.get("v.textWidth"),
                "posterLeftMargin" : component.get("v.textLeftMargin"), 
                "posterTextColor": component.get("v.textColor")
            });
        }
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS") {
                console.log("Poster has been saved!");
                component.set("v.poster", response.getReturnValue());
                //helper.setPicture(component);
            }
        })
        $A.enqueueAction(action);
    }
})