import * as THREE from 'three';

export function createCagedButton() {
  const cagedButton = new THREE.Group();

  const baseGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = 1.05;
  cagedButton.add(base);

  const buttonGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 32);
  const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
  button.position.y = 1.1;
  cagedButton.add(button);

  const cage = new THREE.Group();
  const barGeometry = new THREE.BoxGeometry(0.02, 0.5, 0.02);
  const barMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.set(Math.cos(angle) * 0.25, 1.3, Math.sin(angle) * 0.25);
    cage.add(bar);
  }

  const topGeometry = new THREE.BoxGeometry(0.6, 0.02, 0.6);
  const top = new THREE.Mesh(topGeometry, barMaterial);
  top.position.y = 1.55;
  cage.add(top);

  cagedButton.add(cage);

  return cagedButton;
}
