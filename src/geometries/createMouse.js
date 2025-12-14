import * as THREE from 'three';

export function createMouse() {
  const mouse = new THREE.Group();

  const bodyGeometry = new THREE.CapsuleGeometry(0.04, 0.08, 4, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.rotation.x = -Math.PI / 2;
  body.scale.set(1, 1, 0.5);
  mouse.add(body);

  const wheelGeometry = new THREE.BoxGeometry(0.01, 0.02, 0.01);
  const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheel.position.y = 0.04;
  mouse.add(wheel);

  mouse.position.set(0.45, 1.06, 0.2);
  return mouse;
}
