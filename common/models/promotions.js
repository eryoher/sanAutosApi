'use strict';
const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = ' Error conexion con el servidor '
module.exports = function(Promotions) {
    /**
     * To search tranport by one requerimient
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
     */

    Promotions.remoteMethod('search', {
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
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

    Promotions.search = async function (req, params) {
        let limitQuery = (params.pageSize !== undefined) ? params.pageSize : 10;
        let page = (params.page !== undefined) ? ((params.page - 1) * limitQuery) : 0;
        let where  =  {}
        if(params.categoryId){
            where = { categoriesId : params.categoryId }
        }
        
        try {
            const filter = {                         
                where: where,   
                limit: limitQuery,
                skip: page,                
                include:['categories']
            };
            
            const total = await Promotions.count()
            const data = await Promotions.find(filter);
            return RESTUtils.buildResponse(data, limitQuery, (params.page) ? params.page : page, total);            

        } catch (error) {
            console.error(error);
            throw RESTUtils.getServerErrorResponse(ERROR_GENERIC);       
        }        
    }
};