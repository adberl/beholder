browser.runtime.onMessage.addListener(loadElements);
clearStorage(); // TEMPORARY, DONT FORGET TO REMOVE!!!

var iFunc;

function clearStorage() {
	browser.storage.local.clear(); 
	console.log('Cleared local storage ...');
}

function loadElements() {


	browser.storage.local.get().then(
		function(gotItem) {
			console.log(gotItem.element);
			clearInterval(iFunc);
			iFunc = setInterval(checkPage, 5*60*1000, gotItem.element); // check the page every 30 minutes
		},
		function(err) {
			console.log(err);
		}
	);
}		

function checkPage(msg) {

	console.log("checking: " + msg.bUrl);
	fetch(msg.bUrl).then(function(response) {
		if(response.ok) {
			response.text().then(function(bodyText) {

				parser = new DOMParser();
				doc = parser.parseFromString(bodyText, "text/html");
				bEl = doc.querySelector(msg.selector);

				console.log(bEl.innerHTML == msg.elementHTML);


				});
		}
	});
}
