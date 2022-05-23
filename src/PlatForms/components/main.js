import { DisplayModels } from "./Display.js"

export default async function main() {
  const device = new DisplayModels(document)
  await device.int()

}

main().catch((err) => {
  console.log(err)
})