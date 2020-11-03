public class posterDatabase {
    public static Poster__c savePoster(Picture__c pic, Quotation__c quote, String imageSearch, String imageUrl, String quoteSearch,
                                 String quoteAuthor, String quoteCategory, String quoteText, Integer posterTextHeight, Integer posterTextWidth,
                                 Integer posterLeftMargin, String posterTextColor){
        System.debug('Will save poster');
        if(pic == null){
            pic = new Picture__c(Keyword__c = imageSearch, Rating__c = 1, Votes__c = 0, url__c = imageUrl);
            insert pic;
        }
        if(quote == null){
            quote = new Quotation__c(Keyword__c = quoteSearch, Rating__c = 1, Votes__c = 0, Author__c = quoteAuthor, Search_Category__c = quoteCategory, Quote_Text__c = quoteText);
            insert quote;
        }
        Poster__c poster = new Poster__c(Word_Height__c = posterTextHeight, Word_Width__c = posterTextWidth, Word_Color__c = posterTextColor,
                                        Left_Margin__c = posterLeftMargin, Quotation__c = quote.Id, Picture__c = pic.Id);
        insert poster;
        return poster;
    }
    @AuraEnabled
    public static void orderPoster(String Quantity, Poster__c posterId){
        User theUser = [SELECT Id,Alias,Email FROM User WHERE Id = :userInfo.getUserId() LIMIT 1];
        Contact buyer = [SELECT Id,firstName,lastName,email FROM Contact WHERE email = :theUser.Email LIMIT 1];
        System.debug('Will order' + Quantity + ' ' + posterId.Id + ' posters for user ' + buyer.firstName + ' ' + buyer.lastName + '('
                    + buyer.email + ')');
        Order posterOrder = new Order();//(ContractId = '8004W000004rgzsQAA');
        posterOrder.Contact__c = buyer.Id;
        insert posterOrder;
        OrderItem oi = new OrderItem();
        oi.Poster__c = posterId.Id;
        insert oi;
    }
    
}