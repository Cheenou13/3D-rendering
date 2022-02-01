import { DisplayModels } from "./Display"

async function main() {

  const device = new DisplayModels(document)
  await device.int()
  device.display()

}

main().catch((err) => {
  console.log(err)
})