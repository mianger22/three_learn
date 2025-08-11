import * as THREE from 'three';

export default function creating_sun(setState, scene) {  
  const spriteTextureUrl = 'https://threejs.org/examples/textures/sprites/disc.png';
  const spriteTextureLoader = new THREE.TextureLoader();

  spriteTextureLoader.load(spriteTextureUrl, (texture) => {
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture,
      color: 0xffff00,
      blending: THREE.AdditiveBlending,
      transparent: true, 
      opacity: 0.0
    });

    const sunMesh = new THREE.Sprite(spriteMaterial);
    sunMesh.scale.set(2.5, 2.5, 1); // размер свечения

    (function movement_sun() {
      const radius = 6;
      let angle = 3;

      (function core() {
        requestAnimationFrame(core);

        // Обновляем позицию солнца по кругу (по часовой стрелке)
        angle -= 0.0007; // уменьшение угла для движения по часовой
        sunMesh.position.x = Math.cos(angle) * radius;
        sunMesh.position.y = Math.sin(angle) * radius;
      })();
    })();

    setState({ sunMesh: sunMesh });

    scene.add(sunMesh);
  });
}