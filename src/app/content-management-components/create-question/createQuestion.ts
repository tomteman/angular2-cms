import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {CORE_DIRECTIVES} from 'angular2/angular2'

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
    categories: Array<ICategory>;
    showSuccessMsg: boolean;
    showErrorMsg: boolean;
    errorMsg: string;

    constructor(formBuilder: FormBuilder, public questionApi: QuestionApi,
                public categoryApi: CategoryApi) {
        // MDL issue
        componentHandler.upgradeDom();

        this.myForm = formBuilder.group({
            questionText: ['', Validators.required],
            realAnswer: ['', Validators.required],
            categoryId: [],
            fakeAnswers: formBuilder.group({
                one: [''],
                two: ['']
            })
        });

        this.getCategories();
    }

    getCategories() {
        this.categoryApi.getAll().then(resp => {
            this.myForm._value.categoryId = resp[0].id

            this.categories = resp;
        })
    }

    onSubmit(formValue) {
        this.showSuccessMsg = false;
        this.showErrorMsg = false;

        var newQuestion: ISeedQuestion = {
            fakeAnswers: _.toArray(formValue.fakeAnswers),
            questionText: formValue.questionText,
            realAnswer: formValue.realAnswer,
            categoryId: formValue.categoryId
        };

        this.questionApi.create(newQuestion)
            .then(res => {
                this.clearForm();
                this.showSuccessMsg = true;
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