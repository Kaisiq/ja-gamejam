import * as THREE from "three";
import { PointerLockControls } from "./controls/PointerLockControls.js";

export class Camera {
  constructor(renderer, game) {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 1.6, 1.5);

    this.controls = new PointerLockControls(this.camera, renderer.domElement);
    this.controls.addEventListener("unlock", () => {
      if (game.state === "PLAYING") {
        game.pause();
      }
    });

    window.addEventListener("resize", () => this.onWindowResize());
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  get aCamera() {
    return this.camera;
  }

  get aControls() {
    return this.controls;
  }
}
