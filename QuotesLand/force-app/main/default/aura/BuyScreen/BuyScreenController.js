({
	doInit : function(component, event, helper) {
		
	},
    orderPosters : function(component, event, helper) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("done!");
            console.log(xhr.response);
        } else if(this.readyState == 4){
            console.log(xhr.response);
        }
    };
        xhr.open('POST', '/services/data/v30.0/commerce/sale/order', true);
        
        xhr.send(`{
   "order": [
   {
      "attributes": {
      "type": "Order"
      },
      "EffectiveDate": "2020-10-11",
      "Status": "Draft",
      "billingCity": "SFO-Inside-OrderEntity-1",
      "accountId": "0014W000027zHT1QAM",
      "Pricebook2Id": "01s4W000004ezHhQAI",
      "OrderItems": {
         "records": [
            {
            "attributes": {
               "type": "OrderItem"
            },
            "PricebookEntryId": "01u4W000009QFGvQAO",
            "quantity": "1",
            "UnitPrice": "15.00"
            }
         ]
      }
   }
   ]
}`);
        /*
        let quantity = event.getSource().get("v.label").split(" ")[1];
        console.log("Will order " + quantity + " posters");
        let action = component.get("c.orderPoster");
        action.setParams({
            "Quantity": quantity,
            "posterId": component.get("v.poster")
        });
        action.setCallback(this,function(response){
            console.log("Done!!");
        })
        $A.enqueueAction(action);
        */
    }
})