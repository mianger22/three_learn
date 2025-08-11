import * as THREE from 'three';

export default function creating_roof(house, show_me_ribs) {
  const roofGeometry = new THREE.ConeGeometry(3.5, 1.5, 4);
  const roofMesh = new THREE.Mesh(roofGeometry, new THREE.MeshBasicMaterial({ color: 'darkblue' }));
  const roofEdges = show_me_ribs(roofGeometry);

  roofMesh.position.y = roofEdges.position.y = 1.75;
  roofMesh.rotation.y = roofEdges.rotation.y = Math.PI * 0.25;

  house.add(roofMesh);
  house.add(roofEdges);
}