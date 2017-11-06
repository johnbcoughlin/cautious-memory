var brickwidth = 100;
var brickheight = 50;
var mortar = 10;
var unitlength = brickwidth + mortar;
var unitheight = brickheight + mortar;
var halfunit = unitlength / 2;
var horizmortarlength = (brickwidth - mortar)/2;

var nColumns = 9;
var nRows = 9;

var ULcorner = ['H1-1', 'H2-1', 'H1-2', 'V1-1'];
var URcorner = ['H' + String(2 * nColumns - 1) + '-1', 'H' + String(2 * nColumns) + '-1', 'H' + String(2 * nColumns) + '-2', 'V' + String(nColumns + 1) + '-1'];
var LLcorner = ['H1-' + String(nRows + 1), 'H2-' + String(nRows + 1), 'H1-' + String(nRows), 'V1-' + String(nRows)];
var LRcorner = ['H' + String(2 * nColumns - 1) + '-' + String(nRows + 1), 'H' + String(2 * nColumns) + '-' + String(nRows + 1), 'H' + String(2 * nColumns) + '-' + String(nRows), 'V' + String(nColumns + 1) + '-' + String(nRows)];
var corners = [ULcorner, URcorner, LLcorner, LRcorner];

var svgns = "http://www.w3.org/2000/svg";

function borderclick(id) {
	var clickclass = id.getAttributeNS(null, 'class');
	var clickid = id.getAttributeNS(null, 'id');
	var xval = clickid.slice(1, clickid.indexOf('-'));
	var yval = clickid.slice(clickid.indexOf('-') + 1);

	if (clickclass === 'unclicked') {
		id.setAttributeNS(null, 'class', 'clicked');

	}
	else if (clickclass === 'clicked') {
		id.setAttributeNS(null, 'class', 'xed');
	}
	else {
		id.setAttributeNS(null, 'class', 'unclicked');
	}

	var newclickclass = id.getAttributeNS(null, 'class');

	/* checking if clicked element is on a corner and setting other elements on the corner to same class if true */
	for (i = 0; i < 4; i++) {
		if (corners[i].includes(clickid)) {
			for (j = 0; j < 4; j++) {
				document.getElementById(corners[i][j]).setAttributeNS(null, 'class', newclickclass);
			}
		}
	}
	/* same for top & bottom edges*/
	if (clickid.charAt(0) === 'H' && (yval === '1' || yval === String(nRows + 1))) {
		document.getElementById('H' + String(parseInt(xval) + 2 * (parseInt(xval) % 2) - 1) + '-' + yval).setAttributeNS(null, 'class', newclickclass);
	} 
	/* same for vertical mortar on left edge */
	if (clickid.charAt(0) === 'V' && xval === '1' && yval % 2 === 1) {
		document.getElementById('H1-' + yval).setAttributeNS(null, 'class', newclickclass);
		document.getElementById('H1-' + String(parseInt(yval) + 1)).setAttributeNS(null, 'class', newclickclass);
	}
	/* and right edge */
	if (clickid.charAt(0) === 'V' && xval === String(nColumns + 1) && yval % 2 === 1) {
		document.getElementById('H' + String(2 * nColumns) + '-' + yval).setAttributeNS(null, 'class', newclickclass);
		document.getElementById('H' + String(2 * nColumns) + '-' + String(parseInt(yval) + 1)).setAttributeNS(null, 'class', newclickclass);
	}
	/* same for horizontal mortar on left edge */
	if (clickid.charAt(0) === 'H' && xval === '1') {
		document.getElementById('V1-' + String(parseInt(yval) + (parseInt(yval) % 2) - 1)).setAttributeNS(null, 'class', newclickclass);
		document.getElementById('H1-' + String(parseInt(yval) + 2 * (parseInt(yval) % 2) - 1)).setAttributeNS(null, 'class', newclickclass);
	}
	/* and right edge */
	if (clickid.charAt(0) === 'H' && xval === String(2 * nColumns)) {
		document.getElementById('V' + String(nColumns + 1) + '-' + String(parseInt(yval) + (parseInt(yval) % 2) - 1)).setAttributeNS(null, 'class', newclickclass);
		document.getElementById('H' + String(2 * nColumns) + '-' + String(parseInt(yval) + 2 * (parseInt(yval) % 2) - 1)).setAttributeNS(null, 'class', newclickclass);
	}
} 

function drawbricks(nColumns, nRows) {
	for (var y = 0; y < nRows; y++) {
		for (var x = 0; x < (nColumns - y % 2); x++) {
			var rect = document.createElementNS(svgns, 'rect');
			var xcoord = x + 1;
			var ycoord = y + 1;
			rect.setAttributeNS(null, 'x', mortar + unitlength * x + halfunit * (y % 2));
			rect.setAttributeNS(null, 'y', mortar + unitheight * y);
			rect.setAttributeNS(null, 'height', brickheight);
			rect.setAttributeNS(null, 'width', brickwidth);
			rect.setAttributeNS(null, 'fill', 'rgb(192,75,75)');
			rect.setAttributeNS(null, 'id', 'B' + xcoord.toString() + '-' + ycoord.toString());
			rect.setAttributeNS(null, 'class', 'brick');
			document.getElementById("canvas").appendChild(rect);
		}
	}
}

function drawhorizmortar(nColumns, nRows) {
	for (var y = 0; y < nRows + 1; y++) {
		for (var x = 0; x < 2 * nColumns; x++) {
			var rect = document.createElementNS(svgns, 'rect');
			var xcoord = x + 1;
			var ycoord = y + 1;
			rect.setAttributeNS(null, 'x', mortar + halfunit * x);
			rect.setAttributeNS(null, 'y', unitheight * y);
			rect.setAttributeNS(null, 'height', mortar);
			rect.setAttributeNS(null, 'width', horizmortarlength);
			rect.setAttributeNS(null, 'id', 'H' + xcoord.toString() + '-' + ycoord.toString());
			rect.setAttributeNS(null, 'class', 'unclicked');
			rect.setAttributeNS(null, 'onclick', 'borderclick(this)');
			document.getElementById("canvas").appendChild(rect);
		}
	}
}

function drawvertmortar(nColumns, nRows) {
	for (var y = 0; y < nRows; y++) {
		for (var x = 0; x < (nColumns + 1 - y % 2); x++) {
			var rect = document.createElementNS(svgns, 'rect');
			var xcoord = x + 1;
			var ycoord = y + 1;
			rect.setAttributeNS(null, 'x', unitlength * x + halfunit * (y % 2));
			rect.setAttributeNS(null, 'y', mortar + unitheight * y);
			rect.setAttributeNS(null, 'height', brickheight);
			rect.setAttributeNS(null, 'width', mortar);
			rect.setAttributeNS(null, 'id', 'V' + xcoord.toString() + '-' + ycoord.toString());
			rect.setAttributeNS(null, 'class', 'unclicked');
			rect.setAttributeNS(null, 'onclick', 'borderclick(this)');
			document.getElementById("canvas").appendChild(rect);
		}
	}
}

function drawxs(nColumns, nRows) {
	/* drawing xs under horizontal mortar */
	for (var y = 0; y < nRows + 1; y++) {
		for (var x = 0; x < 2 * nColumns; x++) {
			var line1 = document.createElementNS(svgns, 'line');
			line1.setAttributeNS(null, 'x1', unitlength / 4 + halfunit * x + 1);
			line1.setAttributeNS(null, 'y1', unitheight * y + 1);
			line1.setAttributeNS(null, 'x2', mortar + unitlength / 4 + halfunit * x - 1);
			line1.setAttributeNS(null, 'y2', mortar + unitheight * y - 1);
			line1.setAttributeNS(null, 'stroke-width', 2);
			line1.setAttributeNS(null, 'stroke', 'black');
			
			var line2 = document.createElementNS(svgns, 'line');
			line2.setAttributeNS(null, 'x1', mortar + unitlength / 4 + halfunit * x - 1);
			line2.setAttributeNS(null, 'y1', unitheight * y + 1);
			line2.setAttributeNS(null, 'x2', unitlength / 4 + halfunit * x + 1);
			line2.setAttributeNS(null, 'y2', mortar + unitheight * y - 1);
			line2.setAttributeNS(null, 'stroke-width', 2);
			line2.setAttributeNS(null, 'stroke', 'black');

			document.getElementById("canvas").appendChild(line1);
			document.getElementById("canvas").appendChild(line2);
		}
	}
	/* drawing xs under vertical mortar */
	for (var y = 0; y < nRows; y++) {
		for (var x = 0; x < (nColumns + 1 - y % 2); x++) {
			var line1 = document.createElementNS(svgns, 'line');
			line1.setAttributeNS(null, 'x1', unitlength * x + halfunit * (y % 2) + 1);
			line1.setAttributeNS(null, 'y1', unitheight / 2 + unitheight * y + 1);
			line1.setAttributeNS(null, 'x2', mortar + unitlength * x + halfunit * (y % 2) - 1);
			line1.setAttributeNS(null, 'y2', mortar + unitheight / 2 + unitheight * y - 1);
			line1.setAttributeNS(null, 'stroke-width', 2);
			line1.setAttributeNS(null, 'stroke', 'black');
			
			var line2 = document.createElementNS(svgns, 'line');
			line2.setAttributeNS(null, 'x1', mortar + unitlength * x + halfunit * (y % 2) - 1);
			line2.setAttributeNS(null, 'y1', unitheight / 2 + unitheight * y + 1);
			line2.setAttributeNS(null, 'x2', unitlength * x + halfunit * (y % 2) + 1);
			line2.setAttributeNS(null, 'y2', mortar + unitheight / 2 + unitheight * y - 1);
			line2.setAttributeNS(null, 'stroke-width', 2);
			line2.setAttributeNS(null, 'stroke', 'black');

			document.getElementById("canvas").appendChild(line1);
			document.getElementById("canvas").appendChild(line2);
		}
	}
}

function drawgaps(nColumns, nRows) {
	for (var y = 0; y < nRows + 1; y++) {
		for (var x = 0; x < 2 * nColumns + 1; x++) {
			var rect = document.createElementNS(svgns, 'rect');
			var xcoord = x + 1;
			var ycoord = y + 1;
			rect.setAttributeNS(null, 'x', halfunit * x);
			rect.setAttributeNS(null, 'y', unitheight * y);
			rect.setAttributeNS(null, 'height', mortar);
			rect.setAttributeNS(null, 'width', mortar);
			rect.setAttributeNS(null, 'id', 'G' + xcoord.toString() + '-' + ycoord.toString());
			rect.setAttributeNS(null, 'class', 'off');
			document.getElementById("canvas").appendChild(rect);
		}
	}
}

function drawpuzzle(nColumns, nRows) {
	if (nRows % 2 == 0) {
		console.error("Height of brick wall must be odd");
		return;
	}
	drawxs(nColumns, nRows);
	drawbricks(nColumns, nRows);
	drawhorizmortar(nColumns, nRows);
	drawvertmortar(nColumns, nRows);
	drawgaps(nColumns, nRows)
}

drawpuzzle(nColumns, nRows);