import * as THREE from './three.module.js';
console.log('Three.js загружен:', THREE);

const width = window.innerWidth,
	height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(100, width / height, 1, 10);
camera.position.z = 2;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

function animate(time) {
	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render(scene, camera);
}
