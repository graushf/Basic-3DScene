var gl;

// Camera
var myCamera;
var lastX;
var lastY;
var firstMouse = true;
var enableMouse = true;
var mouseDown = false;

// DeltaTime
var deltaTime = 0.0;    // Time between current frame and last frame
var lastFrame = 0.0;    // Time of last frame

// Lighting 
var lightPos = vec3.fromValues(10.0, 0.0, 0.0);
var lightPointPos = vec3.fromValues(10.0, 10.0, 15.0);

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

function computeDeltaTime() {
    var currentFrame = new Date().getTime();
    deltaTime = (currentFrame - lastFrame)/100;
    lastFrame = currentFrame;
}


function tick() 
{
    requestAnimFrame(tick);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawScene(shaderProgramBasic);

    handleKeys();
    computeDeltaTime();
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
    setupRabbitGeometry();
    setupDragonGeometry();
    setupSuzanneGeometry();
    setupScreenFillingGeometry();
}

function webGLStart() 
{
    var canvas = document.getElementById("WebGLCanvas");
    initGL(canvas);

    initCamera();
    setupScene();
    setupShadersScene();
    initTextures();

    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;

    tick();
}