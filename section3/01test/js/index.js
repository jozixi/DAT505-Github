var scene, camera, renderer;
var geometry, material, mesh;
var de2ra =function(degree){
  return degree*(Math.PI/180);
};

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );

  // Create a Cube Mesh with basic material ---------
  var geometry = new THREE.BoxGeometry(100, 100, 100);

  // MATERIAL 1:
  //var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );

  //MATERIAL 2:
  var material = new THREE.MeshBasicMaterial({color:"#ff00ff"});

  //MATERIAL 3:
  /*
  var material = new THREE.MeshLambertMaterial({
    color: "#433F81",
    transparent: true,
    opacity: 1
  });
  */

//MATERIAL 4:
//var material = new THREE.MeshPhongMaterial({shininess: 1});

//MATERIAL 5 (non-shiny material):
/*
var material = new THREE.MeshLambertMaterial({
  color: 0xF3FFE2,
  lightMap: null,
  lightMapIntensity: 1,
  emissive: 0x000000,
  emissiveMap: null,
  emissiveIntensity: 1,
  specularMap: null
});
*/

/*
//MATERIAL 6 (shiny material):
var material = new THREE.MeshPhongMaterial({
  color: 0xF3FFE2,
  specular: 0xffffff,
  shininess: 1000,
  lightMap: null,
  lightMapIntensity: 1,
  bumpMap: null,
  bumpScale: 1,
  normalMap: null,
  normalScale: 1,
  displacementMap: null,
  displacementScale: 1,
  displacementBias: 0,
  specularMap: null
});
*/

/*
//MATERIAL 7 (combination of shiny + non-shinny):
var material = new THREE.MeshStandardMaterial({
  color: 0xF3FFE2,
  roughness: 0.5,
  metalness: 0.5
});
*/

/*
//MATERIAL 8 (physical-based material)
var material = new THREE.MeshPhysicalMaterial({
  color: 0xF3FFE2,
  roughness: 0,
  metalness: 0.5,
  reflectivity: 0.5,
  clearCoat: 0,
  claerCoatRoughness: 0
});
*/

mesh = new THREE.Mesh( geometry, material );
mesh.position.z = -1000;
// ------------------------------------------------

// Add mesh to scene
scene.add( mesh );

var controller = new function(){
  this.scaleX = 1;
    this.scaleY = 1;
      this.scaleZ= 1;
        this.positionX=0;
        this.positionY = 0;
            this.positionZ= 0;
            this.rotationX=0;
            this.rotationY = 0;
                this.rotationZ= 0;
}
var gui = new dat.GUI();

var f1 = gui.addFolder('Scale');
var f2 = gui.addFolder('Position');
var f3 = gui.addFolder('Roation');

f1.add(controller,'scaleX',0.1,5).onChange( function(){
  mesh.scale.x= (controller.scaleX);
});
f1.add(controller,'scaleY',0.1,5).onChange( function(){
    mesh.scale.y= (controller.scaleY);
  });
f1.add(controller,'scaleZ',0.1,5).onChange( function(){
   mesh.scale.z= (controller.scaleZ);
    });
    f2.add(controller,'positionX',-500,500).onChange( function(){
      mesh.position.x= (controller.positionX);
    });
    f2.add(controller,'positionY',-500,500).onChange( function(){
        mesh.position.y= (controller.positionY);
      });
    f2.add(controller,'positionZ',-5000,5000).onChange( function(){
          mesh.position.z= (controller.positionZ);
        });
        f3.add(controller,'rotationX',-180,180).onChange( function(){
          mesh.rotation.x= de2ra(controller.rotationX);
        });
        f3.add(controller,'rotationY',-180,1800).onChange( function(){
            mesh.rotation.y= de2ra(controller.rotationY);
          });
        f3.add(controller,'rotationZ',-180,180).onChange( function(){
              mesh.rotation.z= de2ra(controller.rotationZ);
            });
}






// Render Loop
var render= function() {
  requestAnimationFrame( render );

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

init();
render();
