'use strict';

const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = 'Error conexion con el servidor';

module.exports = function(Inventory) {

     /**
     * To search tranport by one requerimient
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
     */

    Inventory.remoteMethod('createInventory', {
        accepts: [
            { arg: 'req', type: 'object', http: { source: 'req' } },
            { arg: 'params', type: 'object', 'description': 'all object data', 'http': { 'source': 'body' } },

        ],
        returns: {
            type: 'object',
            root: true,
            description: 'response data of service'
        },
        description: 'Post inventory',
        http: {
            verb: 'post'
        },
    });

    Inventory.createInventory = async function (req, params) {

        /*promotionsId: 8
        quantity: 1
        type: 1
        usersId: "1"*/

        try {            
            const response = await Inventory.create(params);
            await updateteTotal( response );
            return RESTUtils.buildSuccessResponse({ data: response });

        } catch (error) {
            console.error(error);
            throw RESTUtils.getServerErrorResponse(ERROR_GENERIC);       
        }        
    }

    const updateteTotal = async ( inventory ) => {
        const ReqPromotion = Inventory.app.models.Promotions;
        const promotion = await ReqPromotion.findById(inventory.promotionsId);
        
        let cantidad = 0;
        if(inventory.type == 1){
            cantidad = parseInt( promotion.quantity ) + parseInt( inventory.quantity )
        }else if( inventory.type == 2 ){
            cantidad = parseInt( promotion.quantity ) - parseInt( inventory.quantity )
        }
        return promotion.updateAttribute('quantity' ,cantidad ); //Se actualiza el total
    }
};
