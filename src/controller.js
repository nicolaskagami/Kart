var Controller = function()
{


}
Controller.prototype =
{
acceleratePlayer: function(player){
	player.accelerate();
}
};
Controller.prototype =
{
movePlayer: function(player){
    player.accelerate();
    var turnSpeed = 0.03;
    var turnSpeedDumpner = 0.5
    var distanceSide = 0.9;
    var distanceFront = 4;
    for(i=0;i<walls.length;i++){
        if(player.direction[2]>0){
            
            if(walls[i].testCollisionPosition([player.position[0]+distanceSide,player.position[1],player.position[2]])){
                player.turn(-turnSpeed);
            }
            else if(walls[i].testCollisionPosition([player.position[0]-distanceSide,player.position[1],player.position[2]])){
                player.turn(turnSpeed);
            }
            else
            for(j=0;j<curves.length;j++) 
                if(curves[j].testCollision(player) && walls[i].testCollisionPosition([player.position[0],player.position[1],player.position[2]+distanceFront])){
                player.turn(turnSpeed/turnSpeedDumpner);
            }
        }
        if(player.direction[2]<0){
            
            if(walls[i].testCollisionPosition([player.position[0]+distanceSide,player.position[1],player.position[2]])){
                player.turn(turnSpeed);
            }
            else if(walls[i].testCollisionPosition([player.position[0]-distanceSide,player.position[1],player.position[2]])){
                player.turn(-turnSpeed);
            }
            else 
                for(j=0;j<curves.length;j++) 
                    if(curves[j].testCollision(player) && walls[i].testCollisionPosition([player.position[0],player.position[1],player.position[2]+distanceFront])){
                player.turn(turnSpeed/turnSpeedDumpner);
            }
        }
        if(player.direction[0]<0){
            
            if(walls[i].testCollisionPosition([player.position[0],player.position[1],player.position[2]-distanceSide])){
                player.turn(turnSpeed);
            }
            else if(walls[i].testCollisionPosition([player.position[0],player.position[1],player.position[2]+distanceSide])){
                player.turn(-turnSpeed);
            }
            else 
                for(j=0;j<curves.length;j++) 
                    if(curves[j].testCollision(player) && walls[i].testCollisionPosition([player.position[0]-distanceFront,player.position[1],player.position[2]])){
                player.turn(turnSpeed/turnSpeedDumpner);
            }
        }
        if(player.direction[0]>0){
            
            if(walls[i].testCollisionPosition([player.position[0],player.position[1],player.position[2]+distanceSide])){
                player.turn(turnSpeed);
            }
            else if(walls[i].testCollisionPosition([player.position[0],player.position[1],player.position[2]-distanceSide])){
                player.turn(-turnSpeed);
            }
            else 
                for(j=0;j<curves.length;j++) 
                    if(curves[j].testCollision(player) && walls[i].testCollisionPosition([player.position[0]+distanceFront,player.position[1],player.position[2]])){
                player.turn(turnSpeed/turnSpeedDumpner);
            }
        }
    }
    //if(!player.move()){
        /*
        for(i=0;i<track.length;i++){
            if(track[i] instanceof Curve && track[i].testCollision(player))
        {
            //player.accelerate();
            player.turn(0.037);
            return;
        }
        else if(track[i].testCollision(player)){
             if(track[i].angle == 1.57){
                if(track[i].position[2]<=0){
                if(player.position[2]>track[i].position[2] -player.initialz)
                    player.turn(-turnSpeed);
                else
                    player.turn(turnSpeed);
            }
            else{
                if(player.position[2]<track[i].position[2]-player.initialz)
                    player.turn(-turnSpeed);
                else
                    player.turn(turnSpeed);

            }
            }
            else {
                if(track[i].position[0]<=0){
                if(player.position[0]>track[i].position[0]+player.initialx)
                    player.turn(-turnSpeed);
                else
                    player.turn(turnSpeed);
            }
            else{
                if(player.position[0]<track[i].position[0]-player.initialx)
                    player.turn(-turnSpeed);
                else
                    player.turn(turnSpeed);

            }
            }

            //else if(player.angle - track[i].angle < 0)
              //  player.turn(0.1)
            //}

        
    
}


        
    }
*/

}};

//Player.prototype = Object.create(MovableObject.prototype);
//Player.prototype.accelerate = function()
//{
//	this.speed+=turnSpeed*(this.maxSpeed-this.speed);
//}