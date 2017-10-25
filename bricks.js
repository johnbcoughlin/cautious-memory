function bordermouse(id) {
	if (id.style.fill == "white") {
		id.style.fill = "grey";
	}
}
function borderunmouse(id) {
	if (id.style.fill == "grey") {
		id.style.fill = "white";
	}
}
function borderclick(id) {
	if (id.style.fill == "black") {
		id.style.fill = "white";
	} else {
		id.style.fill = "black";
	}

} 