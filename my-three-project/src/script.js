import * as THREE from 'three';

import './style.css';

// Сцена
const scene = new THREE.Scene();

// Объект
const geometry = new THREE.BoxGeometry(2, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'purple' });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Камера
const sizes = {
	width: 1000,
	height: 1000,
};
const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 1;

scene.add(camera);

const canvas = document.querySelector('.canvas');

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
