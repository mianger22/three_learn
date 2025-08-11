import * as THREE from 'three';
import creating_rain_animation from "./scripts/creating_rain_animation";
import creating_sun from './scripts/creating_sun';
import creating_skeleton_house from './scripts/creating_skeleton_house';
import creating_door from './scripts/creating_door';
import creating_door_handle from './scripts/creating_door_handle';
import creating_roof from './scripts/creating_roof';
import creating_lawn from './scripts/creating_lawn';
import creating_barrel from './scripts/creating_barrel';

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

melody_rain.play();

// --------------------------- Создаём контейнер для дома -----------------

export const house = new THREE.Group();
scene.add(house);

// ------------------------------ Общие данные -----------------------------

// Объект состояния
const state = {
  sunMesh: undefined,
  barrelMesh: undefined
};

// Функция для обновления состояния
function setState(newState) {
  Object.assign(state, newState);
}

export function show_me_ribs(figureGeometry) {
    // Создаем геометрию для рёбер
    const edgesGeometry = new THREE.EdgesGeometry(figureGeometry);
    // Создаем материал для линий рёбер
    const lineMaterial = new THREE.LineBasicMaterial({ color: 'black' });
    // Создаем линии по рёбрам
    return new THREE.LineSegments(edgesGeometry, lineMaterial);
}

function changing_color(final_color, object, should_i_change_color_scene) {
  return new Promise((resolve, reject) => {
    // Определяем конечный цвет
    const endColor = new THREE.Color(final_color);
    // Запоминаем время начала анимации
    const startTime = performance.now();
    // Выполняем основной функционал
    (function core() {
      // Делим разницу времен на время анимации
      const progress = (performance.now() - startTime) / 15000; 

      // Плавно меняем цвет окружающей среды и дождевой воды
      if (should_i_change_color_scene === true) scene.background.lerp(endColor, progress);
      object.material.color.lerp(endColor, progress);

      if (progress < 1)  
        requestAnimationFrame(core)
      else 
        return;
    })();
    // Вызываем resolve при успешном завершении
    setTimeout(() => {
      // console.log("Задача выполнена");
      resolve();
    }, 15000);
  });
};

// --------------------------- Создание объектов ----------------------------

creating_sun(setState, scene);
creating_skeleton_house(house, show_me_ribs);
creating_door(house);
creating_door_handle(house);
creating_roof(house, show_me_ribs);
creating_lawn(house);
creating_barrel(house, show_me_ribs, state, setState);
creating_rain_animation(scene, changing_color, melody_rain, state);