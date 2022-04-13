import { Scene, Color, Fog} from "three";

export function createScene(){
    const scene = new Scene()
    // scene.background = new Color("rgb(201, 242, 235)")
    scene.background = new Color(0x111111)
    scene.fog = new Fog( scene.background, 1, 5000 );

    return scene
}