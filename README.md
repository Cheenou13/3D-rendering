
# Stream Of Quality (SOQ) - 3 Dimension

This project uses vanila js and light weight three js to load model 3 dimension model(s) of manufacture line.


## Motivation

This project will allow one to have an idea of the manufacture line is look like (in 3D view). the model will be able
to display the current time status or any data directly from the manufacture line

## Code Style

This project uses both Object Oriented Programming (OOP) and Functional Programming to organization unit codes

## webserver should look like

![App Screenshot](examples/UpdatedScreen.png)


## Build Structure

```
.
├── README.md
├── examples
│   ├── UpdatedScreen.png
│   ├── lambo_codes.png
│   └── updatedLambo.png
├── favicon.svg
├── importedModels
│   ├── Flamingo.glb
│   ├── license.txt
│   ├── model.gltf
│   ├── old_oil_tank_.2
│   │   ├── scene.bin
│   │   ├── scene.gltf
│   │   └── textures
│   │       ├── Material_baseColor.jpeg
│   │       ├── Material_metallicRoughness.png
│   │       └── Material_normal.png
│   ├── scene.bin
│   ├── screenBackground
│   │   ├── NormalMap.png
│   │   ├── floorMetal.jpeg
│   │   ├── metalMapping.jpeg
│   │   ├── saturnmap.jpeg
│   │   ├── saturnmap.jpg
│   │   ├── star.png
│   │   └── techBackground.jpg
│   └── textures
│       ├── CENTENARIO_baseColor.jpeg
│       ├── CRBN_JANTE_baseColor.jpeg
│       ├── CUIR.001_baseColor.jpeg
│       ├── Material.003_baseColor.jpeg
│       ├── PLAS_baseColor.jpeg
│       └── material_0_baseColor.jpeg
├── index.html
├── main.js
├── package-lock.json
├── package.json
├── src
│   ├── Display.js
│   ├── TestFile.js
│   ├── cloneMain.js
│   ├── plateForm
│   │   ├── components
│   │   │   ├── CreatePlanets.js
│   │   │   ├── camera.js
│   │   │   ├── light.js
│   │   │   └── scene.js
│   │   ├── models
│   │   │   ├── LineGenerator.js
│   │   │   ├── model.js
│   │   │   ├── plane.js
│   │   │   └── setUp.js
│   │   └── systemControls
│   │       ├── Control.js
│   │       ├── Loop.js
│   │       ├── Renderer.js
│   │       ├── Resizer.js
│   │       └── TransformControl.js
│   ├── shader
│   │   └── VertexShader.glsl
│   └── simpleMain.js
└── style.css


```
## Environment setup with new project
Install with npm

```bash
  npm install @vitejs/app
    - choose vanilla js
    - rename <project-name>
  cd <project-name>
  npm install
  npm run dev
  in <project-name>
    - npm install --save three
    - npm install --save dat
```
## clone repo
```sh
git clone git@gitlab.com:foxconn-iai-soq/soq-3d.git
```
- npm install for dependencies
    
## Git help

 - [More git commands](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)

## Sources

- [TechBackground](https://www.shutterstock.com/search/hi+tech+show)
- [THREE JS](https://threejs.org/)
- [dat gui](https://github.com/dataarts/dat.gui)
- [three js textBook and codes examples](https://discoverthreejs.com/book/first-steps/load-models/)