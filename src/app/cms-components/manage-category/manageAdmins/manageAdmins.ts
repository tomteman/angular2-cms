import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {CategoryApi} from 'app/datacontext/repositories/categoryApi';
import {APP_DIRECTIVES} from 'app/directives/index';
import {NgStyle} from 'angular2/directives';
import * as _ from 'lodash';



let styles = require('./manageAdmins.css');
let template = require('./manageAdmins.html');

@Component({
	selector: 'manage-admins',
	properties: ['currentadmins', 'potentialadmins', 'categoryname'],
	lifecycle: [LifecycleEvent.OnInit]
})
@View({
	directives: [APP_DIRECTIVES, NgStyle],
	styles: [styles],
	template: template
})
export class ManageAdmins {
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

	addAdmin(potentialAdmin) {
        this.categoryApi.addAdminToCategory(this.categoryname, potentialAdmin.id)
            .then(response=> {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
    }

    removeAdmin(potentialAdmin) {
        this.categoryApi.removeAdminFromCategory(this.categoryname, potentialAdmin.id)
            .then(response=> {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
    }
}