var currentlyPressedKeys = {};

function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}

function handleKeys() {
    // FORWARD
    if (currentlyPressedKeys[87]) {
        myCamera.ProcessKeyboard(0, deltaTime);
    }
    // BACKWARD
    if (currentlyPressedKeys[83]) {
        myCamera.ProcessKeyboard(1, deltaTime);
    }
    // RIGHT
    if (currentlyPressedKeys[68]) {
        myCamera.ProcessKeyboard(3, deltaTime);
    }
    // LEFT
    if (currentlyPressedKeys[65]) {
        myCamera.ProcessKeyboard(2, deltaTime); 
    }
    if (currentlyPressedKeys[27]) {
        enableMouse = !enableMouse;
    }
}

var xoffset;
var yoffset;
var xpos;
var ypos;

function handleMouseMove(event) {
    xpos = event.clientX;
    ypos = event.clientY;

    if (enableMouse && mouseDown)  {

        if (firstMouse) {
            lastX = xpos;
            lastY = ypos;
            firstMouse = false;
        }

        xoffset = xpos - lastX;
        yoffset = lastY - ypos; // Reversed since y-coordinates go from bottom to left

        lastX = xpos;
        lastY = ypos;

        myCamera.ProcessMouseMovement(xoffset, yoffset, true);
    }
}

function handleMouseDown(event) {
    mouseDown = true;

    lastX = xpos;
    lastY = ypos;
}

function handleMouseUp(event) {
    mouseDown = false;
}
