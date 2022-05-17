
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import createControl from '../../src/PlatForms/systemControls/Control.js'
import gsap from 'gsap'
import _CAMPUS_DATA from '../../jasonFiles/LocalCampusData.json'
// import Resizer from 'src/PlatForms/systemControls/Resizer.js'

console.log(_CAMPUS_DATA)


// Debug
//const gui = new dat.GUI()

// const canvasEl = document.querySelector('.chart-sidewall');
const canvasEl = document.getElementById("threeCanvas");
var width = innerWidth;
var height = innerHeight;

// scene
const scene = new THREE.Scene();

// sky
const textureLoader = new THREE.CubeTextureLoader();
// const texture = textureLoader.load([
//   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
//   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
//   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
//   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
//   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
//   'https://threejs.org/manual/examples/resources/images/cubemaps/computer-history-museum/neg-z.jpg',
// ]);
const texture = textureLoader.load([
  '../assets/sky/right.jpeg',
  '../assets/sky/left.jpeg',
  '../assets/sky/top.jpeg',
  '../assets/sky/bottom.jpeg',
  '../assets/sky/front.jpeg',
  '../assets/sky/back.jpeg'
]);
scene.background = texture;

let tl = gsap.timeline()

// camera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
renderer.setPixelRatio(window.devicePixelRatio)

// solve the dark texture
//renderer.gammaFactor = 2.2;
//renderer.gammaOutput = true;

renderer.outputEncoding = THREE.sRGBEncoding;


// lights
const light = new THREE.AmbientLight(0xffffff, 1);
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
scene.add(light)

renderer.setSize(width, height);
const rendererEl = renderer.domElement;
rendererEl.className = "";
canvasEl.appendChild(rendererEl);

// control
// const controls = new OrbitControls( camera, renderer.domElement );
const controls = createControl(camera, renderer)
controls.enableDamping = true


// geometry
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube)

// // Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( './node_modules/three/examples/js/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );

const loader = new GLTFLoader();

// define the material for data transfer effect
const dcMaterial = new THREE.MeshLambertMaterial({
  opacity: 1,
  transparent: true
})
const dcTexture = new THREE.TextureLoader().load('/parkModel/parkImg/light-flow-v1.PNG', function(map) {
  dcMaterial.map = map
  dcMaterial.transparent = true
  dcMaterial.side = THREE.DoubleSide
})
dcTexture.wrapS = THREE.RepeatWrapping
dcTexture.wrapT = THREE.RepeatWrapping
loader.load('/parkModel/park.gltf', function(gltf) {
  // set the scale
  gltf.scene.scale.set(1.0, 1.0, 1.0)
  gltf.scene.rotation.set(0.15,2.5,0)
  gltf.scene.position.set(-.4,0,0)

  const mesh = gltf.scene.children[15]
  //mesh.material.map = dcTexture
  gltf.scene.children[15].material = dcMaterial
  gltf.scene.children[16].material = dcMaterial
  gltf.scene.children[17].material = dcMaterial

  scene.add(gltf.scene);


  //gui.add(gltf.scene.rotation, 'x').min(0).max(9)
  //gui.add(gltf.scene.rotation, 'y').min(0).max(9)
  //gui.add(gltf.scene.rotation, 'z').min(0).max(9)


  tl.to(gltf.scene.rotation, {y:3.5, duration: 1})
  tl.to(gltf.scene.scale, {x:3.5, y:3.5, z:3.5, duration: 1}, "-=1")
  //tl.to(gltf.scene.position, {x:-.3})

}, 
  // called while loading is progressing
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
  }, 
  // called when loading has errors
  function(error) {
    console.error(error);
  }
)

// const width = 10;
// const height = 10;
// const intensity = 1;
const rectLight = new THREE.RectAreaLight( 0xffffff, 0.8,  10, 10 );
rectLight.position.set( 0, 5, 0 );
rectLight.lookAt( 0, 0, 0 );
scene.add( rectLight )

function initData (){
  var total = document.getElementById("total-production")
  var employees, others, smc, mpb, total_area, energy_consumption, energy_cost, hpc_data, hpc_ai_application, hpc_devices
  employees = document.getElementById("officials-employees")
  others = document.getElementById("other-employees")
  energy_cost = document.getElementById("energy-cost")
  energy_consumption = document.getElementById("energy-consumption")
  smc = document.getElementById("smc-oee")
  mpb = document.getElementById("mpb-oee")
  total_area = document.getElementById("total-area")
  hpc_data = document.getElementById("hpc-data")
  hpc_ai_application = document.getElementById("hpc-ai-application")
  hpc_devices = document.getElementById("hpc-devices")
  const sales = _CAMPUS_DATA.monthly_produced[0].data
  var sum = 0
  sales.forEach(sale => {sum += sale})

  total.innerHTML = sum
  employees.innerHTML = _CAMPUS_DATA.employment[0].officials.toLocaleString()
  others.innerHTML = _CAMPUS_DATA.employment[1].others.toLocaleString()
  energy_cost.innerHTML = _CAMPUS_DATA.energy[1].cost.toLocaleString()
  energy_consumption.innerHTML = _CAMPUS_DATA.energy[0].consumption.toLocaleString()
  smc.innerHTML = _CAMPUS_DATA.oee[0].SMC.toLocaleString()+"%"
  mpb.innerHTML = _CAMPUS_DATA.oee[1].MPB.toLocaleString()+"%"
  total_area.innerHTML = _CAMPUS_DATA.total_area.toLocaleString()
  hpc_data.innerHTML = _CAMPUS_DATA.HPC[0].data.toLocaleString()
  hpc_ai_application.innerHTML = _CAMPUS_DATA.HPC[1].ai_application.toLocaleString()
  hpc_devices.innerHTML = _CAMPUS_DATA.HPC[2].devices.toLocaleString()
}

//gui.add(rectLight.position, 'x').min(0).max(9)


//const rectLightHelper = new RectAreaLightHelper( rectLight );
//rectLight.add( rectLightHelper );

// grid
const size = 10;
const divisions = 20;
const colorCenterLine = 0xffffff;

const gridHelper = new THREE.GridHelper( size, divisions, colorCenterLine );
//scene.add( gridHelper );
// new Resizer (camera, renderer)
function onWindowResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( innerWidth, innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  renders();
}
function animate() {
    requestAnimationFrame(animate);
    
    dcTexture.offset.y += 0.01
    controls.update();
    renderer.render(scene, camera);
}
animate();
initData()
window.addEventListener('resize', onWindowResize)