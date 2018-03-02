var gl = null;
var cone = null;
var P, V; // P is for the projection transformation, and V is for the viewing transformation

var far = 120;
var near = 10;

var t = 0.0;
var tDelta = 0.0001;


function init() {
    var canvas = document.getElementById( "webgl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    cone = new Cone(gl, 50);
    
    cone.uniforms = 
    {
        P: gl.getUniformLocation(cone.program, "P");
        MV: gl.getUniformLocation(cone.program, "MV");
        
    }
    
    //gl.clearColor( 1.0, 0.0, 1.0, 1.0 );
    gl.clearColor( 0.0, 0.0, 1.0, 1.0 );
    render();
}

function render() {
    t += tDelta;
    var mStack = new MatrixStack();
    var rotationAxis = [0,1,1]; // Rotate along y and z
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    V = translate(0.0,0.0, -0.5 * (near + far));
    mStack.load(V);
    
    var c2 = cone;
    
    //gl.clear( gl.COLOR_BUFFER_BIT );
    cone.render();
    mStack.push();
    mStack.scale(0.5)
    mStack.rotate(25, rotationAxis);
    console.log(mStack.current());
    gl.useProgram(c2.program);
    gl.uniformMatrix4fv(c2.uniforms.MV, false, flatten(mStack.current()));
    gl.uniformMatrix4fv(c2.uniforms.P, false, flatten(P));
    
    c2.render();
    ms.pop();
    
    window.requestAnimationFrame(render);
}

window.onload = init;
