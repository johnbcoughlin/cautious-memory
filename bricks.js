const brickwidth = 100;
const brickheight = 50;
const mortar = 10;
const unitlength = brickwidth + mortar;
const unitheight = brickheight + mortar;
const halfunit = unitlength / 2;
const horizmortarlength = (brickwidth - mortar)/2;

const nColumns = 4;
const nRows = 3;

/* creating arrays of mortor ids located on the outside of each corner brick */
const ULcorner = ['H1-1', 'H2-1', 'H1-2', 'V1-1'];
const URcorner = ['H' + (2 * nColumns - 1) + '-1', 'H' + 2 * nColumns + '-1', 'H' + 2 * nColumns + '-2', 'V' + (nColumns + 1) + '-1'];
const LLcorner = ['H1-' + (nRows + 1), 'H2-' + (nRows + 1), 'H1-' + nRows, 'V1-' + nRows];
const LRcorner = ['H' + (2 * nColumns - 1) + '-' + (nRows + 1), 'H' + 2 * nColumns + '-' + (nRows + 1), 'H' + 2 * nColumns + '-' + nRows, 'V' + (nColumns + 1) + '-' + nRows];
const corners = [ULcorner, URcorner, LLcorner, LRcorner];

const svgns = "http://www.w3.org/2000/svg";

const puzzle1 = {'B1-1': 3, 'B4-1': 1, 'B2-2': 3, 'B1-3': 3, 'B4-3': 4};


function borderclick(e) {
	const clickclass = e.getAttributeNS(null, 'class');
	const clickid = e.getAttributeNS(null, 'id');
	const type = clickid.charAt(0);
	const xval = parseInt(clickid.slice(1, clickid.indexOf('-')));
	const yval = parseInt(clickid.slice(clickid.indexOf('-') + 1));

	rotateClass(e, clickclass);

	const newclickclass = e.getAttributeNS(null, 'class');

	adjustCorners(clickid, newclickclass);
	adjustEdges(type, xval, yval, newclickclass);
	adjustGaps(e);


	if (isLoop() && cluesSatisfied(puzzle1)) {
		window.alert('You did it!!!!');
	}
} 

function rotateClass(e, className) {
	if (className === 'unclicked') {
		e.setAttributeNS(null, 'class', 'clicked');
	} else if (className === 'clicked') {
		e.setAttributeNS(null, 'class', 'xed');
	} else {
		e.setAttributeNS(null, 'class', 'unclicked');
	}
}

/* checking if clicked element is on the outside of a corner brick and setting other elements on the corner to same class if true */
function adjustCorners(id, className) {
	for (let i = 0; i < 4; i++) {
		if (corners[i].includes(id)) {
			for (let j = 0; j < 4; j++) {
				document.getElementById(corners[i][j]).setAttributeNS(null, 'class', className);
				adjustGaps(document.getElementById(corners[i][j]));
			}
		}
	}
}

function adjustEdges(type, xval, yval, className) {
	/* top & bottom edges */
	if (type === 'H' && (yval === 1 || yval === nRows + 1)) {
		document.getElementById('H' + (xval + 2 * (xval % 2) - 1) + '-' + yval).setAttributeNS(null, 'class', className);
		adjustGaps(document.getElementById('H' + (xval + 2 * (xval % 2) - 1) + '-' + yval));
	} 
	/* vertical mortar on left edge */
	if (type === 'V' && xval === 1 && yval % 2 === 1) {
		document.getElementById('H1-' + yval).setAttributeNS(null, 'class', className);
		adjustGaps(document.getElementById('H1-' + yval));
		document.getElementById('H1-' + (yval + 1)).setAttributeNS(null, 'class', className);
		adjustGaps(document.getElementById('H1-' + (yval + 1)));
	}
	/* vertical mortar on right edge */
	if (type === 'V' && xval === nColumns + 1 && yval % 2 === 1) {
		document.getElementById('H' + (2 * nColumns) + '-' + yval).setAttributeNS(null, 'class', className);
		adjustGaps(document.getElementById('H' + (2 * nColumns) + '-' + yval));
		document.getElementById('H' + (2 * nColumns) + '-' + (yval + 1)).setAttributeNS(null, 'class', className);
		adjustGaps(document.getElementById('H' + (2 * nColumns) + '-' + (yval + 1)));
	}
	/* horizontal mortar on left edge */
	if (type === 'H' && xval === 1) {
		document.getElementById('V1-' + (yval + (yval % 2) - 1)).setAttributeNS(null, 'class', className);
		adjustGaps(document.getElementById('V1-' + (yval + (yval % 2) - 1)));
		document.getElementById('H1-' + (yval + 2 * (yval % 2) - 1)).setAttributeNS(null, 'class', className);
		adjustGaps(document.getElementById('H1-' + (yval + 2 * (yval % 2) - 1)));
	}
	/* horizontal mortar on right edge */
	if (type === 'H' && xval === 2 * nColumns) {
		document.getElementById('V' + (nColumns + 1) + '-' + (yval + (yval % 2) - 1)).setAttributeNS(null, 'class', className);
		adjustGaps(document.getElementById('V' + (nColumns + 1) + '-' + (yval + (yval % 2) - 1)));
		document.getElementById('H' + (2 * nColumns) + '-' + (yval + 2 * (yval % 2) - 1)).setAttributeNS(null, 'class', className);
		adjustGaps(document.getElementById('H' + (2 * nColumns) + '-' + (yval + 2 * (yval % 2) - 1)));
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

function drawpuzzletext(puzzle) {
	for (let key in puzzle) {
		const xcoord = parseInt(document.getElementById(key).getAttributeNS(null, 'x')) + brickwidth / 2;
		const ycoord = parseInt(document.getElementById(key).getAttributeNS(null, 'y')) + .75 * brickheight;
		const clue = document.createElementNS(svgns, 'text');
		clue.setAttributeNS(null, 'x', xcoord);
		clue.setAttributeNS(null, 'y', ycoord);
		clue.setAttributeNS(null, 'class', 'clue');
		clue.setAttributeNS(null, 'font-size', .75 * brickheight);
		clue.innerHTML = puzzle[key];
		document.getElementById('canvas').appendChild(clue); 
	}
}
/* determines if the currently 'clicked' elements form one continuous loop with no stray elements */
function isLoop() {
	let clickedElems = Array.from(document.getElementsByClassName('clicked'));
	if (clickedElems.length === 0) {return false;}
	const firstElem = clickedElems[0];
	clickedElems.shift();
	if (isContinuous(firstElem)) {
		let previousElem = firstElem;
		let currentElem = isContinuous(firstElem)[0];
		while (currentElem != firstElem) {
			let neighborsPair = isContinuous(currentElem);
			if (neighborsPair) {
				let placeHolder = previousElem;
				previousElem = currentElem;
				currentElem = neighborsPair[0] === placeHolder
				? neighborsPair[1]
				: neighborsPair[0];
				clickedElems.splice(clickedElems.indexOf(previousElem), 1);
			} else {return false;}
		}
		if (clickedElems.length === 0) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/* determines if an element has exactly two neighbors, who are not neighbors to each other
returns false is not continuous, returns the two neighbors if it is continuous */
function isContinuous(e) {
	if (e.getAttributeNS(null, 'class') != 'clicked') {return false;}
	const elemid = e.getAttributeNS(null, 'id');
	const elemNeighbors = neighbors(elemid);
	let clickedNeighbors = [];
	for (let i in elemNeighbors) {
		if (elemNeighbors[i]) {
			if (elemNeighbors[i].getAttributeNS(null, 'class') === 'clicked') {
				clickedNeighbors.push(elemNeighbors[i]);
			}
		}
	}
	if (clickedNeighbors.length === 2) {
		if (neighbors(clickedNeighbors[0].getAttributeNS(null, 'id')).indexOf(clickedNeighbors[1]) === -1) {
			return clickedNeighbors;
		}
	} else {
		return false;
	}
}

function cluesSatisfied(puzzle) {
	let weGood = true;
	for (let key in puzzle) {
		const mortarNeighbors = surroundingMortar(key);
		let clickedSides = 0;
		if (mortarNeighbors[0].getAttributeNS(null, 'class') === 'clicked' || mortarNeighbors[1].getAttributeNS(null, 'class') === 'clicked') {
			clickedSides++;
		}
		if (mortarNeighbors[2].getAttributeNS(null, 'class') === 'clicked' || mortarNeighbors[3].getAttributeNS(null, 'class') === 'clicked') {
			clickedSides++;
		}
		if (mortarNeighbors[4].getAttributeNS(null, 'class') === 'clicked') {
			clickedSides++;
		}
		if (mortarNeighbors[5].getAttributeNS(null, 'class') === 'clicked') {
			clickedSides++;
		}
		if (clickedSides != puzzle[key]) {
			weGood = false;
		}
	}
	return weGood;
}
function surroundingMortar(id) {
	const elem = document.getElementById(id);
	if (id.charAt(0) != 'B') {
		console.error('element is not a brick');
		return false;
	}
	if (!elem) {
		console.error('element does not exist');
		return false;
	}
	const xval = parseInt(id.slice(1, id.indexOf('-')));
	const yval = parseInt(id.slice(id.indexOf('-') + 1));
	const result = [
		document.getElementById('H' + (2 * xval - yval % 2) + '-' + yval), 
		document.getElementById('H' + (2 * xval + 1 - yval % 2) + '-' + yval), 
		document.getElementById('H' + (2 * xval - yval % 2) + '-' + (yval + 1)),
		document.getElementById('H' + (2 * xval + 1 - yval % 2) + '-' + (yval + 1)), 
		document.getElementById('V' + xval + '-' + yval), 
		document.getElementById('V' + (xval + 1) + '-' + yval)
		];
	return result;
}

function gapNeighbors(id) {
	const xval = parseInt(id.slice(1, id.indexOf('-')));
	const yval = parseInt(id.slice(id.indexOf('-')  + 1));
	const result = [
		document.getElementById('H' + xval + '-' + yval), 
		document.getElementById('H' + (xval - 1) + '-' + yval), 
		document.getElementById('V' + ((xval + xval % 2) / 2) + '-' + (yval - (Math.abs(xval - yval) % 2)))
	];
	return result;
} 

function mortarNeighborGaps(id) {
	const xval = parseInt(id.slice(1, id.indexOf('-')));
	const yval = parseInt(id.slice(id.indexOf('-')  + 1));
	const result = [];
	if (id.charAt(0) === 'H') {
		result.push(document.getElementById('G' + xval + '-' + yval));
		result.push(document.getElementById('G' + (xval + 1) + '-' + yval));
	} else {
		result.push(document.getElementById('G' + ((2 * xval - 1) + (1 - yval % 2)) + '-' + yval));
		result.push(document.getElementById('G' + ((2 * xval - 1) + (1 - yval % 2)) + '-' + (yval + 1)));
	}
	return result;
}

function adjustGaps(elem) {
	const elemid = elem.getAttributeNS(null, 'id');
	const adjacentGaps = mortarNeighborGaps(elemid);
	for (let i in adjacentGaps) {
		let gap = adjacentGaps[i];
		let gapid = gap.getAttributeNS(null, 'id');
		let clickedcount = 0;
		for (let i in gapNeighbors(gapid)) {
			let currentmortar = gapNeighbors(gapid)[i];
			if (currentmortar) {
				if (currentmortar.getAttributeNS(null, 'class') === 'clicked') {
					clickedcount++;
				}
			}
		}
		if (clickedcount === 0 || clickedcount === 1) {
			gap.setAttributeNS(null, 'class', 'off');
		} else if (clickedcount === 2) {
			gap.setAttributeNS(null, 'class', 'on');
		} else {
			gap.setAttributeNS(null, 'class', 'wrong');
		}
	}
}

drawpuzzle(nColumns, nRows);
drawpuzzletext(puzzle1);