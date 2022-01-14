
export function transform(transformControls){

    window.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
          case 81: // Q
            transformControls.setSpace(transformControls.space === 'local' ? 'world' : 'local')
            break;
    
          case 87: // W
            transformControls.setMode('translate')
            break;
    
          case 69: // E
            transformControls.setMode('rotate')
            break;
    
          case 82: // R
            transformControls.setMode('scale')
            break;
    
    
          case 187:
          case 107: // +, =, num+
            transformControls.setSize(transformControls.size + 0.1)
            break;
    
          case 189:
          case 109:
            transformControls.setSize(Math.max(transformControls.size - 0.1, 0.1))
            break;
    
          case 88: // X
            transformControls.showX = !transformControls.showX
            break;
    
          case 89: // Y
            transformControls.showY = !transformControls.showY
            break;
    
          case 90: // Z
            transformControls.showZ = !transformControls.showZ
            break;
    
          case 32: // spacebar
            transformControls.enabled = transformControls.enabled
            break;
            
          case 27:
            transformControls.reset()
            break;
        }
      })
}