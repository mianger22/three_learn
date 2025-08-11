import * as THREE from 'three';

export default function creating_door(house) {
  const doorGeometry = new THREE.PlaneGeometry(1, 1.3);
  const doorMesh = new THREE.Mesh(doorGeometry, new THREE.MeshBasicMaterial({ color: 'pink' }));

  doorMesh.position.z = 2 + 0.01;

  house.add(doorMesh);
}