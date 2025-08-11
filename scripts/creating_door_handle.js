import * as THREE from 'three';

export default function creating_door_handle(house) {
  const doorHandleGeometry = new THREE.CircleGeometry(0.05);
  const doorHandleMesh = new THREE.Mesh(doorHandleGeometry, new THREE.MeshBasicMaterial({ color: 'black' }));

  doorHandleMesh.position.set(-0.23, 0, 2 + 0.02);

  house.add(doorHandleMesh);
};