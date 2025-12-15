import * as THREE from "three";

export class Lights {
  constructor(scene) {
    this.scene = scene;
  }

  createLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 3, 2);
    this.scene.add(pointLight);
  }
}
