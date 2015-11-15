//Funções de input
var currentlyPressedKeys = {};

var mouseX;
var mouseY;

function initInput(doc) {
	doc.onkeydown = handleKeyDown;
	doc.onkeyup = handleKeyUp;
	doc.onmousedown = handleMouseDown;
	doc.onmouseup = handleMouseUp;
	doc.onmousemove = handleMouseMove;
}

function handleKeyDown(event) {
	currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
	currentlyPressedKeys[event.keyCode] = false;
}

function handleMouseMove(event) {
	//console.log("Mouse"+event.clientX);
	mouseX = event.clientX;
	mouseY = event.clientY;
}

function handleMouseDown(event) {
	cameraMouseControl = true;
	lastX = event.clientX;
}	

function handleMouseUp(event) {
	cameraMouseControl = false;
}


function handleKey() {
	if(lockedCamera)
	{
		if (currentlyPressedKeys[87]) {
			// W
			players[0].move();
		} else
		if (currentlyPressedKeys[83]) {
			// S
			players[0].backup();
		}
		if (currentlyPressedKeys[65]) {
			// A
			players[0].turn(0.1);
		} else
		if (currentlyPressedKeys[68]) {
			// D
			players[0].turn(-0.1);
		}
	}
	else
	{
	
		if (currentlyPressedKeys[87]) {
			// W
			currentCamPosition[0]+=0.2*cameraDirection[0]
			currentCamPosition[1]+=0.2*cameraDirection[1]
			currentCamPosition[2]+=0.2*cameraDirection[2];
		} else
		if (currentlyPressedKeys[83]) {
			// S
			currentCamPosition[0]-=0.2*cameraDirection[0]
			currentCamPosition[1]-=0.2*cameraDirection[1]
			currentCamPosition[2]-=0.2*cameraDirection[2];
		}
		if (currentlyPressedKeys[65]) {
			// A
			currentCamPosition[0]+=0.1;
		} else
		if (currentlyPressedKeys[68]) {
			// D
			currentCamPosition[0]-=0.1;
		}
	}
		
		if (currentlyPressedKeys[69]) {
			players[0].move();
		}
		if (currentlyPressedKeys[81]) {
			//players[0].setVelocity(0.01,0,0);
		}
		if (currentlyPressedKeys[67]) {
			// C
			if(lockedCamera)
				lockedCamera = false;
			else
				lockedCamera = true;
		}
		if (currentlyPressedKeys[86]) {
			//V
			players[0].turn(-0.1);
		}
		if (currentlyPressedKeys[90]) {
			//V
			camAngle+=0.1;
		}
}

function input() {
	handleKey();
}