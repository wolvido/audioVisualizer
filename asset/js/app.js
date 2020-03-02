var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 945, window.innerWidth / window.innerHeight, 0.1, 1000 );

let stars, starGeo, geometry;
var listener = new THREE.AudioListener();

// create an Audio source

var sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer

var audioLoader = new THREE.AudioLoader();

audioLoader.load('asset/music/omen.mp3', function (buffer) {

  sound.setBuffer(buffer);

  sound.setLoop(true);

  sound.setVolume(0.5);

});

 // create an AudioAnalyser, passing in the sound and desired fftSize

 var analyser = new THREE.AudioAnalyser(sound, 32);

 // get the average frequency of the sound

 var data = analyser.getAverageFrequency();

 document.getElementById("button").addEventListener("click", play);

 function play() {

   sound.play();

   playing = true;

 }



//textures

var textureMarsh = new THREE.TextureLoader().load('asset/textures/dessertLand2.jpg', function(texture){
   // repeating the texture
   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
   texture.offset.set( 2, 2 );
   texture.repeat.set( 5, 5 );
})


//material



//geometry 




//lighting
const color = 0xFFFFFF;
const intensity = 1.5;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(40, -10, 0);
light.target.position.set(-2, 10, 0);
scene.add(light);
scene.add(light.target);

//Shapes



//rain

//rain geometry
starGeo = new THREE.Geometry();
//

// esssential shit
  for(let i=0;i<6000;i++) {
    star = new THREE.Vector3(
      // x,y,z float
      Math.random() * 600-300,
      Math.random() * 600-300,
      Math.random() * 600-300
    );
    star.velocity = 0;
    star.acceleration = 0.002;
    starGeo.vertices.push(star);
  }

//
  let sprite = new THREE.TextureLoader().load( 'asset/textures/rain.png' );

  // material for rain
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite
  });
  //

  //create it
  stars = new THREE.Points(starGeo,starMaterial);
  //
  
//

scene.add(stars)
//Backgrounds

// cam position
camera.position.z = 10;
camera.position.x = 20;
camera.position.y = 0;

//
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
controls = new THREE.OrbitControls( camera,renderer.domElement);

//

//


function animate() {
   requestAnimationFrame( animate );

//movement
  //  starGeo.vertices.forEach(p => {
  //       p.velocity += p.acceleration
  //       p.y -= p.velocity;
        
  //       if (p.y < -200) {
  //         p.y = 200;
  //         p.velocity = 0;
  //       }
  //     });

  //     starGeo.verticesNeedUpdate = true;
  
  // starGeo.verticesNeedUpdate = true;
  
  stars.rotation.x = 2;
  stars.position.y = analyser.getAverageFrequency();
  stars.position.x = analyser.getAverageFrequency();
//


  console.log(analyser.getAverageFrequency());

  console.log(analyser.getFrequencyData());

   renderer.render( scene, camera );

}

animate();
