import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import factories from '../jasonFiles/FoxconnFactories.json'
import lighthouseFactories from '../jasonFiles/FoxconnLighthouseFactories.json'
console.log('gps:', lighthouseFactories)


let renderer, camera, scene, light, controls

let loader = new THREE.TextureLoader()
let globeGroup = new THREE.Group()
var radius = 5

const Dom = document.querySelector( '#container' );
const width = innerWidth, height = innerHeight;

// render
function initRenderer() {
    renderer = new THREE.WebGLRenderer( { 
        antialias: true, 
        alpha: true 
    } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    const containerDom = document.querySelector( '#container' );
    //renderer.outputEncoding = THREE.sRGBEncoding

    containerDom.appendChild( renderer.domElement );
}

// camera
function initCamera() {
    camera = new THREE.PerspectiveCamera( 45, width / height, 1, 10000 );
    camera.position.set( 0, 10, 15 );
    camera.lookAt( 0, 3, 0 );
    window.camera = camera;
}

// scene
function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x020924 );
    scene.fog = new THREE.Fog( 0x020924, 200, 1000 );
    window.scene = scene;
    // axes helper
    //scene.add(new THREE.AxesHelper(500))
}

// controls
function initControls() {
    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = .3;
    controls.enablePan = true;
}

// lighting
function initLight() {
    const ambientLight = new THREE.AmbientLight( 0xcccccc, 1.1 );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
    directionalLight.position.set( 1, 0.1, 0 ).normalize();
    var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.2 );
    directionalLight2.position.set( 1, 0.1, 0.1 ).normalize();
    scene.add( directionalLight );
    scene.add( directionalLight2 );

    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.2 );
    hemiLight.position.set( 0, 1, 0 );
    scene.add( hemiLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 500, - 20 );
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 18;
    directionalLight.shadow.camera.bottom = - 10;
    directionalLight.shadow.camera.left = - 52;
    directionalLight.shadow.camera.right = 12;
    scene.add(directionalLight);
}

//
function initStars() {

    const positions = [];
    const colors = [];
    const geometry = new THREE.BufferGeometry();
    for (var i = 0; i < 10000; i ++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        positions.push( vertex.x, vertex.y, vertex.z );
        var color = new THREE.Color();
        color.setHSL( Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55 );
        colors.push( color.r, color.g, color.b );
    }
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    //const loader = new THREE.TextureLoader()
    var starsMaterial = new THREE.PointsMaterial( {
        map: loader.load("../img/sp2.png"),
        size: 1,
        transparent: true,
        opacity: 1,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        depthWrite: false
      } );

    let stars = new THREE.Points( geometry, starsMaterial );
    stars.scale.set( 300, 300, 300 );
    scene.add( stars );
}

// globe
function initEarth() {
    loader.load( '../img/earth-night.jpg', function ( texture ) {
        
        var globeGeometry = new THREE.SphereGeometry( radius, 100, 100 );
        var globeMaterial = new THREE.MeshStandardMaterial( {
            map: texture,
         } );
        var globeMesh = new THREE.Mesh( globeGeometry, globeMaterial );
        //globeGroup.rotation.set( 0.5, 2.9, 0.1 );
        //texture.encoding = THREE.sRGBEncoding
        globeGroup.add( globeMesh );
        scene.add( globeGroup );
    } );
    //
    var texture = loader.load( '../img/earth_aperture.png' );
		var spriteMaterial = new THREE.SpriteMaterial( {
			map: texture,
			transparent: true,
			opacity: 0.5,
			depthWrite: false
		} );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.scale.set( radius * 3, radius * 3, 1 );
		globeGroup.add( sprite );
  }

let sateliteGroup = new THREE.Group()
function initSatelite() {
    loader.load( '../img/satelite-orbit.png', function ( texture ) {
        var geometry = new THREE.PlaneGeometry( 14, 14 );
        var material = new THREE.MeshLambertMaterial( {
            map: texture, 
            transparent: true,
            side: THREE.DoubleSide, 
            depthWrite: false
        } );
        var mesh = new THREE.Mesh( geometry, material );
        sateliteGroup.add( mesh );
        scene.add(sateliteGroup)
    });

    loader.load( '../img/50c63ef1.png', function ( texture ) {
        var p1 = new THREE.Vector3( -7, 0, 0 );
        var p2 = new THREE.Vector3( 7, 0, 0 );
        const points = [ p1,p2];
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        var material = new THREE.PointsMaterial( {
            map: texture,
            transparent: true,
            side: THREE.DoubleSide, 
            size: 1, 
            depthWrite: false
        } );
        var earthPoints = new THREE.Points( geometry, material );
        sateliteGroup.add( earthPoints );
    } );

    //sateliteGroup.rotation.set( 1.9, 0.5, 1 );
}

function latlng2xyz(lat, lon, radius) {
    const phi = (180 + lon) * (Math.PI / 180)
    const theta = (90 - lat) * (Math.PI / 180)
    return {
      x: -radius * Math.sin(theta) * Math.cos(phi),
      y: radius * Math.cos(theta),
      z: radius * Math.sin(theta) * Math.sin(phi),
    }
  }

// not right
function latlng2xyz_(lat, lon, radius) {
    const theta = (90 + lon) * (Math.PI / 180)
    const phi = (90 - lat) * (Math.PI / 180)
    return (new THREE.Vector3()).setFromSpherical(new THREE.Spherical(radius, phi, theta))
  }

function createMarkerMesh( latlngPos, texture, size ) {

    var pos = latlng2xyz(latlngPos.lat, latlngPos.lon, latlngPos.radius)

    var material = new THREE.MeshBasicMaterial( {
        map: texture,
        transparent: true, 
        side: THREE.DoubleSide, 
        depthWrite: false, 
    } );
    var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( size, size ), material );
    //var size = radius * 0.04;
    //mesh.scale.set( size, size, size );
    mesh.position.set( pos.x, pos.y, pos.z );
    
    var coordVec3 = new THREE.Vector3( pos.x, pos.y, pos.z ).normalize();
    
    var meshNormal = new THREE.Vector3( 0, 0, 1 );
    mesh.quaternion.setFromUnitVectors( meshNormal, coordVec3 );
    return mesh;
}


/**
 * add the arcs
 */
const N = 24;
// const markerData = [...Array(N).keys()].map(() => ({
//   lat: (Math.random() - 0.5) * 180,
//   lon: (Math.random() - 0.5) * 360,
//   radius: 5,
//   }));

const arcsData = []
const nArcs = N * 3
let startFactoryIdx = 0
for(let i=0;i<nArcs;i++){
    
    // let startIdx = Math.floor(Math.random()*factories.length)
    let endRandomIdx = Math.floor(Math.random()*factories.length)
    if(startFactoryIdx != endRandomIdx){
        arcsData.push({
            startLat: factories[startFactoryIdx].LatLng[0],
            startLon: factories[startFactoryIdx].LatLng[1],
            endLat: factories[endRandomIdx].LatLng[0],
            endLon: factories[endRandomIdx].LatLng[1]
        })
        startFactoryIdx += 1
        if(startFactoryIdx === 24){
            startFactoryIdx = 0
        }
    }
}
console.log(arcsData.length)

// const arcsData_ = [...Array(N).keys()].map(() => ({
//     startLat: (Math.random() - 0.5) * 180,
//     startLon: (Math.random() - 0.5) * 360,
//     endLat: (Math.random() - 0.5) * 180,
//     endLon: (Math.random() - 0.5) * 360,
//   }));


let WaveMeshArr = []
const markerTexture = loader.load( '../img/markerWhite.png')
const waveTexture = loader.load( '../img/wave.png')

const animateDots = []
for (let i =0; i<arcsData.length; i++) {

    var startWaveMesh = createMarkerMesh(
        {
            lat: arcsData[i].startLat,
            lon: arcsData[i].startLon,
            radius: radius
        }
    , waveTexture, .3)

    var startMarkerMesh = createMarkerMesh(
        {
            lat: arcsData[i].startLat,
            lon: arcsData[i].startLon,
            radius: radius
        }
    , markerTexture, .2)

    var endWaveMesh = createMarkerMesh(
        {
            lat: arcsData[i].endLat,
            lon: arcsData[i].endLon,
            radius: radius
        }
    , waveTexture, .3)

    var endMarkerMesh = createMarkerMesh(
        {
            lat: arcsData[i].endLat,
            lon: arcsData[i].endLon,
            radius: radius
        }
    , markerTexture, .2)

    WaveMeshArr.push(startWaveMesh)
    WaveMeshArr.push(endWaveMesh)

    globeGroup.add(startWaveMesh);
    globeGroup.add(startMarkerMesh);
    globeGroup.add(endWaveMesh);
    globeGroup.add(endMarkerMesh);

    // draw line
    // https://medium.com/@xiaoyangzhao/drawing-curves-on-webgl-globe-using-three-js-and-d3-draft-7e782ffd7ab
    
    var v0 = latlng2xyz(arcsData[i].startLat, arcsData[i].startLon, radius)
    v0 = new THREE.Vector3( v0.x, v0.y, v0.z )
    var v3 = latlng2xyz(arcsData[i].endLat, arcsData[i].endLon, radius)
    v3 = new THREE.Vector3(v3.x, v3.y, v3.z)

    // var alt = 5
    var angle = v0.angleTo(v3)
    var dist = v0.distanceTo(v3)
    var alt = angle * radius * .3
    var offset = 0.25

    //if (alt < radius * .1) alt = 0.001
    //if (alt > radius * 10) alt = radius * 10
    
    var color = new THREE.Color()
    color.setHex(0x00ffff)

    var norm = v0.clone().cross(v3).normalize()
    var inter1 = latlng2xyz(arcsData[i].startLat, arcsData[i].startLon, radius + alt)
    inter1 = new THREE.Vector3(inter1.x, inter1.y, inter1.z)
    var inter2 = latlng2xyz(arcsData[i].endLat, arcsData[i].endLon, radius + alt)
    inter2 = new THREE.Vector3(inter2.x, inter2.y, inter2.z)

    var v1 = inter1.clone().applyAxisAngle(norm, angle*offset)
    var v2 = inter1.clone().applyAxisAngle(norm, angle*(1-offset))
    
    
    const curve = new THREE.CubicBezierCurve3(
        v0, // v0 - starting point
        v1, // v1 first control point
        v2, // v2 section control point
        v3 // ending point
    )

    const points = curve.getPoints( 50 );
    animateDots.push(curve.getPoints(100))

    var geometry = new THREE.BufferGeometry()
    geometry.setFromPoints( points );
    //const material = new THREE.LineBasicMaterial( { color:color } );
    const material = new THREE.LineDashedMaterial( {
        color: color,
        linewidth: 1,
        scale: 1,
        dashSize: .3,
        gapSize: .1,
    } );
    const curveObject = new THREE.Line( geometry, material );
    globeGroup.add(curveObject)
}

const aGroup = new THREE.Group()
for (let i=0; i<N; i++){
    // animate dots
    const animateDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 0.03, 0.03),
    new THREE.MeshPhongMaterial({
        color: 0xffffff
        })
    )
    aGroup.add(animateDot)
}
globeGroup.add(aGroup)

var vIndex=0
function animateLine() {
    if (vIndex > 100) vIndex = 0
    aGroup.children.forEach( (el, index) => {
        const v = animateDots[index][vIndex]
        el.position.set(v.x, v.y, v.z)
    })
    vIndex++
    setTimeout(animateLine, 20)
}
animateLine()



/**
 * Lighthouse factories
 */
function createLightMesh( latlngPos, texture, size ) {

    var pos = latlng2xyz(latlngPos.lat, latlngPos.lon, latlngPos.radius + 8*size*.5)

    var plane = new THREE.PlaneBufferGeometry(8*size, 8*size)

    var material = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false
    })
    var mesh = new THREE.Mesh(plane, material)
    
    //var size = radius * 0.02;
    //mesh.scale.set( size, size, size );
    mesh.position.set( pos.x, pos.y, pos.z )
    var coordVec3 = new THREE.Vector3( pos.x, pos.y, pos.z ).normalize()
    var meshNormal = new THREE.Vector3( 0, 1, 0 )
    mesh.quaternion.setFromUnitVectors( meshNormal, coordVec3 )
    return mesh
}

var lightTexture = loader.load('../img/9717559b.png')
const lightGroup = new THREE.Group()
const lightN = lighthouseFactories.length


const lightData = []
for(let i=0; i<lightN; i++){
    lightData.push({
        lat: lighthouseFactories[i].LatLng[0],
        lon: lighthouseFactories[i].LatLng[1],
        radius: 5
    })
}



// const lightData = [...Array(N).keys()].map(() => ({
//   lat: (Math.random() - 0.5) * 180,
//   lon: (Math.random() - 0.5) * 360,
//   radius: 5
//   }))

for (let i=0; i<lightN; i++) {
    var lightMesh = createLightMesh(
        {
            lat: lightData[i].lat,
            lon: lightData[i].lon,
            radius: lightData[i].radius,
        }, 
        lightTexture, 
        .2)
    lightGroup.add(lightMesh)
    var lightMesh2 = lightMesh.clone().rotateY(Math.PI/2)
    lightGroup.add(lightMesh2)

    var lightMarkerMesh = createMarkerMesh(
        {
            lat: lightData[i].lat,
            lon: lightData[i].lon,
            radius: lightData[i].radius,
        },
        markerTexture,
        0.5
    )
    lightGroup.add(lightMarkerMesh)

}
globeGroup.add(lightGroup)


/**
 * From Wiscon to Zhengzhou
 */

// loader.load('./img/9717559b.png', function (texture) {

//     var p1 = new THREE.Vector3( pos.x, pos.y, pos.z );
//     var lightMesh = createLightMesh(p1, texture)
//     var lightMesh2 = lightMesh.clone().rotateY(Math.PI/2)

//     console.log('lightmesh', lightMesh)
//     globeGroup.add( lightMesh );
//     globeGroup.add( lightMesh2 );
    
// })

// line
// 42.680852219878545, -87.92510678932103
// 34.75545623096461, 113.63709797826043


// let lat = 42.680852219878545, lon = -87.92510678932103
// let pos, pos2
// pos = latlng2xyz(lat, lon, radius)
// pos2 = latlng2xyz(34.75545623096461, 113.63709797826043, radius)

// var v0 = new THREE.Vector3( pos.x, pos.y, pos.z )
// var v3 = new THREE.Vector3( pos2.x, pos2.y, pos2.z )
// var alt = 5
// var angle = v0.angleTo(v3)
// var pos3 = latlng2xyz(lat, lon, radius + alt)
// var pos4 = latlng2xyz(34.75545623096461, 113.63709797826043, radius + alt)
// var offset = 0.3
// //console.log(pos3.x * .25)
// // interpolation
// var vpos3 = new THREE.Vector3(pos3.x, pos3.y, pos3.z)
// var vpos4 = new THREE.Vector3(pos4.x, pos4.y, pos4.z)


// norm = vpos3.clone().cross(vpos4.clone())
// console.log('middle', pos3, pos4, vpos3, vpos4)

// norm = norm.normalize()

// var v1 = vpos3.clone().applyAxisAngle(norm, angle*0.25)
// var v2 = vpos3.clone().applyAxisAngle(norm, angle*0.75)

// console.log('angle', v0.angleTo(v3) * 180 / Math.PI)
// const curve = new THREE.CubicBezierCurve3(
// 	v0, // v0 - starting point
// 	v1, //new THREE.Vector3( -5, 15, 0 ), // v1 first control point
// 	v2, //new THREE.Vector3( 20, 15, 0 ), // v2 section control point
// 	v3 // ending point
// );

// const points = curve.getPoints( 50 );
// var geometry = new THREE.BufferGeometry()
// geometry.setFromPoints( points );

// const material = new THREE.LineDashedMaterial( {
// 	color: 0xffff00,
// 	linewidth: 1,
// 	scale: 1,
// 	dashSize: 3,
// 	gapSize: 1,
// } );



/**
 * Helper lines
 */

// const curveObject = new THREE.Line( geometry, material );
// globeGroup.add(curveObject)

// const v0Points = []
// v0Points.push(new THREE.Vector3(0, 0, 0))
// v0Points.push(v0)
// globeGroup.add(new THREE.Line(
//     new THREE.BufferGeometry().setFromPoints(v0Points),
//     new THREE.LineBasicMaterial({
//         color: 0x777777
//     })
// ))
// const v3Points = []
// v3Points.push(new THREE.Vector3(0, 0, 0))
// v3Points.push(v3)
// globeGroup.add(new THREE.Line(
//     new THREE.BufferGeometry().setFromPoints(v3Points),
//     new THREE.LineBasicMaterial({
//         color: 0x777777
//     })
// ))

// const v1Points = []
// v1Points.push(new THREE.Vector3(0, 0, 0))
// v1Points.push(v1)
// console.log('vpos3', vpos3)
// globeGroup.add(new THREE.Line(
//     new THREE.BufferGeometry().setFromPoints(v1Points),
//     new THREE.LineBasicMaterial({
//         color: 0xff0000
//     })
// ))

// const v2Points = []
// v2Points.push(new THREE.Vector3(0, 0, 0))
// v2Points.push(v2)
// globeGroup.add(new THREE.Line(
//     new THREE.BufferGeometry().setFromPoints(v2Points),
//     new THREE.LineBasicMaterial({
//         color: 0x0000ff
//     })
// ))



// animate dots
const animateDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 0.06, 0.06),
    new THREE.MeshPhongMaterial({
        color: '#F8D764'
    })
)

globeGroup.add(animateDot)

// const linePoints = curve.getPoints( 100 );
// var i = 0
// function animateLine() {
    
//     if (i >= linePoints.length) i = 0
//     animateDot.position.set(linePoints[i].x, linePoints[i].y, linePoints[i].z)
//     i++

//     setTimeout( animateLine, 20 );
// }

// animateLine()


/**
 * Responsive
 **/
function onWindowResize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( innerWidth, innerHeight );
    renders();
}

/**
 * render
 */
function renders() {
    renderer.clear();
    renderer.render( scene, camera );
}

// update
if (WaveMeshArr.length) {
    WaveMeshArr.forEach(function(mesh) {
        mesh._s = 0
    })

}
// init mesh._s and mesh.size
function initTimer() {
    if (WaveMeshArr.length) {
        WaveMeshArr.forEach(function (mesh) {
            mesh._s = 1
            mesh.size = 1
        })
    }
}

function animate() {
    window.requestAnimationFrame( () => {
        if (controls) controls.update();
        renders();
        animate();
        // add the wave animation
        if (WaveMeshArr.length) {
            //console.log('here')
            WaveMeshArr.forEach( function ( mesh ) {
                 mesh._s += 0.007;
                 //console.log(mesh._s)
                 mesh.scale.set( mesh.size * mesh._s, mesh.size * mesh._s, mesh.size * mesh._s );
                 //console.log(mesh.size)
                if (mesh._s <= 1.5) {
                   //mesh._s=1，透明度=0 mesh._s=1.5，透明度=1
                  mesh.material.opacity = ( mesh._s - 1 ) * 2;
                } else if (mesh._s > 1.5 && mesh._s <= 2) {
                   //mesh._s=1.5，透明度=1 mesh._s=2，透明度=0
                   mesh.material.opacity = 1 - ( mesh._s - 1.5 ) * 2;
                } else {
                   mesh._s = 1.0;
               }
            } );
        }
        
    } );
}

window.onload = () => {
    initRenderer();
    initCamera();
    initScene();
    initLight();
    initControls();
    initStars();
    initEarth()
    //initSatelite()
    initTimer()
    animate();
    window.addEventListener('resize', onWindowResize, false);
};

