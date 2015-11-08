var Drawable = function(model)
{
	this.model = model;
}
Drawable.prototype =
{
	draw: function()
	{
		modelMatrix = makeIdentity();
		modelMatrix = matrixMultiply(modelMatrix, makeYRotation(this.angle));
		modelMatrix = matrixMultiply(modelMatrix, makeTranslation(this.position[0],this.position[1],this.position[2]));
		
		modelView = matrixMultiply(modelMatrix,viewMatrix);
		gl.uniformMatrix4fv(modelViewLocation, false, modelView);
		
		//var normalMatrix = makeTranspose(makeInverse(modelView));
		//gl.uniformMatrix4fv(normalMatrixLocation, false, normalMatrix);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.model.vertexBuffer);
		gl.vertexAttribPointer(positionLocation, this.model.vertexBuffer.itemSize, gl.FLOAT, false, 0,0);
		
		if(!this.model.textures.length){
			gl.disableVertexAttribArray(textureLocation);
		}
		else{
			gl.enableVertexAttribArray(textureLocation);
			gl.bindBuffer(gl.ARRAY_BUFFER,this.model.textureBuffer);
			gl.vertexAttribPointer(textureLocation, this.model.textureBuffer.itemSize, gl.FLOAT, false, 0,0);
		}
		
		if(!this.model.vertexNormals.length){
			gl.disableVertexAttribArray(vertexNormalLocation);
		}
		else{
			gl.enableVertexAttribArray(vertexNormalLocation);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.model.normalBuffer);
			gl.vertexAttribPointer(vertexNormalLocation, this.model.normalBuffer.itemSize, gl.FLOAT, false, 0,0);
		}
		
		for (var item of this.model.groupIndices) {
			var currentTexture = this.model.groupTextures.get(item[0]);
			//console.log(currentTexture);
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, currentTexture);
			gl.uniform1i(samplerLocation, 0);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.model.indexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(item[1]), gl.STATIC_DRAW);
			gl.drawElements(gl.TRIANGLES, item[1].length, gl.UNSIGNED_SHORT, 0);
		}
	}
};