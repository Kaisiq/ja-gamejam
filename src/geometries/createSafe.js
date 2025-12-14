import * as THREE from 'three';

export function createSafe() {
  const safe = new THREE.Group();

  const caseGeometry = new THREE.BoxGeometry(0.8, 1, 0.6);
  const caseMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
  const safeCase = new THREE.Mesh(caseGeometry, caseMaterial);
  safe.add(safeCase);

  const dialGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 32);
  const dialMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
  const dial = new THREE.Mesh(dialGeometry, dialMaterial);
  dial.position.set(0, 0.2, 0.31);
  dial.rotation.x = Math.PI / 2;
  safe.add(dial);

  const handleGeometry = new THREE.BoxGeometry(0.05, 0.2, 0.05);
  const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.set(0, -0.2, 0.31);
  safe.add(handle);

  safe.position.set(-2, 0.5, -4.5);

  return safe;
}
