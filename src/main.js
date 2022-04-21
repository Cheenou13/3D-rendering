import { DisplayModels } from "./Display"

async function main() {
  // let burgerBtn = document.querySelector('.burger')
  // console.log(burgerBtn)
  // let navigation = document.querySelector('.naviagtion-dropdown')
  // console.log(navigation)
  // burgerBtn.addEventListener('click', () =>{
  //   navigation.style.display = 'block'
  // })
  const device = new DisplayModels(document)

  await device.int()

}

main().catch((err) => {
  console.log(err)
})