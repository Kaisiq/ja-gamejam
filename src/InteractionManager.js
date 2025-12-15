import * as THREE from "three";

export class InteractionManager {
  constructor(camera, scene, uiManager, puzzleManager) {
    this.camera = camera;
    this.scene = scene;
    this.uiManager = uiManager;
    this.puzzleManager = puzzleManager;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.interactableObjects = [];
    this.intersectedObject = null;
    this.audio = new Audio("../models/music.mp3");

    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.addEventListener("click", this.onClick.bind(this), false);
  }

  onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onClick() {
    if (this.intersectedObject) {
      const interactableParent = this.getInteractableParent(
        this.intersectedObject.object,
      );
      if (interactableParent) {
        const objectName = interactableParent.name;
        console.log("Clicked on:", objectName);

        if (objectName === "Alexa") {
          if (this.audio.paused) {
            this.audio.play();
          } else {
            this.audio.pause();
          }
        } else if (objectName === "Combination Lock") {
          this.uiManager.showCombinationLock();
        } else if (objectName === "Monitor") {
          this.uiManager.showInteractionMessage(
            `The code is ${this.puzzleManager.combinationCode}`,
          );
          setTimeout(() => {
            this.uiManager.hideInteractionMessage();
          }, 3000);
        }
      }
    }
  }

  update() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.interactableObjects,
      true,
    );

    if (intersects.length > 0) {
      const interactableParent = this.getInteractableParent(
        intersects[0].object,
      );
      if (interactableParent) {
        if (this.intersectedObject !== interactableParent) {
          this.intersectedObject = intersects[0];
          this.uiManager.showInteractionMessage(
            `Left-click to interact with ${interactableParent.name}`,
          );
        }
      }
    } else {
      if (this.intersectedObject) {
        this.uiManager.hideInteractionMessage();
      }
      this.intersectedObject = null;
    }
  }

  getInteractableParent(object) {
    let parent = object;
    while (parent) {
      if (this.interactableObjects.includes(parent)) {
        return parent;
      }
      parent = parent.parent;
    }
    return null;
  }
}
