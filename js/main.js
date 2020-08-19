let scene, camera, renderer, animation, mixer, clock, mesh;

function init(){

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        1000
    );
    
    renderer = new THREE.WebGLRenderer( { antialias: true});
    
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    const loader = new THREE.GLTFLoader();
    clock = new THREE.Clock();
    scene.background = new THREE.Color( 0xf0f0f0 );

    
    loader.load(
        'models/animationnn.glb',

        function ( gltf ) {
            mesh = gltf.scene.children[2] ;
            mesh.position.z=2;
            mesh.position.y= -0.7;
            
            animation = gltf.animations; // Array<THREE.AnimationClip>
            // gltf.scene; // THREE.Group
            // gltf.scenes; // Array<THREE.Group>
            // gltf.cameras; // Array<THREE.Camera>
            // gltf.asset; // Object
            
            
            scene.add( mesh );
            mixer = new THREE.AnimationMixer(mesh);
            
            mixer.clipAction(animation[0]).play();
            
            
    
        },
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        function ( error ) {
            
            console.log( 'An error happened', error);
    
        }
    );
    
    const light = new THREE.PointLight( 0xf0f0f0, 2, 50 );
    const light2 = new THREE.PointLight( 0xffffff, 20, 100 );
    const light3 = new THREE.PointLight( 0x0000ff, 20, 100 );

    const lightamb = new THREE.AmbientLight( 0xffffff, 2); // soft white light
    scene.add( lightamb );
    
    // const Txtloader = new THREE.TextureLoader();
    // const bgTexture = Txtloader.load('images/background.jpg');
    // scene.background = bgTexture;
    
    // light.position.set( 0, 4, 5 );
    // scene.add( light );
    
    // light2.position.set( 0, 0, -5 );
    // scene.add( light2 );
    // light3.position.set( 0, 5, 5 );
    // scene.add( light2 );
    camera.position.z = 5;
    // const controls = new THREE.OrbitControls(camera);
    // controls.addEventListener('change', renderer);
}




function animate() {
    requestAnimationFrame(animate);
    const deltaTime = clock.getDelta();
    if(mixer){
        mixer.update(deltaTime);
        mesh.rotation.z+= 0.01;
    }

    
    
    renderer.render( scene, camera );
}

function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);


init();
animate();