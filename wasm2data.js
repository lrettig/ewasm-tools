const wabt = require('wabt')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')

const inputFile = argv._[0]
if (!inputFile)
  throw new Error("Missing input file")

// read input binary data
let data = fs.readFileSync(inputFile)

// print as string
// console.log(data.toString('hex'))

// print out the final string
const arr = data.reduce((prev, cur) => prev + "\\" + cur.toString(16).padStart(2, '0'), "")
console.log(arr)

// print length
console.error('Length:', data.length)
