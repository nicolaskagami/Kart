

var TrackSegment = function(x,y,z,model)
{
	this.position = [x,y,z];
	this.angularSpeed = 0;
	this.angle = 0;
	this.leftWallPos = [x-5,y,z];
	this.rightWallPos = [x+5,y,z];
	//this.collisionAreaRight = new CollidableArea(this.leftWallPos,1,4);
	//this.collisionAreaLeft = new CollidableArea(this.rightWallPos,1,4);
	this.model = model;
	this.height=0;
	this.scale = [1.0,1.0,1.0];
}
TrackSegment.prototype = Object.create(Drawable.prototype);
TrackSegment.prototype.move = function()
{
	this.angle += this.angularSpeed;	
}
TrackSegment.prototype.turn = function(angle)
{
	this.angle +=angle;
}
/*
TrackSegment.prototype.testCollisionRight = function(object)
{
	//console.log("Wall Right");
	return this.collisionAreaRight.testCollision(object);
}
TrackSegment.prototype.testCollisionLeft = function(object)
{
	//console.log("Wall Left");
	return this.collisionAreaLeft.testCollision(object);
}
*/
var Curve = function(x,y,z,model,waypoint)
{
	this.waypoint = waypoint;
	this.position = [x,y,z];
	this.angularSpeed = 0;
	this.angle = 0;
	this.backWallPos = [x,y,z+5];
	this.rightWallPos = [x-5,y,z];
	this.collisionArea = new CollidableArea(this.position,4,4);
	//this.collisionAreaLeft = new CollidableArea(this.rightWallPos,1,5);
	this.model = model;
	this.height=0;
	this.scale = [1.0,1.0,1.0];
}
Curve.prototype = Object.create(Drawable.prototype);
Curve.prototype.move = function()
{
	this.angle += this.angularSpeed;	
}
Curve.prototype.turn = function(angle)
{
	this.angle +=angle;
}

Curve.prototype.testCollision = function(object)
{
	//console.log("Wall Right");
	return this.collisionArea.testCollision(object);
}
/*
Curve.prototype.testCollisionLeft = function(object)
{
	//console.log("Wall Left");
	return this.collisionAreaLeft.testCollision(object);
}
*/

var FinishLine = function(x,y,z,model,waypointsNumber)
{
	this.waypointsNumber = waypointsNumber
	this.position = [x,y,z];
	this.angularSpeed = 0;
	this.angle = 0;
	this.leftWallPos = [x-5,y,z];
	this.rightWallPos = [x+5,y,z];
	this.collisionArea = new CollidableArea(this.position,4,2);
	//this.collisionAreaLeft = new CollidableArea(this.rightWallPos,1,4);
	this.model = model;
	this.height=0;
	this.scale = [1.0,1.0,1.0];
}
FinishLine.prototype = Object.create(Drawable.prototype);
FinishLine.prototype.move = function()
{
	this.angle += this.angularSpeed;	
}
FinishLine.prototype.turn = function(angle)
{
	this.angle +=angle;
}
FinishLine.prototype.testCollision = function(object)
{
	//console.log("Wall Left");
	return this.collisionArea.testCollision(object);
}

FinishLine.prototype.testCourse = function(object)
{
	//console.log("Wall Left");
	for(i=0;i<this.waypointsNumber;i++){
		console.log(i)
		if(object.waypoints[i] != i+1){
			object.waypoints = [];
			return;
		}
	}

	object.waypoints=[];
	object.voltasCompletas++;
	console.log("VOLTA COMPLETA " + object.voltasCompletas);
}