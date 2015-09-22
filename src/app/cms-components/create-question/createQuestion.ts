import {Component, View} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import * as _ from 'lodash';

import {MDL_COMPONENTS} from 'app/mdl-components/index';
import {ISeedQuestion} from 'app/pof-typings/question';
import {ICategory} from 'app/pof-typings/category';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';

const styles = require('./createQuestion.css');
const template = require('./createQuestion.html');

@Component({
    selector: 'create-question'
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS],
    styles: [styles],
    template: template
})
export class CreateQuestion {
    myForm: ControlGroup;
    defaultCategories: Array<ICategory>;
    customCategories: Array<ICategory>;
    selectedCategoryName: string;
    fakeAnswers: Array<string> = [];

    constructor(formBuilder: FormBuilder, public categoryApi: CategoryApi) {
        // MDL issue
        componentHandler.upgradeDom();

        this.myForm = formBuilder.group({
            questionText: ['', Validators.required],
            realAnswer: ['', Validators.required]
        });

        this.getCategories();
    }

    getCategories() {
        this.categoryApi.getAll(false)
            .then(resp => {
                this.defaultCategories = _.filter(resp, { default: true });
                this.customCategories = _.chain(resp)
                    .filter({ default: false })
                    .sortByOrder(['playCount'], ['desc'])
                    .take(5)
                    .value();
            })
            .catch(err => {
                console.log(err);
            })
    }

    onSubmit(formValue) {
        _.remove(this.fakeAnswers, f => f === '');
        console.log(this.fakeAnswers);
        console.log(this.selectedCategoryName);
        console.log(formValue);

        var newQuestion: ISeedQuestion = {
            fakeAnswers: this.fakeAnswers,
            questionText: formValue.questionText,
            realAnswer: formValue.realAnswer
        };

        this.categoryApi.createQuestion(this.selectedCategoryName, newQuestion)
            .then(res => {
                console.log(res);

                this.clearForm();

                if (res.approved) {
                    console.log('Question added successfully');
                } else {
                    console.log('Question added successfully but need to be approved');
                }
            })
            .catch(err => {
                console.log(err.data);
            });
    }

    clearCustomCategoriesRadioButtons() {
        let radioButtons = document.querySelectorAll("input[type=radio][name=categoryId2]");
        for (let btn of radioButtons) {
            btn.checked = false;
        }
    }

    clearForm() {
        this.myForm.controls.questionText.updateValue('');
        this.myForm.controls.realAnswer.updateValue('');
        this.fakeAnswers = [''];
    }
}