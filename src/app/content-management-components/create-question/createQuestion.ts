import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {CORE_DIRECTIVES} from 'angular2/angular2'
import * as _ from 'lodash';

import {ISeedQuestion} from 'app/pof-typings/question';
import {ICategory} from 'app/pof-typings/category';
import {QuestionApi} from 'app/datacontext/repositories/questionApi';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';

let styles = require('./createQuestion.css');
let template = require('./createQuestion.html');

@Component({
    selector: 'create-question'
})
@View({
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class CreateQuestion {
    myForm: ControlGroup;
    rootCategories: Array<ICategory>;
    otherCategories: Array<ICategory>;
    selectedCategoryId: string;
    showSuccessMsg: boolean;
    showWaitForApproveMsg: boolean;
    showErrorMsg: boolean;
    errorMsg: string;

    constructor(formBuilder: FormBuilder, public questionApi: QuestionApi,
        public categoryApi: CategoryApi) {
        // MDL issue
        componentHandler.upgradeDom();

        this.myForm = formBuilder.group({
            questionText: ['', Validators.required],
            realAnswer: ['', Validators.required],
            fakeAnswers: formBuilder.group({
                one: [''],
                two: ['']
            })
        });

        this.getCategories();
    }

    getCategories() {
        this.categoryApi.getAll()
            .then(resp => {
                this.rootCategories = _.filter(resp, { root: true });
                this.otherCategories = _.filter(resp, { root: false });
            })
            .catch(err => {
                console.log(err);
            })
    }

    onSubmit(formValue) {
        this.showSuccessMsg = false;
        this.showErrorMsg = false;
        this.showWaitForApproveMsg = false;

        var newQuestion: ISeedQuestion = {
            fakeAnswers: _.toArray(formValue.fakeAnswers),
            questionText: formValue.questionText,
            realAnswer: formValue.realAnswer,
            categoryId: this.selectedCategoryId
        };

        this.questionApi.create(newQuestion)
            .then(res => {
                this.clearForm();
                res.approved ? this.showSuccessMsg = true : this.showWaitForApproveMsg = true;
            })
            .catch(err => {
                this.showErrorMsg = true;
                this.errorMsg = err.data;
            });
    }

    clearForm() {
        console.log(this.myForm);
        // this.todoInput.updateValue('');
    }
}