import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import {Router} from 'angular2/router';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService, LoadingMaskService, Snackbar} from 'app/mdl-components/index';

import {ISeedCategory} from 'app/pof-typings/category';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';

const styles = require('./createCategory.scss');
const template = require('./createCategory.html');

@Component({
    selector: 'create-category'
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS],
    styles: [styles],
    template: template
})
export class CreateCategory {
    myForm: ControlGroup;
    isPublic: boolean = true;

    constructor(public formBuilder: FormBuilder, public categoryApi: CategoryApi,
                public router: Router) {
        this.buildForm();
        MdlService.upgradeAllRegistered();
    }

    buildForm() {
        this.myForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    onSubmit(formValue) {
        let savingMessage = Snackbar.show('Saving..', { delay: 1000 });
        this.categoryApi.create(_.assign({}, formValue, { public: this.isPublic }))
            .then(res => {
                Snackbar.remove(savingMessage);
                Snackbar.show('Category added successfully');
                this.router.navigate(['/ManageCategories']);
            })
            .catch(err => {
                Snackbar.show(err.data.message);
            });
    }

    setPublic(isPublic) {
        this.isPublic = isPublic;
    }
}