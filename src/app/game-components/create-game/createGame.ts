import {Component, View} from 'angular2/angular2';
import {APP_DIRECTIVES} from 'app/directives/index';
import {ControlGroup, FormBuilder, Validators} from 'angular2/angular2';
import {Router} from 'angular2/router';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService, LoadingMaskService, Snackbar} from 'app/mdl-components/index';

import {ICategory} from 'app/bs-typings/category';
import {GameApi} from 'app/datacontext/repositories/gameApi';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {Session} from 'app/session/session';

const styles = require('./createGame.scss');
const template = require('./createGame.html');

@Component({
    selector: 'create-game'
})
@View({
    directives: [APP_DIRECTIVES],
    styles: [styles],
    template: template
})
export class CreateGame {
    initialLoading: boolean;
    defaultCategories: Array<ICategory>;
    customCategories: Array<ICategory>;
    selecetedCategories: Array<ICategory> = [];
    customCategoryName: string;
    customCategoryEnable: boolean;
    numberOfQuestions: number = 8;

    constructor(public gameApi: GameApi, public router: Router,
        public categoryApi: CategoryApi) {

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
        return this.categoryApi.getAll(true)
            .then(categories => {
                this.defaultCategories = _.filter(categories, { default: true });
                this.customCategories = _.chain(categories)
                    .filter({ default: false })
                    .sortByOrder(['playCount'], ['desc'])
                    .take(5)
                    .value();
            });
    }

    onSubmit() {
        let categoryNames = _.map(this.selecetedCategories, category => category.name);

        if (this.customCategoryName) {
            categoryNames.push(this.customCategoryName);
        }

        let options = {
            categories: categoryNames,
            numberOfQuestions: this.numberOfQuestions
        };

        let cratingMessage = Snackbar.show('Creating..', { delay: 1000 });
        this.gameApi.create(options)
            .then(result => {
                Snackbar.remove(cratingMessage);
                Snackbar.hide();
                this.router.navigate(['/GameStaging', { gameName: result.name }]);
            })
            .catch(err => {
                console.log(err);
                Snackbar.remove(cratingMessage);
                Snackbar.show(err.data.message);
            });
    }

    toggleCustomCategory() {
        this.customCategoryEnable = !this.customCategoryEnable;

        if (!this.customCategoryEnable) {
            this.clearCustomCategoriesCheckboxes();
        }

        MdlService.upgradeAllRegistered();
    }

    clearCustomCategoriesCheckboxes() {
        this.customCategoryName = '';
        this.selecetedCategories = _.reject(this.selecetedCategories, { default: false });
        let checkboxButtons = document.getElementsByName('customCategoryId');
        MdlService.clearToggleButtons(checkboxButtons);
    }

    toggleCategory(event, category: ICategory) {
        if (event.target.checked) {
            this.selecetedCategories.push(category);
        } else {
            this.selecetedCategories = _.without(this.selecetedCategories, category);
        }
    }
}