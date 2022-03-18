import { LightningElement } from 'lwc';
import CERTS from '@salesforce/resourceUrl/certs';

export default class SkillsCertifications extends LightningElement {
    certAdmin = CERTS + '/certs/admin.png';
    certPD1 = CERTS + '/certs/pd1.png';
}