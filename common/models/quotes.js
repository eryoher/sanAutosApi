'use strict';

const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = 'Error conexion con el servidor';
const Axios = require('axios');
const sendEmail = require('../utils/sendEmail');
const CodeGenerator = require('../utils/CodeGenerator');

module.exports = function (Quotes) {

    /**
   * To search promotions to admin form
   * @param {object} params data for search
   * @param {Function(Error, object)} callback
   */

    Quotes.remoteMethod('createQuote', {
        accepts: [
            { arg: 'params', type: 'object', 'description': 'all object data', 'http': { 'source': 'body' } },

        ],
        returns: {
            type: 'object',
            root: true,
            description: 'response data of service'
        },
        description: 'Post current quotation',
        http: {
            verb: 'post'
        },
    });

    Quotes.createQuote = async function (params) {
        let response = {
            success:true,
            message:''
        }
        try {
            const exists = await Quotes.find({where:{productId:params.productId, cedula:params.cedula}});
            
            if( exists.length ){
                response = {
                    success:false,
                    message:"El bono para este producto ya fue enviado a este usuario al correo anteriormente."
                }
            }else{
                const savedQuote = await Quotes.create(params);
                const crmResponse = await sendContactCRM(params);
                const nameConce = crmResponse.data.NameConcess;
    
                if (savedQuote) {
                    const product = await Quotes.app.models.Products.findById(savedQuote.productId);
                    sendEmail.sendquoteBono({ ...params, concecionario: nameConce, code: await CodeGenerator.generateCode(4), id: savedQuote.id, product });
                }
                
                response.message = 'Se guardo satisfactoriamente.'
            }
           
        } catch (error) {
            console.error(error)
        }

        return response;
    }


    const sendContactCRM = async (params) => {
        const instance = Axios.create();
        const url = "http://admin.cyberdays.com.co/controller/contactosController.php?accion=ins";

        const urlFinal = url.concat("&txtDoc=", params.cedula, "&txtName=", params.name, "&txtCel=", params.phone, "&txtEmail=", params.email, "&txtProductoId=", params.productId);

        try {
            const response = await instance.post(urlFinal);
            return response;
        } catch (error) {
            console.error(error)
        }
        return response;
    }

};
