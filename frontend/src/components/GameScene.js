import { useEffect } from 'react';
import * as THREE from 'three';

function GameScene({ gameState }) {
  useEffect(() => {
    if (!gameState) return;

    console.log('Rendering GameState in GameScene:', gameState); // Debugging log

    // Clean up the previous scene if it exists
    let cleanupFunction;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Create player objects
    const players = {};
    Object.entries(gameState.playerPositions).forEach(([player, position]) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1); // Box geometry for the player
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green color for the player
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = position;
      scene.add(cube);
      players[player] = cube;
    });

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      // Update player positions
      Object.entries(gameState.playerPositions).forEach(([player, position]) => {
        if (players[player]) {
          players[player].position.x = position;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    cleanupFunction = () => {
      document.body.removeChild(renderer.domElement);
    };

    return cleanupFunction;
  }, [gameState]);

  return null;
}

export default GameScene;
