/**
 * Created by I068959 on 12/6/13.
 */

var GL_Object;

function WebGL_Init(canvasID) {
    var canvas = document.getElementById(canvasID);
    if (!canvas.getContext("webgl") && !canvas.getContext("experimental-webgl")) {
        alert("Your Browser Doesn't Support WebGL");
    } else {
        GL_Object = (canvas.getContext("webgl")) ? canvas.getContext("webgl") : canvas.getContext("experimental-webgl");
        GL_Object.viewportWidth = canvas.width;
        GL_Object.viewportHeight = canvas.height;
        GL_Object.clearColor(0.0,0.0,0.0, 1.0);
        GL_Object.enable(GL_Object.DEPTH_TEST);
    }
}

function getShader(gl, id) {
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
//    建立一个片元着色器或一个顶点着色器
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
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