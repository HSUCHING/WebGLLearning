/**
 * Created by I068959 on 12/6/13.
 */

function webGLStart() {

    WebGL_Init("lesson01-canvas");
    initShaders();
    initBuffers();
    drawScene();
}


var shaderProgram;
function initShaders() {

//    getShader获取"片元着色器"
    var fragmentShader = getShader(GL_Object, "FragmentShader");

//    getShader获取"顶点着色器"
    var vertexShader = getShader(GL_Object, "VertexShader");

    shaderProgram = GL_Object.createProgram();

//    将若干着色器组合捆绑到一个Program
    GL_Object.attachShader(shaderProgram, vertexShader);
    GL_Object.attachShader(shaderProgram, fragmentShader);
    GL_Object.linkProgram(shaderProgram);

    if (!GL_Object.getProgramParameter(shaderProgram, GL_Object.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    GL_Object.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = GL_Object.getAttribLocation(shaderProgram, "aVertexPosition");
    GL_Object.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.pMatrixUniform = GL_Object.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = GL_Object.getUniformLocation(shaderProgram, "uMVMatrix");

}


var triangleVertexPositionBuffer;
var squareVertexPositionBuffer;

function initBuffers() {
    triangleVertexPositionBuffer = GL_Object.createBuffer();
    GL_Object.bindBuffer(GL_Object.ARRAY_BUFFER, triangleVertexPositionBuffer);
    var vertices = [
        0.0, 1.0, -2.0,
        -1.0, -1.0, -2.0,
        1.0, -1.0, -2.0
    ];
    GL_Object.bufferData(GL_Object.ARRAY_BUFFER, new Float32Array(vertices), GL_Object.STATIC_DRAW);
    triangleVertexPositionBuffer.itemSize = 3;
    triangleVertexPositionBuffer.numItems = 3;

    squareVertexPositionBuffer = GL_Object.createBuffer();
    GL_Object.bindBuffer(GL_Object.ARRAY_BUFFER, squareVertexPositionBuffer);
    vertices = [
        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, -1.0, 0.0
    ];
    GL_Object.bufferData(GL_Object.ARRAY_BUFFER, new Float32Array(vertices), GL_Object.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;
}

var mvMatrix;
var pMatrix;

function setMatrixUniforms() {
    GL_Object.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix.toArray());
    GL_Object.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix.toArray());
}


function drawScene() {
    GL_Object.viewport(0, 0, GL_Object.viewportWidth, GL_Object.viewportHeight);
    GL_Object.clear(GL_Object.COLOR_BUFFER_BIT | GL_Object.DEPTH_BUFFER_BIT);

    pMatrix = okMat4Proj(45, GL_Object.viewportWidth / GL_Object.viewportHeight, 0.1, 100.0);

    mvMatrix = okMat4Trans(-1.5, 0.0, -7.0);
    GL_Object.bindBuffer(GL_Object.ARRAY_BUFFER, triangleVertexPositionBuffer);
    GL_Object.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, GL_Object.FLOAT, false, 0, 0);
    setMatrixUniforms();
    GL_Object.drawArrays(GL_Object.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);

    mvMatrix = okMat4Trans(1.5, 0.0, -7.0);
    GL_Object.bindBuffer(GL_Object.ARRAY_BUFFER, squareVertexPositionBuffer);
    GL_Object.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, GL_Object.FLOAT, false, 0, 0);
    setMatrixUniforms();
    GL_Object.drawArrays(GL_Object.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
}
