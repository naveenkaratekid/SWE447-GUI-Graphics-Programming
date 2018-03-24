import * as three from '../Common/three.js';
var images = ["sky.png"];
var txture = three.ImageUtils.loadTextureCube(images);
function setupCar()
{
    var loader = new three.OBJLoader();
    var render = new three.WebGLRenderer();
    render.setSize(window.innerWidth, window.innerHeight);
    loader.load('teslaS.obj', function(object)
    {
        scene.add(object);   
    });
    
    var map = new THREE.TextureLoader().load( "sky.png" );
    var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
    var sprite = new THREE.Sprite( material );
    scene.add( sprite );
}

function moveCar(object)
{
    
}