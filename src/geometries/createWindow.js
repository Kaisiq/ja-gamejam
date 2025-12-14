import * as THREE from 'three';

export function createWindow() {
  const windowGroup = new THREE.Group();

  const glassGeometry = new THREE.PlaneGeometry(3.8, 1.8);
  const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x87CEEB,
    transparent: true,
    opacity: 0.5,
  });
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);
  windowGroup.add(glass);

  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
  const horizontalFrameGeometry = new THREE.BoxGeometry(4, 0.1, 0.1);
  const verticalFrameGeometry = new THREE.BoxGeometry(0.1, 2, 0.1);

  const topFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
  topFrame.position.y = 0.95;
  windowGroup.add(topFrame);

  const bottomFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
  bottomFrame.position.y = -0.95;
  windowGroup.add(bottomFrame);

  const leftFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
  leftFrame.position.x = -1.95;
  windowGroup.add(leftFrame);

  const rightFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
  rightFrame.position.x = 1.95;
  windowGroup.add(rightFrame);

  windowGroup.position.set(0, 2, -2);

  return windowGroup;
}
