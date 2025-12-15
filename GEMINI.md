# GEMINI Project Guide

This document provides an overview of the project structure and how to get started with "The Final Button".

## Project Overview

"The Final Button" is a 3D puzzle game where you play as a villain trying to end the world. The game is built with vanilla JavaScript and Three.js.

## Project Structure

*   `index.html`: The main HTML file.
*   `style.css`: The main stylesheet.
*   `src/main.js`: The main entry point for the game.
*   `plan.md`: The development plan.
*   `idea.md`: The game idea and puzzle concepts.
*   `GEMINI.md`: This file.
*   `package.json`: Project dependencies and scripts.
*   `node_modules/`: Directory where project dependencies are stored.
*   `public/`: Directory for static assets like models and music.

### `src` Directory

*   `main.js`: Initializes the `Game` class.
*   `Game.js`: The core of the game, managing state, the game loop, and all the managers.
*   `SceneManager.js`: Manages the Three.js scene, including loading models and creating objects.
*   `InteractionManager.js`: Handles player interaction with objects in the scene using raycasting.
*   `PuzzleManager.js`: Manages the logic for the combination lock puzzle.
*   `UIManager.js`: Manages all UI elements, including menus, messages, and the combination lock UI.
*   `Camera.js`: Manages the game's camera.
*   `Lights.js`: Manages the lighting in the scene.
*   `Renderer.js`: Manages the Three.js renderer.
*   `geometries/`: Contains modules for creating simple procedural geometries.

## Architecture Overview

The game follows a simple manager pattern. The `Game` class is the central hub, creating and holding references to all the other manager classes.

*   **`Game.js`**: The main game class. It initializes everything, and runs the main game loop.
*   **`SceneManager.js`**: Takes care of everything inside the Three.js scene. It loads all the 3D models and arranges them.
*   **`InteractionManager.js`**: This class uses raycasting to figure out what the player is looking at. It shows interaction messages and handles clicks on objects.
*   **`PuzzleManager.js`**: This class holds the logic for the puzzles. For now, it manages the combination lock puzzle.
*   **`UIManager.js`**: This class controls everything the player sees that isn't part of the 3D scene. This includes menus, buttons, and the UI for the combination lock.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

## Dependencies

*   [Vite](https://vitejs.dev/): A fast build tool and development server.
*   [Three.js](https://threejs.org/): A 3D graphics library for JavaScript.

## Important Notes

* Never run the project. Always instruct the user to run it themselves. You can only lint and build to see for errors. Do that only when prompted
