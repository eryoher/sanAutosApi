'use strict';

const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = 'Error conexion con el servidor';

module.exports = function(subCategories) {

    /**
     * To search categories by one requerimient
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
     */

    
    subCategories.remoteMethod('search', {
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'params', type: 'object', 'description': 'all object data', 'http': { 'source': 'body' } },

        ],
        returns: {
            type: 'object',
            root: true,
            description: 'response data of service'
        },
        description: 'Post current category',
        http: {
            verb: 'post'
        },
    });

    subCategories.search = async function (req, params) {
        let limitQuery = (params.pageSize) ? params.pageSize : 10;
        let page = (params.page) ? ((params.page - 1) * limitQuery) : 0;

        try {
            const filter = {                                     
                limit: limitQuery,
                skip: page, 
                include: ['categories']                               
            };    
            
            const [ total, data ] = await Promise.all([
                    subCategories.count(),
                    subCategories.find(filter)
                ]
            )
            
            return RESTUtils.buildResponse(data, limitQuery, (params.page) ? params.page : page, total);            

        } catch (error) {
            console.error(error);
            throw RESTUtils.getServerErrorResponse(ERROR_GENERIC);       
        }
    }

};
