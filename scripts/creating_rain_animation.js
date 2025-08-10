import * as THREE from 'three';

const melody_early_morning = document.getElementById('melody_early_morning');
const melody_rustic_morning = document.getElementById('melody_rustic_morning');

export default function creating_rain_animation(scene, changing_color, barrelMesh, melody_rain, state) {
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

    const increasingOpacity = setInterval(() => {
      let sunMesh = state.sunMesh;
      sunMesh.material.opacity = +sunMesh.material.opacity + 0.1;

      if (sunMesh.material.opacity > 1) {
        (function changing_color_rainwater() {
          changing_color('#8999D0', barrelMesh, true).then(() => {
            // console.log("Функция выполнена после завершения Promise");

            // Постепенно убираем туман
            (function fog_dispersal() {
              let fogFadeOut = true;

              (function core() {
                requestAnimationFrame(core);

                if (scene.fog && scene.fog instanceof THREE.FogExp2 && fogFadeOut) {
                  scene.fog.density -= 0.0005; // скорость исчезновения

                  if (scene.fog.density <= 0) {
                    scene.fog = null; // полностью убираем туман
                    fogFadeOut = false; // остановить дальнейшее уменьшение
                  }
                }
              })();
            })();

            // Меняем цвета неба и солнца
            changing_color('#A6D1FD', barrelMesh, true);
            changing_color('#fff37b', sunMesh, false);

            // Меняем музыку
            melody_early_morning.pause();
            melody_rustic_morning.play();
          });
        })();

        clearInterval(increasingOpacity);
      }
    }, 50);

    melody_rain.pause();
    melody_early_morning.play();
  }, 20000);
}