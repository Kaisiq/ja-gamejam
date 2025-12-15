import * as THREE from "three";

export function createCity() {
  const canvas = document.createElement("canvas");
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  // Draw night sky
  context.fillStyle = "#1a1a2a";
  context.fillRect(0, 0, size, size);

  // Draw stars
  context.fillStyle = "white";
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size * 0.7; // Only in the upper part
    const radius = Math.random() * 0.5;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  // Draw simple buildings
  context.fillStyle = "#0a0a1a";
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * size;
    const w = Math.random() * 30 + 10;
    const h = Math.random() * 100 + 50;
    const y = size - h;
    context.fillRect(x, y, w, h);
  }

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(10, 5);
  const plane = new THREE.Mesh(geometry, material);

  plane.position.set(0, 2.5, -5); // Position it behind the office cutout

  return plane;
}
