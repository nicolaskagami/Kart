var StaticObject = function(x,y,z,model)
{
	this.position = [x,y,z];
	this.angularSpeed = 0;
	this.angle = 0;
	this.collisionArea = new CollidableCircle(this.position,0.8);
	this.model = model;
	this.scale = [1.0,1.0,1.0];
}
StaticObject.prototype = Object.create(Drawable.prototype);
StaticObject.prototype.move = function()
{
	//Angular
	this.angle += this.angularSpeed;	
}
StaticObject.prototype.turn = function(angle)
{
	this.angle +=angle;
}