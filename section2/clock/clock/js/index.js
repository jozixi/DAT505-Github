//Global variables
var scene, camera, renderer;
var geometry1,geometry2, material,material, mesh1,mesh2,texture1;

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}
var texture1 = new THREE.TextureLoader().load( 'textures/brush.jpg' );
var material5 = new THREE.MeshBasicMaterial( { map: texture1 } );

var texture2 = new THREE.TextureLoader().load( 'textures/colors.png' );
var material6 = new THREE.MeshBasicMaterial( { map: texture2 } );

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry1 = new THREE.CylinderGeometry(100, 100,30,100,100);
  //material = new THREE.MeshBasicMaterial( { map:texture1 } );
  mesh1 = new THREE.Mesh( geometry1, material5 );
  mesh1.position.set(1,1,1);
  mesh1.position.z = -1000;
  mesh1.rotation.set(1,300,300);

//var mesh1 = new THREE.Mesh( geometry1, material5 );

  // Add mesh to scene
  scene.add( mesh1 );
  geometry2= new THREE.TorusGeometry(105,4, 50,50);
  //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
  mesh2 = new THREE.Mesh( geometry2, material6 );
  mesh2.position.set(1,1,1);
  mesh2.position.z = -1000;

  geometry3= new THREE.CubeGeometry(200,200, 200);
material3 = new THREE.MeshBasicMaterial( { wireframe:true,
  color: "#0066cc" } );
mesh3 = new THREE.Mesh( geometry3, material3 );
mesh3.position.set(1,1,1);
mesh3.position.z = -800;

  // Add mesh to scene
  scene.add( mesh2 );
  scene.add( mesh3 );
}


// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh1.rotation.x += 0.01; //Continuously rotate the mesh
  mesh1.rotation.y += 0.01;
  mesh2.rotation.z += 0.02; //Continuously rotate the mesh
 mesh2.rotation.y += 0.02;
 mesh3.rotation.z += 0.01; //Continuously rotate the mesh
mesh3.rotation.y += 0.01;

  renderer.setClearColor("#99ccff");

  // Render the scene
  renderer.render(scene, camera);
};


init();
geometry();
render();
