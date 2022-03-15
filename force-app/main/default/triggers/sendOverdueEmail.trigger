trigger sendOverdueEmail on Item__c (after update) {
    // Get new and old items
	Item__c newItem = trigger.new[0];
    Item__c oldItem = trigger.old[0];
    
    // Check if item became overdue
    if (oldItem.Overdue__c == 'No'){
        if (newItem.Overdue__c == 'Yes'){
            // Email information
            String email = newItem.User_Email__c;
            String item = newItem.Name;
            String body = item + ' is due today';
            
            // Create new email
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {email};
            mail.setToAddresses(toAddresses);
            mail.setSubject('Overdue Item');
            mail.setPlainTextBody(body);
            
            // Send email
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }
    }
}