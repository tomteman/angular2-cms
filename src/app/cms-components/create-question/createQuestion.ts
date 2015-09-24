import {Component, View} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import * as _ from 'lodash';

import {MDL_COMPONENTS, MdlService, LoadingMaskService, SnackbarService} from 'app/mdl-components/index';
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
    initialLoading: boolean;
    myForm: ControlGroup;
    defaultCategories: Array<ICategory>;
    customCategories: Array<ICategory>;
    selectedCategoryName: string;
    fakeAnswers: Array<string> = [];
    customCategoryEnable: boolean;

    constructor(formBuilder: FormBuilder, public categoryApi: CategoryApi) {
        this.myForm = formBuilder.group({
            questionText: ['', Validators.required],
            realAnswer: ['', Validators.required]
        });

        LoadingMaskService.show();
        this.initialLoading = true;

        this.getCategories().then(() => {
            this.initialLoading = false;
            LoadingMaskService.hide();
            MdlService.upgradeAllRegistered();
        });
    }

    getCategories() {
        return this.categoryApi.getAll(false)
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

        var newQuestion: ISeedQuestion = {
            fakeAnswers: this.fakeAnswers,
            questionText: formValue.questionText,
            realAnswer: formValue.realAnswer
        };

        SnackbarService.show('Saving..');
        this.categoryApi.createQuestion(this.selectedCategoryName, newQuestion)
            .then(res => {
                console.log(res);

                this.clearForm();

                if (res.approved) {
                    SnackbarService.show('Question added successfully');
                } else {
                    SnackbarService.show('Question added successfully but need to be approved');
                }
            })
            .catch(err => {
                console.log(err.data);
            });
    }

    showCustomCategory() {
        this.customCategoryEnable = true;
        MdlService.upgradeAllRegistered();
    }

    hideCustomCategory() {
        this.clearCustomCategoriesRadioButtons();
        this.customCategoryEnable = false;
        MdlService.upgradeAllRegistered();
    }

    clearCustomCategoriesRadioButtons() {
        let radioButtons = document.getElementsByName('customCategoryId');
        MdlService.clearRadioButtons(radioButtons);
    }

    checkInputsDirty() {
        MdlService.checkInputsDirty();
    }

    clearForm() {
        this.myForm.controls.questionText.updateValue('');
        this.myForm.controls.realAnswer.updateValue('');
        this.fakeAnswers = [''];
    }
}