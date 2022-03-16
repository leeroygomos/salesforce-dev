import { LightningElement } from 'lwc';
import PROFILE_PIC from '@salesforce/resourceUrl/profilepic';
import PROFILE_PIC_V2 from '@salesforce/resourceUrl/profilepicv2';

export default class AboutMe extends LightningElement {
    profilePic = PROFILE_PIC;
    profilePic2 = PROFILE_PIC_V2;
}