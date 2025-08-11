import * as THREE from 'three';

export default function creating_lawn(house) {
  const lawnGeometry = new THREE.BoxGeometry(6.5, 0.2, 7.5);
  const lawnMesh = new THREE.Mesh(lawnGeometry, new THREE.MeshBasicMaterial({ color: 'green' }));
  
  lawnMesh.position.y = -1;
  house.add(lawnMesh);
}