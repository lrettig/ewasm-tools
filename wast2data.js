const wabt = require('wabt')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')

// read input WAST
const inputFile = argv._[0]
if (!inputFile)
  throw new Error("Missing input file")

const wast = fs.readFileSync(inputFile).toString()

// convert to WASM
const mod = wabt.parseWat('arbitraryModuleName', wast)
mod.resolveNames()
mod.validate()
const bin = mod.toBinary({log: false, write_debug_names: false}).buffer
mod.destroy()

// print out the final string
const arr = bin.reduce((prev, cur) => prev + "\\" + cur.toString(16).padStart(2, '0'), "")
console.log(arr)

// print length
console.error('Length:', bin.length)

