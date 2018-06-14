const wabt = require('wabt')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')

// read input WAST
const inputFile = argv.e ? argv.e : undefined
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
console.log(bin.reduce((prev, cur) => prev + "\\" + cur.toString(16).padStart(2, '0'), ""))

