import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {Router} from 'angular2/router';
import {CORE_DIRECTIVES} from 'angular2/angular2'
import * as _ from 'lodash';

import {GameApi} from 'app/datacontext/repositories/gameApi';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {Session} from 'app/session/session';

let styles = require('./createGame.css');
let template = require('./createGame.html');

@Component({
    selector: 'create-game'
})
@View({
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class CreateGame {
    errorMsg: string;
    defaultCategories;
    customCategories;
    selecetedCategories = [];

    constructor(public gameApi: GameApi, public router: Router,
        public categoryApi: CategoryApi) {
        // MDL issue
        componentHandler.upgradeDom();

        this.getCategories();
    }

    getCategories() {
        this.categoryApi.getAll(true)
            .then(categories => {
                this.defaultCategories = _.filter(categories, { default: true });
                this.customCategories = _.filter(categories, { default: false });
            })
            .catch(err => {
                console.log(err);
            })
    }

    onSubmit() {
        this.errorMsg = '';
        let options = {
            categories: this.selecetedCategories
        };

        this.gameApi.create(options)
            .then(result => {
                console.log('game created', result.name);
                this.router.navigate('/game-staging/' + result.name);
            })
            .catch(err => {
                console.log(err);
                this.errorMsg = err.data.message;
            })
    }

    toggleCategory(event, categoryName) {
        if (event.target.checked) {
            this.selecetedCategories.push(categoryName);
        } else {
            this.selecetedCategories = _.without(this.selecetedCategories, categoryName);
        }
    }
}
