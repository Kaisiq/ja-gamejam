import * as THREE from "three";

export class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("app").appendChild(this.renderer.domElement);

    window.addEventListener("resize", () => this.onWindowResize());
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  get aRenderer() {
    return this.renderer;
  }
}
