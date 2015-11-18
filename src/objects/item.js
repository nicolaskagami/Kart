var GreenShell = function(newPosition,newDirection)
{
	this.position = newPosition.slice();
	this.speed = 0.1; 
	this.angularSpeed = 0.2;
	this.angle = 0;
	this.direction = newDirection.slice();;
	this.collisionArea = new CollidableCircle(this.position,0.8); // fix this
	this.model = models.greenShell;
	this.scale = [0.05,0.05,0.05];
}
GreenShell.prototype = Object.create(MovableObject.prototype);
var Box = function(newPosition)
{
	this.position = newPosition.slice();
	this.position[1]+=0.5;
	this.speed = 0; 
	this.angle = 0;
	this.angularSpeed = 0.1;
	this.direction = [0,0,1];
	this.collisionArea = new CollidableRectangle(this.position,0.8); // fix this
	this.model = models.box;
	this.scale = [0.25,0.25,0.25];
}
Box.prototype = Object.create(StaticObject.prototype);
Box.prototype.testCollision = function(object)
{
	if(this.collisionArea.testCollision(object))	
	{
		if(typeof object.getItem === 'function')
			object.getItem("Random");
		items.remove(this);
	} else {
		return false;
	}
}
var Mushroom = function(newPosition)
{
	this.position = newPosition.slice();
	this.position[1]+=1.2;
	this.speed = 0; 
	this.angularSpeed = 0.1;
	this.angle = 0;
	this.direction = [0,0,1];
	this.collisionArea = new CollidableCircle(this.position,0.8); // fix this
	this.model = models.mushroom;
	this.scale = [0.15,0.15,0.15];
}
Mushroom.prototype = Object.create(StaticObject.prototype);
var Banana = function(newPosition)
{
	this.position = newPosition.slice();
	this.speed = 0; 
	this.angularSpeed = 0.1;
	this.angle = 0;
	this.direction = [0,0,1];
	this.collisionArea = new CollidableCircle(this.position,0.8); // fix this
	this.model = models.banana;
	this.scale = [0.4,0.4,0.4];
}
Banana.prototype = Object.create(MovableObject.prototype);