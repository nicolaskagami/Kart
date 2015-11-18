var MovableObject = function(x,y,z,model)
{
	this.position = [x,y,z];
	this.height = 0;
	this.speed = 0; 
	this.angularSpeed = 0;
	this.angle = 0;
	this.collisionArea = new CollidableCircle(this.position,0);
	this.direction = [0,0,1]; // Direction for linear movement
	this.model = model;
	this.scale = [1.0,1.0,1.0];
}
MovableObject.prototype = Object.create(Drawable.prototype);
MovableObject.prototype.move = function()
{
	//Linear
	this.intendedPositionx = this.position[0] + this.speed*this.direction[0];
	this.intendedPositiony = this.position[1] + this.speed*this.direction[1];
	this.intendedPositionz = this.position[2] + this.speed*this.direction[2];
	for(var i=0;i<players.length;i++)
	{
		if(players[i]!=this)
		{
			if(players[i].testCollision(this))
			{
				this.collide(players[i]);
				return;
			}
		}
	}
	for(var i=0;i<items.length;i++)
	{
		if(items[i].testCollision(this))
		{
			this.collide(items[i]);
			return;
		}
	}
	for(var i=0;i<track.length;i++)
	{
		//We should change this... Make each wall a separate entity?
		if(track[i].testCollisionRight(this))
		{
			//this.bounce(track[i]);
			this.collide(items[i]);
			return;
		}
		else if(track[i].testCollisionLeft(this))
	    {
			//this.bounce(track[i]);
			this.collide(items[i]);
			return;
		}
	}
	this.position[0] = this.intendedPositionx;
	this.position[1] = this.intendedPositiony;
	this.position[2] = this.intendedPositionz;
	
	//Angular
	this.angle += this.angularSpeed;
	
}
MovableObject.prototype.testCollision = function(object)
{
	return this.collisionArea.testCollision(object);
}
MovableObject.prototype.turn = function(angle)
{
	this.angle +=angle;
	this.direction[0] += Math.sin(this.angle);
	this.direction[2] += Math.cos(this.angle);
}
MovableObject.prototype.collide = function(object)
{
}
MovableObject.prototype.bounce = function(object)
{
	
}