document.addEventListener("mouseover", beholdElement, false);

function beholdElement(event) {

	event.target.classList.add("beholded");

	event.target.addEventListener("mouseout", leftBeholdedElement, false);
	event.target.addEventListener("click", clickBeholder, false);
}

function leftBeholdedElement(event) {
	event.target.classList.remove("beholded");
	event.target.removeEventListener("click", clickBeholder, false);
}

function clickBeholder(event) {

	
	browser.storage.local.set( {
		element: {
			bUrl: document.URL,
			selector: CSSSelector(event.target),
			elementHTML: event.target.innerHTML				
		}
	});
	
	browser.runtime.sendMessage("done");

	event.target.removeEventListener("click", clickBeholder, false);
	event.target.classList.remove("beholded");
	document.removeEventListener("mouseover", beholdElement, false);

}

function CSSSelector(initElem) {

	let current = initElem; // start element
	let selector = "";

	// while the current element has a parent AND the parent isnt the top of the document (<html>)
	while(current.parentElement && current.parentElement !== document.documentElement) {

		// if the current element has an id, add it to the selector string and break the loop
		if(current.id) {
			selector = '#' + current.id + selector;
			break;
		} else {

		/* if the element however does not have an id, we'll see which child
		it is to the parent element and add it as the nth-child in the
		selector string (or as the first-child)
		*/
			bodyEls = current.parentElement.children;
			
			let i;

			for(i = 0; i < bodyEls.length; i++) {
				if(bodyEls[i].isEqualNode(current)) {

					selector =
						' > ' + current.tagName.toLowerCase() +
							(i != 0
							?
							':nth-child(' + (i + 1) + ')' + selector
							:
							'' + selector);

					break;
				}
			}
		}

		current = current.parentElement
	}

	return selector;
}
