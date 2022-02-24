/**
* Apex controller for MB Aura and LWC Components
*/ 
public with sharing class MB_Movie_Controller {
    
    @AuraEnabled
    public static list<Movie__c> getThumbnail(String movieId){
        Id movId = (Id) movieId;
        List<Movie__c> movie = [SELECT Id,Thumbnail__c FROM Movie__c WHERE Id =: movId];
        return movie;
        
        
    }
    @AuraEnabled
    public static List<Booking__c> getBookingThumbnail(String bookingId){
        Id bookId = (Id) bookingId;
        List<Booking__c> book = [SELECT Id,Show_Time__r.Movie__r.Thumbnail__c FROM Booking__c WHERE Id =: bookId];
        return book;
        
        
    }
    
    
    @AuraEnabled
    public static list<Movie__c> getMoviesDetail(String movId){
        Id MovieId = (Id) movId;
        list<Movie__c> movie = [SELECT Id, Name, Description__c, Director__c, Length__c, Thumbnail__c FROM Movie__c WHERE Id =: MovieId];
        return movie;
    }
    @AuraEnabled
    public static list<Movie__c> getAllMovies(){
        return [SELECT Id, Name, Description__c, Director__c, Length__c, Thumbnail__c FROM Movie__c];
    }
    @AuraEnabled
    public static list<Booking__c> getBooking(){
        return [SELECT Id, Name,Email__c,Payment__c  FROM Booking__c];
    }
    
    @AuraEnabled
    public static list<Show_Time__c> getMoviesBasedOnShowTime(String showTime){
        return [SELECT Id,Movie__c,Movie__r.Name,Movie__r.Thumbnail__c,Movie__r.Length__c,Movie__r.Director__c,Movie__r.Description__c FROM Show_Time__c WHERE Time__c  =: showTime AND Show_Time__c =: Date.Today()];
    }
    
    @AuraEnabled
    public static list<Show_Time__c> getTodayShow(){        
        return [SELECT Id,Name,Show_Time__c,Time__c,Movie__r.Name,Movie__r.Thumbnail__c FROM Show_Time__c WHERE Show_Time__c = today];
        
    }
    @AuraEnabled
    public static list<Show_Time__c> getTomorrowShow(){
     
        return [SELECT Id,Name,Show_Time__c,Time__c,Movie__r.Name,Movie__r.Thumbnail__c FROM Show_Time__c WHERE Show_Time__c = Tomorrow];
        
    }
    
    @AuraEnabled
    public static Boolean mbSaveRecords(String movieDetails){
        return false;
    }
    
}