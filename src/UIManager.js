export class UIManager {
  constructor(game) {
    this.game = game;

    this.menuElement = document.getElementById("menu");
    this.startMenuElement = document.getElementById("start-menu");
    this.pauseMenuElement = document.getElementById("pause-menu");
    this.startButton = document.getElementById("start-button");
    this.skipIntroCheckbox = document.getElementById("skip-intro-checkbox");
    this.pauseButton = document.getElementById("pause-button");
    this.continueButton = document.getElementById("continue-button");
    this.restartButton = document.getElementById("restart-button");
    this.interactionMessage = document.getElementById("interaction-message");
    this.combinationLockUI = document.getElementById("combination-lock-ui");
    this.combinationLockDisplay = document.getElementById(
      "combination-lock-display",
    );
    this.combinationLockKeypad = document.getElementById(
      "combination-lock-keypad",
    );
    this.passwordUI = document.getElementById("password-ui");
    this.passwordInput = document.getElementById("password-input");
    this.passwordSubmit = document.getElementById("password-submit");

    this.init();
  }

  init() {
    this.startButton.addEventListener("click", () => this.game.start());
    this.pauseButton.addEventListener("click", () => this.game.pause());
    this.continueButton.addEventListener("click", () => this.game.resume());
    this.restartButton.addEventListener("click", () => this.game.restart());
    this.combinationLockKeypad.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        this.game.puzzleManager.inputDigit(event.target.textContent);
      }
    });
    this.passwordSubmit.addEventListener("click", () => {
      this.game.puzzleManager.checkPassword(this.passwordInput.value);
    });
  }

  showPasswordUI() {
    this.passwordUI.classList.remove("hidden");
  }

  hidePasswordUI() {
    this.passwordUI.classList.add("hidden");
  }

  showPauseMenu() {
    this.menuElement.classList.remove("hidden");
    this.startMenuElement.classList.add("hidden");
    this.pauseMenuElement.classList.remove("hidden");
    this.pauseButton.classList.add("hidden");
  }

  hideMenu() {
    this.menuElement.classList.add("hidden");
    this.pauseButton.classList.remove("hidden");
  }

  isSkipIntroChecked() {
    return this.skipIntroCheckbox.checked;
  }

  showInteractionMessage(message) {
    this.interactionMessage.textContent = message;
    this.interactionMessage.classList.remove("hidden");
  }

  hideInteractionMessage() {
    this.interactionMessage.classList.add("hidden");
  }

  showCombinationLock() {
    this.combinationLockUI.classList.remove("hidden");
  }

  hideCombinationLock() {
    this.combinationLockUI.classList.add("hidden");
  }

  updateCombinationLockDisplay(text) {
    this.combinationLockDisplay.textContent = text;
  }
}
