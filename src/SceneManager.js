import * as THREE from "three";
import { ModelLoader } from "./ModelLoader.js";
import { createRoom } from "./geometries/createRoom.js";
import { createDesk } from "./geometries/createDesk.js";
import { createCagedButton } from "./geometries/createCagedButton.js";
import { createWindow } from "./geometries/createWindow.js";
import { createPC } from "./geometries/createPC.js";
import { createKeyboard } from "./geometries/createKeyboard.js";
import { createMouse } from "./geometries/createMouse.js";
import { createDoor } from "./geometries/createDoor.js";
import { createSafe } from "./geometries/createSafe.js";

export class SceneManager {
  constructor(scene) {
    this.scene = scene;
    this.modelLoader = new ModelLoader();
  }

  createScene() {
    this.scene.add(createRoom());
    this.scene.add(createDesk());
    this.scene.add(createCagedButton());
    this.scene.add(createWindow());
    this.scene.add(createPC());
    this.scene.add(createKeyboard());
    this.scene.add(createMouse());
    this.scene.add(createDoor());
    this.scene.add(createSafe());

    this.loadModels();
  }

  loadModels() {
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

    return this.modelLoader
      .load("models/office_chair.glb")
      .then((model) => {
        model.scale.set(0.8, 0.8, 0.8);
        model.rotation.y = Math.PI;
        return model;
      })
      .catch((error) => {
        console.error("Error loading office_chair model:", error);
        return null;
      });
  }
}
