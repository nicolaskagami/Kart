var MovableObject = function(x,y,z,model)
{
	this.position = [x,y,z];
	this.speed = 0.1; 
	this.angle = 0;
	this.direction = [0,0,1];
	this.collisionArea = new CollidableCircle(x,z,0.8);
	this.model = model;
}
MovableObject.prototype = Object.create(Drawable.prototype);
MovableObject.prototype.move = function()
{
	var intendedPositionx = this.position[0] + this.speed*this.direction[0];
	var intendedPositiony = this.position[1] + this.speed*this.direction[1];
	var intendedPositionz = this.position[2] + this.speed*this.direction[2];
	for(var i=0;i<players.length;i++)
	{
		console.log("Testing"+i);
		if(players[i]!=this)
		{
			if(players[i].collisionArea.testCollision(intendedPositionx,intendedPositionz))
			{
				console.log("Collision!");
				return;
			}
		}
	}
	this.position[0] = intendedPositionx;
	this.position[1] = this.speed*this.direction[1];
	this.position[2] = intendedPositionz;
}
MovableObject.prototype.backup = function()
{
	var intendedPositionx = this.position[0] - this.speed*this.direction[0];
	var intendedPositiony = this.position[1] - this.speed*this.direction[1];
	var intendedPositionz = this.position[2] - this.speed*this.direction[2];
	for(var i=0;i<players.length;i++)
	{
		console.log("Testing"+i);
		if(players[i]!=this)
		{
			if(!players[i].collisionArea.testCollision(intendedPositionx,intendedPositionz))
			{
				this.position[0] = intendedPositionx;
				this.position[1] = this.speed*this.direction[1];
				this.position[2] = intendedPositionz;
			}
			else
			{
				console.log("Collision!");break;
			}
		}
	}
}
MovableObject.prototype.turn = function(angle)
{
	this.angle +=angle;
	this.direction[0] = Math.sin(this.angle);
	this.direction[2] = Math.cos(this.angle);
}
MovableObject.prototype.setCollisionRectangle = function(minx,minz,maxx,maxz)
{
	this.collisionArea = new CollidableRectangle(minx,minz,maxx,maxz);
}
MovableObject.prototype.setCollisionCircle = function(centerx, centerz, radius)
{
	this.collisionArea = new CollidableCircle(centerx, centerz, radius);
}