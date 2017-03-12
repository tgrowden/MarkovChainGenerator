'use strict'

class Tokenizer {

    /**
     * Regular expressions dictionary
     * 
     * @readonly
     * @static
     * 
     * @memberOf Tokenizer
     */
    static get regexp() {
        return {
            contractions: {
                match: /\s('ll|'re|'ve|n't|'s|'m|'d)\b/ig,
                replace: '$1'
            },
            punctuation: {
                match: /\s([.!?\',:%])/g,
                replace: '$1'
            },
            money: {
                match: /(\$)\s/g,
                replace: '$1'
            }
        }
    }

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
        for (let regexp in Tokenizer.regexp) {
            text = text.replace(Tokenizer.regexp[regexp].match, Tokenizer.regexp[regexp].replace)
        }

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
