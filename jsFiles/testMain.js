import {DisplayModels} from "./testDisplay"

async function main() {

    const device = new DisplayModels(document)
  
    await device.int()
    console.log("inside test")
  
  }
  
  main().catch((err) => {
    console.log(err)
  })