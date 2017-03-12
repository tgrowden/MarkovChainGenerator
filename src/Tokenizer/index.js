'use strict'

class Tokenizer {

    /**
     * Splits a string into an array of individual tokens
     * 
     * @static
     * @param {String} text The string to tokenize
     * @returns {Array} The string, separated as an array
     * 
     * @memberOf Tokenizer
     */
    static tokenize(text) {
        return text.split(' ')
    }

    /**
     * Rebuilds a string from a tokenized array
     * 
     * @static
     * @param {Array} tokenizedArray An array of strings, separated into individual tokens
     * @returns {String} The reconstructed string
     * 
     * @memberOf Tokenizer
     */
    static rebuild(tokenizedArray) {
        if (Array.isArray(tokenizedArray) !== true) {
            throw new Error('Tokenizer can only rebuild an array.')
        }
        let text = tokenizedArray.join(' ')
        text = text.replace(/\s([.!?\',:%])/g, '$1')
        text = text.replace(/(\$)\s(\w)/g, '$1$2')
        return text
    }

    /**
     * Sanitize a string, stripping specific unicode characters
     * 
     * @static
     * @param {String} text The text to sanitize
     * @returns {String} The sanitized string
     * 
     * @memberOf Tokenizer
     */
    static sanitize(text) {
        return text.replace(/[\u2018\u2019]/g, '\'')
            .replace(/[\u201C\u201D]/g, '"')
            .replace(/[\u2013\u2014]/g, '-')
            .replace(/[\u2026]/g, '...')
    }
}

module.exports = Tokenizer
