'use strict'

const MarkovChain = require('../index')
const TheDonald = require('./TheDonald')

const markovChain = new MarkovChain(TheDonald)

console.log(markovChain.generate(null, 20)) //eslint-disable-line
