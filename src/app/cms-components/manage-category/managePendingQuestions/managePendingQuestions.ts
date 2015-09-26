import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {APP_DIRECTIVES} from 'app/directives/index';
import {NgStyle} from 'angular2/directives';
import * as _ from 'lodash';



let styles = require('./managePendingQuestions.css');
let template = require('./managePendingQuestions.html');

@Component({
    selector: 'manage-pending-questions',
    properties: ['pendingquestions', 'categoryname'],
    lifecycle: [LifecycleEvent.OnInit]
})
@View({
    directives: [APP_DIRECTIVES, NgStyle],
    styles: [styles],
    template: template
})
export class ManagePendingQuestions {
    pendingquestions: Array<any>;
    categoryname: string;


    constructor(public categoryApi: CategoryApi) {
    }

    onInit() {
    }


    approveQuestion(question) {
        question.approved = true;
        this.categoryApi.updateQuestion(this.categoryname, question).then(response=> {
            console.log(response);
        })
    }

    deleteQuestion(question) {

    }
}