'use strict';
const multipartyParser = require('../utils/MultiPartyParser');
const ImageSaver = require('./ImageSaver');
const config = require('../../server/config.json');
const imageSaver = new ImageSaver(`${config.imagesStoragePath}/promotions/`)
const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = 'Error conexion con el servidor';
const PROMOTION_UPDATE_SUCCESS = 'La promocion se actualizo correctamente.';
const PROMOTION_CREATE_SUCCESS = 'La promocion se creo correctamente.';
const IMAGES_CONTAINER ="promotions";

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
        let limitQuery = (params.pageSize) ? params.pageSize : 10;
        let page = (params.page) ? ((params.page - 1) * limitQuery) : 0;
        let where  =  {}
        const today = new Date()        
        today.setHours('00','00','00', '00')        
      
        if(params.categoryId){
            where = { categoriesId : params.categoryId }
        }
        where.start_date = { 'lte': today }
        where.end_date = { 'gte': today }
        
        try {
            const filter = {                         
                where: where,   
                limit: limitQuery,
                skip: page,                
                include:['categories', 'assets', 'inventory']
            };           
            
            const data = await getEnablePromotions(filter);
            
            return RESTUtils.buildResponse(data, limitQuery, (params.page) ? params.page : page, data.length);            

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
            const { id } = ctx.req.params;            
            const data = JSON.parse(fields.all);
            const promotion = await Promotions.findById(id);
            promotion.updateAttributes(data);            
            await shouldRemoveFiles(fields, promotion);
            await Promise.all([
                createContainerIfNotExists(IMAGES_CONTAINER),
                imageSaver.saveImages(files.imageToSave, promotion),                
            ]);           
            
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
            const {quantity} = data;
            const promotion = await Promotions.create(data);          
            await shouldRemoveFiles(fields, promotion);
            await Promise.all([
                createContainerIfNotExists(IMAGES_CONTAINER),
                imageSaver.saveImages(files.imageToSave, promotion),
                addQuantitytoPromotion( quantity, promotion.id )
            ]);

            return RESTUtils.buildSuccessResponse({ data: PROMOTION_CREATE_SUCCESS });
            
        } catch (error) {            
            console.log("error",error);
            throw RESTUtils.getServerErrorResponse(error.message ? ERROR_GENERIC : error);        
        }
        
    }    

    Promotions.prototype.sufixForFileName = (promotion) => {
        return promotion.id
    }

    Promotions.prototype.updateImageFileName = async (entity, fileNames ) => {        
        const assets = Promotions.app.models.Assets;
        const promises = fileNames.map(file => {
            return assets.create({ promotionsId:entity.id, name:file })
        });                
        await Promise.all( promises );       
    }

    Promotions.downloadImage = (ctx, callback) => {
        Promotions.app.models.Image.download(IMAGES_CONTAINER, ctx.req.query.filename, ctx.req, ctx.res, err => {
            if (err) callback(err);
        });
    };

    const createContainerIfNotExists = async (containerName) => {
        const storage = Promotions.app.models.Image;
        storage.getContainers((err, containers) => {
            if (!containers.includes(containerName)) {
                storage.createContainer({ name: containerName }, function (err, c) {});
            }
        });
    };

    const shouldRemoveFiles = async (fields, promotion) => {
        const toRemoveFiles = fields["imagesToRemove"];
        if (toRemoveFiles) {
            await _deleteImages(toRemoveFiles, promotion)
        }
    }

    const _deleteImages = async (filesToRemove, promotion) => {
        const toRemove = filesToRemove || [];
        const assets = Promotions.app.models.Assets;
        
        await toRemove.forEach(fileName => {
            Promotions.app.models.Image.removeFile(IMAGES_CONTAINER, fileName, (err) => {
                if (err) {
                    return Promise.reject(err);
                }
            })
        }); 
        console.log(filesToRemove, 'para eliminar', promotion);        
        const promises = toRemove.map(file => assets.destroyAll({ name: file}));
        await Promise.all( promises );
        
    };

    const addQuantitytoPromotion = async ( quantity, promotionsId ) => {
        const inventory = Promotions.app.models.Inventory;
        const now = new Date();
        const data = {
            quantity:quantity,
            promotionsId:promotionsId,
            type:1,
            created:now,
            usersId:1
        }
        return inventory.create(data);
    }
    
    const getEnablePromotions = async (filter) => {
        const data = await Promotions.find(filter);
        const result = [];

        await data.forEach(promotion => {
            let quantity = 0 ;
            if( promotion.inventory().length ){
                promotion.inventory().forEach(item => {
                    if(item.type == 1){
                        quantity = quantity + parseInt( item.quantity );
                    }else{
                        quantity = quantity - parseInt( item.quantity );
                    }
                });
            }
            if(quantity){
                promotion.total = quantity;
                result.push( promotion );
            }
        });       
        
        return result;
    }
};