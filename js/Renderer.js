var mMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();
var vMatrix = mat4.create();

function drawScene(programToDraw)
 {
    drawScreenFillingGeometry(shaderProgramScreenFillPass);
    drawPlane(shaderProgramPhongLightingPass);
    drawTeapot(shaderProgramPhongLightingPass, vec3.fromValues(0.0, 0.0, -60.0), vec3.fromValues(0.1, 0.1, 0.1));
    drawSphere(shaderProgramPhongLightingPass, vec3.fromValues(10.0, 1.5, -60.0), vec4.fromValues(1.5, 1.5, 1.5));
    drawCube(shaderProgramPhongLightingPass, vec3.fromValues(20.0, 1.5, -60.0), vec4.fromValues(2.0, 2.0, 2.0));
    drawRing(shaderProgramPhongLightingPass, vec3.fromValues(30.0, 1.5, -60.0), vec3.fromValues(2.0, 2.0, 2.0));
    drawTorus(shaderProgramPhongLightingPass, vec3.fromValues(40.0, 1.5, -60.0), vec3.fromValues(2.0, 2.0, 2.0));
    drawCylinder(shaderProgramPhongLightingPass, vec3.fromValues(50.0, 1.5, -60.0), vec3.fromValues(1.0, 1.0, 1.0));
    drawCone(shaderProgramPhongLightingPass, vec3.fromValues(60.0, 1.5, -60.0), vec3.fromValues(1.0, 1.0, 1.0));
    drawRabbit(shaderProgramPhongLightingPass, vec3.fromValues(70.0, 0.0, -60.0), vec3.fromValues(1.0, 1.0, 1.0));
    drawDragon(shaderProgramPhongLightingPass, vec3.fromValues(80.0, 0.0, -60.0), vec3.fromValues(0.30, 0.30, 0.30));
    drawSuzanne(shaderProgramPhongLightingPass, vec3.fromValues(90.0, 1.0, -60.0), vec3.fromValues(1.0, 1.0, 1.0));
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

    gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
    gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
    gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    gl.uniform3f(programShading.staticColorUniform, 1.0, 0.0, 0.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 1);
    gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, checkerGrayTexture);
    gl.uniform1i(gl.getUniformLocation(programShading, "material.diffuse"), 0);
    gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);


    mat4.identity(mMatrix);
    mat4.identity(vMatrix)

    vMatrix = myCamera.GetViewMatrix();

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
    if ((teapotVertexNormalBuffer != null && teapotVertexPositionBuffer != null) && (teapotVertexTextureCoordBuffer != null)) {
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

        gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
        gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
        gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

        programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

        gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);
        gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
        gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

        gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
        gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);

        mat4.identity(mMatrix);
        mat4.identity(vMatrix);

        vMatrix = myCamera.GetViewMatrix();

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

    gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
    gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
    gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

    gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);

    gl.uniform3f(programShading.staticColorUniform, 0.0, 0.0, 1.0);

    mat4.identity(mMatrix);
    mat4.identity(vMatrix);

    vMatrix = myCamera.GetViewMatrix();

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

function drawCube(programShading, translatePos, scalePos)
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

    gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
    gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
    gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

    gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);

    mat4.identity(mMatrix);
    mat4.identity(vMatrix);

    vMatrix = myCamera.GetViewMatrix();

    transformGeometry(translatePos, scalePos);

    gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
    gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);


    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
    gl.vertexAttribPointer(programShading.vertexNormalAttribute, cubeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(programShading.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(programShading.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawRing(programShading, translatePos, scalePos)
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

    gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
    gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
    gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

    gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);

    mat4.identity(mMatrix);
    mat4.identity(vMatrix);

    vMatrix = myCamera.GetViewMatrix();

    transformGeometry(translatePos, scalePos);

    gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
    gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);


    gl.bindBuffer(gl.ARRAY_BUFFER, ringVertexNormalBuffer);
    gl.vertexAttribPointer(programShading.vertexNormalAttribute, ringVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, ringVertexTextureCoordBuffer);
    gl.vertexAttribPointer(programShading.textureCoordAttribute, ringVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, ringVertexPositionBuffer);
    gl.vertexAttribPointer(programShading.vertexPositionAttribute, ringVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ringVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, ringVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawTorus(programShading, translatePos, scalePos)
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

    gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
    gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
    gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

    gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);

    mat4.identity(mMatrix);
    mat4.identity(vMatrix);

    vMatrix = myCamera.GetViewMatrix();

    transformGeometry(translatePos, scalePos);

    gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
    gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);


    gl.bindBuffer(gl.ARRAY_BUFFER, torusVertexNormalBuffer);
    gl.vertexAttribPointer(programShading.vertexNormalAttribute, torusVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, torusVertexTextureCoordBuffer);
    gl.vertexAttribPointer(programShading.textureCoordAttribute, torusVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, torusVertexPositionBuffer);
    gl.vertexAttribPointer(programShading.vertexPositionAttribute, torusVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, torusVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, torusVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawCylinder(programShading, translatePos, scalePos)
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

    gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
    gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
    gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

    gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);

    mat4.identity(mMatrix);
    mat4.identity(vMatrix);

    vMatrix = myCamera.GetViewMatrix();

    var aux = mat4.create();
    mat4.identity(aux);

    mat4.translate(mMatrix, mMatrix, [translatePos[0], translatePos[1], translatePos[2]]);
    mat4.rotate(mMatrix, mMatrix, Math.PI/2.0, vec3.fromValues(1.0, 0.0, 0.0));
    mat4.fromScaling(aux, [scalePos[0], scalePos[1], scalePos[2]]);
    mat4.multiply(mMatrix, mMatrix, aux);
    

    gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
    gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);


    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexNormalBuffer);
    gl.vertexAttribPointer(programShading.vertexNormalAttribute, cylinderVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexTextureCoordBuffer);
    gl.vertexAttribPointer(programShading.textureCoordAttribute, cylinderVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexPositionBuffer);
    gl.vertexAttribPointer(programShading.vertexPositionAttribute, cylinderVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, cylinderVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawCone(programShading, translatePos, scalePos)
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

    gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
    gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
    gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
    gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

    gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
    gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
    gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
    gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
    gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);

    mat4.identity(mMatrix);
    mat4.identity(vMatrix);

    vMatrix = myCamera.GetViewMatrix();

    var aux = mat4.create();
    mat4.identity(aux);

    mat4.translate(mMatrix, mMatrix, [translatePos[0], translatePos[1], translatePos[2]]);
    mat4.rotate(mMatrix, mMatrix, -Math.PI/2.0, vec3.fromValues(1.0, 0.0, 0.0));
    mat4.fromScaling(aux, [scalePos[0], scalePos[1], scalePos[2]]);
    mat4.multiply(mMatrix, mMatrix, aux);

    gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
    gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);


    gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexNormalBuffer);
    gl.vertexAttribPointer(programShading.vertexNormalAttribute, coneVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexTextureCoordBuffer);
    gl.vertexAttribPointer(programShading.textureCoordAttribute, coneVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, coneVertexPositionBuffer);
    gl.vertexAttribPointer(programShading.vertexPositionAttribute, coneVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coneVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, coneVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function drawRabbit(programShading, translatePos, scalePos)
{
    if (rabbitVertexPositionBuffer != null && rabbitVertexNormalBuffer != null) {
        gl.disableVertexAttribArray(shaderProgramPhongLightingPass.textureCoordAttribute);
        gl.useProgram(programShading);

        pMatrix = myCamera.GetProjectionMatrix();

        programShading.vertexPositionAttribute = gl.getAttribLocation(programShading, "aVertexPosition");
        gl.enableVertexAttribArray(programShading.vertexPositionAttribute);

        programShading.vertexNormalAttribute = gl.getAttribLocation(programShading, "aVertexNormal");
        gl.enableVertexAttribArray(programShading.vertexNormalAttribute);

        //programShading.textureCoordAttribute = gl.getAttribLocation(programShading, "aTextureCoord");
        //gl.enableVertexAttribArray(programShading.textureCoordAttribute);

        programShading.pMatrixUniform = gl.getUniformLocation(programShading, "uPMatrix");
        programShading.modelMatrixUniform = gl.getUniformLocation(programShading, "uMMatrix");
        programShading.viewMatrixUniform = gl.getUniformLocation(programShading, "uVMatrix");

        gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
        gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
        gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

        programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

        gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);
        gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
        gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

        gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
        gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);

        mat4.identity(mMatrix);
        mat4.identity(vMatrix);

        vMatrix = myCamera.GetViewMatrix();

        var aux = mat4.create();
        mat4.identity(aux);

        mat4.translate(mMatrix, mMatrix, [translatePos[0], translatePos[1], translatePos[2]]);
        //mat4.rotate(mMatrix, mMatrix, -Math.PI/2.0, vec3.fromValues(1.0, 0.0, 0.0));
        mat4.fromScaling(aux, [scalePos[0], scalePos[1], scalePos[2]]);
        mat4.multiply(mMatrix, mMatrix, aux);

        gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
        gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, rabbitVertexNormalBuffer);
        gl.vertexAttribPointer(programShading.vertexNormalAttribute, rabbitVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, rabbitVertexPositionBuffer);
        gl.vertexAttribPointer(programShading.vertexPositionAttribute, rabbitVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, rabbitVertexPositionBuffer.numItems);
    }
}

function drawDragon(programShading, translatePos, scalePos)
{
    if (dragonVertexPositionBuffer != null && dragonVertexNormalBuffer != null) {
        gl.disableVertexAttribArray(shaderProgramPhongLightingPass.textureCoordAttribute);
        gl.useProgram(programShading);

        pMatrix = myCamera.GetProjectionMatrix();

        programShading.vertexPositionAttribute = gl.getAttribLocation(programShading, "aVertexPosition");
        gl.enableVertexAttribArray(programShading.vertexPositionAttribute);

        programShading.vertexNormalAttribute = gl.getAttribLocation(programShading, "aVertexNormal");
        gl.enableVertexAttribArray(programShading.vertexNormalAttribute);

        //programShading.textureCoordAttribute = gl.getAttribLocation(programShading, "aTextureCoord");
        //gl.enableVertexAttribArray(programShading.textureCoordAttribute);

        programShading.pMatrixUniform = gl.getUniformLocation(programShading, "uPMatrix");
        programShading.modelMatrixUniform = gl.getUniformLocation(programShading, "uMMatrix");
        programShading.viewMatrixUniform = gl.getUniformLocation(programShading, "uVMatrix");

        gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
        gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
        gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

        programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

        gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);
        gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
        gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

        gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
        gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);

        mat4.identity(mMatrix);
        mat4.identity(vMatrix);

        vMatrix = myCamera.GetViewMatrix();

        var aux = mat4.create();
        mat4.identity(aux);

        mat4.translate(mMatrix, mMatrix, [translatePos[0], translatePos[1], translatePos[2]]);
        //mat4.rotate(mMatrix, mMatrix, -Math.PI/2.0, vec3.fromValues(1.0, 0.0, 0.0));
        mat4.fromScaling(aux, [scalePos[0], scalePos[1], scalePos[2]]);
        mat4.multiply(mMatrix, mMatrix, aux);

        gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
        gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, dragonVertexNormalBuffer);
        gl.vertexAttribPointer(programShading.vertexNormalAttribute, dragonVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, dragonVertexPositionBuffer);
        gl.vertexAttribPointer(programShading.vertexPositionAttribute, dragonVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, dragonVertexPositionBuffer.numItems);
    }
}

function drawSuzanne(programShading, translatePos, scalePos)
{
    if (suzanneVertexPositionBuffer != null && suzanneVertexNormalBuffer != null) {
        gl.disableVertexAttribArray(shaderProgramPhongLightingPass.textureCoordAttribute);
        gl.useProgram(programShading);

        pMatrix = myCamera.GetProjectionMatrix();

        programShading.vertexPositionAttribute = gl.getAttribLocation(programShading, "aVertexPosition");
        gl.enableVertexAttribArray(programShading.vertexPositionAttribute);

        programShading.vertexNormalAttribute = gl.getAttribLocation(programShading, "aVertexNormal");
        gl.enableVertexAttribArray(programShading.vertexNormalAttribute);

        //programShading.textureCoordAttribute = gl.getAttribLocation(programShading, "aTextureCoord");
        //gl.enableVertexAttribArray(programShading.textureCoordAttribute);

        programShading.pMatrixUniform = gl.getUniformLocation(programShading, "uPMatrix");
        programShading.modelMatrixUniform = gl.getUniformLocation(programShading, "uMMatrix");
        programShading.viewMatrixUniform = gl.getUniformLocation(programShading, "uVMatrix");

        gl.uniform3f(programShading.lightColorUniform, 1.0, 1.0, 1.0);
        gl.uniform3f(programShading.linkPosUniform, lightPos[0], lightPos[1], lightPos[2]);
        gl.uniform3f(programShading.viewPosUniform, myCamera.Position[0], myCamera.Position[1], myCamera.Position[2]);

        programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

        gl.uniform3f(programShading.staticColorUniform, 0.0, 1.0, 0.0);
        gl.uniform1i(gl.getUniformLocation(programShading, "uUseTexture"), 0);
        gl.uniform1i(gl.getUniformLocation(programShading, "uDisableLighting"), 0);

        gl.uniform3f(gl.getUniformLocation(programShading, "material.diffuseColor"), 0.0, 0.0, 1.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "material.shininess"), 64.0);
        gl.uniform1i(gl.getUniformLocation(programShading, "material.hasSpecular"), 1);

        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.direction"), -0.2, -1.0, -0.3);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.ambient"), 0.05, 0.05, 0.05);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.diffuse"), 0.8, 0.8, 0.8);
        gl.uniform3f(gl.getUniformLocation(programShading, "dirLight.specular"), 0.5, 0.5, 0.5);

        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].position"), lightPointPos[0], lightPointPos[1], lightPointPos[2]);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].ambient"), 1.0, 0.05, 0.05);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].diffuse"), 181/255, 134/255, 144/255);
        gl.uniform3f(gl.getUniformLocation(programShading, "pointLights[0].specular"), 5.0, 5.0, 5.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].constant"), 1.0);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].linear"), 0.02);
        gl.uniform1f(gl.getUniformLocation(programShading, "pointsLights[0].quadratic"), 0.010);

        mat4.identity(mMatrix);
        mat4.identity(vMatrix);

        vMatrix = myCamera.GetViewMatrix();

        var aux = mat4.create();
        mat4.identity(aux);

        mat4.translate(mMatrix, mMatrix, [translatePos[0], translatePos[1], translatePos[2]]);
        //mat4.rotate(mMatrix, mMatrix, -Math.PI/2.0, vec3.fromValues(1.0, 0.0, 0.0));
        mat4.fromScaling(aux, [scalePos[0], scalePos[1], scalePos[2]]);
        mat4.multiply(mMatrix, mMatrix, aux);

        gl.uniformMatrix4fv(programShading.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(programShading.modelMatrixUniform, false, mMatrix);
        gl.uniformMatrix4fv(programShading.viewMatrixUniform, false, vMatrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, suzanneVertexNormalBuffer);
        gl.vertexAttribPointer(programShading.vertexNormalAttribute, suzanneVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, suzanneVertexPositionBuffer);
        gl.vertexAttribPointer(programShading.vertexPositionAttribute, suzanneVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, suzanneVertexPositionBuffer.numItems);
    }
}

function drawScreenFillingGeometry(programShading) {
    gl.disable(gl.DEPTH_TEST);
    //gl.disableVertexAttribArray(shaderProgramPhongLightingPass.vertexPositionAttribute);
    //gl.disableVertexAttribArray(shaderProgramPhongLightingPass.textureCoordAttribute);
    //gl.disableVertexAttribArray(shaderProgramPhongLightingPass.vertexNormalAttribute);
    gl.useProgram(programShading);

    programShading.vertexPositionAttribute = gl.getAttribLocation(programShading, "aVertexPosition");
    gl.enableVertexAttribArray(programShading.vertexPositionAttribute);

    programShading.textureCoordAttribute = gl.getAttribLocation(programShading, "aTextureCoord");
    gl.enableVertexAttribArray(programShading.textureCoordAttribute);

    programShading.staticColorUniform = gl.getUniformLocation(programShading, "uStaticColor");

    programShading.cameraToWorldMatrixUniform = gl.getUniformLocation(programShading, "uCameraToWorldMatrix")
    programShading.invProjectionMatrixUniform = gl.getUniformLocation(programShading, "uInvProjectionMatrix");
    programShading.resolutionUniform = gl.getUniformLocation(programShading, "uResolution");

    programShading.lightUniform = gl.getUniformLocation(programShading, "uLight");

    gl.uniform3f(programShading.staticColorUniform, 1.0, 1.0, 0.0);
    var invViewMatrix = mat4.create();
    invViewMatrix = myCamera.GetViewMatrix();
    mat4.invert(invViewMatrix, invViewMatrix);
    gl.uniformMatrix4fv(programShading.cameraToWorldMatrixUniform, false, invViewMatrix);
    var invPMatrix = mat4.create();
    invPMatrix = myCamera.GetProjectionMatrix();
    mat4.invert(invPMatrix, invPMatrix);
    gl.uniformMatrix4fv(programShading.invProjectionMatrixUniform, false, invPMatrix);
    gl.uniform2f(programShading.resolutionUniform, gl.viewportWidth, gl.viewportHeight);
    
    var lightPos = vec3.fromValues(1.0, 0.5, 0.2);
    vec3.normalize(lightPos, lightPos);
    gl.uniform3f(programShading.lightUniform, lightPos[0], lightPos[1], lightPos[2]);

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingVertexPositionBuffer);
    gl.vertexAttribPointer(programShading.vertexPositionAttribute, screenFillingVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, screenFillingTextureCoordBuffer);
    gl.vertexAttribPointer(programShading.textureCoordAttribute, screenFillingTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, screenFillingIndexBuffer);
    gl.drawElements(gl.TRIANGLES, screenFillingIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    gl.enable(gl.DEPTH_TEST);
}

function transformGeometry( transformVec, scaleVec) 
{
    var aux = mat4.create();
    mat4.identity(aux);

    mat4.translate(mMatrix, mMatrix, [transformVec[0], transformVec[1], transformVec[2]]);
    mat4.fromScaling(aux, [scaleVec[0], scaleVec[1], scaleVec[2]]);
    mat4.multiply(mMatrix, mMatrix, aux);
}