import * as THREE from 'three';

export default function creating_barrel(house, barrelMesh, show_me_ribs) {
  let barrelHeight = 0.0;

  const barrelShape = new THREE.CylinderGeometry(0.495, 0.495, barrelHeight);
  barrelMesh = new THREE.Mesh(barrelShape, new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));

  const barrelEdges = show_me_ribs(new THREE.CylinderGeometry(0.5, 0.5, 0.7));

  barrelMesh.position.set(1.3, -0.35, 5);
  barrelEdges.position.set(1.3, 0, 5);

  house.add(barrelMesh);
  house.add(barrelEdges);

  (function animation_filling_barrel() {
    let customInterval = setInterval(() => {
      barrelHeight += 0.1;

      barrelMesh.geometry.dispose();
      barrelMesh.geometry = new THREE.CylinderGeometry(0.495, 0.495, barrelHeight);
      barrelMesh.position.y += 0.05;

      if (barrelHeight > 0.5) {
        clearInterval(customInterval);
      }
    }, 3000);
  })();
}