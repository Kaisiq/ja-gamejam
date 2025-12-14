import * as THREE from 'three';

export function createKeyboard() {
  const keyboard = new THREE.Group();

  const baseGeometry = new THREE.BoxGeometry(0.7, 0.02, 0.2);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  keyboard.add(base);

  const keyMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
  const keyGeometry = new THREE.BoxGeometry(0.04, 0.02, 0.04);

  const numKeysX = 14;
  const numKeysZ = 5;
  const keySpacingX = 0.05;
  const keySpacingZ = 0.05;

  for (let i = 0; i < numKeysX; i++) {
    for (let j = 0; j < numKeysZ; j++) {
      const key = new THREE.Mesh(keyGeometry, keyMaterial);
      key.position.set(
        (i - (numKeysX - 1) / 2) * keySpacingX,
        0.02,
        (j - (numKeysZ - 1) / 2) * keySpacingZ
      );
      keyboard.add(key);
    }
  }

  keyboard.position.set(0, 1.06, 0.2);
  return keyboard;
}
