import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import Show_Time from '@salesforce/schema/Show_Time__c';
import show_Name_field from '@salesforce/schema/Show_Time__c.Name';
import Movie_Name from '@salesforce/schema/Show_Time__c.Movie__c';
import Show_Time_field from '@salesforce/schema/Show_Time__c.Show_Time__c';
import Time_field from '@salesforce/schema/Show_Time__c.Time__c';
import Price_field from '@salesforce/schema/Show_Time__c.Price__c';
import { NavigationMixin } from 'lightning/navigation';


export default class MovieRecordForm extends NavigationMixin(LightningElement){
    showTimeObject = Show_Time;
    myFields = [show_Name_field,Movie_Name,Show_Time_field,Time_field,Price_field];

    handleShowTimeCreated(event){

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Show_Time__c',
                actionName: 'view'
            }
        });
        const evt = new ShowToastEvent({
            title: "Show_Time created",
            message: "Show Time is created successfully",
            variant: "success"
        });
        this.dispatchEvent(evt);
       
    }

    handleCancel(event) {
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Show_Time__c',
                actionName: 'list',
            },
            state: {
                filterName: 'Recent'
            }
        });
    }
}