var gl = null;
var cone = null;
var M, V; // P is for the projection transformation, and V is for the viewing transformation
var angle = 0;
var angleD = 0;
var S = undefined;
M = undefined;
V = undefined;
var far = 10;
var near = 1;
var t = 0.0;
var tDelta = 0.0001;
var isMouseClickedDown = false;
var lastLocationOfXMouse = null;
var lastLocationOfYMouse = null;
var valueInZ = -0.5*(near + far);
var offset = [0,0,0];
var axisOfRotation = undefined;
var axisX = [1,0,0];
var axizY = [0,1,0];
var velocity = 1;
var stopRotation = 0;


function init() {
    var canvas = document.getElementById( "webgl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }
    document.getElementById("cBox").onClick = function()
    {
        if(document.getElementById("cBox").checked == true)
        {
            angleD = 0;
            stopRotation = 1;
        }
        else
        {
            angleD = 2;
            //stopRotation = 0;
        }
    }
    
    document.getElementById("xButton").onClick = function()
    {
        axisOfRotation = axisX;
    }
    
    document.getElementById("yButton").onClick = function()
    {
        axisOfRotation = axisY;
    }
    
    document.getElementById("slider").onChange = function()
    {
        velocity = event.target.value / 10;
    }
    canvas.onmousedown = function handleMousePressedDown(evt)
    {
        isMouseClickedDown = true;
        lastLocationOfXMouse = evt.clientX;
        lastLocationOfYMouse = evt.clientY;
        
    }
    
    canvas.onmouseup = function handleMousePressedUp(evt)
    {
        isMouseClickedDown = false;
        if(stopRotation)
        {
            angleD = 0;
            return ;
        }
        
    }
    
    canvas.onmouseup = function handleMouseMoved(evt)
    {
        if(!mouseDown)
        {
            if(stopRotation)
            {
                angleD = 0;
                return ;
            }
        }
        var newLocX = evt.clientX;
        var newLocY = evt.clientY;

        var changeInX = newLocX - lastLocationOfXMouse;
        var changeInY = newLocY - lastLocationOfYMouse;
        angleD = degreeToRadians(changeInX + changeInY) * 5 * Math.PI;
        lastLocationOfXMouse = newLocX;
        lastLocationOfYMouse = newLocY;   
    }
    
    cone = new Cone(gl);
    
   /* cone.uniforms = 
    {
        P: gl.getUniformLocation(cone.program, "P");
        MV: gl.getUniformLocation(cone.program, "MV");
        
    }*/
    
    //gl.clearColor( 1.0, 0.0, 1.0, 1.0 );
    gl.clearColor( 0.0, 0.0, 1.0, 1.0 );
    gl.enable(gl.DEPTH_TEST);
    //render();
    resize();
    window.requestAnimationFrame(render);
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
    mStack.pop();
    
    window.requestAnimationFrame(render);
}

function degreeToRadians(deg)
{
    return deg * Math.PI / 180;   
}

window.onload = init;
window.resize = resize;
