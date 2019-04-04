'use strict';

const RESTUtils = require('../utils/RESTUtils');
const ERROR_GENERIC = ' Error conexion con el servidor ';
const GET_NOTIFICATION = 'Success';
const Axios = require('axios');
const TOKEN = "TEST-6989747173808942-031217-2e6e01703e7f786b1592f32bf6b42d74-147807596";
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
                data: JSON.stringify(params)
            }

            delete data.id;

            if( params.type ){
                const responData = await Notification.create( data );
                const payment = await getPayment( responData.payment_id );
                if( payment.status == 'approved' ){
                    const order = await getOrderMercadoPago( payment.order.id );
                    const preference = await getPreferenceMercadoPago( order.preference_id );                                
                    const dataCard = {
                        phone_number:preference.payer.phone.number,
                        country_code:'+57',
                        email:preference.payer.email,
                        first_name:preference.payer.name,
                        last_name:"Hernandez",
                        amount:payment.transaction_amount,
                        kind:"N",
                        currency:"COP"
                    }       

                    await sendGiftCard( dataCard );                                
                } 
            }

            return RESTUtils.buildSuccessResponse({ data: GET_NOTIFICATION });

        } catch (error) {
            console.log("error",error);
            throw RESTUtils.getServerErrorResponse(error.message ? ERROR_GENERIC : error);
        }

    }

    const getPayment = async ( paymentId ) => {
        const instance = Axios.create();
        const response = await instance.get(`https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${TOKEN}`);
        return response.data;
    }

    const getOrderMercadoPago = async ( orderId ) => {
        const instance = Axios.create();
        const response = await instance.get(`https://api.mercadopago.com/merchant_orders/${orderId}?access_token=${TOKEN}`);
        return response.data;
    }

    const getPreferenceMercadoPago = async ( preferenceId ) => {
        const instance = Axios.create();
        const response = await instance.get(`https://api.mercadopago.com/checkout/preferences/${preferenceId}?access_token=${TOKEN}`);
        return response.data;
    }

    const getAccessTokenCard = async () => {
        const params = {
            api_key_merchant:"eD_FLBp1mJU1yoYkX1ld7QDj4qE",
            api_key_entity:"P7Iu8hcrP6q0A2-JGQk-fUxKCxE"            
        }
        
        const instance = Axios.create();
        const response = await instance.post('https://3party.2transfair.com/entities/login', params);
        return response.data.auth_token;
    }

    const sendGiftCard = async ( card ) => {        
        const token = await getAccessTokenCard();        
        const instance = Axios.create();
        instance.defaults.headers.common['Authorization'] = token;    
        const response = await instance.post('https://3party.2transfair.com/gift_cards', card);        
        return response.data;
    }




    
};