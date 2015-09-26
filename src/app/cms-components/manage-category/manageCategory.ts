import {Component, View} from 'angular2/angular2';
import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators} from 'angular2/angular2'
import {APP_DIRECTIVES} from 'app/directives/index';
import {CATEGORY_COMPONENTS} from './index';


import {MDL_COMPONENTS, MdlService, LoadingMaskService} from 'app/mdl-components/index';
import {LifecycleEvent, CORE_DIRECTIVES} from 'angular2/angular2'
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
    selector: 'manage-category',
    lifecycle: [LifecycleEvent.OnDestroy]
})
@View({
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,APP_DIRECTIVES,CATEGORY_COMPONENTS],
    styles: [styles],
    template: template
})
export class ManageCategory {
    currentAdminsLoaded: boolean;
    potentialAdminsLoaded: boolean;
    questionsLoaded: boolean;
    category;
    currentAdmins;
    potentialAdmins;
    pendingQuestions;
    approvedQuestions;
    subscribeSource;

    constructor(formBuilder: FormBuilder, public categoryApi: CategoryApi, public sessionApi: SessionApi,
        public routeParams: RouteParams, public session: Session) {
        // MDL issue
        componentHandler.upgradeDom();

        var categoryName = routeParams.get('categoryName');
        this.getCategory(categoryName).then(() => {
            this.subscribeSource = this.subscribe(categoryName)
        });
    }

    filterQuestions() {
        if (this.category) {

            this.approvedQuestions = _.filter(this.category.questions, 'approved', true);
            this.pendingQuestions = _.filter(this.category.questions, 'approved', false);
            this.questionsLoaded = true;
        }
    }

    getCategory(categoryName: string) {
        LoadingMaskService.show();
        this.currentAdminsLoaded = false;
        this.potentialAdminsLoaded = false;
        return this.categoryApi.get(categoryName)
            .then(resp => {
                this.category = resp;
                this.populatePlayersData();
                this.getPotentialCategoryAdmins(this.category.name);
                this.filterQuestions();
            })
            .catch(err => {
                console.log(err);
            });
    }

    subscribe(categoryName: string) {

        return this.categoryApi.feedByCategoryName(categoryName)
            .subscribe(changes => {
                if (changes.new_val) {
                    this.category = changes.new_val;
                    this.populatePlayersData();
                    this.getPotentialCategoryAdmins(this.category.name);
                    this.filterQuestions();
                }

            });

    }

    verifyAllLoaded() {
        if (this.currentAdminsLoaded && this.potentialAdminsLoaded) {
            LoadingMaskService.hide();
        }
    }

    populatePlayersData() {
        if (this.category.admins) {
            this.getPlayers(this.category.admins).then(players => {
                this.currentAdmins = players;
                this.currentAdminsLoaded = true;
                this.verifyAllLoaded();
            })
        }
    }

    getPlayers(ids: Array<string>) {
        return this.sessionApi.getPlayers(ids);
    }

    getPotentialCategoryAdmins(category: string) {
        this.categoryApi.getPotentialCategoryAdmins(category)
            .then(resp => {
                this.potentialAdmins = resp;
                this.potentialAdminsLoaded = true;
                this.verifyAllLoaded();
            }).catch(err => {
                console.log(err);
            })
    }



    onDestroy() {
        this.subscribeSource.dispose();
    }
}