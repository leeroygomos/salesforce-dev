import { LightningElement } from 'lwc';
import PROJECT_IMAGES from '@salesforce/resourceUrl/projectImages';

export default class Projects extends LightningElement {
    fitnessBuddyImg = PROJECT_IMAGES + '/projectImages/fitnessbuddy.png'
    pacmanImg = PROJECT_IMAGES + '/projectImages/pacman.png'
    calcImg = PROJECT_IMAGES + '/projectImages/calc.png'
    satSolverImg = PROJECT_IMAGES + '/projectImages/satsolver.png'
    shellImg = PROJECT_IMAGES + '/projectImages/shell.png'
    voluntutorImg = PROJECT_IMAGES + '/projectImages/voluntutor.png'
}