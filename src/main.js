import '/src/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createDesk } from './geometries/createDesk.js';
import { createCagedButton } from './geometries/createCagedButton.js';
import { createWindow } from './geometries/createWindow.js';
import { createRoom } from './geometries/createRoom.js';

class Game {
  constructor() {
    this.renderer = null;
    this.camera = null;
    this.scene = null;
    this.controls = null;

    this.menuElement = document.getElementById('menu');
    this.startButton = document.getElementById('start-button');
    this.skipIntroCheckbox = document.getElementById('skip-intro-checkbox');

    this.init();
    this.animate = this.animate.bind(this);
  }

  init() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('app').appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 1.6, 1.5);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1, 0);
    this.controls.enableDamping = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 3, 2);
    this.scene.add(pointLight);

    // Event Listeners
    this.startButton.addEventListener('click', () => this.start());
    window.addEventListener('resize', () => this.onWindowResize());

    // Create Scene
    const room = createRoom();
    this.scene.add(room);

    const desk = createDesk();
    this.scene.add(desk);

    const cagedButton = createCagedButton();
    this.scene.add(cagedButton);

    const gameWindow = createWindow();
    this.scene.add(gameWindow);

    this.animate();
  }

  start() {
    this.menuElement.classList.add('hidden');
    const skipIntro = this.skipIntroCheckbox.checked;

    if (skipIntro) {
      // Start timer immediately
      console.log('Starting game without introduction.');
    } else {
      // Start introduction
      console.log('Starting game with introduction.');
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

new Game();