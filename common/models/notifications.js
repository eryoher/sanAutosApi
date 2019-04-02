'use strict';

const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = ' Error conexion con el servidor ';
const GET_NOTIFICATION = 'Success';

module.exports = function(Notification) {

    /**
     * To check notifications
     * @param {object} params data for search
     * @param {Function(Error, object)} callback
    */   

    Notification.remoteMethod('checkPayment', {
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


    Notification.checkPayment = async function (req, params) {
        try {
            const data = {
                ...params,
                notification_id : params.id,
                payment_id: (params.data) ? params.data.id : null,
                data: JSON.stringify(params.data)
            }
            delete data.id;


            await Notification.create( data );

            return RESTUtils.buildSuccessResponse({ data: GET_NOTIFICATION });

        } catch (error) {
            console.log("error",error);
            throw RESTUtils.getServerErrorResponse(error.message ? ERROR_GENERIC : error);
        }

    }
};
