import * as _ from 'lodash';

export class Quotes {
    constructor() {
    }
    get(): Object {
		return _.sample(this.quotesObject);
    }


	quotesObject = require('./quotesData.json');
}