const wabt = require('wabt')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')

const inputFile = argv._[0]
if (!inputFile)
  throw new Error("Missing input file")

// read input data
let data = fs.readFileSync(inputFile).toString()

// remove whitespace
data = data.replace(/\s/g, '')

// remove slashes and print
console.log(data.replace(/\\/g, ''))
