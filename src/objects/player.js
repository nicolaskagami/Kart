var Player = function(x,y,z,model)
{
	this.position = [x,y,z];
	this.front = [x,y,z];
	this.back = [x,y,z];
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
		if(item == 'Random')
		{
			item = Math.floor(Math.random()*(3+1));
			switch(item)
			{
				case 0: this.item = 'GreenShell'; break
				case 1: this.item = 'Mushroom'; break
				case 2: this.item = 'Banana'; break
			}
			//console.log(this.item);
		} else {			
			this.item = item;
		}
	}
}
Player.prototype.updateFrontBack = function()
{
	this.front[0] = this.position[0] + 1.2*this.direction[0];
	this.front[1] = this.position[1] + 1.2*this.direction[1];
	this.front[2] = this.position[2] + 1.2*this.direction[2];
	this.back[0] = this.position[0] - 1.2*this.direction[0];
	this.back[1] = this.position[1] - 1.2*this.direction[1];
	this.back[2] = this.position[2] - 1.2*this.direction[2];
}
Player.prototype.useItem = function()
{
	this.updateFrontBack();
	switch(this.item)
	{
		case 'GreenShell' :  projectiles.push(new GreenShell(this.front,this.direction));
				break;
		case 'Mushroom' :  items.push(new Mushroom(this.position));
				break;
		case 'Banana' :  items.push(new Banana(this.back));
				break;
		default: //No Item, make sound or something
	}
	this.item = '';
}

