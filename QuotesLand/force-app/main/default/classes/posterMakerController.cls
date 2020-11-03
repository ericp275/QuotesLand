public class posterMakerController {
    
    @AuraEnabled
    public static String loadPicture(String searchKeyword){
        //return 'https://c402277.ssl.cf1.rackcdn.com/photos/14206/images/hero_small/WW187785.jpg?1576774644';

        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
      //On the request we set out endpoint, that needs to be whitelisted, and then we set the http method
        request.setEndpoint('https://api.pexels.com/v1/search?page=1&query=' + searchKeyword + '&per_page=5');
        request.setMethod('GET');
        request.setHeader('Authorization', '563492ad6f917000010000016cb97edeca4e4040bb2175d2af29e6cc');
        HttpResponse response = http.send(request);

        if(response.getStatusCode() == 200){
            //JSON.deserializeUntyped() will return an APEX Object, this method takes in the response body as it paramter
            //Jsons store information in key-value pairs
            //System.debug(response.getBody());
            
            Map<String,Object> respMap = (Map<String,Object>)
                JSON.deserializeUntyped(response.getBody());
            
            //System.debug(respMap);
        
        List<object> photos = (List<Object>) respMap.get('photos');
        Map<String,Object> photoDetails = (Map<String,Object>) photos[Integer.valueOf(Math.floor(Math.random() * 5))];
            System.debug(photoDetails.get('id'));
        Map<String,Object> photoSrc = (Map<String,Object>) photoDetails.get('src');
        System.debug(photoSrc.get('large'));
        
            
            //Integer photoId = Integer.valueOf(List<Object>)(respMap.get('photos'))[0].get('id'));
            //String url = String.valueOf(respMap.get('photos')[0].get('url'));
        return (String) photoSrc.get('large');
        }
       return null;
    }
    
    @AuraEnabled
    public static String loadQuote(String searchKeyword, String searchType){
        //return 'https://c402277.ssl.cf1.rackcdn.com/photos/14206/images/hero_small/WW187785.jpg?1576774644';

        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String pageNumber = '1';
      //On the request we set out endpoint, that needs to be whitelisted, and then we set the http method
        if(searchType == 'Tag'){
        	request.setEndpoint('https://www.goodreads.com/quotes/' + searchType.toLowerCase() + '/' + searchKeyword + '?page=' + pageNumber);
        } else{
            request.setEndpoint('https://www.goodreads.com/search?q=' + searchKeyword + '&search_type=quotes');
        }
            //https://www.goodreads.com/search?q=ernest+hemingway&search_type=quotes
        request.setMethod('GET');
        HttpResponse response = http.send(request);

        if(response.getStatusCode() == 200){
            //JSON.deserializeUntyped() will return an APEX Object, this method takes in the response body as it paramter
            //Jsons store information in key-value pairs
            //System.debug(response.getBody());
            List<String> chunks = response.getBody().split('&ldquo;');
            if(searchType != 'Tag'){
                chunks = response.getBody().split('tableList')[1].split('previous_page')[0].split('&quot;');
            }
            system.debug('There are ' + chunks.size() + ' chunks');
            Integer selection = Integer.valueOf(Math.floor(Math.random() * (chunks.size() - 1))) + 1;
            if(searchType != 'Tag' && Math.mod(selection, 2) == 0){
                selection++;
            }
            String chunk = chunks[selection];
            system.debug('chunk is' + chunk);
            String quote = chunk.split('&rdquo')[0];
            String author = '-';
            if(searchType == 'Tag'){
                author = '-' + chunk.split('Title">')[1].split('</sp')[0];
            } 
        return quote + ']x[' + author;
        }
       return 'Service Unavailable]x[Toad';
    }
    @AuraEnabled
    public static Poster__c savePosterToDatabase(Picture__c pic, Quotation__c quote, String imageSearch, String imageUrl, String quoteSearch,
                                 String quoteAuthor, String quoteCategory, String quoteText, Integer posterTextHeight, Integer posterTextWidth,
                                 Integer posterLeftMargin, String posterTextColor){
        return posterDatabase.savePoster(pic, quote, imageSearch, imageUrl, quoteSearch,
                                 quoteAuthor, quoteCategory, quoteText, posterTextHeight, posterTextWidth,
                                 posterLeftMargin, posterTextColor);
    }
    
    @AuraEnabled
    public static Poster__c getPoster(String posterId){
        return [SELECT Id from Poster__c WHERE Id = :posterId LIMIT 1];
    }
    @AuraEnabled
    public static String getPicture(Poster__c posterId){
        Picture__c picUrl = [SELECT Url__c from Picture__c WHERE Id = :posterId.Picture__c LIMIT 1];
        return picUrl.Url__c;
    }
}