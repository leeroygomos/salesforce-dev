public with sharing class itemList {
	@AuraEnabled
    // Gets list of all items
    public static List<Item__c> getItem(String queryTerm){
        if (!String.isBlank(queryTerm)){
            String query = '%' + queryTerm + '%';
            return [SELECT Id, ID__c, Name, Type__c, Available__c, User_Name__c FROM Item__c 
                    WHERE ID__c LIKE :query
                    	OR Available__c LIKE :query
                   		OR Name LIKE :query
                    	OR Type__c LIKE :query
                    	OR User_Name__c LIKE :query
                    	ORDER BY ID__c
                   ];
        }
        // For empty queryTerm
        else{
            return [SELECT Id, ID__c, Name, Type__c, Available__c, User_Name__c FROM Item__c ORDER BY ID__c];
        }
    }
    
    @AuraEnabled
    // Get list of all borrowed items
    public static List<Item__c> getBorrowed(){
        String person = UserInfo.getUserId();
        return [SELECT Id, ID__c, Name, Type__c, Due_Date__c, Overdue__c FROM Item__c WHERE Borrowed_By__c = :person ORDER BY ID__c];
    }
    
    @AuraEnabled
    // Borrow an item - returns True for successful borrow
    public static Boolean borrowItem(String itemID){
        // Empty itemID
        if (String.isBlank(itemID)){
            return False;
        } 
        
        List<Item__c> items = [SELECT Available__c, Name, Borrowed_By__c, User_Name__c FROM Item__c WHERE ID__c = :itemID];
        Item__c item = null;
        
        // Check for invalid itemID
        if(items.isEmpty()){
            return False;
        }
        item = items[0];
        
        //Get current user info
        String uid = UserInfo.getUserId();
        User u = [SELECT id, Name from User WHERE id = :uid];
        
        if (item == null){
            return False;
        }
        // If item is already borrowed by someone
        else if (item.Borrowed_By__c != null){
          return False;
        }
        else{
            item.User_Name__c = u.Name;
            item.Available__c = 'No';
            item.Borrowed_By__c = uid;
            item.Due_Date__c = date.today().addDays(1);
            item.User_Email__c = UserInfo.getUserEmail();
            update item;
            
            // Add borrowing record
            itemList.addHistory(uid, u.Name, item.Name, itemID, 'Borrow');
            return True;
        }
    }
    
    @AuraEnabled
    // Return an item - Returns True for successful return
	public static Boolean returnItem(String itemID){
        // Empty itemID
        if (String.isBlank(itemID)){
            return False;
        }
        
        List<Item__c> items = [SELECT Available__c, Name, Borrowed_By__c, User_Name__c FROM Item__c WHERE ID__c = :itemID];
        Item__c item = null;
        
        // Check for invalid itemID
        if(items.isEmpty()){
            return False;
        }
        item = items[0];
        
        // Get current user id
        String uid = UserInfo.getUserId();
        
        if (item == null){
            return False;
        }
        // If item is not currently borrowed
        else if (item.Borrowed_By__c == null){
          	return False;
        }
        else{
            String name = item.User_Name__c;
            item.User_Name__c = null;
            item.Available__c = 'Yes';
            item.Borrowed_By__c = null;
            item.Due_Date__c = null;
            item.Overdue__c = 'No';
            item.User_Email__c = null;
            update item;
            // Add returning history
            itemList.addHistory(uid, name, item.Name, itemID, 'Return');
            return True;
        }
    }
    
    @AuraEnabled
    // Get list of borrowing/returning history
    public static List<History__c> getHistory(String queryTerm){
        if (!String.isBlank(queryTerm)){
            String query = '%' + queryTerm + '%';
            return [SELECT Id, Name, Date__c, Item_ID__c, Item_Name__c, Type__c, User_Name__c FROM History__c
                    WHERE Item_ID__c LIKE :query
                    	OR Item_Name__c LIKE :query
                    	OR Type__c LIKE :query
                    	OR User_Name__c LIKE :query
                    	ORDER BY Name DESC
                   ];
        }
        else{
            return [SELECT Id, Name, Date__c, Item_ID__c, Item_Name__c, Type__c, User_Name__c FROM History__c ORDER BY Name DESC];
        }
    }
    
    @AuraEnabled
    //Add a history record
    public static void addHistory(String UserID, String Username, String ItemName, String ItemID, String histType){
        History__c hist = new History__c(
            Date__c = date.today(),
            Item_ID__c = ItemID,
            Item_Name__c = ItemName,
            Type__c = histType,
            User_ID__c = UserID,
            User_Name__c = Username
        );
        insert hist;
    }

}