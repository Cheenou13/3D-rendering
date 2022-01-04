import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer()
const model_loader =  new GLTFLoader()
const light = new THREE.AmbientLight(0x404040, 5);
const topLight = new THREE.DirectionalLight (0xffffff, 5)
const bottomLight = new THREE.DirectionalLight (0xffffff, 5)
const control = new OrbitControls (camera, renderer.domElement)
const guiControl = new dat.GUI()
const locationFolder = guiControl.addFolder('Lambo Coordinates')
const rotateFolder = guiControl.addFolder('360 view')


bottomLight.position.set(0, -1, 0)
//box
// const boxGeometry = new THREE.BoxGeometry(1, 1, 1,)
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ffff
// })
// const box = new THREE.Mesh(boxGeometry, material)
// scene.add(box)
renderer.setClearColor(0xcad4e3, 1 )
scene.add(topLight)
scene.add(light)
scene.add(bottomLight)
camera.position.setZ(5)
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

function lamboPosition(){
  // lambo.scene.children[0].position.clear
  lambo.scene.children[0].position.set(
    location.label.positionX, 
    location.label.positionY, 
    location.label.positionZ
  )
}

const model = 'models/model.gltf'
// model_loader.load(model, (model) =>{
//     // console.log(model.scene)
//     scene.add(model.scene)
// })

const location = {
  label: {
    positionX: 0.2,
    positionY: -2,
    positionZ: 0
  }
}
locationFolder.add(location.label, "positionX", -10, 10).onChange(lamboPosition)
locationFolder.add(location.label, "positionY", -10, 10).onChange(lamboPosition)
locationFolder.add(location.label, "positionZ", -10, 10).onChange(lamboPosition)

const lambo = await model_loader.loadAsync(model)
lambo.scene.children[0]
lamboPosition()
scene.add(lambo.scene)
console.log(lambo.scene.animations[0])
lambo.scene.children[0].castShadow = true
control.autoRotate = true
function anime(){
    requestAnimationFrame(anime)
    renderer.render(scene, camera)
    control.update()
    
}
anime()