import { LightningElement, api, track } from 'lwc';
import BACKGROUND_IMG from '@salesforce/resourceUrl/portfoliobg';

const sections = [
    {
        label: '',
        items: [
            {
                label: 'About Me',
                name: 'about',
            },
            {
                label: 'Projects',
                name: 'projects',
            },
            {
                label: 'Experience',
                name: 'experience',
            },
            {
                label: 'Skills and Certifications',
                name: 'skills_certifications',
            },
            {
                label: 'Contact Me',
                name: 'contact',
            },
        ],
    },
];

export default class portfolio extends LightningElement {
    @track showAbout = true;
    @track showProjects = false;
    @track showExperience = false;
    @track showSkills = false;
    @track showContact = false;
    initiallySelected = 'about';
    navigationData = sections;

    get backgroundStyle() {
        return `height:50rem;background-image:url(${BACKGROUND_IMG})`;
    }

    handleSelect(event){
        if (event.detail.name === 'about'){
            // this.initiallySelected = 'about'
            this.showAbout = true;
            this.showProjects = false;
            this.showExperience = false;
            this.showSkills = false;
            this.showContact = false;
        }
        else if (event.detail.name === 'projects'){
            // this.initiallySelected = 'projects'
            this.showAbout = false;
            this.showProjects = true;
            this.showExperience = false;
            this.showSkills = false;
            this.showContact = false;
        }
        else if (event.detail.name === 'experience'){
            this.showAbout = false;
            this.showProjects = false;
            this.showExperience = true;
            this.showSkills = false;
            this.showContact = false;
        }
        else if (event.detail.name === 'skills_certifications'){
            this.showAbout = false;
            this.showProjects = false;
            this.showExperience = false;
            this.showSkills = true;
            this.showContact = false;
        }
        else if (event.detail.name === 'contact'){
            this.showAbout = false;
            this.showProjects = false;
            this.showExperience = false;
            this.showSkills = false;
            this.showContact = true;
        }
    }
}