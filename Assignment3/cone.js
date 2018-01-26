var gl = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    var cone = new Cone(gl, 8, "Cone-vertex-shader", "Cone-fragment-shader");

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 1.0, 0.0, 1.0, 1.0 );

    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
}

window.onload = init;
