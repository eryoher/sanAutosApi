/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
'use strict';

const fs = require('fs');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const config = require('../../server/config.json');
const CodeGenerator = require('./CodeGenerator');
const configSmtp = config.configSMTP;

const sendquoteBono = (params) => {
    const transport = nodemailer.createTransport(configSmtp);
    readHTMLFile(__dirname + '/../../common/templates/template_email_sanAutos.html', function (err, html) {
        let template = handlebars.compile(html);

        const replacements = {
            name: params.name,
            concecutivo: CodeGenerator.zfill(params.id, 4),
            product: params.product.name,            
        };

        const htmlToSend = template(replacements);

        transport.sendMail({
            from: 'servicioalcliente@fundacionportalmagico.org',
            to: params.email,
            subject: 'Detalles del bono',
            html: htmlToSend
        }, function (er) {
            if (er) console.error(er);
        });
    });
};

const readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (error, html) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            callback(null, html);
        }
    });
};

module.exports = {
    sendquoteBono   
};
