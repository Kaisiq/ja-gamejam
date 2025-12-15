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
    this.debugMode = false;

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
      this.sceneManager,
    );

    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    this.init();

    window.addEventListener("keydown", (event) => {
      if (event.key === "d") {
        this.debugMode = !this.debugMode;
        this.sceneManager.toggleDebugHelpers(this.debugMode);
      }
    });
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
      0.5,
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
    this.interactionManager.pause();
  }

  resume() {
    this.state = "PLAYING";
    this.uiManager.hideMenu();
    this.camera.aControls.lock();
    this.interactionManager.resume();
  }

  restart() {
    window.location.reload();
  }

  animate() {
    requestAnimationFrame(this.animate);
    const deltaTime = this.clock.getDelta();

    if (this.state === "PLAYING") {
      if (this.officeChair) {
        const cameraDirection = new THREE.Vector3();
        this.camera.aCamera.getWorldDirection(cameraDirection);
        const angle = Math.atan2(cameraDirection.x, cameraDirection.z);
        this.officeChair.rotation.y = angle;
      }
      this.interactionManager.update();
      this.sceneManager.update(deltaTime);
    }
    this.renderer.aRenderer.render(this.scene, this.camera.aCamera);
  }
}
