import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import FresnelShader from "./../shaders/FresnelShader.js"

export default class SceneInit {
    
    constructor() {
        this.scene = undefined;
        this.renderer = undefined;
        this.camera = undefined;
   
        this.controls = undefined;

        this.ambientLight = undefined;
        this.directionalLight = undefined;
        this.dlHelper = undefined;
        
        this.rSCamera = undefined;
        this.sphere = undefined;
    }
    
    init() {
        this.scene = new THREE.Scene()

        const canvas = document.getElementById("myThreeJsCanvas");
        this.renderer = new THREE.WebGLRenderer( {canvas, antialias: true} );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000)
        this.camera.position.set(0,150,400);
        this.camera.lookAt(this.scene.position)

        window.addEventListener('resize', () => this.onWindowResize(), false);

        this.addLight()
        this.addBubble()
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    addLight() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, Math.PI);
        this.scene.add(this.ambientLight);
        this.directionalLight = new THREE.DirectionalLight(0xffffff);
        this.directionalLight.castShadow = true;
        this.directionalLight.position.y = 10;
        this.dlHelper = new THREE.DirectionalLightHelper(this.directionalLight);
        // this.scene.add(this.directionalLight);
        // this.scene.add(this.dlHelper);

        // var light = new THREE.PointLight(0xffffff);
        // light.castShadow = true;
        // light.position.set(0,250,0);
        // this.scene.add(light);

    }

    addBubble() {
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter
        });
        this.rSCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
        this.scene.add(this.rSCamera);

        //---------------------------Bubble-------------------------
        const geo = new THREE.SphereGeometry(100,64,32);
        const fShader = FresnelShader;

        const customMaterial = new THREE.ShaderMaterial( 
        {
            uniforms: 		THREE.UniformsUtils.clone(fShader.uniforms),
            vertexShader:   fShader.vertexShader,
            fragmentShader: fShader.fragmentShader
        });

        customMaterial.uniforms.tCube.value = this.rSCamera.renderTarget.texture;
        
        this.sphere = new THREE.Mesh(geo,customMaterial);
        this.sphere.receiveShadow = true;
        this.sphere.castShadow = true;
        this.rSCamera.position.set(
            this.sphere.position.x,
            this.sphere.position.y,
            this.sphere.position.z
         )
        this.scene.add(this.sphere);

        //-------------------------------------------------------------------

        // console.log(this.rSCamera.position);
        // console.log(this.sphere.position)
        // // const cube = new THREE.SphereGeometry(100, 32, 32);
        // // const mat = new THREE.MeshPhongMaterial({envMap: this.rSCamera.renderTarget.texture })
        // // const cmesh = new THREE.Mesh(cube, mat);
        // // cmesh.position.y += 50;
        // // this.scene.add(cmesh);
        // // cmesh.add(this.rSCamera);
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
        this.sphere.visible = false;
        this.rSCamera.update(this.renderer, this.scene );
        this.sphere.visible = true;

        this.renderer.render(this.scene, this.camera);
      }
    
      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }

}