/*eslint-env node, mocha */
'use strict'

const chai  = require('chai')
const MarkovChain = require('../index')
const GettysburgAddress = require('./seed')

const markovChain = new MarkovChain(GettysburgAddress)

const expect = chai.expect

describe('MarkovChain', () => {
    it('should set seed property when instantiated', () => {
        expect(markovChain).to.have.property('seed')
    })

    it('should set a word list array of the passed seed string', () => {
        expect(markovChain).to.have.property('wordList')
    })

    describe('wordList', () => {
        it('should be an array', () => {
            expect(Array.isArray(markovChain.wordList))
        })
    })

    describe('_getNextWord()', () => {
        it('should return false when no param is passed', () => {
            expect(markovChain._getNextWord()).to.be.false
        })
    })

    describe('_probabilityArray()', () => {
        it('should build an array when passed a word from the seed', () => {
            expect(markovChain._probabilityArray('Fourscore')).to.be.array
        })
    })

    describe('_getRandomWord()', () => {
        it('should be a string', () => {
            expect(markovChain._getRandomWord()).to.be.string
        })
    })

    describe('_ucfirst()', () => {
        it('should capitalize the first letter of a given word', () => {
            expect(markovChain._ucfirst('year')).equals('Year')
        })
    })

    describe('generate()', () => {
        it('should generate a Markov chain string', () => {
            const string = markovChain.generate()
            expect(string).to.be.string
        })

        it('should limit the number of words in the string when limit param is passed', () => {
            const string = markovChain.generate(null, 20)
            expect(string.split(' ').length).to.be.lte(20)
        })

        it('should have the first word in a string match the firstWord param when passed', () => {
            const string = markovChain.generate('Years')
            expect(string.split(' ')[0]).to.equal('Years')
        })
    })

})
