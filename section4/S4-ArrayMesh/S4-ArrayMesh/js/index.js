var renderer, scene, camera;
var controls;
var cubes = [];
var rot = 0;

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(20, 50, 85);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0,1000,0);
  ambLight.add(spotLight);
  scene.add(ambLight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -15; x <= 10; x += 5) { // Start from -45 and sequentially add one every 5 pixels
    for (var y = -15; y <= 10; y += 5) {
        for (var z= -15; z <= 10; z += 5) {

//Concatenation of the x and y values (open console to see)
console.log("X:" +x+ ",Y : " +y+ ",Z:" +z);

      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      var boxMaterial = new THREE.MeshLambertMaterial({color:  0xE79796});
      //The color of the material is assigned a random color

 if (x >= 0 && y >= 0 && z >= 0){
   boxMaterial = new THREE.MeshLambertMaterial({color: 0x86E3CE});
 } else if ( x >= 0 && y >=0 && z <= 0){
   boxMaterial = new THREE.MeshLambertMaterial({color: 0xF56A79});
 } else if ( x >= 0 && y <=0 && z < 0){
   boxMaterial = new THREE.MeshLambertMaterial({color: 0xFF414D});
 } else if ( x >= 0 && y <=0 && z >= 0){
   boxMaterial = new THREE.MeshLambertMaterial({color: 0x1AA687});
  } else if ( x <= 0 && y >=0 && z >= 0){
    boxMaterial = new THREE.MeshLambertMaterial({color: 0x002D40});
  } else if ( x <= 0 && y >=0 && z <= 0){
    boxMaterial = new THREE.MeshLambertMaterial({color: 0xFA897B});
  } else if ( x <= 0 && y <=0 && z >= 0){
    boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFDD94});
  }

/*if (x >= 0 && y >= 0){
  var boxMaterial = new THREE.MeshLambertMaterial({color:  0xFF00FF});
}

if (x >= 0 && y <= 0){
  var boxMaterial = new THREE.MeshLambertMaterial({color:  0xFF0000});
}

if (x <= 0 && y >= 0){
  var boxMaterial = new THREE.MeshLambertMaterial({color:  0x0000FF});
}

if (x <= 0 && y <= 0){
  var boxMaterial = new THREE.MeshLambertMaterial({color:  0x00FF00});
}
*/

    //  var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;
      mesh.position.x = x;
      mesh.position.z = z;
        mesh.position.y = y;
    //  mesh.scale.y = 0.5;
      scene.add(mesh);
      cubes.push(mesh);

}
}
}
//}
  /*for (var x = -50; x <= 50; x += 5) { // Start from -45 and sequentially add one every 5 pixels
    //for (var y = -30; y <= 30; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 6, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      var mesh2 = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;
      mesh2.position.x = x;
      mesh2.position.y = 5;
      mesh2.position.z = 0;
      mesh2.scale.y = 0.5;
      scene.add(mesh2);
  }*/


  document.body.appendChild(renderer.domElement);

}
function drawFrame(){
  requestAnimationFrame(drawFrame);
rot += 0.01;

cubes.forEach(function(c,i){
  c.rotation.x = rot;
  c.rotation.y = rot;
});

  renderer.render(scene, camera);
}



init();
drawFrame();
render();
