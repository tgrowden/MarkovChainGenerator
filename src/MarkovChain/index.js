'use strict'

const Tokenizer = require('../Tokenizer')

/**
 * 
 * 
 * @class MarkovChain
 */
class MarkovChain {
    /**
     * Creates an instance of MarkovChain.
     * 
     * @param {String} seed
     * 
     * @memberOf MarkovChain
     */
    constructor(seed) {
        this.limit = 100
        if (!seed) {
            throw new Error('The MarkovChain class cannot be instantiated without a seed')
        }
        this.tokenizer = Tokenizer
        this.seed = this.tokenizer.sanitize(seed)
    }

    /**
     * Creates a probability array for a given word
     * 
     * @param {String} word The word for which the probability array is to be created
     * @returns {Array} The array of possible next words
     * 
     * @memberOf MarkovChain
     */
    _probabilityArray(word) {
        if (typeof word === 'undefined' || word === false || word === null) {
            return false
        }
        const list = this.wordList
        const res = []

        let idx = list.indexOf(word)
        while (idx !== -1) {
            if (list[idx + 1]) {
                res.push(list[idx + 1])
            }
            idx = list.indexOf(word, idx + 1)
        }

        return res
    }

    /**
     * Strips new lines from seed and generates an array
     * 
     * @readonly
     * 
     * @memberOf MarkovChain
     */
    get wordList() {
        return this.tokenizer.tokenize(this.seed)
    }

    /**
     * Gets a random word
     * 
     * @param {any} strict If === false, return the first token. Otherwise, return an uppercase word
     * @returns {String} A random word from the word list
     * 
     * @memberOf MarkovChain
     */
    _getRandomWord(strict) {
        const list = this.wordList
        let word = list[Math.floor(list.length * Math.random())]

        if (strict !== false) {
            let pattern = /[A-Z]/
            while (!word.charAt(0).match(pattern)) {
                word = list[Math.floor(list.length * Math.random())]
            }
        }

        return word
    }

    /**
     * Method for returning a word
     * 
     * @param {String} word
     * @returns {String|Boolean} A word. Alternatively, boolean false
     * 
     * @memberOf MarkovChain
     */
    _getNextWord(word) {
        if (!word) {
            return false
        }
        const probabilityArray = this._probabilityArray(word)
        return probabilityArray[Math.floor(probabilityArray.length * Math.random())]
    }

    /**
     * Method for capitalizing the first letter of a word
     * 
     * @param {String} word
     * @returns {String} The formatted word
     * 
     * @memberOf MarkovChain
     */
    _ucfirst(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    /**
     * Method for generating a Markov chain
     * 
     * @param {String|Boolean} firstWord The word to start the Markov chain; if false, strict mode is overriden
     * @param {Number} limit The maximum number of words for the Markov chain
     * @returns {String}
     * 
     * @memberOf MarkovChain
     */
    generate(firstWord, limit) {
        limit = limit || this.limit
        const chain = []

        let strict = firstWord
        while (!firstWord) {
            firstWord = this._getRandomWord(strict)
        }
        chain.push(firstWord)
        let nextWord = this._getNextWord(firstWord)
        do {
            chain.push(nextWord)
            nextWord = chain.length < limit ? this._getNextWord(nextWord) : false
        } while (nextWord)

        return this.tokenizer.rebuild(chain)
    }
}

module.exports = MarkovChain
