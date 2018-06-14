const wabt = require('wabt')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const _ = require('lodash')

const inputFile = argv._[0]
if (!inputFile)
  throw new Error("Missing input file")

// read input data
let data = fs.readFileSync(inputFile).toString()

// remove whitespace
data = data.replace(/\s/g, '')

// add missing slashes and print
console.log(_.range(0, data.length, 2).map(i => _.slice(data, i, i+2)).reduce((prev, cur) => prev + "\\" + cur[0] + cur[1], ""))
