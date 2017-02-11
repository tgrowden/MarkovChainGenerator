'use strict'

const MarkovChain = require('../index')
const fs = require('fs')
const seed = fs.readFileSync(__dirname + '/donald.txt', 'utf8')

const TheDonald = new MarkovChain(seed)

console.log(TheDonald.generate(null, 20)) //eslint-disable-line
