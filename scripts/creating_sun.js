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
    sunMesh.position.set(5.3, 4.5, 0);

    setState({ sunMesh: sunMesh });

    scene.add(sunMesh);
  });
}