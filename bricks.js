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
