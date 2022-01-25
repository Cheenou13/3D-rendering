import { GUI } from "dat.gui"
import { DisplayModels } from "./src/Display"
import { CreatePlanes } from './src/plateForm/models/plane'
import axios from "axios"

const url = 'https://run.mocky.io/v3/8daac68c-09ed-4e7c-83e0-92c941f6a10e'

async function getData(url){
  const res = await axios.get(url);
  return res.data;
}
async function main() {
  // const guiControl = new GUI()
  const device = new DisplayModels(document)
  const planexGenerator = new CreatePlanes()
  const texturePlane = planexGenerator.loadTexturePlane('metalMapping.jpeg')
  const 
  {
    lifter1, lifter2, manualStat1, manualStat2, manualStat3,
    manualStat4, FAN_PSU, DIMM, AOI
  } = await device.loadnig()
  
  const myData = await getData(url)
  // device.addModelRotation(lifter1, guiControl, 'lifter1 Rotation')
  // device.addModelPosition(lifter1, guiControl, 'lifter1 position')
  // device.addModelRotation(manualStat1, guiControl, 'manualStat1 Rotation')
  // device.addModelPosition(manualStat1, guiControl, 'manualStat1 position')
  // device.addModelRotation(FAN_PSU, guiControl, 'FAN_PSU Rotation')
  // device.addModelPosition(FAN_PSU, guiControl, 'FAN_PSU position')
  // device.addModelRotation(DIMM, guiControl, 'DIMM Rotation')
  // device.addModelPosition(DIMM, guiControl, 'DIMM position')
  // device.addModelRotation(manualStat2, guiControl, 'manualStat2 Rotation')
  // device.addModelPosition(manualStat2, guiControl, 'manualStat2 position')
  // device.addModelRotation(manualStat3, guiControl, 'manualStat3 Rotation')
  // device.addModelPosition(manualStat3, guiControl, 'manualStat3 position')
  // device.addModelRotation(AOI, guiControl, 'AOI Rotation')
  // device.addModelPosition(AOI, guiControl, 'AOI position')
  // device.addModelRotation(manualStat4, guiControl, 'manualStat4 Rotation')
  // device.addModelPosition(manualStat4, guiControl, 'manualStat4 position')
  // device.addModelRotation(lifter2, guiControl, 'lifter2 Rotation')
  // device.addModelPosition(lifter2, guiControl, 'lifter2 position')
  // console.log(myData['Machine_8'])
  const lift1Label = planexGenerator.getTextPlane(myData['Machine_8'])
  const mt1Label = planexGenerator.getTextPlane(myData['Machine_1'])
  const fanLabel = planexGenerator.getTextPlane(myData['Machine_7'])
  const dimmLabel = planexGenerator.getTextPlane(myData['Machine_3'])
  const mt2Label = planexGenerator.getTextPlane(myData['Machine_2'])
  const mt3Label = planexGenerator.getTextPlane(myData['Machine_5'])
  const aoiLabel = planexGenerator.getTextPlane(myData['Machine_4'])
  const mt4Label = planexGenerator.getTextPlane(myData['Machine_6'])
  const lifter2Label = planexGenerator.getTextPlane(myData['Machine_9'])


  lift1Label.rotation.set(0, 1.55, 0)
  lift1Label.position.set(-7.126, 0.783, -2.278)
  mt1Label.position.set(-5.34, 0.783, -2.278)
  fanLabel.position.set(-3.554, 0.783, -2.278)
  dimmLabel.position.set(-1.513, 0.783, -2.278)
  mt2Label.position.set(0.23, 0.783, -2.278)
  mt3Label.position.set(1.65, 0.783, -2.278)
  aoiLabel.position.set(3.335, 0.783, -2.278)
  mt4Label.position.set(5, 0.783, -2.278)
  lifter2Label.position.set(7.126, 0.783, -2.278)
  lifter2Label.rotation.set(0, -1.55, 0)
  // device.addModelRotation(lift1Label, guiControl, 'lift1Label Rotation')
  // device.addModelPosition(lift1Label, guiControl, 'lift1Label position')
  // device.addModelPosition(mt1Label, guiControl, 'Manual Station 1 position')
  // device.addModelPosition(fanLabel, guiControl, 'FAN/PSU position')
  // device.addModelPosition(dimmLabel, guiControl, 'DIMM position')
  // device.addModelPosition(mt2Label, guiControl, 'Manual Station 2 position')
  // device.addModelPosition(mt3Label, guiControl, 'Manual Station 3 position')
  // device.addModelPosition(aoiLabel, guiControl, 'AOI position')
  // device.addModelPosition(mt4Label, guiControl, 'Manual Station 4 position')
  // device.addModelRotation(lifter2Label, guiControl, 'lifter 2 Rotation')
  // device.addModelPosition(lifter2Label, guiControl, 'Lifter 2 position')

  device.addToScene(texturePlane)
  device.addToScene(lifter1)
  device.addToScene(manualStat1)
  device.addToScene(FAN_PSU)
  device.addToScene(DIMM)
  device.addToScene(manualStat2)
  device.addToScene(manualStat3)
  device.addToScene(AOI)
  device.addToScene(manualStat4)
  device.addToScene(lifter2)
  device.addToScene(lift1Label)
  device.addToScene(mt1Label)
  device.addToScene(fanLabel)
  device.addToScene(dimmLabel)
  device.addToScene(mt2Label)
  device.addToScene(mt3Label)
  device.addToScene(aoiLabel)
  device.addToScene(mt4Label)
  device.addToScene(lifter2Label)

  device.display()

}

main().catch((err) => {
  console.log(err)
})