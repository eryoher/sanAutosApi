const generateCode = async function ( long ) {        
    const  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";    

    try {
        let pass = '';                
        for (let index = 0; index < long; index++) {                       
            pass += characters.charAt(Math.floor(Math.random()*characters.length));                   
        }
        
        return pass;            

    } catch (error) {
        console.error(error);
        throw RESTUtils.getServerErrorResponse(ERROR_GENERIC);       
    }        
}

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}

module.exports = {
    generateCode,
    zfill
}