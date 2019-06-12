'use strict';

const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = ' Error conexion con el servidor '

module.exports = function(Categories) {
    
    /**
     * To search tranport by one requerimient
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
     */

    Categories.remoteMethod('getCategoriesWithProduct', {
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
        ],
        returns: {
            type: 'object',
            root: true,
            description: 'response data of service'
        },
        description: 'get current Categories',
        http: {
            verb: 'get'
        },
    });

    Categories.getCategoriesWithProduct = async function (req) {
        const products = await Categories.app.models.Promotions.search(req, {pageSize:10} );        
        let categories = await Categories.find();
        products.data.forEach(product => {
            categories.forEach(category => {
                if(product.categoriesId == category.id ){
                    category.cant = (category.cant) ? category.cant + 1 : 1
                }
            });
        });

        
        return RESTUtils.buildStandarResponse( categories )
    }

    /**
     * To search categories by one requerimient
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
     */

    
    Categories.remoteMethod('search', {
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

    Categories.search = async function (req, params) {
        let limitQuery = (params.pageSize) ? params.pageSize : 10;
        let page = (params.page) ? ((params.page - 1) * limitQuery) : 0;

        try {
            const filter = {                                     
                limit: limitQuery,
                skip: page,                                
            };    
            
            const [ total, data ] = await Promise.all([
                    Categories.count(),
                    Categories.find(filter)
                ]
            )
            
            return RESTUtils.buildResponse(data, limitQuery, (params.page) ? params.page : page, total);            

        } catch (error) {
            console.error(error);
            throw RESTUtils.getServerErrorResponse(ERROR_GENERIC);       
        }
    }
};
