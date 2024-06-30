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
    loader.load([
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png'], (texture) => {

      // var skyGeometry = new THREE.BoxGeometry( 2000, 2000, 2000 );
      // var skyMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, envMap: texture, side: THREE.DoubleSide});
      // var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	    // test.scene.add( skyBox );
    });

    var tileLoader = new THREE.TextureLoader();
    tileLoader.setPath("./tile/")

    var box = new THREE.BoxGeometry(5000,50,5000);
    var mat = new THREE.MeshStandardMaterial();

    tileLoader.load('normalMap.png', (texture) => mat.normalMap = texture);
    tileLoader.load('ambientOcclusion.png', (texture) => mat.aoMap = texture)
    tileLoader.load('baseColor.png', (texture) => mat.map = texture)
    tileLoader.load('roughness.png', (texture) => mat.roughnessMap = texture)
    tileLoader.load('height.png', (texture) => mat.displacementMap = texture)
    // mat.displacementScale = 2.0;
    // mat.wireframe = true;
    

    var mesh = new THREE.Mesh(box,mat);
    mesh.position.y =- 160;
    test.scene.add(mesh);
  }) 


  return (
    <>
      <canvas id="myThreeJsCanvas"> </canvas>
    </>
  )
}

export default App