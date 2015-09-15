import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {CORE_DIRECTIVES} from 'angular2/angular2'
import * as _ from 'lodash';

import {ISeedQuestion} from 'app/pof-typings/question';
import {ICategory} from 'app/pof-typings/category';
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
    defaultCategories: Array<ICategory>;
    customCategories: Array<ICategory>;
    selectedCategoryName: string;
    showSuccessMsg: boolean;
    showWaitForApproveMsg: boolean;
    showErrorMsg: boolean;
    errorMsg: string;

    constructor(formBuilder: FormBuilder, public categoryApi: CategoryApi) {
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
        this.categoryApi.getAll(false)
            .then(resp => {
                this.defaultCategories = _.filter(resp, { default: true });
                this.customCategories = _.filter(resp, { default: false });
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
            realAnswer: formValue.realAnswer
        };

        this.categoryApi.createQuestion(this.selectedCategoryName, newQuestion)
            .then(res => {
                console.log(res);

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