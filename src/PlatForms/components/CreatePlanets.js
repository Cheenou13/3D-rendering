import * as THREE from 'three'


export function saturn (){

    const saturn = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1.5, 50, 50),
        new THREE.MeshPhongMaterial({
          map: new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnSurface.jpg'),
        })
      )
      
      const rings = new THREE.Mesh (
        new THREE.RingGeometry(3, 5, 64),
        new THREE.MeshPhongMaterial({
          map: new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/saturnRings.png'),
          side: THREE.DoubleSide,
          transparent: true
        })
      )
    
      rings.rotation.x = Math.PI/2
    
      const pos = rings.geometry.attributes.position
      const v3 = new THREE.Vector3()
    
      for (let index = 0; index < pos.count; index++) {
        v3.fromBufferAttribute(pos, index)
        rings.geometry.attributes.uv.setXY(index, v3.length() < 4 ? 0 : 1, 1)
        
      }


      saturn.position.set(-20, 5, 0)
      rings.position.set(-20, 5, 0)
      const planet = new THREE.Group()
      planet.add(saturn, rings)

      return planet
}

export function stars (){

    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7
    })
  
    const stars = new THREE.Points(starGeometry, starMaterial)
    const starVertices = []
  
    for (let index = 0; index < 10000; index++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() -0.5)* 3000
      starVertices.push(x, y, z)
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute (starVertices, 3))

    return stars
}