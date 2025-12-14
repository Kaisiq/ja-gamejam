import * as THREE from 'three';

export function createRoom() {
  const room = new THREE.Group();

  const floorGeometry = new THREE.PlaneGeometry(10, 10);
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  room.add(floor);

  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

  const backWallGeometry = new THREE.PlaneGeometry(10, 5);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.set(0, 2.5, -5);
  room.add(backWall);

  const leftWallGeometry = new THREE.PlaneGeometry(10, 5);
  const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-5, 2.5, 0);
  room.add(leftWall);

  const rightWallGeometry = new THREE.PlaneGeometry(10, 5);
  const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(5, 2.5, 0);
  room.add(rightWall);

  return room;
}
