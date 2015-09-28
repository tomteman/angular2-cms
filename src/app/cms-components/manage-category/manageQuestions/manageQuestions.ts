import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {APP_DIRECTIVES} from 'app/directives/index';
import {NgStyle} from 'angular2/directives';
import * as _ from 'lodash';
import {MDL_COMPONENTS, Snackbar} from 'app/mdl-components/index';



let styles = require('./manageQuestions.css');
let template = require('./manageQuestions.html');

@Component({
    selector: 'manage-questions',
    properties: ['questions', 'categoryname', 'approved'],
    lifecycle: [LifecycleEvent.OnInit]
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS, NgStyle],
    styles: [styles],
    template: template
})
export class ManageQuestions {
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