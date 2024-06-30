import { useEffect, useState } from 'react'
import * as THREE from 'three';
import SceneInit from './lib/SceneInit'
import './App.css'
import { PointerLockControls } from 'three/examples/jsm/Addons.js';


function App() {
  const test = new SceneInit();

  useEffect(() => {
    test.init()
    test.animate()

    const loader = new THREE.CubeTextureLoader()
    loader.load([
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png'], (texture) => {

      var skyGeometry = new THREE.BoxGeometry( 2000, 2000, 2000 );
      var skyMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, envMap: texture, side: THREE.DoubleSide});
      var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	    test.scene.add( skyBox );
    });


    


    var box = new THREE.BoxGeometry(500,50,500);
    var mat = new THREE.MeshBasicMaterial({color : 0xff0000, });
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