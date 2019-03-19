//Global variables
var scene, camera, renderer;
var geometry1,geometry2, material,material, mesh1,mesh2,border,i,j,k;
var detail = 1;

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

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry1 = new THREE.IcosahedronBufferGeometry(150);
  material = new THREE.MeshNormalMaterial({color:"#ff00ff"} );
  mesh1 = new THREE.Mesh( geometry1, material );
  mesh1.position.set(0,0,0);
  mesh1.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh1 );


  geometry2= new THREE.IcosahedronBufferGeometry(200,detail = 1);
  material2 = new THREE.MeshBasicMaterial( { wireframe:true,transparent:true,
    color: "#00e4ff" } );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.set(1,1,1);
  mesh2.position.z = -800;


  scene.add( mesh2 );
}


// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh1.rotation.x += 0.01; //Continuously rotate the mesh
  mesh1.rotation.y += 0.01;
  mesh2.rotation.x += 0.01; //Continuously rotate the mesh
  mesh2.rotation.y += 0.01;


  renderer.setClearColor("#ccffff");

  // Render the scene
  renderer.render(scene, camera);
};





init();
geometry();
render();
