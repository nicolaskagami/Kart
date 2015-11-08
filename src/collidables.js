var CollidableRectangle = function(minx,minz,maxx,maxz)
{
	console.log("Rectangle Collidable");
	this.minx = minx;
	this.minz = minz;
	this.maxx = maxx;
	this.maxz = maxz;
}
CollidableRectangle.prototype = 
{
	testCollision: function(x,z)
	{
		if((x>this.minx)&&(x<this.maxx)&&(z>this.minz)&&(z<this.maxz))
			return true;//Collision
		else
			return false;
	}
};
var CollidableCircle = function(centerx, centerz, radius)
{
	console.log("Circle Collidable");
	this.centerx = centerx;
	this.centerz = centerz;
	this.radius = radius;
}
CollidableCircle.prototype = 
{
	testCollision: function(x,z)
	{
		if(((this.centerx-x)*(this.centerx-x)+(this.centerz-z)*(this.centerz-z))<(this.radius*this.radius))
			return true;//Collision
		else
			return false;
	}
};