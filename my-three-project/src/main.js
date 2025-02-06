// Импорт необходимых модулей из three.js и дополнительных классов
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Функция для инициализации сцены Three.js
function initThreeScene() {
	// Создаем сцену
	window.scene = new THREE.Scene();

	// Создаем камеру
	window.camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(0, 2, 5);

	// Создаем рендерер и настраиваем его
	window.renderer = new THREE.WebGLRenderer({ antialias: true });
	// Для корректного отображения текстур (цвета будут не «серыми»)
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('three-container').appendChild(renderer.domElement);

	// Добавляем базовое освещение
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(5, 10,7.5);
	scene.add(directionalLight);

	// Создаем OrbitControls для управления камерой
	// При этом фиксируем вертикальный угол (полярный угол), чтобы наклон сверху не менялся
	window.controls = new OrbitControls(camera, renderer.domElement);
	// Выберите нужное значение: 1.0 (примерно 57°) или другой в зависимости от вашего замысла
	const fixedPolarAngle = 1.0;
	controls.minPolarAngle = fixedPolarAngle;
	controls.maxPolarAngle = fixedPolarAngle;
	// Опционально: разрешаем только вращение вокруг вертикальной оси
	controls.enableZoom = true; // При необходимости можно отключить зум
	controls.enablePan = false;

	// Обработка изменения размеров окна
	window.addEventListener('resize', onWindowResize, false);
}

// Функция для загрузки GLB модели
function loadGLBModel() {
	const loader = new GLTFLoader();
	// Файл модели должен находиться в папке public (например, /public/model.glb)
	loader.load(
		'/model.glb',
		(gltf) => {
			// Если материалы и текстуры экспортированы правильно, они отобразятся с учетом sRGB кодирования
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
					// Если требуется, можно включить корректировку текстур:
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

// Функция для анимации сцены
function animateScene() {
	requestAnimationFrame(animateScene);
	// Обновляем контролы, чтобы OrbitControls реагировали на пользовательское взаимодействие
	controls.update();
	renderer.render(scene, camera);
}

// Функция для обработки изменения размеров окна
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// Инициализация сцены, загрузка модели и запуск анимации
initThreeScene();
loadGLBModel();
animateScene();
