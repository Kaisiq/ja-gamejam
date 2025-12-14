import * as THREE from 'three';

export function createMonitor() {
  const monitor = new THREE.Group();

  // Screen
  const screenGeometry = new THREE.BoxGeometry(0.9, 0.5, 0.02);
  const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.set(0, 1.35, -0.3);
  monitor.add(screen);

  // Bezel
  const bezelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const topBezel = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.02, 0.04), bezelMaterial);
  topBezel.position.set(0, 1.61, -0.3);
  monitor.add(topBezel);

  const bottomBezel = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.02, 0.04), bezelMaterial);
  bottomBezel.position.set(0, 1.09, -0.3);
  monitor.add(bottomBezel);

  const leftBezel = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.54, 0.04), bezelMaterial);
  leftBezel.position.set(-0.465, 1.35, -0.3);
  monitor.add(leftBezel);

  const rightBezel = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.54, 0.04), bezelMaterial);
  rightBezel.position.set(0.465, 1.35, -0.3);
  monitor.add(rightBezel);

  // Stand
  const standNeckGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 32);
  const standNeck = new THREE.Mesh(standNeckGeometry, bezelMaterial);
  standNeck.position.set(0, 1.2, -0.3);
  monitor.add(standNeck);

  const standBaseGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 32);
  const standBase = new THREE.Mesh(standBaseGeometry, bezelMaterial);
  standBase.position.set(0, 1.1, -0.3);
  monitor.add(standBase);

  monitor.position.x = -0.4;

  return monitor;
}
