'use strict';
const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = 'Error conexion con el servidor'

module.exports = function(Usuario) {
    /**
     * To search tranport by one requerimient
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
     */

    Usuario.remoteMethod('createUser', {
        accepts: [            
            { arg: 'params', type: 'object', 'description': 'create user', 'http': { 'source': 'body' } },

        ],
        returns: {
            type: 'object',
            root: true,
            description: 'response data of service'
        },
        description: 'create user',
        http: {
            verb: 'post'
        },
    });

    Usuario.createUser = async function (params) {        
        let response = { message: '', status: '200' }
        try {
            const userExists = await Usuario.findOne({ where: {username:params.username}})
            if( !userExists ){
                const emailExists = await Usuario.findOne({ where:{email:params.email}})
                if( !emailExists ){
                    await Usuario.create(params);
                    response.message = "El usuario se creo satisfactoriamente.";                    
                }else{
                    response.message = "Error, El email ya existe por favor ingrese uno diferente.";
                    response.status = 434;    
                }
                
            }else{
                response.message = "Error, El usuario ya existe por favor ingrese uno diferente.";
                response.status = 433;
            }

            return response;

        } catch (error) {            
            return error            
        }        
    }
};
