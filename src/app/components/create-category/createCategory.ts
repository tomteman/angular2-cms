import {Component, View} from 'angular2/angular2';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2'
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2'

import {ISeedCategory} from 'app/pof-typings/category';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';

let styles = require('./createCategory.css');
let template = require('./createCategory.html');

@Component({
    selector: 'create-category'
})
@View({
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class CreateCategory {
    myForm: ControlGroup;
    showSuccessMsg: boolean;
    showErrorMsg: boolean;
    errorMsg: string;

    constructor(formBuilder: FormBuilder, public categoryApi: CategoryApi) {
        // MDL issue
        componentHandler.upgradeDom();

        this.myForm = formBuilder.group({
            name: ['', Validators.required],
            public: [true]
        });
    }

    onSubmit(formValue) {
        console.log(formValue);

        this.showSuccessMsg = false;
        this.showErrorMsg = false;

        this.categoryApi.create(formValue)
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