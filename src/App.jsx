import { useEffect, useState } from 'react'
import * as THREE from 'three';
import SceneInit from './lib/SceneInit'
import './App.css'
import { PointerLockControls } from 'three/examples/jsm/Addons.js';
import { texture } from 'three/examples/jsm/nodes/Nodes.js';


function App() {
  const test = new SceneInit();

  useEffect(() => {
    test.init()
    test.animate()

    var loader = new THREE.CubeTextureLoader()
    var path	= "./"
    var format	= '.jpg'
    var urls	= [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ]
	  loader.load(urls, (textureCube) => {
      // textureCube.format = THREE.RGBFormat
      const shader	= THREE.ShaderLib[ "cube" ];
      shader.uniforms[ "tCube" ].value = textureCube;
      const material	= new THREE.ShaderMaterial( {
        fragmentShader	: shader.fragmentShader,
        vertexShader	: shader.vertexShader,
        uniforms	: shader.uniforms,
        side		: THREE.BackSide
      })
      const geometry	= new THREE.BoxGeometry(5000, 500, 500)
      const meshSkybox	= new THREE.Mesh(geometry, material);
      test.scene.add( meshSkybox );
    });
    

    // loader.load([
    //   'px.png',
    //   'nx.png',
    //   'py.png',
    //   'ny.png',
    //   'pz.png',
    //   'nz.png'], (texture) => {

    //   var skyGeometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
    //   var skyMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, envMap: texture, side: THREE.BackSide});
    //   skyMaterial.
    //   var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	  //   test.scene.add( skyBox );
    //   // test.scene.background = texture;
    // });

    var tileLoader = new THREE.TextureLoader();
    tileLoader.setPath("./tile/")

    var box = new THREE.PlaneGeometry(50,50);
    var mat = new THREE.MeshStandardMaterial();

    tileLoader.load('normalMap.png', (texture) => mat.normalMap = texture);
    tileLoader.load('ambientOcclusion.png', (texture) => mat.aoMap = texture)
    tileLoader.load('baseColor.png', (texture) => mat.map = texture)
    tileLoader.load('roughness.png', (texture) => mat.roughnessMap = texture)
    tileLoader.load('height.png', (texture) => mat.displacementMap = texture)
    // mat.displacementScale = 2.0;
    // mat.wireframe = true;
    mat.side = THREE.DoubleSide;
    var mesh = new THREE.Mesh(box,mat);
    mesh.rotateX(-Math.PI/2);
    mesh.position.y =- 15;
    test.scene.add(mesh);
  }) 


  return (
    <>
      <canvas id="myThreeJsCanvas"> </canvas>
    </>
  )
}

export default App