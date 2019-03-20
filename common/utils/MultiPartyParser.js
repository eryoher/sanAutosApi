'use strict';

const multiparty = require('multiparty');

const parse =  (request) => {
    return new Promise((resolve, reject) => {        
        const form = new multiparty.Form();
        form.parse(request, (err, fields, files) => {
            if (err) {
                reject(new Error(`There was an error parsing multyparty request  - " ${err.message}`));
            }
            resolve({ fields, files });
        });
    });
}

module.exports = {
    parse
};