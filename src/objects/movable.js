var MovableObject = function(x,y,z,model)
{
	this.position = [x,y,z];
	this.speed = 0; 
	this.angularSpeed = 0;
	this.angle = 0;
	this.direction = [0,0,1]; // Direction for linear movement
	this.model = model;
	this.scale = [1.0,1.0,1.0];
}
MovableObject.prototype = Object.create(Drawable.prototype);
MovableObject.prototype.move = function()
{
	//Linear
	var intendedPositionx = this.position[0] + this.speed*this.direction[0];
	var intendedPositiony = this.position[1] + this.speed*this.direction[1];
	var intendedPositionz = this.position[2] + this.speed*this.direction[2];
	for(var i=0;i<players.length;i++)
	{
		if(players[i]!=this)
		{
			if(players[i].collisionArea.testCollision(intendedPositionx,intendedPositionz))
			{
				return;
			}
		}
	}
	this.position[0] = intendedPositionx;
	this.position[1] = intendedPositiony;
	this.position[2] = intendedPositionz;
	
	//Angular
	this.angle += this.angularSpeed;
	
}
MovableObject.prototype.turn = function(angle)
{
	this.angle +=angle;
	this.direction[0] = Math.sin(this.angle);
	this.direction[2] = Math.cos(this.angle);
}