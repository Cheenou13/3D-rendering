import { DisplayModels } from "./Display"

async function main() {

  const device = new DisplayModels(document)
  // const container = document.getElementById("container")
  // const elements = document.getElementsByTagName("section")
  // console.log(elements[0].parentNode)
  // container.style.display = 'none'
  await device.int()

}

main().catch((err) => {
  console.log(err)
})