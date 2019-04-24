	"use strict";
	//Determine whether the browser supports WebGL
	if (WEBGL.isWebGLAvailable() === false) {
		alert(WEBGL.getWebGLErrorMessage());
	}
	//Some necessary global variables
	var container, clock, camera, scene, renderer, labelRenderer, controls, mixer, actions = {};
	var textureLoader;
	var tempObject, tempPosition, tempScene = [];
	var date = 0;
	var intersects = [],
		INTERSECTED;
	var cancle = document.getElementById('cancle');
	var introduce = document.getElementById('introduce');
	var bgm;
	//set 2dUI
	var labelDiv = document.createElement('div');
	labelDiv.className = 'label';
	var meshLabel = new THREE.CSS2DObject(labelDiv);
	var init = function () {
		container = document.createElement('div');
		container.id = 'container';
		document.body.appendChild(container);
		//scene
		scene = new THREE.Scene();
		skyBox();
		scene.fog = new THREE.Fog(0x558855, 500, 10000);
		//light
		scene.add(new THREE.AmbientLight(0x666666));
		var light = new THREE.DirectionalLight(0xdfebff, 1);
		light.position.set(50, 400, 100);
		light.position.multiplyScalar(3);
		light.castShadow = true;
		light.shadow.mapSize.width = 1024;
		light.shadow.mapSize.height = 1024;
		var d = 2000;
		light.shadow.camera.left = -d;
		light.shadow.camera.right = d;
		light.shadow.camera.top = d;
		light.shadow.camera.bottom = -d;
		light.shadow.camera.far = 1800;
		scene.add(light);
		//render
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.shadowMap.enabled = true;
		labelRenderer = new THREE.CSS2DRenderer();
		labelRenderer.setSize(window.innerWidth, window.innerHeight);
		labelRenderer.domElement.style.position = 'absolute';
		labelRenderer.domElement.style.top = 0;
		container.appendChild(labelRenderer.domElement);
		//camera
		camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.set(-55, 1244, -2000);
		//controls
		controls = new THREE.OrbitControls(camera, container);
		controls.autoRotate = true;
		controls.dispose();
		clock = new THREE.Clock();
		textureLoader = new THREE.TextureLoader();
		//set animation
		mixer = new THREE.AnimationMixer(scene);
		//Loading models
		var loader = new THREE.GLTFLoader();
		loader.load('gltf/animals.gltf', function (gltf) {
			var models = gltf.scene;
			models.scale.set(100, 100, 100);
			var nodes = models.children[0].children;
			for (var i = 0, l = nodes.length; i < l; i++) {
				var str = nodes[i].name;
				var name = str.substring(str.indexOf("_") + 1, str.lastIndexOf("_"));
				if (name !== 'Panda') {
					nodes[i].traverse(function (child) {
						if (child.isMesh) {
							child.name = name;
							child.material.envMap = scene.background;
							child.castShadow = true;
							child.receiveShadow = true;
						}
					});
				} else {
					nodes[i].children[2].name = 'Panda';
				}
				intersects.push(nodes[i]);
			}
			scene.add(models);
			//play the animals' animations
			var animations = gltf.animations;
			actions['Spider'] = mixer.clipAction(animations[0]); //0-6
			actions['Horse'] = mixer.clipAction(animations[7]); //7-10
			actions['Fish'] = mixer.clipAction(animations[11]);
			actions['Giraffe'] = mixer.clipAction(animations[13]); //12-15
			actions['Elephant'] = mixer.clipAction(animations[17]); //16-19
			actions['Snake'] = mixer.clipAction(animations[20]); //20-22
			actions['Penguin'] = mixer.clipAction(animations[23]); //23-26
			actions['Shark'] = mixer.clipAction(animations[28]); //27-29
			actions['Cow'] = mixer.clipAction(animations[31]); //30-33
			actions['Seagul'] = mixer.clipAction(animations[35]); //34-35
			animate();
			actions['Spider'].play();
			actions['Horse'].play();
			actions['Fish'].play();
			actions['Giraffe'].play();
			actions['Elephant'].play();
			actions['Snake'].play();
			actions['Penguin'].play();
			actions['Shark'].play();
			actions['Cow'].play();
			actions['Seagul'].play();
			date += 1;
		});
		loader.load('gltf/scenes.gltf', function (gltf) {
			var models = gltf.scene;
			models.scale.set(100, 100, 100);
			var nodes = models.children[0].children;
			for (var i = 0, l = nodes.length; i < l; i++) {
				var name = 'scene_' + i;
				nodes[i].name = name;
				nodes[i].traverse(function (child) {
					if (child.isMesh) {
						child.name = name;
						child.material = child.material.clone();
						child.material.envMap = scene.background;
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				intersects.push(nodes[i]);
			}
			scene.add(models);
			date += 1;
		});
		//load the bgm
		var listener = new THREE.AudioListener();
		camera.add(listener);
		new THREE.AudioLoader().load('audio/Music Life In Forest.mp3', function (buf) {
			bgm = new THREE.Audio(listener);
			bgm.setBuffer(buf);
			bgm.setLoop(true);
			date += 1;
		});
		tempPosition = new THREE.Vector3();
		//Binding events
		window.addEventListener('resize', onWindowResize, false);
		container.addEventListener('mousedown', onMouseDown, false);
		container.addEventListener('mousemove', onMouseMove, false);
	};
	//load the scene
	(function () {
		var blocker = document.getElementById('blocker');
		var loading = document.getElementById('loading');
		var time = window.setInterval(function () {
			if (date === 3) {
				loading.classList.remove('pulse');
				loading.classList.remove('infinite');
				loading.classList.add('rollOut');
				blocker.addEventListener("webkitAnimationEnd", function () {
					blocker.innerHTML = '<button id="startButton">Click to Play</button>';
					document.getElementById('startButton').addEventListener('click', function () {
						document.getElementById('pick').style.display = 'block';
						blocker.classList.add('fadeOut');
						blocker.remove();
						bgm.play();
					}, false);
				}, false);
				window.clearInterval(time);
				date = null;
				//return event
				cancle.addEventListener('click', function () {
					if (controls.isConnect) {
						if (cancle.classList.contains('fadeIn')) cancle.classList.remove('fadeIn');
						cancle.classList.add('fadeOut');
						for (var action in actions) {
							actions[action].stop();
						}
						var s = {
							x: controls.object.position.x,
							y: controls.object.position.y,
							z: controls.object.position.z
						};
						var e = {
							x: tempPosition.x,
							y: tempPosition.y,
							z: tempPosition.z
						};
						var tween = new TWEEN.Tween(s).to(e, 3000);
						tween.easing(TWEEN.Easing.Quadratic.Out);
						tween.onUpdate(function () {
							controls.object.position.set(this.x, this.y, this.z);
							controls.update();
						});
						tween.start();
						tween.onComplete(function () {
							console.log(tempScene);
							sceneVis(function () {
								container.addEventListener('mousemove', onMouseMove, false);
								var s = {
									x: controls.target.x,
									y: controls.target.y,
									z: controls.target.z
								};
								var e = {
									x: 0,
									y: 0,
									z: 0
								};
								var tweenA = new TWEEN.Tween(s).to(e, 500);
								tweenA.easing(TWEEN.Easing.Quadratic.Out);
								tweenA.onUpdate(function () {
									controls.target.set(this.x, this.y, this.z);
									controls.update();
								});
								tweenA.start();
								tweenA.onComplete(function () {
									controls.reset();
									controls.dispose();
									controls.object.position.copy(tempPosition);
									controls.autoRotate = true;
									controls.update();
								});
							});
						});
					}
				}, false);
			}
		}, 500);
		init();
	})();
	//Window change redrawing
	function onWindowResize() {
			var w = window.innerWidth,
				h = window.innerHeight;
			renderer.setSize(w, h);
			labelRenderer.setSize(w, h);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
		}
		//Circular rendering

	function animate() {
			requestAnimationFrame(animate);
			render();
		}

		//render
	function render() {
			var delta = clock.getDelta();
			controls.update(delta);
			mixer.update(delta);
			TWEEN.update();
			renderer.render(scene, camera);
			labelRenderer.render(scene, camera);
		}
		//set the skybox

	function skyBox() {
			var path = "img/";
			var format = '.jpg';
			var urls = [path + 'px' + format, path + 'nx' + format, path + 'py' + format, path + 'ny' + format, path + 'pz' + format, path + 'nz' + format];
			var textureCube = new THREE.CubeTextureLoader().load(urls);
			scene.background = textureCube;
			textureCube.dispose();
		}
		//set 2dUIcss

	function set2DCSS(Div, name, left, top) {
			Div.innerText = name;
			Div.style.top = top + "px";
			Div.style.left = left + "px";
		}
		//Mouse interaction
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();

	function getIntersect(point) {
		mouse.set((point.x * 2) - 1, -(point.y * 2) + 1);
		raycaster.setFromCamera(mouse, camera);
		return raycaster.intersectObjects(intersects, true)
	}
	var onDownPosition = new THREE.Vector2();
	var onMovePosition = new THREE.Vector2();
	var onUpPosition = new THREE.Vector2();

	function getMousePosition(dom, x, y) {
			var rect = dom.getBoundingClientRect();
			return [(x - rect.left) / rect.width, (y - rect.top) / rect.height]
		}

		//Click Event Method
	function handleClick() {
		if (onDownPosition.distanceTo(onUpPosition) < 1.5) {
				var intersects = getIntersect(onUpPosition);
				if (intersects.length > 0) {
					var object = intersects[0].object;
					if (object) {
						switch (object.name) {


						default:
							set2DCSS(labelDiv, object.name, 0, -100);
							tempObject = object;
							object.add(meshLabel);
							switch (object.name) {
							case 'Penguin':
								introduce.innerHTML = "Penguins are the biggest birds which can't fly in the earth，mainly living in Southern hemisphere.";
								break;
							case 'Shark':
								introduce.innerHTML = "The shark, considered by some to be one of the most ferocious fishes in the sea.";
								break;
							case 'Seagul':
								introduce.innerHTML = "Seagulls are birds in the family Laridae.";
								break;
							case 'Fish':
								introduce.innerHTML = "Fish is a water-dwelling vertebrate with gills that doesn't change form.";
								break;
							case 'Giraffe':
								introduce.innerHTML = "Giraffes are one of the world's tallest mammals.";
								break;
							case 'Spider':
								introduce.innerHTML = "Spiders are air-breathing arthropods that have eight legs and chelicerae with fangs that inject venom.";
								break;
							case 'Elephant':
								introduce.innerHTML = "Elephants are the largest land-dwelling social mammals in the world.";
								break;
							case 'Panda':
								introduce.innerHTML = "Pandas are one of the most precious animals in the world.";
								break;
							case 'Horse':
								introduce.innerHTML = "The horse is a large odd-toed ungulate mammal,one of ten living species of the family Equidae.";
								break;
							case 'Cow':
								introduce.innerHTML = "Cow is a kind of mammal.";
								break;
							case 'Snake':
								introduce.innerHTML = "Snakes are a general term for degenerated reptiles of limbs, belonging to the order Reptilia.";
								break;
							default:
								introduce.innerHTML = '';
								break;
							}
							introduce.style.display = 'block';
							if (introduce.classList.contains('fadeOut')) introduce.classList.remove('fadeOut');
							introduce.classList.add('fadeIn');
							break;
						}
					}
				} else {
					if (tempObject) {
						tempObject.remove(meshLabel);
						if (introduce.classList.contains('fadeIn')) introduce.classList.remove('fadeIn');
						introduce.classList.add('fadeOut');
					}
				}
			}
		}



	function onMouseDown(event) {
		event.preventDefault();
		var array = getMousePosition(container, event.clientX, event.clientY);
		onDownPosition.fromArray(array);
		container.addEventListener('mouseup', onMouseUp, false);
	}

	function onMouseMove(event) {
		event.preventDefault();
		var array = getMousePosition(container, event.clientX, event.clientY);
		onMovePosition.fromArray(array);
		handleMove();
	}

	function onMouseUp(event) {
		event.preventDefault();
		var array = getMousePosition(container, event.clientX, event.clientY);
		onUpPosition.fromArray(array);
		handleClick();
		container.removeEventListener('mouseup', onMouseUp, false);
	}
