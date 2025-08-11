import * as THREE from 'three';

export default function creating_skeleton_house(house, show_me_ribs) {
  const skeletonGeometry = new THREE.BoxGeometry(4, 2.5, 4);
  const skeletonMesh = new THREE.Mesh(skeletonGeometry, new THREE.MeshBasicMaterial({ color: 'brown' }));
  const skeletonEdges = show_me_ribs(skeletonGeometry);

  house.add(skeletonMesh);
  house.add(skeletonEdges);
}