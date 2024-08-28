import * as THREE from "three";

// this creates the container for all things to be rendered
const scene = new THREE.Scene();
// common camera w/ 4 parameters: FOV, Aspect Ratio, Near, Far
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// pull in Canvas element used to render scene
const canvas = document.querySelector("canvas#c");

// resizes canvas when the browser window is resized
window.addEventListener("resize", () => {
  // update camera aspect ration to prevent squishing
  camera.aspect = window.innerWidth / window.innerHeight;
  // must be called when a camera's aspect ration is updated
  camera.updateProjectionMatrix();
  // update pixel ration when resizing
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // update canvas size
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// creates renderer instance - if no canvas element is passed it will generate one with renderer.domElement:
// const renderer = new THREE.WebGLRenderer();
// document.body.appendChild(renderer.domElement);
const renderer = new THREE.WebGLRenderer({ canvas });
// sets the size of the render, typically the same width / height as browser window
renderer.setSize(window.innerWidth, window.innerHeight);
// limits pixel ratio to 2 to prevent artifacts/blurry renders
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// sets a function to run each frame
// renderer.setAnimationLoop(animate);

// create a cube - takes 3 opt. params: width, height, depth (all default to 1)
const geometry = new THREE.BoxGeometry(1, 1, 1);
// create a color material - takes an object of properties
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// create a mesh - an object that takes a geometry and applies a material to it
const cube = new THREE.Mesh(geometry, material);
// add cube (mesh) to scene (adds to coordinates (0,0) by default)
// scene.add(cube);

// create a group **RECOMMENDED** makes working with multiple objects easier
const group = new THREE.Group();
group.add(cube);
scene.add(group);

// move camera away from center coordinates to make the cube visible
camera.position.z = 5;

// function that gets called every frame (~60x a sec - based on display refresh rate)
// function animate() {
//   // cube rotation animation
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }

// Animations

// gets curent time
// used in animation loop to keep steady framerate on all devices
const clock = new THREE.Clock();

// animation loop - this function gets called every frame (~60 frames a sec)
const animation = () => {
  // elapsed time is used to get same frame rate no matter the device
  const elapsedTime = clock.getElapsedTime();
  // cube rotation animation
  cube.rotation.x = elapsedTime;
  cube.rotation.y = elapsedTime;
  renderer.render(scene, camera);

  // call animation() to run on next frame (loop)
  requestAnimationFrame(animation);
};

animation();
