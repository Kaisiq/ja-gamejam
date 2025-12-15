import * as THREE from "three";

export class InteractionManager {
  constructor(camera, scene, uiManager, puzzleManager, sceneManager) {
    this.camera = camera;
    this.scene = scene;
    this.uiManager = uiManager;
    this.puzzleManager = puzzleManager;
    this.sceneManager = sceneManager;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 100;
    this.mouse = new THREE.Vector2();
    this.interactableObjects = [];
    this.intersectedObject = null;
    this.audio = new Audio("../models/music.mp3");

    this._onMouseMove = this._onMouseMove.bind(this);
    this._onClick = this._onClick.bind(this);

    this.resume();
  }

  pause() {
    window.removeEventListener("mousemove", this._onMouseMove, false);
    window.removeEventListener("click", this._onClick, false);
  }

  resume() {
    window.addEventListener("mousemove", this._onMouseMove.bind(this), false);
    window.addEventListener("click", this._onClick.bind(this), false);
  }

  _onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  _onClick() {
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
        } else if (objectName === "Top Drawer") {
          const drawer = this.sceneManager.drawerStates.find(
            (d) => d.mesh === interactableParent,
          );
          if (drawer.isLocked) {
            if (this.puzzleManager.hasKey) {
              drawer.isLocked = false;
              this.sceneManager.toggleDrawer(interactableParent);
            } else {
              this.uiManager.showInteractionMessage("It's locked.");
              setTimeout(() => {
                this.uiManager.hideInteractionMessage();
              }, 2000);
            }
          } else {
            this.sceneManager.toggleDrawer(interactableParent);
          }
        } else if (objectName === "Bottom Drawer") {
          this.sceneManager.toggleDrawer(interactableParent);
                  } else if (objectName === "Key") {
                    this.puzzleManager.pickUpKey();
                    const key = this.scene.getObjectByName("Key");
                    if (key) {
                      this.scene.remove(key);
                      const index = this.interactableObjects.indexOf(key);
                      if (index > -1) {
                        this.interactableObjects.splice(index, 1);
                      }
                    }
                            } else if (objectName === "Paper") {
                              this.uiManager.showInteractionMessage(this.puzzleManager.riddle);
                            } else if (objectName === "Monitor") {
                              this.uiManager.showPasswordUI();
                            }      }
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
