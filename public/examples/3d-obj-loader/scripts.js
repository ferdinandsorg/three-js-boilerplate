var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 200;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var lightColor = 0;
var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl('+lightColor+', 100%, 70%)'), 0.75);
fillLight.position.set(100, 0, 100);

$("#rangevalue").mousemove(function () {
    lightColor = $("#rangevalue").val();
    console.log("lightColor is "+lightColor);
    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl('+lightColor+', 100%, 70%)'), 0.75);
    fillLight.position.set(100, 0, 100);
})




var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

function getLetter(whichLetter) {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath('/clay-typeface/three-js-boilerplate/public/examples/3d-obj-loader/assets/letters/');
  mtlLoader.setPath('/clay-typeface/three-js-boilerplate/public/examples/3d-obj-loader/assets/letters/');
  mtlLoader.load('letter-'+whichLetter+'.mtl', function (materials) {

      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('/clay-typeface/three-js-boilerplate/public/examples/3d-obj-loader/assets/letters/');
      objLoader.load('letter-'+whichLetter+'.obj', function (object) {



          scene.add(object);
          // object.position.y -= -90;
          // object.geometry.translate(3,2,0);
          // object.position.copy(new THREE.Vector3(3.0, 2, 0.0));
          var box = new THREE.Box3().setFromObject( object );
          box.getCenter( object.position );
          object.geometry.center();

      });

  });
}

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();

var letter = $("#letter").val();
$( "#letter" ).change(function() {
  letter = $("#letter").val();
  getLetter(letter);
});
console.log("letter is "+letter);



getLetter(letter);
