import * as THREE from "three";
import { ModelLoader } from "./ModelLoader.js";
import { createPC } from "./geometries/createPC.js";
import { createKeyboard } from "./geometries/createKeyboard.js";
import { createMouse } from "./geometries/createMouse.js";
import { createDoor } from "./geometries/createDoor.js";
import { createCity } from "./geometries/createCity.js";
import { createKey } from "./geometries/createKey.js";
import { createPaper } from "./geometries/createPaper.js";

export class SceneManager {
  constructor(scene) {
    this.scene = scene;
    this.modelLoader = new ModelLoader();
    this.interactableObjects = [];
    this.debugHelpers = [];
    this.drawerStates = [];
  }

  toggleDebugHelpers(show) {
    if (show && this.debugHelpers.length === 0) {
      this.interactableObjects.forEach((object) => {
        const boxHelper = new THREE.BoxHelper(object, 0x00ff00);
        this.scene.add(boxHelper);
        this.debugHelpers.push(boxHelper);
      });
    } else {
      this.debugHelpers.forEach((helper) => {
        helper.visible = show;
      });
    }
  }

  toggleDrawer(drawerMesh) {
    const drawer = this.drawerStates.find((d) => d.mesh === drawerMesh);
    if (drawer) {
      drawer.isOpen = !drawer.isOpen;
    }
  }

  update(deltaTime) {
    this.drawerStates.forEach((drawer) => {
      const targetPosition = drawer.isOpen
        ? drawer.openPosition
        : drawer.closedPosition;
      drawer.mesh.position.lerp(targetPosition, deltaTime * 5);
    });
  }

  createScene() {
    this.scene.add(createPC());
    this.scene.add(createKeyboard());
    this.scene.add(createMouse());
    this.scene.add(createDoor());
    this.scene.add(createCity());
    const key = createKey();
    key.position.set(0, 0.1, -0.5);
    this.scene.add(key);
    this.interactableObjects.push(key);

    this.loadModels();
  }

  async loadModels() {
    const office = await this.modelLoader
      .load("models/office.glb")
      .catch((error) => {
        console.error("Error loading office model:", error);
      });
    if (office) this.scene.add(office);

    const button = await this.modelLoader
      .load("models/button.glb")
      .catch((error) => {
        console.error("Error loading button model:", error);
      });
    if (button) {
      button.position.set(0, 1, -0.5);
      button.scale.set(0.2, 0.2, 0.2);
      button.name = "Button";
      this.interactableObjects.push(button);
      this.scene.add(button);
    }

    const alexa = await this.modelLoader
      .load("models/alexa_echo_dot.glb")
      .catch((error) => {
        console.error("Error loading alexa model:", error);
      });
    if (alexa) {
      alexa.position.set(0.7, 1.05, -0.4);
      alexa.scale.set(0.125, 0.125, 0.125);
      alexa.name = "Alexa";
      this.interactableObjects.push(alexa);
      this.scene.add(alexa);
    }

    const desk = await this.modelLoader
      .load("models/office_table_desk.glb")
      .catch((error) => {
        console.error("Error loading office_table_desk model:", error);
      });
    if (desk) {
      desk.position.set(0, 0, -1);
      this.scene.add(desk);

      const topDrawer = desk.getObjectByName("top_drawer");
      if (topDrawer) {
        topDrawer.name = "Top Drawer";
        this.interactableObjects.push(topDrawer);
        this.drawerStates.push({
          mesh: topDrawer,
          isOpen: false,
          isLocked: true,
          openPosition: new THREE.Vector3(0, 0, 0.5),
          closedPosition: topDrawer.position.clone(),
        });

        const paper = createPaper();
        paper.position.set(0, 0.01, 0.2);
        topDrawer.add(paper);
        this.interactableObjects.push(paper);
      }

      const bottomDrawer = desk.getObjectByName("bottom_drawer");
      if (bottomDrawer) {
        bottomDrawer.name = "Bottom Drawer";
        this.interactableObjects.push(bottomDrawer);
        this.drawerStates.push({
          mesh: bottomDrawer,
          isOpen: false,
          isLocked: false,
          openPosition: new THREE.Vector3(0, 0, 0.5),
          closedPosition: bottomDrawer.position.clone(),
        });
      }
    }

    const monitor = await this.modelLoader
      .load("models/acer_monitor.glb")
      .catch((error) => {
        console.error("Error loading monitor model:", error);
      });
    if (monitor) {
      monitor.scale.set(1, 1, 1);
      monitor.position.set(-0.4, 1.05, -0.3);
      monitor.name = "Monitor";
      this.interactableObjects.push(monitor);
      this.scene.add(monitor);
    }

    const combinationLock = await this.modelLoader
      .load("models/combination_lock.glb")
      .catch((error) => {
        console.error("Error loading combination_lock model:", error);
      });
    if (combinationLock) {
      combinationLock.position.set(0, 1, -0.4);
      combinationLock.name = "Combination Lock";
      this.interactableObjects.push(combinationLock);
      this.scene.add(combinationLock);
    }

    const officeChair = await this.modelLoader
      .load("models/office_chair.glb")
      .catch((error) => {
        console.error("Error loading office_chair model:", error);
        return null;
      });
    if (officeChair) {
      officeChair.scale.set(0.8, 0.8, 0.8);
      officeChair.rotation.y = Math.PI;
    }

    return { officeChair, interactableObjects: this.interactableObjects };
  }
}
