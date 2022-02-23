import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Movie_object from '@salesforce/schema/Movie__c';
import Name_field from '@salesforce/schema/Movie__c.Name';
import Description_field from '@salesforce/schema/Movie__c.Description__c';
import Director_field from '@salesforce/schema/Movie__c.Director__c';
import Length_field from '@salesforce/schema/Movie__c.Length__c';
import Thumbnail_field from '@salesforce/schema/Movie__c.Thumbnail__c';
import { NavigationMixin } from 'lightning/navigation';

export default class MovieRecordForm extends NavigationMixin(LightningElement) {
    movieObject = Movie_object;
    myFields = [Name_field, Description_field, Director_field, Length_field, Thumbnail_field];

    handleMovieCreated(event) {

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Movie__c',
                actionName: 'view'
            }
        });
        const evt = new ShowToastEvent({
            title: "Movie created",
            message: "Movie is created successfully",
            variant: "success"
        });
        this.dispatchEvent(evt);
    }

    handleCancel(event) {
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Movie__c',
                actionName: 'list',
            },
            state: {
                filterName: 'Recent'
            }
        });
    }
}