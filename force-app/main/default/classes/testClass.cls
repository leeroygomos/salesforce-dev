public with sharing class testClass {
	@AuraEnabled
    public static List<Item__c> getItem(){
        return [SELECT Name FROM Item__c];
    }
}