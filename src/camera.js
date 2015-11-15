var lockedCamera;
var cameraDirection;
var cameraMouseControl;
var currentCamPosition;
var currentCamTarget;

var lastX;
var lastY;
var camAngle1;
var camAngle2;


function initCamera() {
	camAngle1 =0;
	camAngle2 =0;
	lockedCamera = false;
	cameraMouseControl = false;
	cameraDirection = [0,0,1];
	currentCamPosition = [0,1,-5];
	currentCamTarget = [1,0,3];
}


function updateCamera() {
	if(lockedCamera)
	{
		currentCamPosition[0] = players[currentPlayer].position[0] - 2*players[currentPlayer].direction[0];
		currentCamPosition[1] = players[currentPlayer].position[1] - 2*players[currentPlayer].direction[1] + 1;
		currentCamPosition[2] = players[currentPlayer].position[2] - 2*players[currentPlayer].direction[2];

		currentCamTarget[0] = players[currentPlayer].position[0];
		currentCamTarget[1] = players[currentPlayer].position[1] + 1;
		currentCamTarget[2] =  players[currentPlayer].position[2];
	
	}else{

		currentCamPosition[0] = currentCamPosition[0];
		currentCamPosition[1] = currentCamPosition[1];
		currentCamPosition[2] = currentCamPosition[2];
		
		if(cameraMouseControl)
		{
			camAngle1+=(mouseX-lastX)*0.001;
			lastX=mouseX;
			camAngle2+=(mouseY-lastY)*0.001;
			lastY=mouseY;
			cameraDirection[0] = Math.sin(camAngle1)*Math.cos(camAngle2);
			cameraDirection[1] = Math.sin(camAngle1)*Math.sin(camAngle2);
			cameraDirection[2] = Math.cos(camAngle1);
		}
		
		currentCamTarget[0] = currentCamPosition[0] + cameraDirection[0];
		currentCamTarget[1] = currentCamPosition[1] + cameraDirection[1];
		currentCamTarget[2] = currentCamPosition[2] + cameraDirection[2];
		
	}
}