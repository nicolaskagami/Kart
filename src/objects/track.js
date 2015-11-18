

var TrackSegment = function(x,y,z,model)
{
	this.position = [x,y,z];
	this.angularSpeed = 0;
	this.angle = 0;
	this.leftWallPos = [x-5,y,z];
	this.rightWallPos = [x+5,y,z];
	this.collisionAreaRight = new CollidableRectangle(this.leftWallPos,1);
	this.collisionAreaLeft = new CollidableRectangle(this.rightWallPos,1);
	this.model = model;
	this.scale = [1.0,1.0,1.0];
}
TrackSegment.prototype = Object.create(Drawable.prototype);
TrackSegment.prototype.move = function()
{
	this.angle += this.angularSpeed;	
}
TrackSegment.prototype.turn = function(angle)
{
	this.angle +=angle;
}
TrackSegment.prototype.testCollisionRight = function(object)
{
	console.log("Wall Right");
	return this.collisionAreaRight.testCollision(object);
}
TrackSegment.prototype.testCollisionLeft = function(object)
{
	console.log("Wall Left");
	return this.collisionAreaLeft.testCollision(object);
}

