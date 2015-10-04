import {Component, View, OnInit} from 'angular2/angular2';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {APP_DIRECTIVES} from 'app/directives/index';
import {NgStyle} from 'angular2/angular2';
import * as _ from 'lodash';
import {MDL_COMPONENTS, MdlService, LoadingMaskService, Snackbar} from 'app/mdl-components/index';
import {SessionApi} from 'app/datacontext/repositories/sessionApi';


let styles = require('./manageAdmins.css');
let template = require('./manageAdmins.html');

@Component({
    selector: 'manage-admins',
    inputs: ['category', 'api']
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS, NgStyle],
    styles: [styles],
    template: template
})
export class ManageAdmins implements OnInit {
    category;
    currentAdmins;
    potentialAdmins;
    api;

    currentAdminsLoaded: boolean;
    potentialAdminsLoaded: boolean;

    constructor(public categoryApi: CategoryApi, public sessionApi: SessionApi) {

    }

    onInit() {
        this.api['refreshCallback'] = this.refreshAdmins.bind(this);
        this.refreshAdmins(this.category.admins);

    }

    refreshAdmins(admins) {
        this.category.admins = admins;
        console.log('category', this.category);
        console.log('category.admins', this.category.admins);
        LoadingMaskService.show();
        this.currentAdminsLoaded = false;
        this.potentialAdminsLoaded = false;
        this.populatePlayersData();
        this.getPotentialCategoryAdmins();
    }

    getBackgroundUrl(admin) {
        return {
            'background': 'url(' + admin.picture + ') no-repeat',
            'background-size': '100%'
        }
    }

    addAdmin(admin) {
        let delayMessage = Snackbar.show('Adding...', { delay: 1000 });

        this.categoryApi.addAdminToCategory(this.category.name, admin.id)
            .then(res=> {
                Snackbar.remove(delayMessage);
                Snackbar.show(admin.name + ' is now an administrator');
            }).catch(err => {
                console.log(err);
            })
    }

    removeAdmin(admin) {
        let delayMessage = Snackbar.show('Removing...', { delay: 1000 });

        this.categoryApi.removeAdminFromCategory(this.category.name, admin.id)
            .then(res=> {
                Snackbar.remove(delayMessage);
                Snackbar.show(admin.name + ' is no longer an administrator');
            }).catch(err => {
                console.log(err);
            })
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

    getPotentialCategoryAdmins() {
        this.categoryApi.getPotentialCategoryAdmins(this.category.name)
            .then(resp => {
                this.potentialAdmins = resp;
                this.potentialAdminsLoaded = true;
                this.verifyAllLoaded();
            }).catch(err => {
                console.log(err);
            })
    }

    verifyAllLoaded() {
        if (this.currentAdminsLoaded && this.potentialAdminsLoaded) {
            LoadingMaskService.hide();
        }
    }
}