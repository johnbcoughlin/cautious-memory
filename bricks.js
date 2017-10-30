function borderclick(id) {
	if (id.classList.contains('unclicked')) {
		id.classList.add('clicked');
		id.classList.remove('unclicked');
	}
	else {
		id.classList.add('unclicked');
		id.classList.remove('clicked');
	}

} 

function drawpuzzle(width, height) {
	if (height % 2 == 0) {
		console.log("Height of brick wall must be odd");
		return;
	}
	var svgns = "http://www.w3.org/2000/svg";
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < (width - y % 2); x++) {
			var rect = document.createElementNS(svgns, 'rect');
			var num = x + 1;
			rect.setAttributeNS(null, 'x', 10 + 110 * x + 55 * (y % 2));
			rect.setAttributeNS(null, 'y', 10 + 60 * y);
			rect.setAttributeNS(null, 'height', 50);
			rect.setAttributeNS(null, 'width', 100);
			rect.setAttributeNS(null, 'fill', 'rgb(192,75,75)');
			rect.setAttributeNS(null, 'id', 'B' + String.fromCharCode(65 + y) + num.toString());
			rect.setAttributeNS(null, 'class', 'brick');
			document.getElementById("canvas").appendChild(rect);
		}
	}
	for (var y = 0; y < height + 1; y++) {
		for (var x = 0; x < 2 * width; x++) {
			var rect = document.createElementNS(svgns, 'rect');
			var num = x + 1;
			rect.setAttributeNS(null, 'x', 10 + 55 * x);
			rect.setAttributeNS(null, 'y', 60 * y);
			rect.setAttributeNS(null, 'height', 10);
			rect.setAttributeNS(null, 'width', 45);
			rect.setAttributeNS(null, 'id', 'L' + String.fromCharCode(65 + y) + num.toString());
			rect.setAttributeNS(null, 'class', 'unclicked');
			rect.setAttributeNS(null, 'onclick', 'borderclick(this)');
			document.getElementById("canvas").appendChild(rect);
		}
	}
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < (width + 1 - y % 2); x++) {
			var rect = document.createElementNS(svgns, 'rect');
			var num = x + 1;
			rect.setAttributeNS(null, 'x', 110 * x + 55 * (y % 2));
			rect.setAttributeNS(null, 'y', 10 + 60 * y);
			rect.setAttributeNS(null, 'height', 50);
			rect.setAttributeNS(null, 'width', 10);
			rect.setAttributeNS(null, 'id', 'T' + String.fromCharCode(65 + y) + num.toString());
			rect.setAttributeNS(null, 'class', 'unclicked');
			rect.setAttributeNS(null, 'onclick', 'borderclick(this)');
			document.getElementById("canvas").appendChild(rect);
		}
	}
}

drawpuzzle(5,5);

