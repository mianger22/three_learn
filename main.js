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
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// --------------------------- Создаём контейнер для дома -----------------

const house = new THREE.Group();
scene.add(house);

// --------------------------- Общая функция отрисовки ребер ---------------

function show_me_ribs(figureGeometry) {
    // Создаем геометрию для рёбер
    const edgesGeometry = new THREE.EdgesGeometry(figureGeometry);
    // Создаем материал для линий рёбер
    const lineMaterial = new THREE.LineBasicMaterial({ color: 'black' });
    // Создаем линии по рёбрам
    return new THREE.LineSegments(edgesGeometry, lineMaterial);
}

//-------------------------- Создание каркаса дома ------------------------

// Создаем геометрию каркаса
const skeletonGeometry = new THREE.BoxGeometry(4, 2.5, 4);
// Задаём цвет граням
const skeletonMaterial = new THREE.MeshBasicMaterial({ color: 'brown' });
// Смешиваем цвет и форму
const skeletonMesh = new THREE.Mesh(skeletonGeometry, skeletonMaterial);
// Очерчиваем ребра
const skeletonEdges = show_me_ribs(skeletonGeometry);

// Добавляем меш в сцену
house.add(skeletonMesh);
// Добавляем сетку в сцену
house.add(skeletonEdges);

//-------------------------- Создание газона ------------------------

// Создаем геометрию 
const lawnGeometry = new THREE.BoxGeometry(6.5, 0.2, 7.5);
// Задаём цвет граням
const lawnMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
// Смешиваем цвет и форму
const lawnMesh = new THREE.Mesh(lawnGeometry, lawnMaterial);
// Опускание до нужного уровня 
lawnMesh.position.y = -1;
// Добавляем меш в сцену
house.add(lawnMesh);

//-------------------------- Создание крыши ------------------------

// Создаем геометрию крыши
const roofGeometry = new THREE.ConeGeometry(3.5, 1.5, 4);
// Задаём цвет граням
const roofMaterial = new THREE.MeshBasicMaterial({color: 'darkblue'});
// Смешиваем цвет и форму
const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial);
// Очерчиваем ребра
const roofEdges = show_me_ribs(roofGeometry);

roofMesh.position.y = roofEdges.position.y = 1.75;
roofMesh.rotation.y = roofEdges.rotation.y = Math.PI * 0.25;

house.add(roofMesh);
house.add(roofEdges);

//-------------------------- Создание двери ------------------------

// Создаем форму
const doorGeometry = new THREE.PlaneGeometry(1, 1.3);
// Наполняем цветом
const doorMaterial = new THREE.MeshBasicMaterial({color: 'pink'});
// Смешиваем 
const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
// Делаем, чтобы было видно
doorMesh.position.z = 2 + 0.01;

house.add(doorMesh);

//---------------------------- Анимация дождя ----------------------

// Создаем массив капель дождя
const rainCount = 10000; // количество капель
const rainGeometry = new THREE.BufferGeometry();
const positions = [];
// Создаем материал для капель дождя
const rainMaterial = new THREE.PointsMaterial({color: 0xaaaaaa, size: 0.2});
// Создаем объект Points для дождя
const rain = new THREE.Points(rainGeometry, rainMaterial);

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

  for (let i = 0; i < positions.length; i +=3) {
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

//------------------------------- Визуализация сцены --------------------

function animation() {
    renderer.render(scene, camera);
};