import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default class SceneInit {
    
    constructor() {
        this.scene = undefined;
        this.renderer = undefined;
        this.camera = undefined;
   
        this.controls = undefined;

        this.ambientLight = undefined;
        this.directionalLight = undefined;
        this.dlHelper = undefined;
    }
    
    init() {
        this.scene = new THREE.Scene()

        const canvas = document.getElementById("myThreeJsCanvas");
        this.renderer = new THREE.WebGLRenderer( {canvas, antialias: true} );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.z = 5;

        window.addEventListener('resize', () => this.onWindowResize(), false);

        this.addLight()
        
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    addLight() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, Math.PI);
        this.scene.add(this.ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff);
        this.directionalLight.castShadow = true;
        this.directionalLight.position.y = 50;
        this.dlHelper = new THREE.DirectionalLightHelper(this.directionalLight);
        this.scene.add(this.directionalLight);
        // this.scene.add(this.dlHelper);
    }

    animate() {
        // NOTE: Window is implied.
        // requestAnimationFrame(this.animate.bind(this));
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        // this.stats.update();

        // Removing controls.update still allow you to orbit + 
        // also prevents camera from defaulting to look at origin
        // this.controls.update();
      }
    
      render() {
        // NOTE: Update uniform data on each render.
        // this.uniforms.u_time.value += this.clock.getDelta();
        this.renderer.render(this.scene, this.camera);
      }
    
      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }

}