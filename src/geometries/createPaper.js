import * as THREE from "three";

export function createPaper() {
  const paperMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const paperGeometry = new THREE.PlaneGeometry(0.2, 0.15);
  const paper = new THREE.Mesh(paperGeometry, paperMaterial);
  paper.name = "Paper";
  return paper;
}
