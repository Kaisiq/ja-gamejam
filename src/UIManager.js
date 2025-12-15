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

    this.init();
  }

  init() {
    this.startButton.addEventListener("click", () => this.game.start());
    this.pauseButton.addEventListener("click", () => this.game.pause());
    this.continueButton.addEventListener("click", () => this.game.resume());
    this.restartButton.addEventListener("click", () => this.game.restart());
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
}
