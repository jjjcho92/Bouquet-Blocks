// connects p5

const container = document.querySelector("#canvas-container");
// console.log(container.clientWidth);

//I take out the circles for now as I'm not able to make it work. Working on p5 editor seperately: https://editor.p5js.org/jjjcho92/sketches/6mcrYaJrw 
let rectangles = [];

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
}

function draw() {
	background(220, 40, 50);

	for (i = 0; i < rectangles.length; i++) {
		rectangles[i].show(mouseX, mouseY);
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

}

function mouseReleased() {
	for (i = 0; i < rectangles.length; i++) {
		rectangles[i].notPressed();
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

const submit = document.querySelector(".button");

submit.addEventListener("click", function(){
	// capture canvas (1. refer to canvas in HTML, 2. captures image in form of text 3. storing as a value in obj)
	const capture = document.querySelector("canvas")
	const imageData = capture.toDataURL("image/jpeg")
	let obj = {image:imageData} 
	// console.log (imageData)
	// send to server (1. post data to a webpage 2. sending body (as JSON) 3. turning into JSON string)
	fetch("/submit", {
		method:"POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body:JSON.stringify (obj),
	}).then((response) => response.json)
		.then((data)=> {
		// console.log(data)
	})
	// store in database
})

const display = document.querySelector(".display");
display.addEventListener("click", function(){
	fetch("/gallery").then((response) => response.json())
	.then((data) => {
		// console.log(data.data[0].image)
		const gallery = document.querySelector(".container");
		const imageElem = document.createElement("img")
		imageElem.src = data.data[0].image
		gallery.appendChild (imageElem)
	}) 
})