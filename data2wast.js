const wabt = require('wabt')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')

const inputFile = argv._[0]
if (!inputFile)
  throw new Error("Missing input file")

// read input data
let data = fs.readFileSync(inputFile).toString()

// convert to WASM
data = data.replace(/\\/g, '')
const hexdata = new Uint8Array(Buffer.from(data, 'hex'))

// convert to WAST
const mod = wabt.readWasm(hexdata, {readDebugNames: false})
mod.validate()
console.log(mod.toText({}))
mod.destroy()

