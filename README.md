
# Stream Of Quality (SOQ) - 3 Dimension

This project uses vanila js and three js to model 3 dimension model(s) of manufacture line.


## Three js and dat

 - [THREE JS](https://threejs.org/)
 - [dat gui](https://github.com/dataarts/dat.gui)


## Motivation

This project will allow one to have an idea of the manufacture line is look like (in 3D view)

## Code Style

This project uses none Object Oriented Programming (OOP). 
Rather, it uses basic Functional Programming

## webserver should look like

![App Screenshot](examples/lambo_codes.png)


## Build Structure

```
.
├── README.md
├── examples
│   └── lambo_codes.png
├── favicon.svg
├── index.html
├── main.js
├── models
│   ├── Flamingo.glb
│   ├── license.txt
│   ├── model.gltf
│   ├── scene.bin
│   ├── screenBackground
│   │   ├── NormalMap.png
│   │   └── techBackground.jpg
│   └── textures
│       ├── CENTENARIO_baseColor.jpeg
│       ├── CRBN_JANTE_baseColor.jpeg
│       ├── CUIR.001_baseColor.jpeg
│       ├── Material.003_baseColor.jpeg
│       ├── PLAS_baseColor.jpeg
│       └── material_0_baseColor.jpeg
├── package-lock.json
├── package.json
├── src
│   ├── light.js
│   └── plane.js
└── style.css

```
## Environment setup

Install <my-project> with npm

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
    
## Git help

 - [More git commands](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)

## Source

- [TechBackground](https://www.shutterstock.com/search/hi+tech+show)