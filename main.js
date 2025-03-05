import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';


let camera, scene, renderer, controls;
let whiteLight, coloredLight;
let stats;

const clock = new THREE.Clock();

init();

function init() {
    // Set up the camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 20, 100);

    // Set up the scene
    scene = new THREE.Scene();

    // Add an ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4); // Soft white light
    scene.add(ambientLight);

    // Add a grey sphere to the scene
    const geometry = new THREE.SphereGeometry(20, 60, 60);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xA9A9A9, // Base color
        transmission: 0, // How much light passes through (0 = opaque, 1 = fully transparent)
        thickness: 0.5, // Thickness of the object (affects light scattering)
        roughness: 0.4, // Surface roughness (0 = smooth, 1 = rough)
        ior: 1.0, // Index of refraction (e.g., 1.5 for glass)
        clearcoat: 0.5, // Clear coat layer (optional)
        clearcoatRoughness: 0 // Roughness of the clear coat (optional)
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add a white light (always white)
    whiteLight = new THREE.PointLight(0xffffff, 400, 100); // Distance set to 100
    whiteLight.position.set(30, 30, 30);
    whiteLight.decay = 2; // Add decay here (1 for linear decay, 2 for realistic decay)
    scene.add(whiteLight);

    // Add a colored light (controlled by the text input)
    coloredLight = new THREE.PointLight(0xff0040, 400, 100); // Distance set to 100
    coloredLight.position.set(-30, -30, 30);
    coloredLight.decay = 2; // Add decay here (1 for linear decay, 2 for realistic decay)
    scene.add(coloredLight);

    // Add light helpers to visualize the lights
    const whiteLightHelper = new THREE.PointLightHelper(whiteLight, 0.5);
    scene.add(whiteLightHelper);

    const coloredLightHelper = new THREE.PointLightHelper(coloredLight, 0.5);
    scene.add(coloredLightHelper);

    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Initialize OrbitControls after the renderer is created
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Set up stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Add event listener for the text input
    const Input1 = document.getElementById('input1');
    const Input2 = document.getElementById('input2');
    const colorInfo1 = document.getElementById('colorInfo1');
    const colorInfo2 = document.getElementById('colorInfo2');

    Input1.addEventListener('input', (event) => {
        const input = event.target.value.toLowerCase(); // Get the input and convert to lowercase
        let color, colorName;

        // Map input to a color
        switch (input) {
            case 'a':
                color = new THREE.Color(0xFFBF00); // amber
                colorName = 'amber';
                break;
            case 'b':
                color = new THREE.Color(0x0000ff); // Blue
                colorName = 'blue';
                break;
            case 'c': 
                color = new THREE.Color(0xff0040); // crimson
                colorName = 'crimson';
                break;
            case 'd':
                color = new THREE.Color(0xFED85D); // dandelion
                colorName = 'dandelion';
                break;
            case 'e':
                color = new THREE.Color(0x50C878); // emerald
                colorName = 'emerald';
                break;
            case 'f': 
                color = new THREE.Color(0xFF00FF); // fuschia
                colorName = 'fuschia';
                break;
            case 'g':
                color = new THREE.Color(0x00ff00); // Green
                colorName = 'green';
                break;
            case 'h':
                color = new THREE.Color(0xFF69B4); // hot pink
                colorName = 'hot pink';
                break;
            case 'i':
                color = new THREE.Color(0x6A5DFF); // indigo
                colorName = 'indigo';
                break;
            case 'j':
                color = new THREE.Color(0x343434); // jet
                colorName = 'jet';
                break;
            case 'k':
                color = new THREE.Color(0xE8F48C); // key lime
                colorName = 'key lime';
                break;
            case 'l':
                color = new THREE.Color(0xB57EDC); // lavender
                colorName = 'lavender';
                break;
            case 'm':
                color = new THREE.Color(0xF653A6); // magenta
                colorName = 'magenta';
                break;
            case 'n':
                color = new THREE.Color(0x000080); // navy blue
                colorName = 'navy blue';
                break;
            case 'o':
                color = new THREE.Color(0xFFA500); // orange
                colorName = 'orange';
                break;
            case 'p':
                color = new THREE.Color(0xFFC0CB); // pink
                colorName = 'pink';
                break;
            case 'q':
                color = new THREE.Color(0xA6A6A6); // quicksilver
                colorName = 'quicksilver';
                break;
            case 'r':
                color = new THREE.Color(0xFF0000); // red
                colorName = 'red';
                break;
            case 's':
                color = new THREE.Color(0x00FFCD); // sea green
                colorName = 'sea green';
                break;
            case 't':
                color = new THREE.Color(0x008080); // teal
                colorName = 'teal';
                break;
            case 'u':
                color = new THREE.Color(0x3F00FF); // ultramarine
                colorName = 'ultramarine';
                break;
            case 'v':
                color = new THREE.Color(0x8F00FF); // purple
                colorName = 'violet';
                break;
            case 'w':
                color = new THREE.Color(0xFFFFFF); // olive
                colorName = 'white';
                break;
            case 'x':
                color = new THREE.Color(0xF1B42F); // xanthous
                colorName = 'xanthous';
                break;
            case 'y':
                color = new THREE.Color(0xffff00); // Yellow
                colorName = 'yellow';
                break;
            case 'z':
                color = new THREE.Color(0xE9CAB7); // zinnwaldite
                colorName = 'zinnwaldite';
                break;
            default:
                color = new THREE.Color(0xffffff); // Default to white if input is invalid
                colorName = 'white';
                break;
        }

        coloredLight.color.set(color); // Update coloredLight's color
        colorInfo1.textContent = `${colorName} (#${color.getHexString()})`; // Update color info

        // Update the PointLightHelper
        coloredLightHelper.update(); // Refresh the helper
    });

    Input2.addEventListener('input', (event) => {
        const input = event.target.value.toLowerCase(); // Get the input and convert to lowercase
        let color, colorName;

        // Map input to a color
        switch (input) {
            case 'a':
                color = new THREE.Color(0xFFBF00); // amber
                colorName = 'amber';
                break;
            case 'b':
                color = new THREE.Color(0x0000ff); // Blue
                colorName = 'blue';
                break;
            case 'c': 
                color = new THREE.Color(0xff0040); // crimson
                colorName = 'crimson';
                break;
            case 'd':
                color = new THREE.Color(0xFED85D); // dandelion
                colorName = 'dandelion';
                break;
            case 'e':
                color = new THREE.Color(0x50C878); // emerald
                colorName = 'emerald';
                break;
            case 'f': 
                color = new THREE.Color(0xFF00FF); // fuschia
                colorName = 'fuschia';
                break;
            case 'g':
                color = new THREE.Color(0x00ff00); // Green
                colorName = 'green';
                break;
            case 'h':
                color = new THREE.Color(0xFF69B4); // hot pink
                colorName = 'hot pink';
                break;
            case 'i':
                color = new THREE.Color(0x6A5DFF); // indigo
                colorName = 'indigo';
                break;
            case 'j':
                color = new THREE.Color(0x343434); // jet
                colorName = 'jet';
                break;
            case 'k':
                color = new THREE.Color(0xE8F48C); // key lime
                colorName = 'key lime';
                break;
            case 'l':
                color = new THREE.Color(0xB57EDC); // lavender
                colorName = 'lavender';
                break;
            case 'm':
                color = new THREE.Color(0xF653A6); // magenta
                colorName = 'magenta';
                break;
            case 'n':
                color = new THREE.Color(0x000080); // navy blue
                colorName = 'navy blue';
                break;
            case 'o':
                color = new THREE.Color(0xFFA500); // orange
                colorName = 'orange';
                break;
            case 'p':
                color = new THREE.Color(0xFFC0CB); // pink
                colorName = 'pink';
                break;
            case 'q':
                color = new THREE.Color(0xA6A6A6); // quicksilver
                colorName = 'quicksilver';
                break;
            case 'r':
                color = new THREE.Color(0xFF0000); // red
                colorName = 'red';
                break;
            case 's':
                color = new THREE.Color(0x00FFCD); // sea green
                colorName = 'sea green';
                break;
            case 't':
                color = new THREE.Color(0x008080); // teal
                colorName = 'teal';
                break;
            case 'u':
                color = new THREE.Color(0x3F00FF); // ultramarine
                colorName = 'ultramarine';
                break;
            case 'v':
                color = new THREE.Color(0x8F00FF); // purple
                colorName = 'violet';
                break;
            case 'w':
                color = new THREE.Color(0xFFFFFF); // olive
                colorName = 'white';
                break;
            case 'x':
                color = new THREE.Color(0xF1B42F); // xanthous
                colorName = 'xanthous';
                break;
            case 'y':
                color = new THREE.Color(0xffff00); // Yellow
                colorName = 'yellow';
                break;
            case 'z':
                color = new THREE.Color(0xE9CAB7); // zinnwaldite
                colorName = 'zinnwaldite';
                break;
            default:
                color = new THREE.Color(0xffffff); // Default to white if input is invalid
                colorName = 'white';
                break;
        }

        whiteLight.color.set(color); // Update coloredLight's color
        colorInfo2.textContent = `${colorName} (#${color.getHexString()})`; // Update color info

        // Update the PointLightHelper
        whiteLightHelper.update(); // Refresh the helper
    });

    // Start the animation loop
    renderer.setAnimationLoop(animate);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    render();
    stats.update();
}

function render() {
    const time = Date.now() * 0.0005;
    const delta = clock.getDelta();

    // Animate the lights
    whiteLight.position.x = Math.sin(time * 1.4) * 30;
    whiteLight.position.y = Math.cos(time) * 40;
    whiteLight.position.z = Math.cos(time * 0.6) * 30;

    coloredLight.position.x = Math.cos(time * 0.6) * 30;
    coloredLight.position.y = Math.sin(time * 1) * 40;
    coloredLight.position.z = Math.sin(time * 1.4) * 30;

    controls.update();

    // Render the scene
    renderer.render(scene, camera);
}