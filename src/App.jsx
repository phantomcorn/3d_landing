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


    const geo = new THREE.SphereGeometry(1);
    const map = new THREE.MeshPhongMaterial({color: 0xff0000});
    const mesh = new THREE.Mesh(geo,map);
    test.scene.add(mesh);

  })  


  return (
    <>
      <canvas id="myThreeJsCanvas"> </canvas>
    </>
  )
}

export default App