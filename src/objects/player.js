var Player = function(x,y,z,model,marker)
{

	this.initialx = x;
	this.initialz = z;
	this.voltasCompletas = 0;
	this.waypoints = []
	this.position = [x,y,z];

	this.marker = new Marker(this.position,marker);

	this.front = [x,y,z];
	this.back = [x,y,z];
	this.cameraPosition = [x,y,z+1];
	this.cameraDistance = 2.2;
	this.direction = [0,0,1];
	
	//this.maxSpeed = 0.3;
	this.maxSpeed = 0.3;
	this.speed = 0; 
	this.angle = 0;
	this.angularSpeed = 0;
	
	this.model = model;
	this.height = 0;
	this.scale = [1.0,1.0,1.0];
	this.collisionArea = new CollidableCircle(this.position,0.8);
	
	this.itemName = ''//No item
	this.item;
	this.uncontrolled = 0;
	this.boost = 0;
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
	if(this.uncontrolled>0)
	{
		//Got hit
		this.speed*=0.90;
		this.direction[0] = Math.sin(this.angle);
		this.direction[2] = Math.cos(this.angle);
		this.cameraDistance = 2.2+(this.uncontrolled)/100;
		this.updateCamera(0.98/(this.uncontrolled+0.1*this.uncontrolled*this.uncontrolled));
		this.uncontrolled -= 1;
		this.angularSpeed= this.uncontrolled/360;
	}else
	this.updateCamera(0.98);
	
	if(this.boost>0)
	{
		this.maxSpeed = 0.3+(this.boost/300);
		this.boost-=1;
	}
	//Linear Component
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
	for(var i=0;i<track.length-1;i++)
	{
		
		
		if(track[i] instanceof Curve && track[i].testCollision(this))
		{
			this.addWaypoint(track[i].waypoint);
		}
		
		
	}

	if(track[track.length-1].testCollision(this)){//chegada
			track[track.length-1].testCourse(this);
		}

	for(var i=0;i<walls.length;i++)
		{
			if(walls[i].testCollision(this))
			{
				return false;
			}
		}

	this.position[0] = this.intendedPositionx;
	this.position[1] = this.intendedPositiony;
	this.position[2] = this.intendedPositionz;
	//Move the marker
	this.marker.updatePosition(this.position);

	//Angular Component
	this.angle += this.angularSpeed;
	this.speed*=0.98;
}
Player.prototype.getItem = function(item)
{
	if(this.itemName == '')
	{
		if(item == 'Random')
		{
			item = Math.floor(Math.random()*(2+1));
			switch(item)
			{
				case 0: this.itemName = 'GreenShell'; break
				case 1: this.itemName = 'Mushroom'; break
				case 2: this.itemName = 'Banana'; break
			}
			console.log(this.itemName);
		} else {
			this.itemName = item;
		}
		switch(this.itemName)
		{
			case 'GreenShell' :  
				this.item = new GreenShell(this.position,[0,0,0]);
				break;
			case 'Mushroom' : 
				this.item = new Mushroom(this.position);
				break;
			case 'Banana' :  
				this.item = new Banana(this.position);	
				break;
			default: //No Item, make sound or something
				return
		}
		this.item.position = this.position;
		this.item.height += 1;
		this.item.move = StaticObject.prototype.move;
		this.item.collisionArea.radius = 0;
		items.push(this.item);
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
Player.prototype.getHit = function()
{
	this.uncontrolled = 100;
}
Player.prototype.getBoost = function()
{
	this.boost = 200;
}
Player.prototype.useItem = function()
{
	this.updateFrontBack();
	switch(this.itemName)
	{
		case 'GreenShell' :  projectiles.push(new GreenShell(this.front,this.direction));
				break;
		case 'Mushroom' :  this.getBoost();
				break;
		case 'Banana' :  items.push(new Banana(this.back)); 
				break;
		default: //No Item, make sound or something
			return;
	}
	items.remove(this.item);
	this.item = '';
	this.itemName = '';
}
Player.prototype.turn = function(angle)
{
	this.angle +=angle;
	this.direction[0] = Math.sin(this.angle);
	this.direction[2] = Math.cos(this.angle);
}
Player.prototype.updateCamera = function(camInertia)
{
	this.cameraPosition[0] += camInertia*(this.position[0] - this.cameraDistance*this.direction[0] - this.cameraPosition[0]);
	this.cameraPosition[1] += camInertia*(this.position[1] - this.cameraDistance*this.direction[1] - this.cameraPosition[1]);
	this.cameraPosition[2] += camInertia*(this.position[2] - this.cameraDistance*this.direction[2] - this.cameraPosition[2]);
}

Player.prototype.addWaypoint = function(waypoint)
{
	possui = false
    var i = this.waypoints.length;
    while (i--) {
       if (this.waypoints[i] === waypoint) {
           possui = true;
       }
    }
	

    if(!possui){
    	this.waypoints.push(waypoint)
    	console.log(this.waypoints)
    }

}
Player.prototype.testWaypoint = function(waypoint){
	possui = false
    var i = this.waypoints.length;
    while (i--) {
       if (this.waypoints[i] === waypoint) {
           possui = true;
       }
    }
    return possui;
}

