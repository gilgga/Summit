const httpCodes = require('http-codes')

const ObjectId = require('mongodb').ObjectId
const isHex = require('is-hex')

// const isPositiveInteger = require('is-positive-integer')

let exportedMethods = {

    // For Error Checking and Converting MongoDB ObjectIDs
    sanitizeId ( id ) {
        if ( typeof id === 'string' ) {
            if ( isHex( id ) && ( Buffer.byteLength( id, 'utf8' ) === 12 || id.length === 24 ) ) {
                return ObjectId( id );
            } else {
                throw {
                    status: httpCodes.BAD_REQUEST,
                    message: `id must be a string of 12 bytes or a string of 24 hex characters, but is ${ id }`
                };
            }
        }
        return id;
    }

}

module.exports = exportedMethods;
