import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfe8ff); // softer sky blue

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(30, 50, 30);
scene.add(sunLight);

// Ground
const parkMaterial = new THREE.MeshLambertMaterial({ color: 0x3fa34d }); // richer grass green
const park = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), parkMaterial);
park.rotation.x = -Math.PI / 2;
scene.add(park);

// Roads
const asphaltMaterial = new THREE.MeshStandardMaterial({
  color: 0x1c1c1c,
  roughness: 0.7,
});

const northSouthRoad = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.1, 40),
  asphaltMaterial
);
northSouthRoad.position.y = 0.05;
scene.add(northSouthRoad);

const eastWestRoad = new THREE.Mesh(
  new THREE.BoxGeometry(40, 0.1, 6),
  asphaltMaterial
);
eastWestRoad.position.y = 0.05;
scene.add(eastWestRoad);

// Building Materials
const redBrickMaterial = new THREE.MeshPhongMaterial({ color: 0xc64848 });
const yellowStuccoMaterial = new THREE.MeshPhongMaterial({ color: 0xf4d03f });
const tealGlassMaterial = new THREE.MeshPhongMaterial({ color: 0x1abc9c });

// Buildings
const redHouse = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 6), redBrickMaterial);
redHouse.position.set(-7, 3, -7);
scene.add(redHouse);

const yellowHouse = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 6), yellowStuccoMaterial);
yellowHouse.position.set(7, 3, -7);
scene.add(yellowHouse);

const tealTower = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 4), tealGlassMaterial);
tealTower.position.set(-10, 5, 15);
scene.add(tealTower);

const tealBlock = new THREE.Mesh(new THREE.BoxGeometry(4, 7, 10), tealGlassMaterial);
tealBlock.position.set(10, 3.5, 8);
scene.add(tealBlock);

// Resize Handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
