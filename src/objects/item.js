var GreenShell = function(newPosition,newDirection)
{
	this.position = newPosition.slice();
	this.height=0;
	this.speed = 0.1; 
	this.angularSpeed = 0.2;
	this.angle = 0;
	this.direction = newDirection.slice();;
	this.collisionArea = new CollidableCircle(this.position,0.8); // fix this
	this.model = models.greenShell;
	this.scale = [0.05,0.05,0.05];
}
GreenShell.prototype = Object.create(MovableObject.prototype);
GreenShell.prototype.collide = function(object)
{
	if(typeof object.getHit === 'function')
	{
		object.getHit();
	}
	projectiles.remove(this);
}

var Box = function(newPosition)
{
	this.position = newPosition.slice();
	this.height=0.2;
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
		{
			object.getItem("Random");
		}
		items.remove(this);
		usedItems.push(this);
	} else {
		return false;
	}
}

var Mushroom = function(newPosition)
{
	this.position = newPosition.slice();
	this.height=0.6;
	this.speed = 0; 
	this.angularSpeed = 0.1;
	this.angle = 0;
	this.direction = [0,0,1];
	this.collisionArea = new CollidableCircle(this.position,0.8); // fix this
	this.model = models.mushroom;
	this.scale = [0.10,0.10,0.10];
}
Mushroom.prototype = Object.create(StaticObject.prototype);
Mushroom.prototype.testCollision = function(object)
{
	if(this.collisionArea.testCollision(object))	
	{
		if(typeof object.getItem === 'function')
		{
			object.getItem('Mushroom');
		}
		items.remove(this);
		usedItems.push(this);
	} else {
		return false;
	}
}
var Banana = function(newPosition)
{
	this.position = newPosition.slice();
	this.height=0;
	this.speed = 0; 
	this.angularSpeed = 0.1;
	this.angle = 0;
	this.direction = [0,0,1];
	this.collisionArea = new CollidableCircle(this.position,0.8); // fix this
	this.model = models.banana;
	this.scale = [0.4,0.4,0.4];
}
Banana.prototype = Object.create(StaticObject.prototype);
Banana.prototype.testCollision = function(object)
{
	if(this.collisionArea.testCollision(object))	
	{
		if(typeof object.getHit === 'function')
		{
			object.getHit();
		}
		items.remove(this);
	} else {
		return false;
	}
}