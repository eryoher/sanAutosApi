'use strict';

const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = ' Error conexion con el servidor '

module.exports = function(Company) {
    
    /**
     * To search companies by one requerimient
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
     */

    
    Company.remoteMethod('search', {
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'params', type: 'object', 'description': 'all object data', 'http': { 'source': 'body' } },

        ],
        returns: {
            type: 'object',
            root: true,
            description: 'response data of service'
        },
        description: 'Post current company',
        http: {
            verb: 'post'
        },
    });

    Company.search = async function (req, params) {
        let limitQuery = (params.pageSize) ? params.pageSize : 10;
        let page = (params.page) ? ((params.page - 1) * limitQuery) : 0;

        try {
            const filter = {                                     
                limit: limitQuery,
                skip: page,                                
            };    
            
            const [ total, data ] = await Promise.all([
                Company.count(),
                Company.find(filter)
            ])
            
            return RESTUtils.buildResponse(data, limitQuery, (params.page) ? params.page : page, total);            

        } catch (error) {
            console.error(error);
            throw RESTUtils.getServerErrorResponse(ERROR_GENERIC);       
        }
    }
};
