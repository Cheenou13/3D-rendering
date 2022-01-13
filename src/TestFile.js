import './style.css'
import { CreatePlanes } from './src/plateForm/models/plane';
import { DisplayModels } from "./src/Display";
import { Resizer } from './src/plateForm/systemControls/Resizer';
import { GUI } from 'dat.gui';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TextPlane from '@seregpie/three.text-plane';
import chroma from "chroma-js"


// document.querySelector('#app').innerHTML = `
// //   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// // `
let data = {
  options: {
    data1: 'data1: ',
    data2: 'data2: ',
    data3: 'data3: ',
    data4: 'data4: '
  }
}
function  generateText() {
  let status = new TextPlane({
    color: 'green',
    text : 'online'
  }, new THREE.MeshBasicMaterial({
    color: 'green'
  }))
  let textPlane = new TextPlane({
    alignment: 'left',
    backgroundColor: chroma('#073b4c').alpha(1/3).css(),
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: 0.2,
    // color: 'green',
    paddingIndex: 1,
    // fontStyle: 'italic',
    strokeColor: '#ffd166',
    text:[
      data.options.data1+status.text,
      data.options.data2+'testing',
      data.options.data3+'testing',
      data.options.data4+'testing' 
    ].join('\n')
  }, new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7
  }));
  
  return textPlane
}

const scene = new THREE.Scene()
const scene2 = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({antialias: true})
scene.background = new THREE.Color(0xdddddd)
new OrbitControls(camera, renderer.domElement)

const controls = new GUI()
const label = controls.addFolder('Plane label')

const shape = new THREE.PlaneGeometry(5, 5, 10, 10)
const material = new THREE.MeshPhongMaterial({
  color: 0x156289,
  emissive: 0x072534,
  side : THREE.DoubleSide,
  map : new THREE.TextureLoader().load('hello world'),
  // transparent: true,
  flatShading: true
})

const shape2 = new THREE.BoxGeometry(5, 5, 0.2)
const material2 = new THREE.MeshBasicMaterial({
  // color: 'skyblue',
  side : THREE.DoubleSide,
  map : new THREE.TextureLoader().load('importedModels/screenBackground/metalMapping.jpeg')
})
const plane2 = new THREE.Mesh(shape2, material2)
const text = generateText()
text.position.set(1, 1, 1)
plane2.position.set(1, 1, 1)
const group = new THREE.Group()

const linematerial = new THREE.LineBasicMaterial({
	color: 0x000000
});

const lineFolder = new GUI()
const lineLength = lineFolder.addFolder('Line Length')

const points = [];
points.push( new THREE.Vector3( - 1, 1, 1 ) );
points.push( new THREE.Vector3( 1, 1, 1 ) );
points.push( new THREE.Vector3( 1, 1, 1 ) );


const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, linematerial );
// console.log(line)

// line.position.set(1, 1, 1)


const coordinates = {
  options : {
    index: 0,
    x: 0,
    y: 0,
    z: 0
  }
}
function setLinePosition (){
line.geometry.attributes.position.setXYZ(
    coordinates.options.index,
    coordinates.options.x,
    coordinates.options.y,
    coordinates.options.z
  )
  // line.updateMatrix()
}

function setLineRotation(){
  line.rotation.set(
    coordinates.options.x,
    coordinates.options.y,
    coordinates.options.z
  )
}
// line.geometry.attributes.position.setXYZ(0, -0.02, -1, 1)
// line.geometry.attributes.position.setXYZ(1, 0, 2, 1)

const linePosition = lineFolder.addFolder('Line Position')

linePosition.add(line.position, 'x', -Math.PI*2, Math.PI*2, 0.001)
linePosition.add(line.position, 'y', -Math.PI*2, Math.PI*2, 0.001)
linePosition.add(line.position, 'z', -Math.PI*2, Math.PI*2, 0.001)

lineLength.add(coordinates.options,'index', 0, 2, 1).onChange(setLinePosition)
lineLength.add(coordinates.options,'x', -50, 50, 0.001).onChange(setLinePosition)
lineLength.add(coordinates.options,'y', -50, 50, 0.001).onChange(setLinePosition)
lineLength.add(coordinates.options,'z', -50, 50, 0.001).onChange(setLinePosition)

const lineRotation = lineFolder.addFolder('Line Rotation')
lineRotation.add(coordinates.options, 'x', -Math.PI*2, Math.PI*2, 0.001).onChange(setLineRotation)
lineRotation.add(coordinates.options, 'y', -Math.PI*2, Math.PI*2, 0.001).onChange(setLineRotation)
lineRotation.add(coordinates.options, 'z', -Math.PI*2, Math.PI*2, 0.001).onChange(setLineRotation)

const plane = new THREE.Mesh(shape, material)
const frontLight = new THREE.DirectionalLight(0xffffff, 2)
const backLight = new THREE.DirectionalLight(0xfffffff, 2)
// const frontLight2 = new THREE.DirectionalLight('red', 5)
// const backLight2 = new THREE.DirectionalLight('red', 5)
// frontLight2.position.set(10, 10, 10)
// backLight2.position.set(10, 10, -10)
frontLight.position.set(0, 0, 10)
backLight.position.set(0, 0, -10)

// const lights = [];
// lights[ 0 ] = new THREE.PointLight( 0xffffff, 3, 0 );
// lights[ 1 ] = new THREE.PointLight( 0xffffff, 3, 0 );
// lights[ 2 ] = new THREE.PointLight( 0xffffff, 3, 0 );

// lights[ 0 ].position.set( 0, 20, 0 );
// lights[ 1 ].position.set( 10, 20, 10 );
// lights[ 2 ].position.set( - 10, - 20, - 10 );

// scene.add( lights[ 0 ] );
// scene.add( lights[ 1 ] );
// scene.add( lights[ 2 ] );

camera.position.z = 5
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

label.add(plane.position, 'x', -Math.PI*2, Math.PI*2, 0.01)

label.add(text, 'fontSize', 0, 15, 0.01)
group.add(plane, plane2)
// scene2.add(frontLight2, backLight2)
scene.add(frontLight, backLight)
// scene.add(plane)
scene.add(text)
scene.add(line)

// scene.add(scene2)
// scene.add(plane2)
new Resizer(camera, renderer)
// line.geometry.attributes.position.needsUpdate =true
function start() {
  requestAnimationFrame(start)
  renderer.render(scene, camera)
  line.geometry.attributes.position.needsUpdate =true
  // text.rotation.y += 0.01
  // plane.rotation.x += 0.01
  // plane.rotation.y += 0.01
  // plane2.rotation.y += 0.01
}

start()