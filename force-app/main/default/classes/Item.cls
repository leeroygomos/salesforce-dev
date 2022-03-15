public with sharing class Item {
	@AuraEnabled
    //borrow item
    public static Boolean borrowItem(Item__c itemID){
        return True;
    }
    @AuraEnabled
    //return item
	public static Boolean borrowItem(Item__c itemID, User username){
        return True;
    }
}