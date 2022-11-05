// connects p5

const container = document.querySelector("#canvas-container");
// console.log(container.clientWidth);


//I switched to another Draggble Example: https://editor.p5js.org/enickles/sketches/HJoISR_WM 
let rectangles = [];
let circles = [];

function setup() {
	//Create the canvas and save it to a variable;
	const myCanvas = createCanvas(container.clientWidth, container.clientHeight);
	//Set the parent of the canvas to an exisitng html element's id value
	myCanvas.parent("canvas-container");

	for (let i = 0; i < 8; i++) {
		let x = random(width);
		let y = random(height);
		let w = random(40, 80);
		let h = random(40, 80);
		rectangles[i] = new Rectangle(x, y, w, h);
	}

	for (let i = 0; i < 6; i++) {
		let x = random(width);
		let y = random(height);
		let d = random(40, 80);
		circles[i] = new Circle(x, y, d);
	}
}

function draw() {
	background(220, 40, 50);

	for (i = 0; i < rectangles.length; i++) {
		rectangles[i].show(mouseX, mouseY);
	}

	for (i = 0; i < circles.length; i++) {
		circles[i].show(mouseX, mouseY);
	}
}

// function mouseMoved() {
// 	noStroke();
// 	fill(255, 255, 255, 20)
// 	ellipse(mouseX, mouseY, 70, 70);
// }

function mousePressed() {

	for (i = 0; i < rectangles.length; i++) {
		rectangles[i].pressed(mouseX, mouseY);
	}

	for (i = 0; i < circles.length; i++) {
		circles[i].pressed(mouseX, mouseY);
	}
}

function mouseReleased() {
	for (i = 0; i < rectangles.length; i++) {
		rectangles[i].notPressed();
	}

	for (i = 0; i < circles.length; i++) {
		circles[i].notPressed();
	}
}

function windowResized() {
	resizeCanvas(container.clientWidth, container.clientHeight);
	background(220, 40, 50);
}


//Class for all the rectangles and squares
class Rectangle {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.offsetX = 0;
		this.offsetY = 0;
		this.dragging = false;
		this.rollover = false;
	}

	show(px, py) {
		if (this.dragging) {
			this.x = px + this.offsetX;
			this.y = py + this.offsetY;
		}

		noStroke();
		fill(252, 186, 3);
		rect(this.x, this.y, this.w, this.h);
	}

	pressed(px, py) {
		if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
			// print("clicked on rect");
			this.dragging = true;
			this.offsetX = this.x - px;
			this.offsetY = this.y - py;
		}
	}
	notPressed() {
		this.dragging = false;
	}
}

class Circle {
	constructor(x, y, d) {
		this.x = x;
		this.y = y;
		this.d = d;
		this.offsetX = 0;
		this.offsetY = 0;
		this.dragging = false;
		this.rollover = false;
	}

	show(px, py) {
		if (this.dragging) {
			this.x = px + this.offsetX;
			this.y = py + this.offsetY;
		}

		noStroke();
		fill(0, 173, 46);
		circle(this.x, this.y, this.d);
	}

	pressed(px, py) {
		if (px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h) {
			// print("clicked on rect");
			this.dragging = true;
			this.offsetX = this.x - px;
			this.offsetY = this.y - py;
		}
	}
	notPressed() {
		this.dragging = false;
	}
}