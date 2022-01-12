import './style.css'
import { CreatePlanes } from './src/plateForm/models/plane';
import { DisplayModels } from "./src/Display";
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
  })
  let textPlane = new TextPlane({
    alignment: 'left',
    backgroundColor: chroma('#073b4c').alpha(1/3).css(),
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: 0.2,
    paddingIndex: 1,
    // fontStyle: 'italic',
    // strokeColor: '#ef476f',
    text:[
      data.options.data1+'testing',
      data.options.data2+'testing',
      data.options.data3+'testing',
      data.options.data4+'testing' 
    ].join('\n')
  });
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
	color: 0xffffff
});

const points = [];
points.push( new THREE.Vector3( - 1, 1, 1 ) );
points.push( new THREE.Vector3( 1, 1, 1 ) );
points.push( new THREE.Vector3( 1, 1, 1 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, linematerial );
console.log(line)
label.add(line.rotation, 'x', -Math.PI*2, Math.PI*2, 0.001)
label.add(line.rotation, 'y', -Math.PI*2, Math.PI*2, 0.001)
label.add(line.rotation, 'z', -Math.PI*2, Math.PI*2, 0.001)

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
// lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
// lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
// lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

// lights[ 0 ].position.set( 0, 200, 0 );
// lights[ 1 ].position.set( 100, 200, 100 );
// lights[ 2 ].position.set( - 100, - 200, - 100 );

// scene.add( lights[ 0 ] );
// scene.add( lights[ 1 ] );
// scene.add( lights[ 2 ] );

camera.position.z = 5
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

label.add(plane.position, 'x', -Math.PI*2, Math.PI*2, 0.01)
const light2Color = {
  color : 0xff0000
}
label.add(text, 'fontSize', 0, 15, 0.01)
// label.add(text.color, 'r', 0, 255, 1)
group.add(plane, plane2)
// scene2.add(frontLight2, backLight2)
scene.add(frontLight, backLight)
scene.add(plane)
scene.add(text)
scene.add(line)
// scene.add(scene2)
// scene.add(plane2)
console.log(scene)
function start() {
  requestAnimationFrame(start)
  renderer.render(scene, camera)
  // plane.rotation.x += 0.01
  // plane.rotation.y += 0.01
  // plane2.rotation.y += 0.01
}

start()