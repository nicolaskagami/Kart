var GreenShell = function(newPosition,newDirection)
{
	this.position = newPosition.slice();
	this.speed = 0.1; 
	this.angularSpeed = 0.2;
	this.angle = 0;
	this.direction = newDirection.slice();;
	//this.collisionArea = new CollidableCircle(x,z,0.8); // fix this
	this.model = models.greenShell;
	this.scale = [0.05,0.05,0.05];
}
GreenShell.prototype = Object.create(MovableObject.prototype);
var Box = function(x,y,z)
{
	this.position = [x,y,z];
	this.speed = 0; 
	this.angle = 0;
	this.direction = [0,0,1];
	this.collisionArea = new CollidableCircle(x,z,0.8); // fix this
	this.model = models.box;
	this.scale = [0.25,0.25,0.25];
}
Box.prototype = Object.create(MovableObject.prototype);