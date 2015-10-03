import {Component, View, OnInit} from 'angular2/angular2';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {APP_DIRECTIVES} from 'app/directives/index';
import {NgStyle} from 'angular2/angular2';
import * as _ from 'lodash';
import {MDL_COMPONENTS, Snackbar} from 'app/mdl-components/index';



let styles = require('./manageAdmins.css');
let template = require('./manageAdmins.html');

@Component({
    selector: 'manage-admins',
    inputs: ['currentadmins', 'potentialadmins', 'categoryname']
})
@View({
    directives: [APP_DIRECTIVES, MDL_COMPONENTS, NgStyle],
    styles: [styles],
    template: template
})
export class ManageAdmins implements OnInit {
    currentadmins: Array<any>;
    potentialadmins: Array<any>;
    categoryname: string;


    constructor(public categoryApi: CategoryApi) {

    }

    onInit() {

    }

    getBackgroundUrl(admin) {
        return {
            'background': 'url(' + admin.picture + ') no-repeat',
            'background-size': '100%'
        }
    }

    addAdmin(admin) {
        let delayMessage = Snackbar.show('Adding...', { delay: 1000 });
        _.remove(this.potentialadmins, potentialadmin => {
            return admin.id === potentialadmin.id;
        });
        this.categoryApi.addAdminToCategory(this.categoryname, admin.id)
            .then(res=> {
                Snackbar.remove(delayMessage);
                Snackbar.show(admin.name + ' is now an administrator');
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }

    removeAdmin(admin) {
        let delayMessage = Snackbar.show('Removing...', { delay: 1000 });

        this.categoryApi.removeAdminFromCategory(this.categoryname, admin.id)
            .then(res=> {
                Snackbar.remove(delayMessage);
                Snackbar.show(admin.name + ' is no longer an administrator');
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }
}