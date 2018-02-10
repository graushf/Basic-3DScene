var planeVertexPositionBuffer;
var planeVertexNormalBuffer;
var planeVertexTextureCoordBuffer;
var planeVertexIndexBuffer;

var teapotPositionBuffer;
var teapotVertexNormalBuffer;
var teapotVertexTextureCoordBuffer;
var teapotVertexIndexBuffer;

var sphereVertexPositionBuffer;
var sphereVertexNormalBuffer;
var sphereVertexTextureCoordBuffer;
var sphereVertexIndexBuffer;

var cubeVertexPositionBuffer;
var cubeVertexNormalBuffer;
var cubeVertexTextureCoordBuffer;
var cubeVertexIndexBuffer;

var ringVertexPositionBuffer;
var ringVertexNormalBuffer;
var ringVertexTextureCoordBuffer;
var ringVertexIndexBuffer;

var torusVertexPositionBuffer;
var torusVertexNormalBuffer;
var torusVertexTextureCoordBuffer;
var torusVertexIndexBuffer;

var cylinderVertexPositionBuffer;
var cylinderVertexNormalBuffer;
var cylinderVertexTextureCoordBuffer;
var cylinderVertexIndexBuffer;

var coneVertexPositionBuffer;
var coneVertexNormalBuffer;
var coneVertexTextureCoordBuffer;
var coneVertexIndexBuffer;

var rabbitVertexNormalBuffer;
var rabbitVertexPositionBuffer;

var dragonVertexNormalBuffer;
var dragonVertexPositionBuffer;

var suzanneVertexNormalBuffer;
var suzanneVertexPositionBuffer;

var screenFillingVertexPositionBuffer;
var screenFillingTextureCoordBuffer;
var screenFillingIndexBuffer;

function setupPlaneGeometry() 
{
    planeVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexNormalBuffer);
    var normals = [
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    planeVertexNormalBuffer.itemSize = 3;
    planeVertexNormalBuffer.numItems = 4;

    planeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexTextureCoordBuffer);
    var textureCoords = [
        0.0, 0.0,
        10.0, 0.0,
        10.0, 10.0,
        0.0, 10.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    planeVertexTextureCoordBuffer.itemSize = 2;
    planeVertexTextureCoordBuffer.numItems = 4;

    planeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexPositionBuffer);
    var vertices = [
        -1.0, 0.0, 1.0,
        1.0, 0.0, 1.0,
        1.0, 0.0, -1.0,
        -1.0, 0.0, -1.0
    ];
    // var vertices = [
    //  -1.0, -1.0, 0.0,
    //  1.0, -1.0, 0.0,
    //  1.0, 1.0, 0.0,
    //  -1.0, 1.0, 0.0
    // ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    planeVertexPositionBuffer.itemSize = 3;
    planeVertexPositionBuffer.numItems = 4;


    planeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeVertexIndexBuffer);
    var indices = [
        0, 1, 2, 
        0, 2, 3
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    planeVertexIndexBuffer.itemSize = 1;
    planeVertexIndexBuffer.numItems = 6;
}

function setupTeapotGeometry() 
{
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost/Basic-3DScene/resources/models/Teapot.json");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            handleLoadedTeapot(JSON.parse(request.responseText));
        }
    }
    request.send();
}

function setupSphereGeometry() 
{
    var sphereGeomParams = uvSphere(0.6,64,32);

    sphereVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sphereGeomParams.vertexPositions, gl.STATIC_DRAW);
    sphereVertexPositionBuffer.itemSize = 3;
    sphereVertexPositionBuffer.numItems = sphereGeomParams.vertexPositions.length;

    sphereVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sphereGeomParams.vertexNormals, gl.STATIC_DRAW);
    sphereVertexNormalBuffer.itemSize = 3;
    sphereVertexNormalBuffer.numItems = sphereGeomParams.vertexNormals.length;

    sphereVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sphereGeomParams.vertexTextureCoords, gl.STATIC_DRAW);
    sphereVertexTextureCoordBuffer.itemSize = 2;
    sphereVertexTextureCoordBuffer.numItems = sphereGeomParams.vertexTextureCoords.length;

    sphereVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphereGeomParams.indices, gl.STATIC_DRAW);
    sphereVertexIndexBuffer.itemSize = 1;
    sphereVertexIndexBuffer.numItems = sphereGeomParams.indices.length;
}

function setupCubeGeometry()
{
    var cubeGeomParams = cube();

    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cubeGeomParams.vertexPositions, gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = cubeGeomParams.vertexPositions.length;

    cubeVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cubeGeomParams.vertexNormals, gl.STATIC_DRAW);
    cubeVertexNormalBuffer.itemSize = 3;
    cubeVertexNormalBuffer.numItems = cubeGeomParams.vertexNormals.length;

    cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cubeGeomParams.vertexTextureCoords, gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = cubeGeomParams.vertexTextureCoords.length;

    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cubeGeomParams.indices, gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = cubeGeomParams.indices.length;
}

function setupRingGeometry() 
{
    var ringGeomParams = ring();

    ringVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ringVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, ringGeomParams.vertexPositions, gl.STATIC_DRAW);
    ringVertexPositionBuffer.itemSize = 3;
    ringVertexPositionBuffer.numItems = ringGeomParams.vertexPositions.length;

    ringVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ringVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, ringGeomParams.vertexNormals, gl.STATIC_DRAW);
    ringVertexNormalBuffer.itemSize = 3;
    ringVertexNormalBuffer.numItems = ringGeomParams.vertexNormals.length;

    ringVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ringVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, ringGeomParams.vertexTextureCoords, gl.STATIC_DRAW);
    ringVertexTextureCoordBuffer.itemSize = 2;
    ringVertexTextureCoordBuffer.numItems = ringGeomParams.vertexTextureCoords.length;

    ringVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ringVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ringGeomParams.indices, gl.STATIC_DRAW);
    ringVertexIndexBuffer.itemSize = 1;
    ringVertexIndexBuffer.numItems = ringGeomParams.indices.length;
}

function setupTorusGeometry() 
{
    var torusGeomParams = uvTorus();

    torusVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, torusVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, torusGeomParams.vertexPositions, gl.STATIC_DRAW);
    torusVertexPositionBuffer.itemSize = 3;
    torusVertexPositionBuffer.numItems = torusGeomParams.vertexPositions.length;

    torusVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, torusVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, torusGeomParams.vertexNormals, gl.STATIC_DRAW);
    torusVertexNormalBuffer.itemSize = 3;
    torusVertexNormalBuffer.numItems = torusGeomParams.vertexNormals.length;

    torusVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, torusVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, torusGeomParams.vertexTextureCoords, gl.STATIC_DRAW);
    torusVertexTextureCoordBuffer.itemSize = 2;
    torusVertexTextureCoordBuffer.numItems = torusGeomParams.vertexTextureCoords.length;

    torusVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, torusVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, torusGeomParams.indices, gl.STATIC_DRAW);
    torusVertexIndexBuffer.itemSize = 1;
    torusVertexIndexBuffer.numItems = torusGeomParams.indices.length;
}

function setupCylinderGeometry() 
{
    var cylinderGeomParams = uvCylinder(1.0, 2.0, 16.0, false, false);

    cylinderVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cylinderGeomParams.vertexPositions, gl.STATIC_DRAW);
    cylinderVertexPositionBuffer.itemSize = 3;
    cylinderVertexPositionBuffer.numItems = cylinderGeomParams.vertexPositions.length;

    cylinderVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cylinderGeomParams.vertexNormals, gl.STATIC_DRAW);
    cylinderVertexNormalBuffer.itemSize = 3;
    cylinderVertexNormalBuffer.numItems = cylinderGeomParams.vertexNormals.length;

    cylinderVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cylinderGeomParams.vertexTextureCoords, gl.STATIC_DRAW);
    cylinderVertexTextureCoordBuffer.itemSize = 2;
    cylinderVertexTextureCoordBuffer.numItems = cylinderGeomParams.vertexTextureCoords.length;

    cylinderVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cylinderGeomParams.indices, gl.STATIC_DRAW);
    cylinderVertexIndexBuffer.itemSize = 1;
    cylinderVertexIndexBuffer.numItems = cylinderGeomParams.indices.length;
}

function setupConeGeometry() 
{
    var coneGeomParams = uvCone(1.0, 2.0, 16.0, true);

    coneVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, coneGeomParams.vertexPositions, gl.STATIC_DRAW);
    coneVertexPositionBuffer.itemSize = 3;
    coneVertexPositionBuffer.numItems = coneGeomParams.vertexPositions.length;

    coneVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, coneGeomParams.vertexNormals, gl.STATIC_DRAW);
    coneVertexNormalBuffer.itemSize = 3;
    coneVertexNormalBuffer.numItems = coneGeomParams.vertexNormals.length;

    coneVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, coneGeomParams.vertexTextureCoords, gl.STATIC_DRAW);
    coneVertexTextureCoordBuffer.itemSize = 2;
    coneVertexTextureCoordBuffer.numItems = coneGeomParams.vertexTextureCoords.length;

    coneVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, coneGeomParams.indices, gl.STATIC_DRAW);
    coneVertexIndexBuffer.itemSize = 1;
    coneVertexIndexBuffer.numItems = coneGeomParams.indices.length;
}

function setupMonkeyHeadGeometry() 
{

}

function handleLoadedTeapot(teapotData) 
{
    teapotVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexNormals), gl.STATIC_DRAW);
    teapotVertexNormalBuffer.itemSize = 3;
    teapotVertexNormalBuffer.numItems = teapotData.vertexNormals.length / 3;

    teapotVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexTextureCoords), gl.STATIC_DRAW);
    teapotVertexTextureCoordBuffer.itemSize = 2;
    teapotVertexTextureCoordBuffer.numItems = teapotData.vertexTextureCoords.length / 2;

    teapotVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexPositions), gl.STATIC_DRAW);
    teapotVertexPositionBuffer.itemSize = 3;
    teapotVertexPositionBuffer.numItems = teapotData.vertexPositions.length / 3;

    teapotVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(teapotData.indices), gl.STATIC_DRAW);
    teapotVertexIndexBuffer.itemSize = 1;
    teapotVertexIndexBuffer.numItems = teapotData.indices.length;

    //document.getElementById("loadingtext").textContent = "";
}

function setupRabbitGeometry()
{
    K3D.load("http://localhost/Basic-3DScene/resources/models/bunny/BunnyObj.obj", handleLoadedModelObjRabbit);
}

function handleLoadedModelObjRabbit(modelData)
{
    var model = K3D.parse.fromOBJ(modelData);

    var normals = K3D.edit.unwrap(model.i_norms, model.c_norms, 3);
    rabbitVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rabbitVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    rabbitVertexNormalBuffer.itemSize = 3;
    rabbitVertexNormalBuffer.numItems = normals.length / 3;

    var vertices = K3D.edit.unwrap(model.i_verts, model.c_verts, 3);
    rabbitVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rabbitVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    rabbitVertexPositionBuffer.itemSize = 3;
    rabbitVertexPositionBuffer.numItems = vertices.length / 3;
}

function setupDragonGeometry()
{
    K3D.load("http://localhost/Basic-3DScene/resources/models/stanford_dragon/dragon.obj", handleLoadedModelObjDragon);
}

function handleLoadedModelObjDragon(modelData)
{
    var model = K3D.parse.fromOBJ(modelData);

    var normals = K3D.edit.unwrap(model.i_norms, model.c_norms, 3);
    dragonVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dragonVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    dragonVertexNormalBuffer.itemSize = 3;
    dragonVertexNormalBuffer.numItems = normals.length / 3;

    var vertices = K3D.edit.unwrap(model.i_verts, model.c_verts, 3);
    dragonVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dragonVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    dragonVertexPositionBuffer.itemSize = 3;
    dragonVertexPositionBuffer.numItems = vertices.length / 3;
}

function setupSuzanneGeometry()
{
    K3D.load("http://localhost/Basic-3DScene/resources/models/suzanne/suzanne.obj", handleLoadedModelObjSuzanne);
}

function handleLoadedModelObjSuzanne(modelData)
{
    var model = K3D.parse.fromOBJ(modelData);

    var normals = K3D.edit.unwrap(model.i_norms, model.c_norms, 3);
    suzanneVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, suzanneVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    suzanneVertexNormalBuffer.itemSize = 3;
    suzanneVertexNormalBuffer.numItems = normals.length / 3;

    var vertices = K3D.edit.unwrap(model.i_verts, model.c_verts, 3);
    suzanneVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, suzanneVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    suzanneVertexPositionBuffer.itemSize = 3;
    suzanneVertexPositionBuffer.numItems = vertices.length / 3;
}

function setupScreenFillingGeometry() {
    screenFillingVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
    vertices = [
        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, -1.0, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    screenFillingVertexPositionBuffer.itemSize = 3;
    screenFillingVertexPositionBuffer.numItems = 4;

    screenFillingTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
    var textureCoords = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    screenFillingTextureCoordBuffer.itemSize = 2;
    screenFillingTextureCoordBuffer.numItems = 4;

    screenFillingIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
    var squareVertexIndices = [
        0, 1, 3,    0, 3, 2
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(squareVertexIndices), gl.STATIC_DRAW);
    screenFillingIndexBuffer.itemSize = 1;
    screenFillingIndexBuffer.numItems = 6;
}