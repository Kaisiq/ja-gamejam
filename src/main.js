import "/src/style.css";
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { createDesk } from "./geometries/createDesk.js";
import { createCagedButton } from "./geometries/createCagedButton.js";
import { createWindow } from "./geometries/createWindow.js";
import { createRoom } from "./geometries/createRoom.js";
import { ModelLoader } from "./ModelLoader.js";
import { createPC } from "./geometries/createPC.js";
import { createKeyboard } from "./geometries/createKeyboard.js";
import { createMouse } from "./geometries/createMouse.js";
import { createDoor } from "./geometries/createDoor.js";
import { createSafe } from "./geometries/createSafe.js";

class Game {
  constructor() {
    this.state = "MENU";
    this.renderer = null;
    this.camera = null;
    this.scene = null;
    this.controls = null;
    this.modelLoader = new ModelLoader();
    this.officeChair = null;

    this.menuElement = document.getElementById("menu");
    this.startMenuElement = document.getElementById("start-menu");
    this.pauseMenuElement = document.getElementById("pause-menu");
    this.startButton = document.getElementById("start-button");
    this.skipIntroCheckbox = document.getElementById("skip-intro-checkbox");
    this.pauseButton = document.getElementById("pause-button");
    this.continueButton = document.getElementById("continue-button");
    this.restartButton = document.getElementById("restart-button");

    this.animate = this.animate.bind(this);
    this.init();
  }

  init() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("app").appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    // Position the camera as if sitting in the chair
    this.camera.position.set(0, 1.6, 1.5);

    // Controls
    this.controls = new PointerLockControls(
      this.camera,
      this.renderer.domElement,
    );
    this.controls.addEventListener("unlock", () => {
      if (this.state === "PLAYING") {
        this.pause();
      }
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 3, 2);
    this.scene.add(pointLight);

    // Event Listeners
    this.startButton.addEventListener("click", () => this.start());
    this.pauseButton.addEventListener("click", () => this.pause());
    this.continueButton.addEventListener("click", () => this.resume());
    this.restartButton.addEventListener("click", () => this.restart());
    window.addEventListener("resize", () => this.onWindowResize());

    // Create Scene
    this.scene.add(createRoom());
    this.scene.add(createDesk());
    this.scene.add(createCagedButton());
    this.scene.add(createWindow());
    this.scene.add(createPC());
    this.scene.add(createKeyboard());
    this.scene.add(createMouse());
    this.scene.add(createDoor());
    this.scene.add(createSafe());

    this.modelLoader
      .load("models/acer_monitor.glb")
      .then((model) => {
        model.scale.set(1, 1, 1);
        model.position.set(-0.4, 1.05, -0.3);
        this.scene.add(model);
      })
      .catch((error) => {
        console.error("Error loading monitor model:", error);
      });

    this.modelLoader
      .load("models/office_chair.glb")
      .then((model) => {
        this.officeChair = model;
        this.officeChair.scale.set(0.8, 0.8, 0.8);
        this.officeChair.rotation.y = Math.PI;
        // Position chair under the camera
        this.officeChair.position.set(
          this.camera.position.x,
          1,
          this.camera.position.z,
        );
        this.scene.add(this.officeChair);
      })
      .catch((error) => {
        console.error("Error loading office_chair model:", error);
      });

    this.animate();
  }

  start() {
    this.state = "PLAYING";
    this.menuElement.classList.add("hidden");
    this.pauseButton.classList.remove("hidden");
    this.controls.lock();

    const skipIntro = this.skipIntroCheckbox.checked;
    if (skipIntro) {
      console.log("Starting game without introduction.");
    } else {
      console.log("Starting game with introduction.");
    }
  }

  pause() {
    if (this.state === "PAUSED") return;
    this.state = "PAUSED";
    this.menuElement.classList.remove("hidden");
    this.startMenuElement.classList.add("hidden");
    this.pauseMenuElement.classList.remove("hidden");
    this.pauseButton.classList.add("hidden");
    this.controls.unlock();
  }

  resume() {
    this.state = "PLAYING";
    this.menuElement.classList.add("hidden");
    this.pauseButton.classList.remove("hidden");
    this.controls.lock();
  }

  restart() {
    window.location.reload();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (this.state === "PLAYING") {
      if (this.officeChair) {
        // Make the chair follow the camera's rotation with a 180-degree offset
        this.officeChair.rotation.y = this.camera.rotation.y + Math.PI;
      }
    }
    this.renderer.render(this.scene, this.camera);
  }
}

new Game();
