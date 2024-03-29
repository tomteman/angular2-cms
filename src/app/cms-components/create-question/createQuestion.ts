import {Component, View, OnDestroy} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService, LoadingMaskService, Snackbar} from 'app/mdl-components/index';

import {ISeedQuestion} from 'app/bs-typings/question';
import {ICategory} from 'app/bs-typings/category';
import {CategoryApi, ErrorHandling} from 'app/datacontext/index';
import {questionMaxLength, answerMaxLength} from 'app/validators/index';

const styles = require('./createQuestion.scss');
const template = require('./createQuestion.html');

@Component({
    selector: 'create-question'
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS],
    styles: [styles],
    template: template
})
export class CreateQuestion implements OnDestroy {
    initialLoading: boolean;
    myForm: ControlGroup;
    defaultCategories: Array<ICategory>;
    customCategories: Array<ICategory>;
    selectedCategoryName: string;
    fakeAnswers: Array<string> = [];
    customCategoryEnable: boolean;

    constructor(formBuilder: FormBuilder, public categoryApi: CategoryApi) {
        this.myForm = formBuilder.group({
            questionText: ['', Validators.compose([Validators.required, questionMaxLength])],
            realAnswer: ['', Validators.compose([Validators.required, answerMaxLength])]
        });

        LoadingMaskService.show();
        this.initialLoading = true;

        this.getCategories()
            .then(() => {
                this.initialLoading = false;
                LoadingMaskService.hide();
                MdlService.upgradeAllRegistered();
            })
            .catch(err => {
                console.log(err);
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
    }

    onSubmit(formValue) {
        _.remove(this.fakeAnswers, f => f === '');

        var newQuestion: ISeedQuestion = {
            fakeAnswers: this.fakeAnswers,
            questionText: formValue.questionText,
            realAnswer: formValue.realAnswer
        };

        let savingMessage = Snackbar.show('Saving..', { delay: 1000 });
        this.categoryApi.createQuestion(this.selectedCategoryName, newQuestion)
            .then(res => {
                Snackbar.remove(savingMessage);
                this.clearForm();

                if (res.approved) {
                    Snackbar.show('Question added successfully');
                } else {
                    Snackbar.show('Question added successfully but need to be approved');
                }
            })
            .catch(err => {
                Snackbar.show(ErrorHandling.getErrorMessage(err));
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
        MdlService.clearToggleButtons(radioButtons);
    }

    checkInputsDirty() {
        MdlService.checkInputsDirty();
    }

    clearForm() {
        this.myForm.controls.questionText.updateValue('');
        this.myForm.controls.realAnswer.updateValue('');
        this.fakeAnswers = [''];
    }

    onDestroy() {

    }
}