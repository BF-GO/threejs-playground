import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function initThreeScene() {
	window.scene = new THREE.Scene();

	window.camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(0, 2, 5);

	window.renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('three-container').appendChild(renderer.domElement);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(5, 10, 7.5);
	scene.add(directionalLight);

	window.controls = new OrbitControls(camera, renderer.domElement);
	const fixedPolarAngle = 1.0;
	controls.minPolarAngle = fixedPolarAngle;
	controls.maxPolarAngle = fixedPolarAngle;
	controls.enableZoom = true;
	controls.enablePan = false;

	window.addEventListener('resize', onWindowResize, false);
}

function loadGLBModel() {
	const loader = new GLTFLoader();
	loader.load(
		'/model.glb',
		(gltf) => {
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
					if (child.material.map) {
						child.material.map.encoding = THREE.sRGBEncoding;
					}
				}
			});
			scene.add(gltf.scene);
		},
		(xhr) => {
			console.log(`${((xhr.loaded / xhr.total) * 100).toFixed(2)}% загружено`);
		},
		(error) => {
			console.error('Произошла ошибка при загрузке GLB модели:', error);
		}
	);
}

function animateScene() {
	requestAnimationFrame(animateScene);
	controls.update();
	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

initThreeScene();
loadGLBModel();
animateScene();
