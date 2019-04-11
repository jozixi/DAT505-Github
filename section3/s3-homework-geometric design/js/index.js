//Global variables
var scene, camera, renderer;
var geometry,geometry1,geometry2, material,material, mesh1,mesh2,texture1;
var de2ra =function(degree){
  console.log(degree*Math.PI/180);
  return degree*(Math.PI/180);
};

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
var material7 = new THREE.MeshBasicMaterial( { color: "#009999" } );
var material8 = new THREE.MeshBasicMaterial( { color: "#66cccc" } );
var material9 = new THREE.MeshBasicMaterial( { color: "#ccffff" } );


function geometry(){
  // Create a Cube Mesh with basic material ---------
/*  geometry1 = new THREE.CylinderGeometry(100, 100,30,100,100);
  //material = new THREE.MeshBasicMaterial( { map:texture1 } );
  mesh1 = new THREE.Mesh( geometry1, material5 );
  mesh1.position.set(1,1,1);
  mesh1.position.z = -1000;
  mesh1.rotation.set(1,300,300);*/

//var mesh1 = new THREE.Mesh( geometry1, material5 );

  // Add mesh to scene
  geometry1= new THREE.TorusGeometry(141,4, 4,4);
   //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
   mesh1 = new THREE.Mesh( geometry1, material7 );
   mesh1.position.set(0,0,0);
   mesh1.position.z = -1000;
   mesh1.rotation.z = 150;

 geometry2= new THREE.TorusGeometry(282,4, 4,4);
    //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
    mesh2 = new THREE.Mesh( geometry2, material8 );
    mesh2.position.set(0,0,0);
    mesh2.position.z = -1000;
    mesh2.rotation.z = 150;

 geometry3= new THREE.TorusGeometry(100,4, 50,50);
  //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
  mesh3 = new THREE.Mesh( geometry3, material8 );
  mesh3.position.set(0,0,0);
  mesh3.position.z = -1000;

  /*geometry3= new THREE.CubeGeometry(200,200, 200);
material3 = new THREE.MeshBasicMaterial( { wireframe:true,
  color: "#0066cc" } );
mesh3 = new THREE.Mesh( geometry3, material3 );
mesh3.position.set(0,0,0);
mesh3.position.z = -1000;*/

geometry4= new THREE.TorusGeometry(100,4, 50,50);
 //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
 mesh4 = new THREE.Mesh( geometry4, material7 );
 mesh4.position.set(100,0,0);
 mesh4.position.z = -1000;

 geometry5= new THREE.TorusGeometry(100,4, 50,50);
  //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
  mesh5 = new THREE.Mesh( geometry5, material7 );
  mesh5.position.set(-100,0,0);
  mesh5.position.z = -1000;


  geometry6= new THREE.TorusGeometry(100,4, 50,50);
   //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
   mesh6 = new THREE.Mesh( geometry6, material7 );
   mesh6.position.set(0,100,0);
   mesh6.position.z = -1000;

   geometry7= new THREE.TorusGeometry(100,4, 50,50);
    //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
    mesh7 = new THREE.Mesh( geometry7, material7 );
    mesh7.position.set(0,-100,0);
    mesh7.position.z = -1000;

    geometry8= new THREE.TorusGeometry(100,4, 4,4);
     //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
     mesh8 = new THREE.Mesh( geometry8, material8 );
     mesh8.position.set(0,0,0);
     mesh8.position.z = -1000;

     geometry9= new THREE.TorusGeometry(200,4, 4,4);
      //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
      mesh9 = new THREE.Mesh( geometry9, material8 );
      mesh9.position.set(0,0,0);
      mesh9.position.z = -1000;

      geometry10= new THREE.TorusGeometry(50,4, 50,50);
       //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
       mesh10 = new THREE.Mesh( geometry10, material8 );
       mesh10.position.set(100,-100,0);
       mesh10.position.z = -1000;

       geometry11= new THREE.TorusGeometry(50,4, 50,50);
        //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
        mesh11 = new THREE.Mesh( geometry11, material8 );
        mesh11.position.set(100,100,0);
        mesh11.position.z = -1000;

        geometry12= new THREE.TorusGeometry(50,4, 50,50);
         //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
         mesh12 = new THREE.Mesh( geometry12, material8 );
         mesh12.position.set(-100,100,0);
         mesh12.position.z = -1000;

         geometry13= new THREE.TorusGeometry(50,4, 50,50);
          //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
          mesh13 = new THREE.Mesh( geometry13, material8 );
          mesh13.position.set(-100,-100,0);
          mesh13.position.z = -1000;

          geometry14= new THREE.TorusGeometry(100,4, 4,4);
           //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
           mesh14 = new THREE.Mesh( geometry14, material8 );
           mesh14.position.set(0,-100,0);
           mesh14.position.z = -1000;

           geometry15= new THREE.TorusGeometry(100,4, 4,4);
            //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
            mesh15 = new THREE.Mesh( geometry15, material8 );
            mesh15.position.set(0,100,0);
            mesh15.position.z = -1000;

            geometry16= new THREE.TorusGeometry(100,4, 4,4);
             //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
             mesh16 = new THREE.Mesh( geometry16, material8 );
             mesh16.position.set(100,0,0);
             mesh16.position.z = -1000;

             geometry17= new THREE.TorusGeometry(100,4, 4,4);
              //material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
              mesh17 = new THREE.Mesh( geometry17, material8 );
              mesh17.position.set(-100,0,0);
              mesh17.position.z = -1000;

geometry18= new THREE.TorusGeometry(141,4, 4,4);
//material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
mesh18 = new THREE.Mesh( geometry18, material8 );
mesh18.position.set(100,100,0);
mesh18.position.z = -1000;
mesh18.rotation.z = 150;


geometry19= new THREE.TorusGeometry(141,4, 4,4);
//material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
mesh19 = new THREE.Mesh( geometry19, material8 );
mesh19.position.set(-100,100,0);
mesh19.position.z = -1000;
mesh19.rotation.z = 150;


geometry20= new THREE.TorusGeometry(141,4, 4,4);
//material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
mesh20 = new THREE.Mesh( geometry20, material8 );
mesh20.position.set(100,-100,0);
mesh20.position.z = -1000;
mesh20.rotation.z = 150;


geometry21= new THREE.TorusGeometry(141,4, 4,4);
//material2 = new THREE.MeshBasicMaterial( { color: "#ff9f8b" } );
mesh21 = new THREE.Mesh( geometry21, material8 );
mesh21.position.set(-100,-100,0);
mesh21.position.z = -1000;
mesh21.rotation.z = 150;




  // Add mesh to scene
    scene.add( mesh1 );
scene.add( mesh2 );
  scene.add( mesh3 );
    scene.add( mesh4 );
    scene.add( mesh5 );
    scene.add( mesh6 );
    scene.add( mesh7 );
    scene.add( mesh8 );
    scene.add( mesh9 );
scene.add( mesh10 );
scene.add( mesh11 );
scene.add( mesh12 );
scene.add( mesh13 );
scene.add( mesh14 );
scene.add( mesh15 );
scene.add( mesh16 );
scene.add( mesh17 );
scene.add( mesh18 );
scene.add( mesh19 );
scene.add( mesh20 );
scene.add( mesh21 );
}


// Render Loop
var render = function () {
  requestAnimationFrame( render );

/*  mesh1.rotation.x += 0.01; //Continuously rotate the mesh
  mesh1.rotation.y += 0.01;
  mesh2.rotation.z += 0.02; //Continuously rotate the mesh
 mesh2.rotation.y += 0.02;
 mesh3.rotation.z += 0.01; //Continuously rotate the mesh
mesh3.rotation.y += 0.01;
*/

  renderer.setClearColor("#ccffff");

  // Render the scene
  renderer.render(scene, camera);
};


init();
geometry();
render();
