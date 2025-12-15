export class PuzzleManager {
  constructor(uiManager, scene, interactableObjects) {
    this.uiManager = uiManager;
    this.scene = scene;
    this.interactableObjects = interactableObjects;
    this.combinationCode = this.generateCode();
    this.playerInput = "";
    this.hasKey = false;
    this.riddle = "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?";
    this.riddleAnswer = "map";
  }

  checkPassword(password) {
    if (password.toLowerCase() === this.riddleAnswer) {
      this.uiManager.showInteractionMessage(
        `Correct! The combination is ${this.combinationCode}`,
      );
      this.uiManager.hidePasswordUI();
    } else {
      this.uiManager.showInteractionMessage("Wrong password.");
      setTimeout(() => {
        this.uiManager.hideInteractionMessage();
      }, 2000);
    }
  }

  pickUpKey() {
    this.hasKey = true;
    console.log("Key picked up");
  }

  generateCode() {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("Combination code:", code); // For debugging
    return code;
  }

  inputDigit(digit) {
    this.playerInput += digit;
    this.uiManager.updateCombinationLockDisplay(this.playerInput);
    if (this.playerInput.length >= this.combinationCode.length) {
      if (this.playerInput === this.combinationCode) {
        this.unlock();
      } else {
        this.resetInput();
      }
    }
  }

  resetInput() {
    this.playerInput = "";
    this.uiManager.updateCombinationLockDisplay(this.playerInput);
  }

  unlock() {
    console.log("Unlocked!");
    this.uiManager.hideCombinationLock();
    const lock = this.scene.getObjectByName("Combination Lock");
    if (lock) {
      this.scene.remove(lock);
      const index = this.interactableObjects.indexOf(lock);
      if (index > -1) {
        this.interactableObjects.splice(index, 1);
      }
    }
  }
}