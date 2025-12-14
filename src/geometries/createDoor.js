import * as THREE from 'three';

export function createDoor() {
  const doorGroup = new THREE.Group();

  const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
  const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x6F4E37 });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  doorGroup.add(door);

  const handleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const handleMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.set(-0.4, 0, 0.06);
  doorGroup.add(handle);

  doorGroup.position.set(3, 1, -4.9);

  return doorGroup;
}
