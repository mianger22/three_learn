import * as THREE from 'three';

// ------------------- Настройка проекта -------------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color('white');
// Добавлен туман, на будущее
scene.fog = new THREE.Fog(0x59472b, 1, 1000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10.5;
camera.position.y = 1.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// --------------------------- Создаём контейнер для дома -----------------
const house = new THREE.Group();
// house.rotation.y = 8.5;
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

//------------------------------------------------------------------

// Визуализируем сцену
function animate() {
    renderer.render(scene, camera);
};