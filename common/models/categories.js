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
        description: 'Post current quotation',
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
};
