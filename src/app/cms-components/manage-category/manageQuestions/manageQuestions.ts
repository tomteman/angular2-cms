import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {APP_DIRECTIVES} from 'app/directives/index';
import {NgStyle} from 'angular2/directives';
import * as _ from 'lodash';



let styles = require('./manageQuestions.css');
let template = require('./manageQuestions.html');

@Component({
    selector: 'manage-questions',
    properties: ['questions', 'categoryname', 'approved'],
    lifecycle: [LifecycleEvent.OnInit]
})
@View({
    directives: [APP_DIRECTIVES, NgStyle],
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
        question.approved = true;
        this.categoryApi.updateQuestion(this.categoryname, question).then(response=> {
            console.log(response);
        })
    }

    delete(question) {
        this.categoryApi.deleteQuestion(this.categoryname, question.id).then(response=> {
            console.log(response);
        })
    }

    edit(question) {

    }
}