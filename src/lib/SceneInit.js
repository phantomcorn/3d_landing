import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import FresnelShader from "./../shaders/FresnelShader.js"
import * as dat from 'dat.gui';



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

        this.gui = undefined;
    }
    
    init() {

        this.scene = new THREE.Scene()
        this.gui = new dat.GUI();

        const canvas = document.getElementById("myThreeJsCanvas");
        this.renderer = new THREE.WebGLRenderer( {canvas, antialias: true} );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000)
        this.camera.position.set(0,20,25);
        this.camera.lookAt(this.scene.position)

        window.addEventListener('resize', () => this.onWindowResize(), false);

        this.addLight()
        this.addBubble()
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
       
    }

    addLight() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, Math.PI);
        this.scene.add(this.ambientLight);
        // this.directionalLight = new THREE.DirectionalLight('white', 0.75)
        // this.directionalLight.castShadow = true;
        // this.directionalLight.set(-0.5,-0.5,-2)
        // this.dlHelper = new THREE.DirectionalLightHelper(this.directionalLight);
        // this.scene.add(this.directionalLight);
        // this.scene.add(this.dlHelper);

        var light	= new THREE.DirectionalLight('white', 1)
		light.position.set(0.5, 0.5, 2)
		this.scene.add( light )
        var light	= new THREE.DirectionalLight('white', 0.75)
		light.position.set(-0.5, -0.5, -2)
		this.scene.add( light )
        // var light = new THREE.PointLight(0xffffff);
        // light.castShadow = true;
        // light.position.set(0,250,0);
        // this.scene.add(light);

    }

    addBubble() {
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
            format: THREE.RGBAFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter
        });
        this.rSCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
        this.scene.add(this.rSCamera);

        //---------------------------Bubble-------------------------
        const geo = new THREE.SphereGeometry(10,64,32)//,0, Math.PI);
        const fShader = FresnelShader;

        const customMaterial = new THREE.ShaderMaterial( 
        {
            uniforms: 		THREE.UniformsUtils.clone(fShader.uniforms),
            vertexShader:   fShader.vertexShader,
            fragmentShader: fShader.fragmentShader,
            // transparent: true,
            // opacity: 0.5
       
        });

        customMaterial.uniforms.tCube.value = this.rSCamera.renderTarget.texture;
        // customMaterial.side = THREE.DoubleSide;

        this.sphere = new THREE.Mesh(geo,customMaterial);
        this.sphere.receiveShadow = true;
        this.sphere.castShadow = true;
        this.rSCamera.position.set(
            this.sphere.position.x,
            this.sphere.position.y,
            this.sphere.position.z
        )
        this.sphere.rotateX(-Math.PI/2)
        this.scene.add(this.sphere);

        //-------------------------------------------------------------------
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