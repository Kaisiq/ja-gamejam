import * as THREE from "three";

export function createKey() {
  const keyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 1,
    roughness: 0.5,
  });
  const keyShape = new THREE.Shape();
  keyShape.moveTo(0, 0);
  keyShape.lineTo(0.1, 0);
  keyShape.lineTo(0.1, 0.02);
  keyShape.lineTo(0.2, 0.02);
  keyShape.lineTo(0.2, 0);
  keyShape.lineTo(0.3, 0);
  keyShape.lineTo(0.3, 0.1);
  keyShape.lineTo(0, 0.1);
  keyShape.lineTo(0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: 0.02,
    bevelEnabled: false,
  };

  const keyGeometry = new THREE.ExtrudeGeometry(keyShape, extrudeSettings);
  const key = new THREE.Mesh(keyGeometry, keyMaterial);
  key.name = "Key";
  return key;
}
