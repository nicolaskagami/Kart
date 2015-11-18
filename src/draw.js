
//Variáveis de Shader
var shaderProgram;
	
var positionLocation;
var vertexNormalLocation;
var textureLocation;

var modelViewLocation;
var projectionLocation;
var normalMatrixLocation;
var samplerLocation;

var ambientLightLocation;
var ambientMaterialLocation;
var diffuseLightLocation;
var diffuseMaterialLocation;
var specularLightLocation;
var specularMaterialLocation;
var lightDirectionLocation;
var shininessLocation;
var useLightLocation;

//Variáveis de Draw
var projectionMatrix;
var viewMatrix;
var modelMatrix;
var modelView;

//Lighting
var lightDirection;
var ambientLight;
var diffuseLight;
var specularLight;
var shininess;

var ambientMaterial;
var diffuseMaterial;
var specularMaterial;

var lighting;
    
function initGL(canvas) {
	gl = canvas.getContext("experimental-webgl");
	if (!gl) {
		alert("Could not initialise WebGL");
	}
	gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;
	gl.enable(gl.DEPTH_TEST);
}
function initDrawingParameters(){
	projectionMatrix = makeIdentity();
	viewMatrix = makeIdentity();
	modelMatrix = makeIdentity();
	
	lightDirection = [0,0,0];
	ambientLight = [1,1,1,0];
	diffuseLight = [0,0,0,0];
	specularLight = [0,0,0,0];
	shininess = 180.0;
	
	ambientMaterial = [1,1,1,0];
	diffuseMaterial = [0,0,0,0];
	specularMaterial = [0,0,0,0];
	
	lighting = false;
	
	gl.clearColor(135/256, 206/256, 250/256, 1.0);
	gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
}
function initModels(meshes){
	models=meshes;
}
function initTexture(){
	//Playable Characters
	OBJ.initMeshBuffers(gl, models.mario);
	OBJ.initMeshBuffers(gl, models.peach);
	OBJ.initMeshBuffers(gl, models.luigi);
	OBJ.initMeshBuffers(gl, models.bowser);
	//Items
	OBJ.initMeshBuffers(gl, models.box);
	OBJ.initMeshBuffers(gl, models.greenShell);
	OBJ.initMeshBuffers(gl, models.mushroom);
	OBJ.initMeshBuffers(gl, models.banana);

	OBJ.initMeshBuffers(gl, models.segmento);
	
	//Playable Characters
	OBJ.bindTextures(gl, models.mario);
	OBJ.bindTextures(gl, models.peach);
	OBJ.bindTextures(gl, models.luigi);
	OBJ.bindTextures(gl, models.bowser);
	//Items
	OBJ.bindTextures(gl, models.box);
	OBJ.bindTextures(gl, models.greenShell);
	OBJ.bindTextures(gl, models.mushroom);
	OBJ.bindTextures(gl, models.banana);
	
	OBJ.bindTextures(gl, models.segmento);
}
function initShaders() {

	shaderProgram = createProgramFromScripts(gl, ["shader-vs", "shader-fs"]);
	gl.useProgram(shaderProgram);// Tells which shaders we are going to use (we can have multiple shaders)
	
	positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
	gl.enableVertexAttribArray(positionLocation);
	vertexNormalLocation = gl.getAttribLocation(shaderProgram, "a_normal");
	gl.enableVertexAttribArray(vertexNormalLocation);
	textureLocation = gl.getAttribLocation(shaderProgram, "a_text_coord");
	gl.enableVertexAttribArray(textureLocation);

	modelViewLocation = gl.getUniformLocation(shaderProgram, "u_MVMatrix");
	projectionLocation = gl.getUniformLocation(shaderProgram, "u_PMatrix");
	normalMatrixLocation = gl.getUniformLocation(shaderProgram, "u_normal_matrix");
	samplerLocation = gl.getUniformLocation(shaderProgram, "uSampler");

	ambientLightLocation = gl.getUniformLocation(shaderProgram, "u_ambient_light");
	ambientMaterialLocation = gl.getUniformLocation(shaderProgram, "u_ambient_material");
	diffuseLightLocation = gl.getUniformLocation(shaderProgram, "u_diffuse_light");
	diffuseMaterialLocation = gl.getUniformLocation(shaderProgram, "u_diffuse_material");
	specularLightLocation = gl.getUniformLocation(shaderProgram, "u_specular_light");
	specularMaterialLocation = gl.getUniformLocation(shaderProgram, "u_specular_material");
	lightDirectionLocation = gl.getUniformLocation(shaderProgram, "u_light_direction");
	shininessLocation = gl.getUniformLocation(shaderProgram, "u_shininess");
	useLightLocation = gl.getUniformLocation(shaderProgram, "u_use_light");
  
}
function draw() {

	gl.viewport(0.0, 0.0, canvas.clientWidth, canvas.clientHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// Definition of our projection and camera matrix and sending to the vertex shader
	projectionMatrix = makePerspective(degToRad(60),canvas.clientWidth / canvas.clientHeight, 1, 2000);
	gl.uniformMatrix4fv(projectionLocation, false, projectionMatrix);
	
	// Definition of our camera matrix
	viewMatrix = makeLookAt(
	  currentCamPosition, //Camera position
	  currentCamTarget, //TargetTarget
	  [0,1,0] //Up Vector
	);
	viewMatrix = makeInverse(viewMatrix);
	
	modelMatrix = makeIdentity();
	// Multiplying model and camera matrix to send to the vertex buffer
	
	modelView = matrixMultiply(modelMatrix,viewMatrix);
	gl.uniformMatrix4fv(modelViewLocation, false, modelView);
	
	//  Sending the normal matrix to the vertex shader (since we are transforming our vertex,
	// the normals need to transform together, but maintaining perpendicularity with the triangle)
	// Explanation of this matrix too advanced to our context, but if you want to understand better,
	// read this article: http://www.lighthouse3d.com/tutorials/glsl-12-tutorial/the-normal-matrix/
	//var normalMatrix = makeTranspose(makeInverse(modelView));
	//gl.uniformMatrix4fv(normalMatrixLocation, false, normalMatrix);
	
	/*
		Sending light values to the shaders
	*/
	gl.uniform1i(useLightLocation, lighting);
	
	gl.uniform3fv(lightDirectionLocation, lightDirection);
	
	gl.uniform4fv(ambientLightLocation, ambientLight);
	gl.uniform4fv(diffuseLightLocation, diffuseLight);
	gl.uniform4fv(specularLightLocation, specularLight);
	gl.uniform1f(shininessLocation, shininess);
	
	gl.uniform4fv(ambientMaterialLocation, ambientMaterial);
	gl.uniform4fv(diffuseMaterialLocation, diffuseMaterial);
	gl.uniform4fv(specularMaterialLocation, specularMaterial);
	
	/*
		Sending the buffers to the shaders
	*/
	modelMatrix = makeIdentity();
	modelView = matrixMultiply(modelMatrix,viewMatrix);
	gl.uniformMatrix4fv(modelViewLocation, false, modelView);

	//gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	//gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	//gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
	
	for(var i=0;i<players.length;i++)
	{
		players[i].draw();
	}
	for(var i=0;i<items.length;i++)
	{
		items[i].draw();
	}
	for(var i=0;i<projectiles.length;i++)
	{
		projectiles[i].draw();
	}

}
