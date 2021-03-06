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
console.log(Buffer.from(bin).toString('hex'))

