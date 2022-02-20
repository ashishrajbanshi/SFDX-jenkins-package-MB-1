trigger MB_Movie_trigger_new on Booking__c (before insert) {
    //Retrieve all seats and show Time 
	List<Booking__c> Seats = [SELECT Seat__c,Show_Time__c FROM Booking__c];
    // Starts trigger when seat is not null
    for(Booking__c seat : trigger.New){
        if(seat.Seat__c != null){
            //comparing new seats and old seats 
            for(Booking__c oldSeat : Seats){
                if(oldSeat.Show_Time__c == seat.Show_Time__c && oldSeat.Seat__c == seat.Seat__c){
                    seat.Seat__c.addError('These seats has been booked');
                }
            }
        }
    }
}