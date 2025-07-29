import * as THREE from 'three';

// Настройка проекта
const scene = new THREE.Scene();
scene.background = new THREE.Color( 'lightpink' );
// Добавлен туман, на будущее
scene.fog = new THREE.Fog( 0x59472b, 1, 1000 );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 
    1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Создание модели
const geometry = new THREE.BoxGeometry( 2, 3, 1 );
const material = new THREE.MeshBasicMaterial( { color: 'brown' } );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = 3;

// Добавление на сцену
scene.add( cube );

// Анимирование модели
function animate() {
    renderer.render( scene, camera );
};