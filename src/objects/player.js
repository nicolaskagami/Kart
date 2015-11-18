var Player = function(x,y,z,model)
{
	this.position = [x,y,z];
	this.maxSpeed = 0.5;
	this.speed = 0; 
	this.angle = 0;
	this.angularSpeed = 0;
	this.direction = [0,0,1];
	this.collisionArea = new CollidableCircle(this.position,0.8);
	this.model = model;
	this.scale = [1.0,1.0,1.0];
	this.item = ''//No item
}
Player.prototype = Object.create(MovableObject.prototype);
Player.prototype.accelerate = function()
{
	this.speed+=0.02*(this.maxSpeed-this.speed);
}
Player.prototype.decelerate = function()
{
	this.speed-=0.02*(this.maxSpeed+this.speed);
}
Player.prototype.move = function()
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
				return;
			}
		}
	}
	for(var i=0;i<items.length;i++)
	{
		if(items[i].testCollision(this))
		{
			return;
		}
	}
	for(var i=0;i<track.length;i++)
	{
		
		if(track[i].testCollisionRight(this))
		{
			return;
		}
		else if(track[i].testCollisionLeft(this)){
			return;
		}
		
	}
	this.position[0] = this.intendedPositionx;
	this.position[1] = this.intendedPositiony;
	this.position[2] = this.intendedPositionz;
	
	//Angular
	this.angle += this.angularSpeed;
	this.speed*=0.98;
}
Player.prototype.getItem = function(item)
{
	if(this.item == '')
	{
		this.item = item;
	}
}
Player.prototype.useItem = function()
{
	switch(this.item)
	{
		case 'GreenShell' :  projectiles.push(new GreenShell(this.position,this.direction));
				break;
		case 'Mushroom' :  items.push(new Mushroom(this.position));
				break;
		case 'Banana' :  items.push(new Banana(this.position));
				break;
		default: //No Item, make sound or something
	}
	this.item = '';
}

