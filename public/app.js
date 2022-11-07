// connects p5

const container = document.querySelector("#canvas-container");
// console.log(container.clientWidth);

let rectangles = [];
let circles = [];

function getRandomRGB() {
  return [
    Math.ceil(Math.random() * 255),
    Math.ceil(Math.random() * 255),
    Math.ceil(Math.random() * 255),
  ];
}
function setup() {
	//Create the canvas and save it to a variable;
	const myCanvas = createCanvas(container.clientWidth, container.clientHeight);
	//Set the parent of the canvas to an exisitng html element's id value
	myCanvas.parent("canvas-container");

	for (let i = 0; i < 5; i++) {
		let x = random(width);
		let y = random(height);
		let w = 90;
		let h = 90;
	
		rectangles[i] = new Rectangle(x, y, w, h, getRandomRGB());
	  }
	
	  for (let c = 0; c < 4; c++) {
		let x = random(width);
		let y = random(height);
		let d = 80;
		circles[c] = new Circle(x, y, d, getRandomRGB());
	  }

}

function draw() {
	// background(220, 40, 50);
	background(54, 49, 49);

	for (i = 0; i < rectangles.length; i++) {
	  rectangles[i].show(mouseX, mouseY);
	}
  
	for (c = 0; c < circles.length; c++) {
	  circles[c].show(mouseX, mouseY);
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
	
	  for (c = 0; c < circles.length; c++) {
		circles[c].pressed(mouseX, mouseY);
	  }
}

function mouseReleased() {
	for (i = 0; i < rectangles.length; i++) {
		rectangles[i].notPressed();
	  }
	
	  for (c = 0; c < circles.length; c++) {
		circles[c].notPressed();
	  }
}

function windowResized() {
	resizeCanvas(container.clientWidth, container.clientHeight);
	background(220, 40, 50);
}


//Class for all the squares
class Rectangle {
	constructor(x, y, w, h, color) {
	  this.x = x;
	  this.y = y;
	  this.w = w;
	  this.h = h;
	  this.offsetX = 0;
	  this.offsetY = 0;
	  this.dragging = false;
	  this.rollover = false;
	  this.color = color;
	}
  
	show(px, py) {
	  if (this.dragging) {
		this.x = px + this.offsetX;
		this.y = py + this.offsetY;
	  }
  
	  noStroke();
	  fill(this.color[0], this.color[1], this.color[2]);
	  rect(this.x, this.y, this.w, this.h);
	}
  
	pressed(px, py) {
	  if (
		px > this.x &&
		px < this.x + this.w &&
		py > this.y &&
		py < this.y + this.h
	  ) {
		// print("clicked on rect");
		this.dragging = true;
		this.offsetX = this.x - px;
		this.offsetY = this.y - py;
	  }
	}
  
	notPressed() {
	  // print("mouse was released");
	  this.dragging = false;
	}
  }
  
  class Circle {
	constructor(x, y, d, color) {
	  this.x = x / 2;
	  this.y = y / 2;
	  this.d = d;
	  this.offsetX = 0;
	  this.offsetY = 0;
	  this.dragging = false;
	  this.rollover = false;
	  this.color = color;
	}
  
	show(px, py) {
	  if (this.dragging) {
		this.x = px + this.offsetX;
		this.y = py + this.offsetY;
	  }
  
	  noStroke();
	  fill(this.color[0], this.color[1], this.color[2]);
	  ellipse(this.x, this.y, this.d);
	}
  
	pressed(px, py) {
	  if (
		px > this.x - this.d / 2 &&
		px < this.x + this.d / 2 &&
		py > this.y - this.d / 2 &&
		py < this.y + this.d / 2
	  ) {
		// print("clicked on circle");
		this.dragging = true;
		this.offsetX = this.x - px;
		this.offsetY = this.y - py;
	  }
	}
  
	notPressed() {
	  // print("mouse was released");
	  this.dragging = false;
	}
  }
  
  const submit = document.querySelector(".button");

submit.addEventListener("click", function () {
	// capture canvas (1. refer to canvas in HTML, 2. captures image in form of text 3. storing as a value in obj)
	const capture = document.querySelector("canvas")
	const imageData = capture.toDataURL("image/jpeg")
	let obj = { image: imageData }
	// console.log (imageData)
	// send to server (1. post data to a webpage 2. sending body (as JSON) 3. turning into JSON string)
	fetch("/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(obj),
	})
		.then((response) => response.json)
		.then((data) => {
			fetch("/gallery")
				.then((response) => response.json())
				.then((data) => {
					const gallery = document.querySelector(".gallery");
					const p1 = document.querySelector(".page1")
					const p2 = document.querySelector(".page2")
					p1.style.display = "none"
					p2.style.display = "flex"
					for (let i = 0; i < data.data.length; i++) {
						const imageElem = document.createElement("img")
						imageElem.src = data.data[i].image
						gallery.appendChild(imageElem)
					}
				})
		})
})