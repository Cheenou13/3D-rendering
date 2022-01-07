import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'
import { planeObject, CreatePlanes } from './src/plateForm/models/plane';
import { createLights } from './src/plateForm/components/light';

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
async function main(){
  /*
  TODO
  will need to fix this later so any async functions will runs in main with problem
  */
}
const scene = new THREE.Scene()
const bgLoader = new THREE.TextureLoader()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
const model_loader = new GLTFLoader()
const control = new OrbitControls(camera, renderer.domElement)
const guiControl = new dat.GUI()
const locationFolder = guiControl.addFolder('Lambo Coordinates')
const planePosition = guiControl.addFolder('Plane Position')
const planeSize = guiControl.addFolder('Plane size')
const planeDist = guiControl.addFolder('Plane Distance')
const cameraAngle = guiControl.addFolder('Camera Angle')
const { topLight, bottomLight, ambientLight, frontLight, backLight } = createLights()
// const footing = planeObject('importedModels/screenBackground/NormalMap.png')
const planeType = new CreatePlanes()
const footing = planeType.loadTexturePlane('importedModels/screenBackground/NormalMap.png')
console.log(footing)
const cameraFolder = guiControl.addFolder('Lambo angle')
const model = 'importedModels/model.gltf'
const custBackground = 'importedModels/screenBackground/techBackground.jpg'
planeType.controlFolder(footing)
camera.position.setZ(5);
scene.add(footing)
// scene.add(topLight)
// scene.add(bottomLight)
scene.add(backLight)
// scene.add(ambientLight)
scene.add(frontLight)

renderer.setClearColor(0xcad4e3, 1)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

function lamboPosition() {
  lambo.scene.children[0].position.set(
    location.label.positionX,
    location.label.positionY,
    location.label.positionZ
  )
}

const location = {
  label: {
    positionX: 0.0,
    positionY: -1.5,
    positionZ: 0
  }
}
locationFolder.add(location.label, "positionX", -10, 10, 0.01).onChange(lamboPosition)
locationFolder.add(location.label, "positionY", -10, 10, 0.01).onChange(lamboPosition)
locationFolder.add(location.label, "positionZ", -10, 10, 0.01).onChange(lamboPosition)
footing.rotation.x = -1.58
footing.rotation.y = 0
footing.rotation.z = 0.45
planePosition.add(footing.rotation, 'x', -10, 10, 0.01)
planePosition.add(footing.rotation, 'y', -10, 10, 0.01)
planePosition.add(footing.rotation, 'z', -10, 10, 0.01)

footing.position.x = 0
footing.position.y = -1.48
footing.position.z = 0
planeDist.add(footing.position, 'x', -10, 10, 0.01)
planeDist.add(footing.position, 'y', -10, 10, 0.01)
planeDist.add(footing.position, 'z', -10, 10, 0.01)


const planeDimension = {
  options: {
    width: 9,
    height: 12,
    widthSegments: 1,
    heightSegments: 1
  }
}
function changeDimension() {
  footing.geometry.dispose()
  footing.geometry = new THREE.PlaneBufferGeometry(
    planeDimension.options.width,
    planeDimension.options.height,
    planeDimension.options.widthSegments,
    planeDimension.heightSegments
  )
}

planeSize.add(planeDimension.options, 'width', 0, 20, 0.01).onChange(changeDimension)
planeSize.add(planeDimension.options, 'height', 0, 20, 0.01).onChange(changeDimension)
planeSize.add(planeDimension.options, 'widthSegments', 0, 20, 0.01).onChange(changeDimension)
planeSize.add(planeDimension.options, 'heightSegments', 0, 20, 0.01).onChange(changeDimension)


bgLoader.load(custBackground, (bg) => {
  
  scene.background= bg
})
const lambo = await model_loader.loadAsync(model)
lamboPosition()
changeDimension()
const car = lambo.scene.children[0]
scene.add(car)
// console.log(lambo.scene.animations[0])
control.autoRotate = true
control.maxPolarAngle = Math.PI / 2

cameraAngle.add(camera.position, 'x', 0, 10, 0.01)
cameraAngle.add(camera.position, 'y', 0, 10, 0.01)
cameraAngle.add(camera.position, 'z', 0, 10, 0.01)
camera.lookAt(0, )

// console.log(lambo.scene.children[0].rotation)
// lambo.scene.children[0].rotation
// lambo.scene.children[0].rotation.z = 0.86
car.rotation.z = 0.86
cameraFolder.add(car.rotation, 'x', -Math.PI / 2, Math.PI / 2, 0.001)
cameraFolder.add(car.rotation, 'y', -Math.PI / 2, Math.PI / 2, 0.001)
cameraFolder.add(car.rotation, 'z', -Math.PI / 2, Math.PI / 2, 0.001)
control.update()
function anime() {
  requestAnimationFrame(anime)
  renderer.render(scene, camera)
  // control.update()
}

anime()