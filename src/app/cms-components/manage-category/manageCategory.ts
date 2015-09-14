import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {CORE_DIRECTIVES} from 'angular2/angular2'
import {RouteParams} from 'angular2/router';
import * as _ from 'lodash';

import {ISeedQuestion} from 'app/pof-typings/question';
import {ICategory} from 'app/pof-typings/category';
import {QuestionApi} from 'app/datacontext/repositories/questionApi';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';

let styles = require('./manageCategory.css');
let template = require('./manageCategory.html');

@Component({
    selector: 'manage-category'
})
@View({
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class ManageCategory {

    constructor(formBuilder: FormBuilder, public questionApi: QuestionApi,
        public categoryApi: CategoryApi, public routeParams: RouteParams) {
        // MDL issue
        componentHandler.upgradeDom();

        var categoryName = routeParams.get('categoryName');
        console.log(categoryName);
        this.getQuestions(categoryName);

    }

    getQuestions(categoryName) {
        this.categoryApi.getQuestionByCategory(categoryName)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            })
    }

}