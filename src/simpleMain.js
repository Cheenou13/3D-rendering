import { GUI } from "dat.gui"
import { DisplayModels } from "./src/Display"
import { CreatePlanes } from './src/plateForm/models/plane'
import axios from "axios"
// import TextPlane from '@seregpie/three.text-plane';

const url = 'https://run.mocky.io/v3/6da89ab8-ba93-4baa-8e9d-6f7c941d018b'

async function main() {
  // const guiControl = new GUI()
  const device = new DisplayModels(document)
  const planexGenerator = new CreatePlanes()
  const texturePlane = planexGenerator.loadTexturePlane('importedModels/screenBackground/metalMapping.jpeg')
  const 
  {
    lifter1, lifter2, manualStat1, manualStat2, manualStat3,
    manualStat4, FAN_PSU, DIMM, AOI
  } = await device.loadnig()
  

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

  const lift1Label = planexGenerator.getTextPlane('Lifter 1')
  const mt1Label = planexGenerator.getTextPlane('Manual Station 1')
  const fanLabel = planexGenerator.getTextPlane('FAN/PSU')
  const dimmLabel = planexGenerator.getTextPlane('DIMM')
  const mt2Label = planexGenerator.getTextPlane('Manual Station 2')
  const mt3Label = planexGenerator.getTextPlane('Manual Station 3')
  const aoiLabel = planexGenerator.getTextPlane('AOI')
  const mt4Label = planexGenerator.getTextPlane('Manual Station 4')
  const lifter2Label = planexGenerator.getTextPlane('Lifter 2')


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


        // const status = this.#getSingleText(text)
        // const textPlane = new TextPlane ({
        //     alignment: 'left',
        //     // color: 'green',
        //     backgroundColor: chroma('#073b4c').alpha(1/3).css(),
        //     fontFamily: '"Times New Roman", Times, serif',
        //     fontSize: 0.1,
        //     paddingIndex: 0.5,
        //     text:[
        //         'Name: ' + machine.name,
        //         'Status: ' + machine.status,
        //         'Power: ' + machine.Power
        //       ].join('\n')
        // }, new THREE.MeshBasicMaterial({
        //     side: THREE.DoubleSide,
        //     transparent: true,
        //     depthWrite: false,
        //     opacity: 1
        //   }))