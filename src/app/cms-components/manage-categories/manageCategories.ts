import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {CORE_DIRECTIVES} from 'angular2/angular2'
import {RouteParams} from 'angular2/router';
import * as _ from 'lodash';

import {ISeedQuestion} from 'app/pof-typings/question';
import {IPlayer} from 'app/pof-typings/player'
import {ICategory} from 'app/pof-typings/category';
import {QuestionApi} from 'app/datacontext/repositories/questionApi';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {Session} from 'app/session/session';

let styles = require('./manageCategories.css');
let template = require('./manageCategories.html');

@Component({
    selector: 'manage-categories'
})
@View({
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class ManageCategories {
    categories;
    numberOfQuestions = 2;

    constructor(formBuilder: FormBuilder, public categoryApi: CategoryApi,
        public session: Session) {
        // MDL issue
        componentHandler.upgradeDom();

        // TODO: URI
        // this.getMyCategories().then(this.subscribe);
        this.getMyCategories().then(() => { this.subscribe() });
    }

    getMyCategories() {
        return this.categoryApi.getMyCategories()
            .then(resp => {
                this.categories = resp;

                _.forEach(this.categories, this.calcPendingRequests);
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            })
    }

    subscribe() {
        this.session.activeUser.subscribe((player: IPlayer) => {
            this.categoryApi.feedMyCategory(player.id)
                .subscribe(changes => {
                    console.log(changes);

                    if (changes.new_val) {
                        let index = _.findIndex(this.categories, category => { category.name ===  changes.new_val.name});
                        if (~index) {
                            this.categories[index] = changes.new_val;
                        } else {
                            this.categories.push(changes.new_val);
                        }
                    } else {
                        // TODO: check if deleted
                    }

                })
        });
    }

    calcPendingRequests(category) {
        category.pendingRequests = _.reduce(category.questions, (sum, question) => sum + Number(!question.approved), 0);
    }

}