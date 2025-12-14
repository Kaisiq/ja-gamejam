import * as THREE from 'three';

export function createPC() {
  const pc = new THREE.Group();

  const caseGeometry = new THREE.BoxGeometry(0.25, 0.6, 0.5);
  const caseMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const pcCase = new THREE.Mesh(caseGeometry, caseMaterial);
  pc.add(pcCase);

  const ventGeometry = new THREE.PlaneGeometry(0.18, 0.4);
  const ventMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
  const vent = new THREE.Mesh(ventGeometry, ventMaterial);
  vent.position.set(0, 0, 0.251);
  pc.add(vent);

  const powerButtonGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.01, 16);
  const powerButtonMaterial = new THREE.MeshStandardMaterial({ color: 0x00aaff });
  const powerButton = new THREE.Mesh(powerButtonGeometry, powerButtonMaterial);
  powerButton.position.set(0, 0.25, 0.251);
  powerButton.rotation.x = Math.PI / 2;
  pc.add(powerButton);

  pc.position.set(0.8, 0.3, -0.2);

  return pc;
}
