import * as THREE from "three";
import { UIManager } from "./UIManager.js";
import { SceneManager } from "./SceneManager.js";
import { Lights } from "./Lights.js";
import { Camera } from "./Camera.js";
import { Renderer } from "./Renderer.js";
import { InteractionManager } from "./InteractionManager.js";
import { PuzzleManager } from "./PuzzleManager.js";

export class Game {
  constructor() {
    this.state = "MENU";
    this.officeChair = null;

    this.renderer = new Renderer();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    this.camera = new Camera(this.renderer.aRenderer, this);
    this.uiManager = new UIManager(this);
    this.sceneManager = new SceneManager(this.scene);
    this.lights = new Lights(this.scene);
    this.puzzleManager = new PuzzleManager(this.uiManager, this.scene);
    this.interactionManager = new InteractionManager(
      this.camera.aCamera,
      this.scene,
      this.uiManager,
      this.puzzleManager,
    );

    this.animate = this.animate.bind(this);
    this.init();
  }

  async init() {
    this.lights.createLights();

    this.sceneManager.createScene();
    const { officeChair, interactableObjects } =
      await this.sceneManager.loadModels();
    this.officeChair = officeChair;
    this.officeChair.position.set(
      this.camera.aCamera.position.x,
      1,
      this.camera.aCamera.position.z,
    );
    this.scene.add(this.officeChair);
    this.interactionManager.interactableObjects = interactableObjects;
    this.puzzleManager.interactableObjects = interactableObjects;
    this.animate();
  }

  start() {
    this.state = "PLAYING";
    this.uiManager.hideMenu();
    this.camera.aControls.lock();

    const skipIntro = this.uiManager.isSkipIntroChecked();
    if (skipIntro) {
      console.log("Starting game without introduction.");
    } else {
      console.log("Starting game with introduction.");
    }
  }

  pause() {
    if (this.state === "PAUSED") return;
    this.state = "PAUSED";
    this.uiManager.showPauseMenu();
    this.camera.aControls.unlock();
  }

  resume() {
    this.state = "PLAYING";
    this.uiManager.hideMenu();
    this.camera.aControls.lock();
  }

  restart() {
    window.location.reload();
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (this.state === "PLAYING") {
      if (this.officeChair) {
        // Make the chair follow the camera's rotation with a 180-degree offset
        this.officeChair.rotation.y = this.camera.aCamera.rotation.y + Math.PI;
      }
      this.interactionManager.update();
    }
    this.renderer.aRenderer.render(this.scene, this.camera.aCamera);
  }
}
