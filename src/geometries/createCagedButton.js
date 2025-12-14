import * as THREE from 'three';

export function createCagedButton() {
  const cagedButton = new THREE.Group();

  // The big red button
  const buttonGroup = new THREE.Group();
  const buttonBaseGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.08, 32);
  const buttonBaseMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
  const buttonBase = new THREE.Mesh(buttonBaseGeo, buttonBaseMat);
  buttonGroup.add(buttonBase);

  const buttonTopGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 32);
  const buttonTopMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0x550000 });
  const buttonTop = new THREE.Mesh(buttonTopGeo, buttonTopMat);
  buttonTop.position.y = 0.06;
  buttonGroup.add(buttonTop);
  
  buttonGroup.position.y = 1.05;
  cagedButton.add(buttonGroup);

  // The cage
  const cage = new THREE.Group();
  const barMaterial = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.8, roughness: 0.2 });
  const ringGeo = new THREE.TorusGeometry(0.25, 0.01, 16, 100);
  
  const topRing = new THREE.Mesh(ringGeo, barMaterial);
  topRing.position.y = 1.4;
  topRing.rotation.x = Math.PI / 2;
  cage.add(topRing);

  const bottomRing = new THREE.Mesh(ringGeo, barMaterial);
  bottomRing.position.y = 1.1;
  bottomRing.rotation.x = Math.PI / 2;
  cage.add(bottomRing);

  const barGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.3, 16);
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const bar = new THREE.Mesh(barGeo, barMaterial);
    bar.position.set(Math.cos(angle) * 0.25, 1.25, Math.sin(angle) * 0.25);
    cage.add(bar);
  }

  cagedButton.add(cage);

  return cagedButton;
}
