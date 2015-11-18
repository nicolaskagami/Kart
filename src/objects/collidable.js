var CollidableRectangle = function(position,halfside)
{
	console.log("Rectangle Collidable");
	this.position = position;
	this.halfside = halfside;
}
CollidableRectangle.prototype = 
{
	testCollision: function(object)
	{
		if( (object.intendedPositionx>this.position[0]-this.halfside)&&
			(object.intendedPositionx<this.position[0]+this.halfside)&&
			(object.intendedPositionz>this.position[2]-this.halfside)&&
			(object.intendedPositionz<this.position[2]+this.halfside))
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
	testCollision: function(object)
	{
		if(((this.position[0]-object.intendedPositionx)*(this.position[0]-object.intendedPositionx)+
		    (this.position[2]-object.intendedPositionz)*(this.position[2]-object.intendedPositionz))
				<(this.radius*this.radius))
			return true;//Collision
		else
			return false;
	}
};

var CollidableArea = function(position,larguraX,larguraZ)
{
	console.log("Rectangle Collidable");
	this.position = position;
	this.larguraX = larguraX;
	this.larguraZ = larguraZ;
	//this.halfside = halfside;
}
CollidableArea.prototype = 
{
	testCollision: function(object)
	{
		if( (object.intendedPositionx>this.position[0]-this.larguraX)&&
			(object.intendedPositionx<this.position[0]+this.larguraX)&&
			(object.intendedPositionz>this.position[2]-this.larguraZ)&&
			(object.intendedPositionz<this.position[2]+this.larguraZ))
			return true;//Collision
		else
			return false;
	}
};