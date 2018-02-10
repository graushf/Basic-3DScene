var shaderProgramBasic;
var shaderProgramPhongLightingPass;
var shaderProgramScreenFillPass;

function getShader(gl, id) 
{
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}

	var shader;
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type = "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, str);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

function setupShadersScene() 
{
	initShaderBasic();
	initShaderPhongLightingPass();
	initShaderScreenFillPass();
}

function initShaderBasic() 
{
    var fragmentShader = getShader(gl, "basic-shader-fs");
    var vertexShader = getShader(gl, "basic-shader-vs");

    shaderProgramBasic = gl.createProgram();
    gl.attachShader(shaderProgramBasic, vertexShader);
    gl.attachShader(shaderProgramBasic, fragmentShader);
    gl.linkProgram(shaderProgramBasic);

    if (!gl.getProgramParameter(shaderProgramBasic, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initShaderPhongLightingPass()
{
	var fragmentShader = getShader(gl, "phongLightingPass-fs");
	var vertexShader = getShader(gl, "phongLightingPass-vs");

	shaderProgramPhongLightingPass = gl.createProgram();
	gl.attachShader(shaderProgramPhongLightingPass, vertexShader);
	gl.attachShader(shaderProgramPhongLightingPass, fragmentShader);
	gl.linkProgram(shaderProgramPhongLightingPass);

	if (!gl.getProgramParameter(shaderProgramPhongLightingPass, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}
}

function initShaderScreenFillPass()
{
	var fragmentShader = getShader(gl, "screenFillPass-fs");
	var vertexShader = getShader(gl, "screenFillPass-vs");

	shaderProgramScreenFillPass = gl.createProgram();
	gl.attachShader(shaderProgramScreenFillPass, vertexShader);
	gl.attachShader(shaderProgramScreenFillPass, fragmentShader);
	gl.linkProgram(shaderProgramScreenFillPass);

	if (!gl.getProgramParameter(shaderProgramScreenFillPass, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}
}