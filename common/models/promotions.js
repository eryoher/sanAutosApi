'use strict';
const multipartyParser = require('../utils/MultiPartyParser');

const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = 'Error conexion con el servidor';
const PROMOTION_UPDATE_SUCCESS = 'La promocion se actualizo correctamente.';
const PROMOTION_CREATE_SUCCESS = 'La promocion se creo correctamente.'

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


      /**
   *
   * @param {object} ctx
   * @param {object} options
   * @param {Function(Error, object)} callback
   *
   *
   */
    Promotions.prototype.updatePromotion = async(ctx) => {
        try {
            const { fields, files } = await multipartyParser.parse(ctx.req);
//            console.log(fields);            
            const { id } = ctx.req.params;            
            const data = JSON.parse(fields.all);
            const promotion = await Promotions.findById(id);
            promotion.updateAttributes(data);
            
            /*
            await Promise.all([
                updateSegments( id, segmentos ),
                createContainerIfNotExists(IMAGES_CONTAINER),
                imageSaver.saveImages(files, banner),
                shouldRemoveFiles(fields, banner)
            ])
            */
            
            return RESTUtils.buildSuccessResponse({ data: PROMOTION_UPDATE_SUCCESS });
        } catch (error) {
            console.log("error",error);
            throw RESTUtils.getServerErrorResponse(error.message ? ERROR_GENERIC : error);
        }
    };


    /**
     * To create banner by form
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
    */

    Promotions.remoteMethod('createPromotion', {
        accepts: { arg: 'params', type: 'object', "required": false, "description": "all object data", "http": { "source": "context" } },
        returns: { arg: "response", type: "object", root: false, description: "response data of service" },
        description: "To create promotions by form",
    });

    Promotions.createPromotion = async function (ctx) {    
        try {
            const { fields, files } = await multipartyParser.parse(ctx.req);
            const data = JSON.parse(fields.all);
            
            const promotion = await Promotions.create(data);
           

            /*await Promise.all([
                updateSegments( banner.id, segmentos, true ),
                createContainerIfNotExists(IMAGES_CONTAINER),
                imageSaver.saveImages(files, banner),
                shouldRemoveFiles(fields, banner)
            ])*/

            return RESTUtils.buildSuccessResponse({ data: PROMOTION_CREATE_SUCCESS });
            
        } catch (error) {            
            console.log("error",error);
            throw RESTUtils.getServerErrorResponse(error.message ? ERROR_GENERIC : error);        
        }
        
    }
};