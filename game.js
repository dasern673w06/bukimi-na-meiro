import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

// シーン、カメラ、レンダラーのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// フォグ（霧）で不気味な雰囲気を出す
scene.fog = new THREE.Fog(0x888800, 1, 50);

// 床と壁の作成
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x888800 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xcccc00 });

// 壁を作成する関数
function createWall(x, y, z, rotationY = 0) {
    const wallGeometry = new THREE.BoxGeometry(100, 10, 0.5);
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(x, y, z);
    wall.rotation.y = rotationY;
    scene.add(wall);
}

// 廊下の壁を配置
createWall(0, 5, -50);
createWall(0, 5, 50);
createWall(50, 5, 0, Math.PI / 2);
createWall(-50, 5, 0, Math.PI / 2);

// 照明の追加
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// プレイヤーの動き
camera.position.set(0, 1.6, 0); // プレイヤーの視点の高さ

const keyboard = {};
document.addEventListener('keydown', (e) => {
    keyboard[e.code] = true;
});
document.addEventListener('keyup', (e) => {
    keyboard[e.code] = false;
});

// ゲームループ
function animate() {
    requestAnimationFrame(animate);

    const moveSpeed = 0.1;

    // 前後左右の移動
    if (keyboard['KeyW']) camera.translateZ(-moveSpeed);
    if (keyboard['KeyS']) camera.translateZ(moveSpeed);
    if (keyboard['KeyA']) camera.translateX(-moveSpeed);
    if (keyboard['KeyD']) camera.translateX(moveSpeed);

    // カメラの回転（マウス移動で実装するとよりゲームらしくなります）
    if (keyboard['KeyQ']) camera.rotation.y += 0.05;
    if (keyboard['KeyE']) camera.rotation.y -= 0.05;

    renderer.render(scene, camera);
}

animate();

// ウィンドウサイズ変更時のリサイズ処理
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
