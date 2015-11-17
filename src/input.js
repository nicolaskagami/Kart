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
	mouseX = event.clientX;
	mouseY = event.clientY;
}

function handleMouseDown(event) {
	cameraMouseControl = true;
	lastX = event.clientX;
	lastY = event.clientY;
}	

function handleMouseUp(event) {
	cameraMouseControl = false;
}


function handleKey() {
	if(lockedCamera)
	{
		if (currentlyPressedKeys[87]) {
			// W 
			players[currentPlayer].accelerate();
		} else
		if (currentlyPressedKeys[83]) {
			// S
			players[currentPlayer].decelerate();
		}
		if (currentlyPressedKeys[65]) {
			// A - Turn Left
			players[currentPlayer].turn(0.1);
		} else
		if (currentlyPressedKeys[68]) {
			// D - Turn Right
			players[currentPlayer].turn(-0.1);
		}
		if (currentlyPressedKeys[32]) {
			// Space - Use Item
			players[currentPlayer].useItem();
			currentlyPressedKeys[32] = false;
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
		} else
		if (currentlyPressedKeys[68]) {
			// D
		}
	}
		
		if (currentlyPressedKeys[69]) {
			//players[0].move();
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
			currentlyPressedKeys[67] = false; //"debouncer"
		}
		if (currentlyPressedKeys[86]) {
			//V
			currentPlayer = (currentPlayer +1) % players.length;
			console.log(currentPlayer);
			currentlyPressedKeys[86] = false //"debouncer"
		}
		if (currentlyPressedKeys[90]) {
			//V
			camAngle+=0.1;
		}
}

function input() {
	handleKey();
}