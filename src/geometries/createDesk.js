import * as THREE from 'three';

export function createDesk() {
  const desk = new THREE.Group();

  const tabletopGeometry = new THREE.BoxGeometry(2, 0.1, 1);
  const tabletopMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const tabletop = new THREE.Mesh(tabletopGeometry, tabletopMaterial);
  tabletop.position.y = 1;

  const legGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

  const leg1 = new THREE.Mesh(legGeometry, legMaterial);
  leg1.position.set(-0.9, 0.5, -0.4);
  const leg2 = new THREE.Mesh(legGeometry, legMaterial);
  leg2.position.set(0.9, 0.5, -0.4);
  const leg3 = new THREE.Mesh(legGeometry, legMaterial);
  leg3.position.set(-0.9, 0.5, 0.4);
  const leg4 = new THREE.Mesh(legGeometry, legMaterial);
  leg4.position.set(0.9, 0.5, 0.4);

  desk.add(tabletop, leg1, leg2, leg3, leg4);

  return desk;
}
