// connects p5

const container = document.querySelector ("#canvas-container");
// console.log(container.clientWidth);

function setup() {
	//Create the canvas and save it to a variable;
	const myCanvas = createCanvas(container.clientWidth, container.clientHeight);
	//Set the parent of the canvas to an exisitng html element's id value
	myCanvas.parent("canvas-container");
	background(220, 40, 50);
}

function mouseMoved() {
	noStroke();
	fill(255, 255, 255, 20)
	ellipse(mouseX, mouseY, 70, 70);
}

function windowResized() {
    resizeCanvas(container.clientWidth, container.clientHeight);
    background(220, 40, 50);
}