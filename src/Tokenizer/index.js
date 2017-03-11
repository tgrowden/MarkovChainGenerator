'use strict'

const natural = require('natural')
const _tokenizer = new natural.TreebankWordTokenizer()

class Tokenizer {
    
    /**
     * 
     * 
     * @static
     * 
     * @memberOf Tokenizer
     */
    static attach() {
        _tokenizer.attach()
    }

    static tokenize(text) {
        return _tokenizer.tokenize(text)
    }

    static rebuild(tokenizedArray) {
        if (Array.isArray(tokenizedArray) !== true) {
            throw new Error('Tokenizer can only rebuild an array.')
        }
        let text = tokenizedArray.join(' ')
        text = text.replace(/\s([.!?\',:%])/g, '$1')
        text = text.replace(/(\$)\s(\w)/g, '$1$2')
        return text
    }

    static normalize(text) {
        return text.replace(/[\u2018\u2019]/g, '\'')
            .replace(/[\u201C\u201D]/g, '"')
            .replace(/[\u2013\u2014]/g, '-')
            .replace(/[\u2026]/g, '...')
    }
}

module.exports = Tokenizer
