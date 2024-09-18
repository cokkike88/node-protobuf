const protobufjs = require("protobufjs");
const fs = require("fs");


let main = async () => {
    const data = {
        id: "L1",
        brand: "Lenovo",
        name: {
            value: "x1"
        },
        price: {
            value: 105.66
        }
    }
    const root = await protobufjs.load("./laptop.proto")
    const response = root.lookupType('stock.Laptop')
    const message =  response.create(data)
    const byte = response.encode(message).finish()
    console.log(byte)
    // Save in json
    const jsonData = {
        data: byte
    }
    await fs.promises.writeFile('./bytes.json', JSON.stringify(jsonData), {encoding: 'utf8'})
    // finish

    const desMessage = response.decode(byte)
    const obj = response.toObject(desMessage)
    console.log(obj)
}

main().catch(err => {})