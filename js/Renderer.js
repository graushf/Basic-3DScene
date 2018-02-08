var mMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();
var vMatrix = mat4.create();

function drawScene(programToDraw)
 {
    drawPlane(programToDraw);
    drawTeapot(programToDraw, vec3.fromValues(0.0, -1.0, -60.0), vec3.fromValues(0.5, 0.5, 0.5));
    drawSphere(programToDraw, vec3.fromValues(10.5, -1.0, -50.0), vec4.fromValues(1.0, 1.0, 1.0));
}

function drawPlane(programShading) 
{
    gl.useProgram(programShading);

    pMatrix = myCamera.GetProjectionMatrix();

    programShading.vertexPositionAttribute = gl.getAttribLocation(programShading, "aVertexPosition");
    gl.enableVertexAttribArray(programShading.vertexPositionAttribute);

    programShading.vertexNormalAttribute = gl.getAttribLocation(programShading, "aVertexNormal");
    gl.enableVertexAttribArray(programShading.vertexNormalAttribute);

    programShading.textureCoordAttribute = gl.getAttribLocation(programShading, "aTextureCoord");
    gl.enableVertexAttribArray(programShading.textureCoordAttribute);

    programShading.pMatrixUniform = gl.getUniformLocation(programShading, "uPMatrix");
    programShading.modelMatrixUniform = gl.getUniformLocation(programShading, "uMMatrix");
    programShading.viewMatrixUniform = gl.getUniformLocation(programShading, "uVMatrix");

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    gl.uniform3f(programShading.staticColorUniform, 1.0, 0.0, 0.0);

    mat4.identity(mMatrix);
    mat4.identity(vMatrix)

    transformGeometry(vec3.fromValues(0.0, -1.0, -60.0), vec3.fromValues(2000.0, 2000.0, 2000.0));

    gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
    gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);

    gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexNormalBuffer);
    gl.vertexAttribPointer(programShading.vertexNormalAttribute, planeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(programShading.textureCoordAttribute, planeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, planeVertexPositionBuffer);
    gl.vertexAttribPointer(programShading.vertexPositionAttribute, planeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, planeVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, planeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawTeapot(programShading, translatePos, scalePos) 
{
    gl.useProgram(programShading);

    pMatrix = myCamera.GetProjectionMatrix();

    programShading.vertexPositionAttribute = gl.getAttribLocation(programShading, "aVertexPosition");
    gl.enableVertexAttribArray(programShading.vertexPositionAttribute);

    programShading.vertexNormalAttribute = gl.getAttribLocation(programShading, "aVertexNormal");
    gl.enableVertexAttribArray(programShading.vertexNormalAttribute);

    programShading.textureCoordAttribute = gl.getAttribLocation(programShading, "aTextureCoord");
    gl.enableVertexAttribArray(programShading.textureCoordAttribute);

    programShading.pMatrixUniform = gl.getUniformLocation(programShading, "uPMatrix");
    programShading.modelMatrixUniform = gl.getUniformLocation(programShading, "uMMatrix");
    programShading.viewMatrixUniform = gl.getUniformLocation(programShading, "uVMatrix");

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);

    mat4.identity(mMatrix);
    mat4.identity(vMatrix);

    transformGeometry(translatePos, scalePos);

    gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
    gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);


    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexNormalBuffer);
    gl.vertexAttribPointer(programShading.vertexNormalAttribute, teapotVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer);
    gl.vertexAttribPointer(programShading.textureCoordAttribute, teapotVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer);
    gl.vertexAttribPointer(programShading.vertexPositionAttribute, teapotVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, teapotVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawSphere(programShading, translatePos, scalePos)
{
    gl.useProgram(programShading);

    pMatrix = myCamera.GetProjectionMatrix();

    programShading.vertexPositionAttribute = gl.getAttribLocation(programShading, "aVertexPosition");
    gl.enableVertexAttribArray(programShading.vertexPositionAttribute);

    programShading.vertexNormalAttribute = gl.getAttribLocation(programShading, "aVertexNormal");
    gl.enableVertexAttribArray(programShading.vertexNormalAttribute);

    programShading.textureCoordAttribute = gl.getAttribLocation(programShading, "aTextureCoord");
    gl.enableVertexAttribArray(programShading.textureCoordAttribute);

    programShading.pMatrixUniform = gl.getUniformLocation(programShading, "uPMatrix");
    programShading.modelMatrixUniform = gl.getUniformLocation(programShading, "uMMatrix");
    programShading.viewMatrixUniform = gl.getUniformLocation(programShading, "uVMatrix");

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    gl.uniform3f(programShading.staticColorUniform, 0.0, 0.0, 1.0);

    mat4.identity(mMatrix);
    mat4.identity(vMatrix);

    transformGeometry(translatePos, scalePos);

    gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
    gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);


    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
    gl.vertexAttribPointer(programShading.vertexNormalAttribute, sphereVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexTextureCoordBuffer);
    gl.vertexAttribPointer(programShading.textureCoordAttribute, sphereVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
    gl.vertexAttribPointer(programShading.vertexPositionAttribute, sphereVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, sphereVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}


function transformGeometry( transformVec, scaleVec) 
{
    var aux = mat4.create();
    mat4.identity(aux);

    mat4.translate(mMatrix, mMatrix, [transformVec[0], transformVec[1], transformVec[2]]);
    mat4.fromScaling(aux, [scaleVec[0], scaleVec[1], scaleVec[2]]);
    mat4.multiply(mMatrix, mMatrix, aux);
}