
# Stream Of Quality (SOQ) - 3 Dimension

This project uses vanila js and light weight three js to load model 3 dimension model(s) of manufacture line.
improve version includes motion caption of 3d charactors
## Motivation

This project will allow one get basic information from production line (in 3D). As well as display the action of 
an employee will be doing.

## Code Style

This project uses both Object Oriented Programming (OOP) and Functional Programming to organized unit codes

## webserver should look like

![App Screenshot](examples/lookLike.png)


## Build Structure

```
.
├── README.md
├── build
│   └── main.min.js
├── dist
│   ├── GLBModels
│   │   ├── cartStacker.glb
│   │   ├── dracoAOI.glb
│   │   ├── dracoConveyorV2.glb
│   │   ├── dracoFanDim.glb
│   │   ├── dracoLeftLoader.glb
│   │   ├── dracoLoader.glb
│   │   └── dracoManaulConveyorV2.glb
│   ├── assets
│   │   ├── favicon.17e50649.svg
│   │   ├── index.cc12f24a.js
│   │   ├── index.e3fc458e.css
│   │   └── vendor.43338a04.js
│   ├── index.html
│   ├── screenBackground
│   │   ├── floorMetal.jpeg
│   │   └── metalMapping.jpeg
│   └── static
│       ├── draco_decoder.js
│       ├── draco_decoder.wasm
│       ├── draco_encoder.js
│       └── draco_wasm_wrapper.js
├── examples
│   └── lookLike.png
├── favicon.svg
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── GLBModels
│   │   ├── EmployeePoses
│   │   │   ├── carryingPoseDraco.glb
│   │   │   ├── compressWalkingAnimation.glb
│   │   │   ├── grabPoseDraco.glb
│   │   │   ├── walkingAnimation.glb
│   │   │   ├── walkingAnimationV2.glb
│   │   │   └── workingPoseDraco.glb
│   │   ├── Machines
│   │   │   ├── cartStacker.glb
│   │   │   ├── dracoAOI.glb
│   │   │   ├── dracoConveyorV2.glb
│   │   │   ├── dracoFanDim.glb
│   │   │   ├── dracoLeftLoader.glb
│   │   │   ├── dracoLoader.glb
│   │   │   └── dracoManaulConveyorV2.glb
│   │   └── dracoPerson.glb
│   ├── screenBackground
│   │   ├── floorMetal.jpeg
│   │   └── metalMapping.jpeg
│   └── static
│       ├── draco_decoder.js
│       ├── draco_decoder.wasm
│       ├── draco_encoder.js
│       └── draco_wasm_wrapper.js
├── rollup.config.js
├── src
│   ├── Display.js
│   ├── PlatForms
│   │   ├── components
│   │   │   ├── CreatePlanets.js
│   │   │   ├── camera.js
│   │   │   ├── light.js
│   │   │   └── scene.js
│   │   ├── models
│   │   │   ├── model.js
│   │   │   ├── plane.js
│   │   │   └── setUp.js
│   │   └── systemControls
│   │       ├── Control.js
│   │       ├── Loop.js
│   │       ├── Renderer.js
│   │       └── Resizer.js
│   └── main.js
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
- npm run dev for running the development environment
    
## Git help

 - [More git commands](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)

## Sources

- [TechBackground](https://www.shutterstock.com/search/hi+tech+show)
- [THREE JS](https://threejs.org/)
- [dat gui](https://github.com/dataarts/dat.gui)
- [three js textBook and codes examples](https://discoverthreejs.com/book/first-steps/load-models/)