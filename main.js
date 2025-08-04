import * as THREE from 'three';

// ------------------- Настройка проекта -------------------------------

const scene = new THREE.Scene();
scene.background = new THREE.Color('gray');
scene.fog = new THREE.FogExp2(0x59472b, 0.1, 1000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 10.5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(() => renderer.render(scene, camera));
document.body.appendChild(renderer.domElement);

const melody_rain = document.getElementById('melody_rain');
const melody_sunny_morning = document.getElementById('melody_sunny_morning');

melody_rain.play();

// --------------------------- Создаём контейнер для дома -----------------

const house = new THREE.Group();
scene.add(house);

// ------------------------------ Общие данные -----------------------------

function show_me_ribs(figureGeometry) {
    // Создаем геометрию для рёбер
    const edgesGeometry = new THREE.EdgesGeometry(figureGeometry);
    // Создаем материал для линий рёбер
    const lineMaterial = new THREE.LineBasicMaterial({ color: 'black' });
    // Создаем линии по рёбрам
    return new THREE.LineSegments(edgesGeometry, lineMaterial);
}

let sunMesh;

// --------------------------- Создание объектов ----------------------------

(function creating_sun() {
  const sunShape = new THREE.CircleGeometry(2);
  sunMesh = new THREE.Mesh(sunShape, new THREE.MeshBasicMaterial({ color: 'yellow', transparent: true, opacity: 0.0 }));

  sunMesh.position.set(5.3, 4.5, 0);

  scene.add(sunMesh);
})();

(function creating_rain_animation() {
  // Создаем массив капель дождя
  const rainCount = 10000; // количество капель
  const rainGeometry = new THREE.BufferGeometry();
  const positions = [];
  // Создаем материал для капель дождя
  const rainMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.2 });
  // Создаем объект Points для дождя
  let rain = new THREE.Points(rainGeometry, rainMaterial);

  for (let i = 0; i < rainCount; i++) {
    // случайные позиции в области
    const x = Math.random() * 100 - 50; // от -50 до +50 по X
    const y = Math.random() * 50 + 10;   // от 10 до +60 по Y
    const z = Math.random() * 100 - 50; // от -50 до +50 по Z

    positions.push(x, y, z);
  }

  rainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  (function rain_animation() {
    requestAnimationFrame(rain_animation);

    const positions = rain.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      // падаем вниз по Y
      positions[i +1] -= Math.random() * 0.5; // скорость падения

      // если капля упала ниже определенного уровня, возвращаем ее наверх
      if (positions[i +1] < -10) {
        positions[i +1] = Math.random() * 50 +10;
      }
    }

    // Обновляем атрибут позиции
    rain.geometry.attributes.position.needsUpdate = true;
  })();

  scene.add(rain);

  setTimeout(() => {
    scene.remove(rain);
    scene.background = new THREE.Color('lightblue');

    sunMesh.material.opacity = '1.0';

    melody_rain.pause();
    melody_sunny_morning.play();
  }, 20000);
})();

(function creating_skeleton_house() {
  const skeletonGeometry = new THREE.BoxGeometry(4, 2.5, 4);
  const skeletonMesh = new THREE.Mesh(skeletonGeometry, new THREE.MeshBasicMaterial({ color: 'brown' }));
  const skeletonEdges = show_me_ribs(skeletonGeometry);

  house.add(skeletonMesh);
  house.add(skeletonEdges);
})();

(function creating_lawn() {
  const lawnGeometry = new THREE.BoxGeometry(6.5, 0.2, 7.5);
  const lawnMesh = new THREE.Mesh(lawnGeometry, new THREE.MeshBasicMaterial({ color: 'green' }));
  
  lawnMesh.position.y = -1;
  house.add(lawnMesh);
})();

(function creating_roof() {
  const roofGeometry = new THREE.ConeGeometry(3.5, 1.5, 4);
  const roofMesh = new THREE.Mesh(roofGeometry, new THREE.MeshBasicMaterial({ color: 'darkblue' }));
  const roofEdges = show_me_ribs(roofGeometry);

  roofMesh.position.y = roofEdges.position.y = 1.75;
  roofMesh.rotation.y = roofEdges.rotation.y = Math.PI * 0.25;

  house.add(roofMesh);
  house.add(roofEdges);
})();

(function creating_door() {
  const doorGeometry = new THREE.PlaneGeometry(1, 1.3);
  const doorMesh = new THREE.Mesh(doorGeometry, new THREE.MeshBasicMaterial({ color: 'pink' }));

  doorMesh.position.z = 2 + 0.01;

  house.add(doorMesh);
})();

(function creating_door_handle() {
  const doorHandleGeometry = new THREE.CircleGeometry(0.05);
  const doorHandleMesh = new THREE.Mesh(doorHandleGeometry, new THREE.MeshBasicMaterial({ color: 'black' }));

  doorHandleMesh.position.set(-0.23, 0, 2 + 0.02);

  house.add(doorHandleMesh);
})();

(function creating_barrel() {
  let barrelHeight = 0.0;

  const barrelShape = new THREE.CylinderGeometry(0.495, 0.495, barrelHeight);
  const barrelMesh = new THREE.Mesh(barrelShape, new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));

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
})();