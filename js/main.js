var gl;

// Camera
var myCamera;
var lastX;
var lastY;
var firstMouse = true;
var enableMouse = false;

function initGL(canvas) 
{
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

function tick() 
{
    requestAnimFrame(tick);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawScene(shaderProgramBasic);
}

function setupScene() {
    setupPlaneGeometry();
    setupTeapotGeometry();
    setupSphereGeometry();
    setupCubeGeometry();
    setupRingGeometry();
    setupTorusGeometry();
    setupCylinderGeometry();
    setupConeGeometry();
}

function webGLStart() 
{
    var canvas = document.getElementById("WebGLCanvas");
    initGL(canvas);

    initCamera();
    setupScene();
    setupShadersScene();

    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    tick();
}