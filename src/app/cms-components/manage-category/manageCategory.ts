import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {CORE_DIRECTIVES} from 'angular2/angular2'
import {RouteParams} from 'angular2/router';
import * as _ from 'lodash';

import {ISeedQuestion} from 'app/pof-typings/question';
import {ICategory} from 'app/pof-typings/category';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {SessionApi} from 'app/datacontext/repositories/sessionApi';
import {Session} from 'app/session/session';

let styles = require('./manageCategory.css');
let template = require('./manageCategory.html');

@Component({
    selector: 'manage-category'
})
@View({
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    styles: [styles],
    template: template
})
export class ManageCategory {
    category;
    potentialAdmins;

    constructor(formBuilder: FormBuilder, public categoryApi: CategoryApi, public sessionApi: SessionApi,
        public routeParams: RouteParams, public session: Session) {
        // MDL issue
        componentHandler.upgradeDom();

        var categoryName = routeParams.get('categoryName');
        console.log(categoryName);
        this.getCategory(categoryName).then(() => { this.subscribe(categoryName) });



    }

    getCategory(categoryName: string) {
        return this.categoryApi.get(categoryName)
            .then(resp => {
                this.category = resp;
                this.populatePlayersData();
                this.getPotentialCategoryAdmins(this.category.name);
            })
            .catch(err => {
                console.log(err);
            });
    }

    subscribe(categoryName: string) {

        this.categoryApi.feedByCategoryName(categoryName)
            .subscribe(changes => {
                console.log(changes);

                if (changes.new_val) {
                    this.category = changes.new_val;
                    this.populatePlayersData();
                    this.getPotentialCategoryAdmins(this.category.name);
                }

            });

    }

    populatePlayersData() {
        if (this.category.admins) {
            this.getPlayers(this.category.admins).then(players => {
                this.category.adminsFull = players;
            })
        }
    }

    getPlayers(ids: Array<string>) {
        return this.sessionApi.getPlayers(ids);
    }

    getPotentialCategoryAdmins(category: string) {
        this.categoryApi.getPotentialCategoryAdmins(category)
            .then(resp => {
                console.log(resp);
                this.potentialAdmins = resp;
            }).catch(err => {
                console.log(err);
            })
    }

    addAdmin(potentialAdmin) {
        this.categoryApi.addAdminToCategory(this.category.name, potentialAdmin.id)
            .then(response=> {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
    }

    removeAdmin(potentialAdmin) {
        this.categoryApi.removeAdminFromCategory(this.category.name, potentialAdmin.id)
            .then(response=> {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
    }
}