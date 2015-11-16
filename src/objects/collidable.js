var CollidableRectangle = function(position,halfside)
{
	console.log("Rectangle Collidable");
	this.position = position;
	this.halfside = halfside;
}
CollidableRectangle.prototype = 
{
	testCollision: function(x,z)
	{
		if((x>this.position[0]-halfside)&&(x<this.position[0]+halfside)&&(z>this.position[2]-halfside)&&(z<this.position[2]+halfside))
			return true;//Collision
		else
			return false;
	}
};
var CollidableCircle = function(position, radius)
{
	this.position = position;
	this.radius = radius;
}
CollidableCircle.prototype = 
{
	testCollision: function(x,z)
	{
		if(((this.position[0]-x)*(this.position[0]-x)+(this.position[2]-z)*(this.position[2]-z))<(this.radius*this.radius))
			return true;//Collision
		else
			return false;
	}
};