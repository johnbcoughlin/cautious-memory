const brickwidth = 100;
const brickheight = 50;
const mortar = 10;
const unitlength = brickwidth + mortar;
const unitheight = brickheight + mortar;
const halfunit = unitlength / 2;
const horizmortarlength = (brickwidth - mortar)/2;

const nColumns = 5;
const nRows = 7;

/* creating arrays of mortor ids located on the outside of each corner brick */
const ULcorner = ['H1-1', 'H2-1', 'H1-2', 'V1-1'];
const URcorner = ['H' + (2 * nColumns - 1) + '-1', 'H' + 2 * nColumns + '-1', 'H' + 2 * nColumns + '-2', 'V' + (nColumns + 1) + '-1'];
const LLcorner = ['H1-' + (nRows + 1), 'H2-' + (nRows + 1), 'H1-' + nRows, 'V1-' + nRows];
const LRcorner = ['H' + (2 * nColumns - 1) + '-' + (nRows + 1), 'H' + 2 * nColumns + '-' + (nRows + 1), 'H' + 2 * nColumns + '-' + nRows, 'V' + (nColumns + 1) + '-' + nRows];
const corners = [ULcorner, URcorner, LLcorner, LRcorner];

const svgns = "http://www.w3.org/2000/svg";

function borderclick(e) {
	const clickclass = e.getAttributeNS(null, 'class');
	const clickid = e.getAttributeNS(null, 'id');
	const xval = clickid.slice(1, clickid.indexOf('-'));
	const yval = clickid.slice(clickid.indexOf('-') + 1);

	if (clickclass === 'unclicked') {
		e.setAttributeNS(null, 'class', 'clicked');
	} else if (clickclass === 'clicked') {
		e.setAttributeNS(null, 'class', 'xed');
	} else {
		e.setAttributeNS(null, 'class', 'unclicked');
	}

	const newclickclass = e.getAttributeNS(null, 'class');

	/* checking if clicked element is on the outside of a corner brick and setting other elements on the corner to same class if true */
	for (let i = 0; i < 4; i++) {
		if (corners[i].includes(clickid)) {
			for (let j = 0; j < 4; j++) {
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
	for (let y = 0; y < nRows; y++) {
		for (let x = 0; x < (nColumns - y % 2); x++) {
			const rect = document.createElementNS(svgns, 'rect');
			const xcoord = x + 1;
			const ycoord = y + 1;
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
	for (let y = 0; y < nRows + 1; y++) {
		for (let x = 0; x < 2 * nColumns; x++) {
			const rect = document.createElementNS(svgns, 'rect');
			const xcoord = x + 1;
			const ycoord = y + 1;
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
	for (let y = 0; y < nRows; y++) {
		for (let x = 0; x < (nColumns + 1 - y % 2); x++) {
			const rect = document.createElementNS(svgns, 'rect');
			const xcoord = x + 1;
			const ycoord = y + 1;
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

function drawX(xcoord, ycoord) {
	const line1 = document.createElementNS(svgns, 'line');
	line1.setAttributeNS(null, 'x1', xcoord + 1);
	line1.setAttributeNS(null, 'y1', ycoord + 1);
	line1.setAttributeNS(null, 'x2', xcoord + mortar - 1);
	line1.setAttributeNS(null, 'y2', ycoord + mortar - 1);
	line1.setAttributeNS(null, 'stroke-width', 2);
	line1.setAttributeNS(null, 'stroke', 'black');

	const line2 = document.createElementNS(svgns, 'line');
	line2.setAttributeNS(null, 'x1', xcoord + mortar - 1);
	line2.setAttributeNS(null, 'y1', ycoord + 1);
	line2.setAttributeNS(null, 'x2', xcoord + 1);
	line2.setAttributeNS(null, 'y2', ycoord + mortar - 1);
	line2.setAttributeNS(null, 'stroke-width', 2);
	line2.setAttributeNS(null, 'stroke', 'black');

	document.getElementById("canvas").appendChild(line1);
	document.getElementById("canvas").appendChild(line2);
}

function drawxundermortar(nColumns, nRows) {
	for (let y = 0; y < nRows + 1; y++) {
		for (let x = 0; x < 2 * nColumns; x++) {
			let xcoord = unitlength / 4 + halfunit * x;
			let ycoord = unitheight * y;
			drawX(xcoord, ycoord);
		}
	}
	for (let y = 0; y < nRows; y++) {
		for (let x = 0; x < (nColumns + 1 - y % 2); x++) {
			let xcoord = unitlength * x + halfunit * (y % 2);
			let ycoord = unitheight / 2 + unitheight * y;
			drawX(xcoord, ycoord);
		}
	}
}

function drawgaps(nColumns, nRows) {
	for (let y = 0; y < nRows + 1; y++) {
		for (let x = 0; x < 2 * nColumns + 1; x++) {
			const rect = document.createElementNS(svgns, 'rect');
			const xcoord = x + 1;
			const ycoord = y + 1;
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
	drawxundermortar(nColumns, nRows);
	drawbricks(nColumns, nRows);
	drawhorizmortar(nColumns, nRows);
	drawvertmortar(nColumns, nRows);
	drawgaps(nColumns, nRows)
}

drawpuzzle(nColumns, nRows);