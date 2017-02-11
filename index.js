'use strict'

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
     * @param {Object} config
     * 
     * @memberOf MarkovChain
     */
    constructor(seed, config) {
        this.config = Object.assign(this.defaultConfig, config)
        if (!seed) {
            throw new Error('The MarkovChain class cannot be instantiated without a seed')
        }
        this.seed = seed
    }

    /**
     * Default Config
     * 
     * @readonly
     * 
     * @memberOf MarkovChain
     */
    get defaultConfig() {
        const defaultConfig = {
            limit: 20
        }

        return defaultConfig
    }

    /**
     * Generates a probability matrix from the seed
     * 
     * @readonly
     * 
     * @memberOf MarkovChain
     */
    get probabilityMatrix() {
        const unordered = {}
        const list = this.wordList
        let word = ''
        for (let index in list) {
            word = list[index].toLowerCase()
            unordered[word] = unordered[word] || []
            let idx = list.indexOf(word)

            while (idx !== -1) {
                if (list[idx + 1]) {
                    unordered[word].push((list[idx + 1].toLowerCase()))
                }
                idx = list.indexOf(word, idx + 1)
            }
        }
        const result = {}
        Object.keys(unordered).sort().forEach(key => {
            result[key] = unordered[key]
        })

        return result
    }

    /**
     * Strips new lines from seed and generates an array
     * 
     * @readonly
     * 
     * @memberOf MarkovChain
     */
    get wordList() {
        return this.seed.replace(/(\r\n|\n|\r)/gm, ' ').toLowerCase().split(' ')
    }

    /**
     * Gets a random word
     * 
     * @returns {String} A random word from the word list
     * 
     * @memberOf MarkovChain
     */
    _getRandomWord() {
        const list = this.wordList
        return list[Math.floor(list.length * Math.random())].toLowerCase()
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
        const matrix = this.probabilityMatrix
        word = word.toLowerCase()
        return matrix[word] && matrix[word] !== [] ? matrix[word][Math.floor(matrix[word].length * Math.random())] : false
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
     * @param {String|null} firstWord The word to start the Markov chain
     * @param {Number} limit The maximum number of words for the Markov chain
     * @returns {String}
     * 
     * @memberOf MarkovChain
     */
    generate(firstWord, limit) {
        limit = limit || this.config.limit
        const punctuation = ['.', '?', '!']
        const chain = []

        while (!firstWord) {
            firstWord = this._getRandomWord()
        }
        chain.push(this._ucfirst(firstWord))
        let nextWord = this._getNextWord(firstWord)
        do {
            let prevWord = chain[chain.length - 1] || false
            
            if (prevWord && punctuation.indexOf(prevWord.charAt(prevWord.length - 1)) !== -1) {
                nextWord = this._ucfirst(nextWord)
            }
            chain.push(nextWord)
            if (chain.length <= limit) {
                nextWord = this._getNextWord(nextWord)
            } else {
                nextWord = false
            }
        } while (nextWord)

        return chain.join(' ')
    }
}

module.exports = MarkovChain
