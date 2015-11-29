

var Marker = function(position,model)
{
	this.position = position.slice();
	this.angularSpeed = 0;
	this.angle = 0;
	//this.leftWallPos = [x-5,y,z];
	//this.rightWallPos = [x+5,y,z];
	//this.collisionAreaLeft = new CollidableArea(this.rightWallPos,1,4);
	this.model = model;
	this.height=0;
	this.scale = [1.0,1.0,1.0];
}
Marker.prototype = Object.create(Drawable.prototype);

Marker.prototype.updatePosition = function(newPosition)
{
	this.position = newPosition.slice();
}