'use strict';
const multipartyParser = require('../utils/MultiPartyParser');
const RESTUtils = require('../utils/RESTUtils');
const ImageSaver = require('./ImageSaver');
const config = require('../../server/config.json');
const IMAGES_CONTAINER = "products";
const imageSaver = new ImageSaver(`${config.imagesStoragePath}/${IMAGES_CONTAINER}/`);
const ERROR_GENERIC = 'Error conexion con el servidor';
const PROMOTION_UPDATE_SUCCESS = 'El producto se actualizo correctamente.';
const PRODUCT_CREATE_SUCCESS = 'El producto se creo correctamente.';

module.exports = function (Products) {

    /**
     * To search promotions to admin form
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
     */

    Products.remoteMethod('adminSearch', {
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

    Products.adminSearch = async function (req, params) {
        let limitQuery = (params.pageSize) ? params.pageSize : 10;
        let page = (params.page) ? ((params.page - 1) * limitQuery) : 0;

        try {
            const filter = {
                limit: limitQuery,
                skip: page,
                include: ['categories', 'assets']
            };

            const data = await Products.find(filter);
            const total = await Products.count();

            return RESTUtils.buildResponse(data, limitQuery, (params.page) ? params.page : page, total);

        } catch (error) {
            console.error(error);
            throw RESTUtils.getServerErrorResponse(ERROR_GENERIC);
        }
    }

    /**
     * To create banner by form
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
    */

    Products.remoteMethod('createProduct', {
        accepts: { arg: 'params', type: 'object', "required": false, "description": "all object data", "http": { "source": "context" } },
        returns: { arg: "response", type: "object", root: false, description: "response data of service" },
        description: "To create Products by form",
        http: {
            verb: 'post'
        },
    });

    Products.createProduct = async function (ctx) {
        try {
            const { fields, files } = await multipartyParser.parse(ctx.req);
            const data = JSON.parse(fields.all);
            const product = await Products.create(data);
            await shouldRemoveFiles(fields, product);
            await Promise.all([
                createContainerIfNotExists(IMAGES_CONTAINER),
                imageSaver.saveImages(files.imageToSave, product),
            ]);
            return RESTUtils.buildSuccessResponse({ data: PRODUCT_CREATE_SUCCESS });

        } catch (error) {
            console.log("error", error);
            throw RESTUtils.getServerErrorResponse(error.message ? ERROR_GENERIC : error);
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
    Products.prototype.updateProduct = async (ctx) => {
        try {
            const { fields, files } = await multipartyParser.parse(ctx.req);
            const { id } = ctx.req.params;
            const data = JSON.parse(fields.all);
            const product = await Products.findById(id);
            product.updateAttributes(data);
            await shouldRemoveFiles(fields, product);
            await Promise.all([
                createContainerIfNotExists(IMAGES_CONTAINER),
                imageSaver.saveImages(files.imageToSave, product),
            ]);

            return RESTUtils.buildSuccessResponse({ data: PROMOTION_UPDATE_SUCCESS });
        } catch (error) {
            console.log("error", error);
            throw RESTUtils.getServerErrorResponse(error.message ? ERROR_GENERIC : error);
        }
    };

    Products.prototype.sufixForFileName = (product) => {
        return product.id
    }

    Products.prototype.updateImageFileName = async (entity, fileNames) => {
        const assets = Products.app.models.Assets;
        const promises = fileNames.map(file => {
            return assets.create({ productsId: entity.id, name: file, path: file })
        });
        await Promise.all(promises);
    }

    Products.downloadImage = (ctx, callback) => {
        Products.app.models.Image.download(IMAGES_CONTAINER, ctx.req.query.filename, ctx.req, ctx.res, err => {
            if (err) callback(err);
        });
    };

    const createContainerIfNotExists = async (containerName) => {
        const storage = Products.app.models.Image;
        storage.getContainers((err, containers) => {
            if (!containers.includes(containerName)) {
                storage.createContainer({ name: containerName }, function (err, c) { });
            }
        });
    };

    const shouldRemoveFiles = async (fields, product) => {
        const toRemoveFiles = fields["imagesToRemove"];
        if (toRemoveFiles) {
            await _deleteImages(toRemoveFiles, product)
        }
    }

    const _deleteImages = async (filesToRemove, product) => {
        const toRemove = filesToRemove || [];
        const assets = Products.app.models.Assets;

        await toRemove.forEach(fileName => {
            Products.app.models.Image.removeFile(IMAGES_CONTAINER, fileName, (err) => {
                if (err) {
                    return Promise.reject(err);
                }
            })
        });
        //console.log(filesToRemove, 'para eliminar', product);        
        const promises = toRemove.map(file => assets.destroyAll({ name: file }));
        await Promise.all(promises);

    };
};
