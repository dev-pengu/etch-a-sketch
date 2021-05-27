const CANVAS_SIZE = 500;

let penColor = "black";
let container = document.querySelector("#container");

for (let i = 0; i < 256; i++) {
	let div = document.createElement("div");
	div.classList.add("content-div");
	div.setAttribute("id", `content-div-${i}`);
	div.addEventListener("mouseover", function(e) {
		colorCanvas(e.target);
	});
	container.appendChild(div);
}

function colorCanvas(div) {
	switch(penColor) {
		case 'rainbow':
			div.style.backgroundColor = getRandomColor();
			break;
		case 'erase':
			div.style.backgroundColor = '#ffffff';
			break;
		case 'black':
			div.style.backgroundColor = '#000000';
			break;
		default:
			div.style.backgroundColor = penColor;
			break;
	}
}

function getRandomColor() {
	let letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

container.style.gridTemplateColumns = `repeat(${16}, ${CANVAS_SIZE/16}px)`;
container.style.gridTemplateRows = `repeat(${16}, ${CANVAS_SIZE/16}px)`;

document.querySelector("#clear-canvas-btn").addEventListener('click', () => {
	let divs = document.querySelectorAll(".content-div");
	
	divs.forEach((div) => {
		div.style.backgroundColor = "white";
	});
});

document.querySelector("#squares").addEventListener('change', function(e) {
	buildNewCanvas(e.target.value);
	document.querySelector('#pixel-slider > p').textContent = `Current Size: ${e.target.value} per side`;
});

document.querySelector("#pen-color").addEventListener('change', function(e) {
	penColor = e.target.value;
});

document.querySelector("#erase-btn").addEventListener('click', () => {
	penColor = 'erase';
});

document.querySelector('#rainbow-btn').addEventListener('click', () => {
	penColor = 'rainbow';
});

document.querySelector('#black-btn').addEventListener('click', () => {
	penColor = 'black';
	document.querySelector('#pen-color').value = '#000000';
});


function buildNewCanvas(numInRow) {
	if (numInRow > 100) {numInRow = 100;}
	if (numInRow < 0) {numInRow = 1;}
	let totalDivs = numInRow * numInRow;
	let divs = document.querySelectorAll(".content-div");
	
	divs.forEach((div) => {
		div.parentNode.removeChild(div);
	});
	
	for (let i = 0; i < totalDivs; i++) {
		let div = document.createElement("div");
		div.classList.add("content-div");
		div.setAttribute("id", `content-div-${i}`);
		div.addEventListener("mouseover", function(e) {
			colorCanvas(e.target);
		});
		container.appendChild(div);
	}
	
	container.style.gridTemplateColumns = `repeat(${numInRow}, ${CANVAS_SIZE/numInRow}px)`;
	container.style.gridTemplateRows = `repeat(${numInRow}, ${CANVAS_SIZE/numInRow}px)`;
}