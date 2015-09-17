import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {CORE_DIRECTIVES} from 'angular2/angular2'
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import * as _ from 'lodash';

import {ISeedQuestion} from 'app/pof-typings/question';
import {IPlayer} from 'app/pof-typings/player'
import {ICategory} from 'app/pof-typings/category';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {Session} from 'app/session/session';

let styles = require('./manageCategories.css');
let template = require('./manageCategories.html');

@Component({
    selector: 'manage-categories'
})
@View({
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES],
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

        this.getMyCategories().then(this.subscribe.bind(this));
    }

    getMyCategories() {
        function pendingRequestsCount(category) {
            category.pendingRequests = _.reduce(category.questions, (sum, question) => sum + Number(!question.approved), 0);
        }

        return this.categoryApi.getMyCategories()
            .then(resp => {
                this.categories = resp;

                _.forEach(this.categories, pendingRequestsCount);
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    subscribe() {
        this.session.activeUser.subscribe((player: IPlayer) => {
            this.categoryApi.myCategoriesFeed(player.id)
                .subscribe(changes => {
                    console.log(changes);

                    if (changes.new_val) {
                        let index = _.findIndex(this.categories, category => category.name === changes.new_val.name );
                        if (~index) {
                            if (changes.new_val.deleteDate) {
                                this.categories.splice(index, 1);
                            } else {
                                this.categories[index] = changes.new_val;
                            }
                        } else {
                            this.categories.push(changes.new_val);
                        }
                    }

                })
        });
    }

    delete(category: ICategory) {
        this.categoryApi.delete(category.name)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }


}