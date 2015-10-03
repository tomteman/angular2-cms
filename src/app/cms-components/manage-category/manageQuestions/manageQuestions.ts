import {Component, View, OnInit} from 'angular2/angular2';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {APP_DIRECTIVES} from 'app/directives/index';
import {NgStyle} from 'angular2/angular2';
import * as _ from 'lodash';
import {MDL_COMPONENTS, Snackbar} from 'app/mdl-components/index';



let styles = require('./manageQuestions.css');
let template = require('./manageQuestions.html');

@Component({
    selector: 'manage-questions',
    inputs: ['questions', 'categoryname', 'approved']
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS, NgStyle],
    styles: [styles],
    template: template
})
export class ManageQuestions implements OnInit {
    questions: Array<any>;
    categoryname: string;
    approved: boolean;


    constructor(public categoryApi: CategoryApi) {
    }

    onInit() {
    }


    approve(question) {
        let delayMessage = Snackbar.show('Approving...', { delay: 1000 });
        question.approved = true;
        this.categoryApi.updateQuestion(this.categoryname, question).then(response=> {
            Snackbar.remove(delayMessage);
            Snackbar.show('Question approved successfully');
            console.log(response);
        })
    }

    delete(question) {
        let delayMessage = Snackbar.show('Deleting...', { delay: 1000 });
        this.categoryApi.deleteQuestion(this.categoryname, question.id).then(response=> {
            Snackbar.remove(delayMessage);
            Snackbar.show('Question deleted successfully');
            console.log(response);
        })
    }

    edit(question) {

    }
}